import React, { Component, Fragment } from 'react';
import ProductSummary from '../ProductSummary/index';
import './ProductList.global.css';
class ProductList extends Component {
  render() {
    const { search: { products } } = this.props;
    return (
      <div className="search-result">
        <div className="container">
          <div className="product-list">
            {products.map((product, key) => (<ProductSummary key={key} {...product} />))}
          </div>
        </div>
      </div>
    )
  }
}
export default ProductList;