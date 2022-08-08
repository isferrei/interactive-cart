import { Component, Fragment } from 'react';
import { ExtensionPoint } from 'vtex.render-runtime';

class Shelf extends Component {
  render() {
    const { products } = this.props;
    return (
      <Fragment>
        <div className="collection-cards">
          {products.map((product, key) => (
            <Fragment key={key}>
              <ExtensionPoint id="moto-product-summary" {...product} key={key + "-0"} />
              <ExtensionPoint id="moto-product-block" {...product} key={key + "-1"} />
            </Fragment>
          ))}
        </div>
      </Fragment>
    )
  }
}

export default Shelf;