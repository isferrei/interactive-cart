import React, {
  useState,
  useEffect,
  useMemo,
  memo,
  useCallback
} from 'react'
import { filter, head, isEmpty, compose, keys, length } from 'ramda'
import { useRuntime } from 'vtex.render-runtime'
import {
  useResponsiveValue
} from 'vtex.responsive-values'
import { useProductDispatch } from 'vtex.product-context/ProductDispatchContext'

import SKUSelector from './components/SKUSelector'
import {
  parseSku,
  isColor,
  uniqueOptionToSelect,
  findItemWithSelectedVariations,
} from './utils'
import useEffectSkipMount from './components/hooks/useEffectSkipMount'

const keyCount = compose(length, keys)
const filterSelected = filter(Boolean)

const areAllVariationsSelected = (
  selected,
  numberOfVariations
) => {
  const selectedCount = keyCount(filterSelected(selected))

  return selectedCount === numberOfVariations
}

const buildEmptySelectedVariation = (variations) => {
  const variationNames = Object.keys(variations)
  const result = {}

  for (const variationName of variationNames) {
    result[variationName] = null
  }

  return result
}

/** receives an item and the variations object, returns the selected variations for that item */
const selectedVariationFromItem = (
  item,
  variations
) => {
  const variationNames = Object.keys(variations)
  const result = {}

  for (const variationName of variationNames) {
    result[variationName] = item.variationValues[variationName]
  }

  return result
}

function filterColorImages(
  items,
  imageRegexText
) {
  const imageRegex = new RegExp(imageRegexText, 'i')

  return items.map(item => {
    if (!item.images) {
      return item
    }

    const hasVariationImage = item.images.some(
      image => image.imageLabel && imageRegex.test(image.imageLabel)
    )

    return {
      ...item,
      // if it doesn't have a variation image, it wont remove images without a label
      images: hasVariationImage
        ? item.images.filter(image => {
          if (!image.imageLabel) {
            return false
          }

          return imageRegex.test(image.imageLabel)
        })
        : item.images,
    }
  })
}

const useImagesMap = (
  items,
  variations,
  thumbnailImage
) => {
  return useMemo(() => {
    let filteredItems = items

    if (thumbnailImage) {
      filteredItems = filterColorImages(items, thumbnailImage)
    }

    const variationNames = Object.keys(variations)

    const result = {}

    for (const variationName of variationNames) {
      // Today, only "Color" variation should show image, need to find a more resilient way to tell this, waiting for backend
      if (!isColor(variations[variationName].originalName)) {
        continue
      }

      const imageMap = {}
      const variationValues = variations[variationName].values

      for (const variationValue of variationValues) {
        const item = filteredItems.find(
          sku => sku.variationValues[variationName] === variationValue.name
        )

        imageMap[variationValue.name] = item && head(item.images)
      }

      result[variationName] = imageMap
    }

    return result
  }, [items, variations, thumbnailImage])
}

const useAllSelectedEvent = (
  selectedVariations,
  variationsCount
) => {
  const dispatch = useProductDispatch()

  useEffect(() => {
    if (dispatch && selectedVariations) {
      dispatch({
        type: 'SKU_SELECTOR_SET_VARIATIONS_SELECTED',
        args: {
          allSelected: areAllVariationsSelected(
            selectedVariations,
            variationsCount
          ),
        },
      })
    }
  }, [dispatch, selectedVariations, variationsCount])
}

const getNewSelectedVariations = (
  query,
  skuSelected,
  variations,
  initialSelection
  // eslint-disable-next-line max-params
) => {
  const emptyVariations = buildEmptySelectedVariation(variations)

  if (skuSelected == null) {
    return emptyVariations
  }

  const hasSkuInQuery = Boolean(query?.skuId)
  const parsedSku = parseSku(skuSelected)

  if (hasSkuInQuery || initialSelection === 'complete') {
    //return selectedVariationFromItem(parsedSku, variations)
  }

  if (initialSelection === 'image') {
    const colorVariationName = parsedSku.variations.find(isColor)

    return {
      ...emptyVariations,
      ...(colorVariationName
        ? {
          [colorVariationName]: parsedSku.variationValues[colorVariationName],
        }
        : {}),
    }
  }

  return emptyVariations
}

/**
 * Display a list of SKU items of a product and its specifications.
 */
const SKUSelectorContainer = ({
  skuItems = [],
  onSKUSelected,
  seeMoreLabel,
  maxItems = 10,
  variations,
  skuSelected,
  imageWidth,
  imageHeight,
  thumbnailImage,
  variationsSpacing,
  showVariationsLabels = true,
  displayMode = 'default',
  hideImpossibleCombinations = true,
  showVariationsErrorMessage = true,
  showValueForVariation = 'none',
  initialSelection = 'complete',
  sliderDisplayThreshold = 3,
  sliderArrowSize = 12,
  sliderItemsPerPage = {
    desktop: 3,
    tablet: 2,
    phone: 1,
  },
  selectLowestPricedItem,
  lowestPricedItem,
  selectedSKUID
}) => {
  const variationsCount = keyCount(variations)
  const { query } = useRuntime()
  const responsiveDisplayMode = useResponsiveValue(displayMode)

  const parsedItems = useMemo(() => skuItems.map(parseSku), [skuItems])
  const { setQuery } = useRuntime()
  const redirectToSku = (skuId) => {
    setQuery({ skuId }, { replace: true })
  }

  const [selectedVariations, setSelectedVariations] = useState(() =>
    getNewSelectedVariations(query, skuSelected, variations, initialSelection)
  )

  useAllSelectedEvent(selectedVariations, variationsCount)

  useEffectSkipMount(() => {
    setSelectedVariations(
      getNewSelectedVariations(query, skuSelected, variations, initialSelection)
    )
  }, [variations])

  // This is used to selected an SKU when initialSelection is not 'empty'.
  // Runs only on the first render.
  useEffect(() => {
    if (skuSelected && onSKUSelected) {
      onSKUSelected(skuSelected.itemId)
    }
    if (variations) {
      const variationNames = Object.keys(variations);
      let variationsSelected = {};
      for (const variationName of variationNames) {
        if (isColor(variations[variationName].originalName)) {
          const variationValues = variations[variationName].values;
          if (variationValues.length === 1) {
            variationsSelected[[variations[variationName].originalName]] = variationValues[0] && variationValues[0].originalName ? variationValues[0].originalName : null
          }
        }
        if (variations[variationName].originalName == "Internal Storage" || variations[variationName].originalName == "Storage") {
          const variationValues = variations[variationName].values;
          if (variationValues.length === 1) {
            variationsSelected[[variations[variationName].originalName]] = variationValues[0] && variationValues[0].originalName ? variationValues[0].originalName : null
          }
        }
        if (variations[variationName].originalName == "Carriers" || variations[variationName].originalName == "Carrier") {
          const variationValues = variations[variationName].values;
          if (variationValues.length === 1) {
            variationsSelected[[variations[variationName].originalName]] = variationValues[0] && variationValues[0].originalName ? variationValues[0].originalName : null
          }
        }
        setSelectedVariations({
          ...selectedVariations,
          ...variationsSelected
        });
      }
    }
    if(selectedSKUID && !Boolean(query?.skuId)) {
      let selectedItem = {};
      const variations = {};
      selectedItem = skuItems.find( item => item.itemId == selectedSKUID)
      selectedItem.variations.map ( item => {
        variations[item.name] = item.values[0];
      })
      setSelectedVariations(variations);
      redirectToSku(selectedSKUID)
    }
    else if(Boolean(query?.skuId)) {
      let selectedItem = {};
      const variations = {};
      selectedItem = skuItems.find( item => item.itemId == query.skuId)
      selectedItem.variations.map ( item => {
        variations[item.name] = item.values[0];
      })
      setSelectedVariations(variations);
      redirectToSku(query.skuId)
    }
    else if(selectLowestPricedItem) {
      const lowestPricedItemVariations = {};
      lowestPricedItem.variations.map ( item => {
        lowestPricedItemVariations[item.name] = item.values[0];
      })
      setSelectedVariations(lowestPricedItemVariations);
      redirectToSku(lowestPricedItem.itemId)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const imagesMap = useImagesMap(parsedItems, variations, thumbnailImage)

  const dispatch = useProductDispatch()

  const onSelectItem = useCallback(
    ({
      name: variationName,
      value: variationValue,
      skuId,
      isMainAndImpossible,
      possibleItems,
    }) => {
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      const isRemoving = selectedVariations[variationName] === variationValue;
      const newSelectedVariation = !isMainAndImpossible
        ? {
          ...selectedVariations,
          [variationName]: isRemoving ? null : variationValue,
        }
        : {
          ...buildEmptySelectedVariation(variations),
          [variationName]: variationValue,
        }

      if (isColor(variationName) && isRemoving) {
        setSelectedVariations({
          ...buildEmptySelectedVariation(variations)
        });
      } else {
        // Set here for a better response to user
        setSelectedVariations(newSelectedVariation)
      }
      //setSelectedVariations(newSelectedVariation)
      const uniqueOptions = isRemoving
        ? {}
        : uniqueOptionToSelect(
          possibleItems,
          newSelectedVariation,
          isMainAndImpossible
        )

      const finalSelected = {
        ...newSelectedVariation,
        ...uniqueOptions,
      }

      if (!isEmpty(uniqueOptions)) {
        setSelectedVariations(finalSelected);
      }

      const allSelected = areAllVariationsSelected(
        finalSelected,
        variationsCount
      )

      let skuIdToRedirect = skuId

      if (!skuIdToRedirect || !isEmpty(uniqueOptions)) {
        const newItem = findItemWithSelectedVariations(
          possibleItems,
          finalSelected
        )

        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        skuIdToRedirect = newItem.itemId;
      }

      // if (un)selecting a color variation, dispatch to the product context
      // so we can show/hide the mainImageLabel if defined
      if (isColor(variationName)) {
        const variationSKU = isRemoving ? null : skuIdToRedirect

        dispatch({
          type: 'SELECT_IMAGE_VARIATION',
          args: {
            selectedImageVariationSKU: variationSKU,
          },
        })
      }

      // only redirect to a specific sku id if every variation was defined
      if (allSelected === false) {
        skuIdToRedirect = null
      }

      if (onSKUSelected) {
        onSKUSelected(skuIdToRedirect)

        return
      }

      // If its just removing, no need to redirect
      if (!isRemoving && (allSelected || isColor(variationName))) {
        redirectToSku(skuIdToRedirect)
      }
    },
    // Adding selectedVariations, variationsCount and onSKUSelected causes an infinite loop
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [selectedVariations, variations, onSKUSelected]
  )

  return (
    <SKUSelector
      maxItems={maxItems}
      imagesMap={imagesMap}
      skuItems={parsedItems}
      variations={variations}
      imageWidth={imageWidth}
      displayMode={responsiveDisplayMode}
      imageHeight={imageHeight}
      seeMoreLabel={seeMoreLabel}
      onSelectItem={onSelectItem}
      variationsSpacing={variationsSpacing}
      selectedVariations={selectedVariations}
      showVariationsLabels={showVariationsLabels}
      showValueForVariation={showValueForVariation}
      hideImpossibleCombinations={hideImpossibleCombinations}
      showVariationsErrorMessage={showVariationsErrorMessage}
      sliderDisplayThreshold={sliderDisplayThreshold}
      sliderArrowSize={sliderArrowSize}
      sliderItemsPerPage={sliderItemsPerPage}
    />
  )
}

export default memo(SKUSelectorContainer)
