import React, { Component, Fragment } from 'react';
import { Link } from 'vtex.render-runtime';
import './ProductSummary.global.css';
class ProductSummary extends Component {
  render() {
    const { productName, linkText, items } = this.props;
    return (
      <Fragment>
        <div className="search-result-product-wrapper">
          <div className="search-result-product">
            <div className="product-title">
              { productName }
            </div>
            <div className="product-image">
              <img src={ items[0].images[0].imageUrl }alt={linkText} />
            </div>
            <div className="product-actions">
              <Link page="store.product" params={{slug: linkText}}>Learn more</Link>
            </div>
          </div>
        </div>
      </Fragment>
    )
  }
}

export default ProductSummary;