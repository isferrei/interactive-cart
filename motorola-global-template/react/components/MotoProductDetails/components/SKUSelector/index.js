import React, { useState } from 'react';
import { path, prop, propOr, pathOr } from 'ramda';
import OptionSelector from './components/OptionSelector/index';

const SKUSelector = (props) => {
  Array.prototype.unique = function() {
    return this.filter(function (value, index, self) { 
      return self.indexOf(value) === index;
    });
  }
  
  const { productQuery: { product }} = props;
  const colorOptions = [
    {
      value: "#333",
      name: "Space grey"
    },
    {
      value: "#666",
      name: "Flash grey"
    }
  ]

  const storageOptions = [
    {
      value: "128gb",
      name: "128GB"
    },
    {
      value: "64gb",
      name: "64GB"
    },
    {
      value: "32gb",
      name: "32GB"
    }
  ]

  const planTypeOptions = [
    {
      value: "unlocked",
      name: "Unlocked"
    },
    {
      value: "verizon",
      name: "Verizon"
    },
  ]

  const [combinations, setCombinations] = useState(() => {
    let variations = []
    product.items.map((item) => {
      let itemVariation = {}
      item.variations.map((variation) => {
        itemVariation[variation.name] = variation.values[0]
      })
      itemVariation.sku = item.itemId
      variations.push(itemVariation)
    })
    return variations;
  });

  const [variationFields, setVariationFields] = useState(() => {
    let fields = []
    product.items.map((item) => {
      item.variations.map((variation) => {
        fields.push(variation.name)
      })
    })
    return fields.unique();
  })

  const [selectedItem, setSelectedItem] = useState(() => {
    const items = path(['productQuery', 'product', 'items'], props) || []
    if (!props.query || !props.query.skuId) return items[0]
    return items.find(sku => sku.itemId === props.query.skuId)
  })

  const [variationOptions, setVariationOptions] = useState(() => {
    let options = {}
    combinations.map((value) => {
      Object.keys(value).map((key) => { options[key] = [] });
    })
    combinations.map((value) => {
      Object.keys(value).map((key) => { options[key].push(value[key]) });
    })
    return options;
  })

  const [selectedOptions, setSelectedOptions] = useState({});

  const filterVariation = (variation) => {
    selectedOptions[variation.name] = variation.value
    let selectedKeys = Object.keys(selectedOptions)
    let filteredElements = combinations.filter((combination) => {
      return combination["Color"] === selectedOptions["Color"]
    })
    const foundItem = product.items.find((item) => (
      item.itemId === filteredElements[0].sku
    ))
    setSelectedItem(foundItem)
  }

  return (
    <div className="specification-selectors">
      {variationFields.map((variationField, key) => (
        <OptionSelector onSelectedProp={filterVariation} key={key} selectorTitle={variationField} variationName={variationField} selectedItem={selectedItem} selectOptions={variationOptions[variationField]} />
      ))}
      <h2>{selectedItem.itemId}</h2>
    </div>
  )
}

export default SKUSelector;