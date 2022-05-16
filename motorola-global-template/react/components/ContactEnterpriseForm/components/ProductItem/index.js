import React from "react";
import "./ProductItem.global.css";
class ProductItem extends React.Component {
  state = {
    checked: false
  };

  onChange = e => {
    this.setState({ checked: !this.state.checked });
  };

  render() {
    const { imageUrl, inputId, inputName, value } = this.props;
    return (
      <div className="product-item">
        <label htmlFor={inputId}>
          <div>
            <img src={imageUrl} alt="Product Image" />
          </div>
          <div className="product-interest-label">{value}</div>
          <input
            type="checkbox"
            className="aer_product_interest_image_check form-checkbox"
            id={inputId}
            name={inputName}
            value={value}
            checked={this.state.checked}
            onChange={e => this.onChange(e)}
          />
          <span
            className={this.state.checked ? "checkmark checked" : "checkmark"}
          ></span>
        </label>
      </div>
    );
  }
}

export default ProductItem;
