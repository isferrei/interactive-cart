import React, { Component } from "react";

class CarrierDropdown extends Component {
  render() {
    const { carriers, selectCarrierText } = this.props;
    const carrierList = carriers.map(carrier => {
      return (
        <option key={carrier.Name} label={carrier.Name} value={carrier.Name}>
          {carrier.Name}
        </option>
      );
    });

    return (
      <select
        className="cc-select-carrier"
        onChange={this.props.selectedCarrier}
      >
        <option value="cc-select-a-carrier">
          {selectCarrierText ? selectCarrierText : "Select a network carrier"}
        </option>
        {carrierList}
      </select>
    );
  }
}

export default CarrierDropdown;
