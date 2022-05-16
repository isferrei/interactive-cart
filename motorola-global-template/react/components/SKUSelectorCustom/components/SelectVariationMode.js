import React from 'react'
import { Dropdown } from 'vtex.styleguide'
import { injectIntl, defineMessages } from 'react-intl'

import styles from '../styles.css'

const messages = defineMessages({
  selectPlaceholder: {
    id: 'store/sku-selector.select.placeholder',
    defaultMessage: '',
  },
})

function SelectVariationMode(props) {
  const { intl, selectedItem, displayOptions } = props

  const options = displayOptions.map(op => ({
    label: op.label,
    value: op.label,
  }))

  const handleClick = (_, value) => {
    const reducedOptions = displayOptions.reduce((acc, cur) => {
      acc[cur.label] = cur;
      return acc;
    }, {});
    return reducedOptions[value].onSelectItem();
  };

  return (
    <div className={styles.skuSelectorSelectContainer}>
      <Dropdown
        options={options}
        value={selectedItem}
        onChange={handleClick}
        placeholder={'Select'}
      />
    </div>
  )
}

export default injectIntl(SelectVariationMode)
