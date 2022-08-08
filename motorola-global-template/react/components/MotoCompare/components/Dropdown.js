import React, { Component } from "react";
import { FormattedMessage } from "react-intl";

class Dropdown extends Component {
  render() {
    const { devices, index, query, sku } = this.props;
    let item, availableItem, nameComplete, id;
    const options = devices.map(dev => {
      item = dev.items.find(i => i.sellers[0].commertialOffer.Price > 0);
      availableItem = item ? dev.items.indexOf(item) : 0;
      nameComplete = dev.items[availableItem].nameComplete;
      id = dev.cacheId;

      return (
        <option
          key={id}
          value={id}
          disabled={Object.values(sku).includes(id) && query != id}
          label={nameComplete}
        >
          {nameComplete}
        </option>
      );
    });

    return (
      <select
        key={index}
        name={index}
        className="select-smartphones"
        data-index={query}
        value={query || ""}
        onChange={this.props.selected}
      >
        <FormattedMessage id="store/moto-compare.select-device">
          {message => (
            <option value="" disabled>
              {message}
            </option>
          )}
        </FormattedMessage>
        {options}
      </select>
    );
  }
}

export default Dropdown;
