import React, { useCallback, memo, useState, useMemo } from 'react'
import { compose, flip, gt, filter, pathOr, clone } from 'ramda'

import styles from '../styles.css'
import {
  isColor,
  getValidMarginBottom,
  findItemWithSelectedVariations,
  findListItemsWithSelectedVariations,
} from '../utils'
import Variation from './Variation'
import useEffectSkipMount from './hooks/useEffectSkipMount'
import { useSKUSelectorCssHandles } from '../SKUSelectorCssHandles'

function getShowValueForVariation(
  showValueForVariation,
  variationName
) {
  const isImage = isColor(variationName)

  return (
    showValueForVariation === 'all' ||
    (showValueForVariation === 'image' && isImage)
  )
}

const isSkuAvailable = compose(
  flip(gt)(0),
  pathOr(0, ['sellers', '0', 'commertialOffer', 'AvailableQuantity'])
)

const showItemAsAvailable = ({
  possibleItems,
  selectedVariations,
  variationCount,
  isSelected,
}) => {
  const selectedNotNull = filter(Boolean, selectedVariations)
  const selectedCount = Object.keys(selectedNotNull).length

  if (selectedCount === variationCount && isSelected) {
    const item = findItemWithSelectedVariations(
      possibleItems,
      selectedVariations
    )

    return isSkuAvailable(item)
  }

  return possibleItems.some(isSkuAvailable)
}

const parseOptionNameToDisplayOption = ({
  selectedVariations,
  variationName,
  skuItems,
  onSelectItemMemo,
  imagesMap,
  variationCount,
  hideImpossibleCombinations,
}) => (variationValue) => {

  const isSelected = selectedVariations[variationName] === variationValue.name
  var _a;
  const image = (_a = imagesMap === null || imagesMap === void 0 ? void 0 : imagesMap[variationName]) === null || _a === void 0 ? void 0 : _a[variationValue.name];

  const newSelectedVariation = clone(selectedVariations)

  newSelectedVariation[variationName] = isSelected ? null : variationValue.name

  const possibleItems = findListItemsWithSelectedVariations(
    skuItems,
    newSelectedVariation
  )

  if (possibleItems.length > 0) {
    // This is a valid combination option
    const [item] = possibleItems
    const callbackFn = onSelectItemMemo({
      name: variationName,
      value: variationValue.name,
      skuId: item.itemId,
      isMainAndImpossible: false,
      possibleItems,
    })

    return {
      label: variationValue.name,
      originalName: variationValue.originalName,
      onSelectItem: callbackFn,
      image,
      available: showItemAsAvailable({
        possibleItems,
        selectedVariations,
        variationCount,
        isSelected,
      }),
      impossible: false,
    }
  }

  if (!hideImpossibleCombinations) {
    // This is a impossible combination and will only appear if the prop allows.
    return {
      label: variationValue.name,
      originalName: variationValue.originalName,
      // eslint-disable-next-line @typescript-eslint/no-empty-function
      onSelectItem: callbackFn,
      image,
      available: true,
      impossible: true,
    }
  }

  // This is a impossible combination and will be hidden.
  return null
}

const variationNameToDisplayVariation = ({
  variations,
  selectedVariations,
  skuItems,
  onSelectItemMemo,
  imagesMap,
  variationCount,
  hideImpossibleCombinations,
}) => (variationName) => {
  const name = variationName
  const { values, originalName } = variations[variationName]
  const options = values
    .map(
      parseOptionNameToDisplayOption({
        selectedVariations,
        variationName,
        skuItems,
        onSelectItemMemo,
        imagesMap,
        variationCount,
        hideImpossibleCombinations,
      })
    )
    .filter(Boolean)

  return { name, originalName, options }
}

// Parameters are explained on PropTypes
const getAvailableVariations = ({
  variations,
  selectedVariations,
  imagesMap,
  onSelectItemMemo,
  skuItems,
  hideImpossibleCombinations,
}) => {
  const variationCount = Object.keys(variations).length

  return Object.keys(variations).map(
    variationNameToDisplayVariation({
      variations,
      selectedVariations,
      skuItems,
      onSelectItemMemo,
      imagesMap,
      variationCount,
      hideImpossibleCombinations,
    })
  )
}

const getAvailableVariationsPromise = (
  params
) => {
  return new Promise(resolve => {
    const result = getAvailableVariations(params)

    resolve(result)
  })
}

export const CSS_HANDLES = ['skuSelectorContainer']

/** Renders the main and the secondary variation, if it exists. */
function SKUSelector({
  seeMoreLabel,
  maxItems,
  variations,
  skuItems,
  onSelectItem,
  imagesMap,
  imageHeight,
  imageWidth,
  showBorders,
  displayMode,
  selectedVariations,
  showVariationsLabels,
  showValueForVariation,
  hideImpossibleCombinations,
  showVariationsErrorMessage,
  variationsSpacing: marginBottomProp,
  sliderDisplayThreshold,
  sliderArrowSize,
  sliderItemsPerPage,
}) {
  const { handles } = useSKUSelectorCssHandles()
  const variationsSpacing = getValidMarginBottom(marginBottomProp)
  const onSelectItemMemo = useCallback(
    ({
      name,
      value,
      skuId,
      isMainAndImpossible,
      possibleItems,
    }) => () =>
      onSelectItem({ name, value, skuId, isMainAndImpossible, possibleItems }),
    [onSelectItem]
  )

  const availableVariationsPayload = useMemo(
    () => ({
      variations,
      selectedVariations,
      imagesMap,
      onSelectItemMemo,
      skuItems,
      hideImpossibleCombinations,
    }),
    [
      variations,
      selectedVariations,
      imagesMap,
      onSelectItemMemo,
      skuItems,
      hideImpossibleCombinations,
    ]
  )

  const [displayVariations, setDisplayVariations] = useState(() => getAvailableVariations(availableVariationsPayload))

  useEffectSkipMount(() => {
    let isCurrent = true
    const promise = getAvailableVariationsPromise(availableVariationsPayload)

    promise.then(availableVariations => {
      if (isCurrent) {
        setDisplayVariations(availableVariations)
      }
    })

    return () => {
      isCurrent = false
    }
  }, [availableVariationsPayload])

  const variationClasses = `mb${variationsSpacing}`

  return (
    <div
      className={`${styles.skuSelectorContainer} ${handles.skuSelectorContainer}`}
    >
      {displayVariations.map((variationOption, index) => {
        const selectedItem = selectedVariations[variationOption.name]

        return (
          <Variation
            mode={displayMode}
            maxItems={maxItems}
            imageWidth={imageWidth}
            imageHeight={imageHeight}
            showBorders={showBorders}
            variation={variationOption}
            selectedItem={selectedItem}
            seeMoreLabel={seeMoreLabel}
            showLabel={showVariationsLabels}
            containerClasses={variationClasses}
            key={`${variationOption.name}-${index}`}
            showErrorMessage={showVariationsErrorMessage}
            showValueForVariation={getShowValueForVariation(
              showValueForVariation,
              variationOption.name
            )}
            sliderDisplayThreshold={sliderDisplayThreshold}
            sliderArrowSize={sliderArrowSize}
            sliderItemsPerPage={sliderItemsPerPage}
          />
        )
      })}
    </div>
  )
}

export default memo(SKUSelector)