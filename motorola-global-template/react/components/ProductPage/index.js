import React, { Component, Fragment } from "react";
import { ExtensionPoint } from "vtex.render-runtime";
import ProductSpecifications from "./components/ProductSpecifications/index";
import MainContent from "./components/MainContent";
import Disclaimers from "./components/Disclaimers/index";
import description from "./assets/description.js";
import "./assets/description.global.css";
import "./assets/slick.global.css";

class ProductPage extends Component {
  componentDidMount() {
    description.exec();
  }

  render() {
    const {
      productQuery: { product }
    } = this.props;
    if (Object.keys(product).length) {
      return (
        <Fragment>
          <div id="product-details">
            <ExtensionPoint id="moto-product-details" {...this.props} />
            <ExtensionPoint id="product-details" {...this.props} />
          </div>
          <div className="product-specifications">
            <Fragment>
              <MainContent {...product} />
              <ProductSpecifications {...product} />
              <ExtensionPoint id="product-reviews" />
              <Disclaimers {...product} />
            </Fragment>
          </div>
        </Fragment>
      );
    } else {
      return (
        <Fragment>
          <ExtensionPoint id="not-found" type="product" />
        </Fragment>
      );
    }
  }
}

export default ProductPage;
