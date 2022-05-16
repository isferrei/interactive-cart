import { Component, Fragment } from 'react';
import { path } from 'ramda';
import { Slider } from 'vtex.store-components';
import './ProductSlider.global.css';

class ProductSlider extends Component {
  sliderParameters() {
    const specificationGroups = path(['product', 'specificationGroups'], this.props)
    if (!specificationGroups) return []
    const slider = this.props.product.specificationGroups.find((e) => {
      return e.name === "Slider"
    })
    if (!slider) return []
    return JSON.parse(slider.specifications[0].values[0])
  }
  render() {
    const settings = {
      dots: true,
      centerMode: true,
      inifinite: true,
      centerPadding: "10%",
    };
    return (
      <Fragment>
        <div id="slider-block" className="product-block">
        <div className="container">
          <div className="block-header align-center">
            <h1>seamless software and app experiences</h1>
          </div>
        </div>
          <Slider sliderSettings={settings}>
            {this.sliderParameters().map((slider, key) => (
              <div key={key}>
                <div className="slider-image"><img src={slider.image} alt={slider.header} /></div>
                <div className="slider-header">{slider.header}</div>
              </div>
            ))}
          </Slider>
        </div>
      </Fragment>
    )
  }
}

export default ProductSlider;