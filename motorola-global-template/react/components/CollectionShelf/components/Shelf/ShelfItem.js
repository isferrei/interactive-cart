import React, { Component, Fragment } from 'react';
import { Link } from 'vtex.render-runtime';

class ShelfItem extends Component {

  render() {
    console.log(this.props);
    const { items, linkText, productName, description } = this.props;
    return (
      <div className="shelf-item">
        <div className="card-image">
          <img src={items[0].images[0].imageUrl} alt={productName} />
        </div>
        <div className="card-details">
          <div className="card-title">
            <h1>{productName}</h1>
          </div>
          <div className="card-price">
            $49.99
          </div>
          <div className="card-description">
            <p>{description}</p>
            <div className="card-actions">
              <Link className="green-shelf-cta" page="store.product" params={{slug: linkText}}>Buy now</Link>
              <Link className="blue-shelf-cta" page="store.product" params={{slug: linkText}}>Learn more</Link>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default ShelfItem;