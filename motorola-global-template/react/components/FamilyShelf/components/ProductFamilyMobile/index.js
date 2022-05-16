import React, { Component, Fragment } from 'react';
import { Link } from 'vtex.render-runtime';
import './ProductFamilyMobile.global.css';
import IconCheck from '../../../../utils/IconCheck';

class ProductFamilyMobile extends Component {
  render() {
    const { itemLink, itemImage, itemImageAltText, floatImage, floatImageAltText, itemPrice, specifications, buttonText, buttonTextColor, buttonBgColor, buttonBorderColor } = this.props;
    return (
      <div className="product-family-mobile">
        <div className="product-family-mobile-image">
          <img src={itemImage} alt={itemImageAltText} />
        </div>

        <div className="family-logo-image">
          <img src={floatImage} alt={floatImageAltText} />
        </div>

        <div className="family-prices">
          {itemPrice}
        </div>

        <div className="family-specifications">
          <ul>
            {specifications.map((specification, key) => (
              <li key={key}>
                <IconCheck className="icon-check" />
                <p>{specification.specificationName}</p>
              </li>
            ))}
          </ul>
        </div>
        <Link
          className="family-cta"
          to={itemLink}
          style={{
            color: buttonTextColor ? buttonTextColor : '#FFFFFF',
            backgroundColor: buttonBgColor ? buttonBgColor : '#46c7e1',
            border: buttonBorderColor ? '1px solid ' + buttonBorderColor : '1px solid #46c7e1',
          }}
        >{buttonText}</Link>
      </div>
    )
  }
}
export default ProductFamilyMobile;