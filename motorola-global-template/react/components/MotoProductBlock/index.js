import React, { Component, Fragment } from 'react';
import { Link } from 'vtex.render-runtime';
import './MotoProductBlock.global.css';
import { FormattedMessage } from "react-intl";

class MotoProductBlock extends Component {
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
              <img src={ items[0].images[0].imageUrl } alt="Product Image" />
            </div>

            <div className="product-actions">
              <Link page="store.product" params={{slug: linkText}}><FormattedMessage id="store/moto-product-block.learn-more" /></Link>
            </div>
          </div>
        </div>
      </Fragment>
    )
  }
}

export default MotoProductBlock;