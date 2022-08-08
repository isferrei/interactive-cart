import React, { Component } from "react";
import "./ViewSpecificationItems.global.css";
import {
  handleResize,
  debounce
} from "../../ComponentRenderer/common/js/deviceDetection";
import { imageAccountPath } from "../../ComponentRenderer/common/js/globalConstants";
import { mobileAnimation } from "./ViewSpecificationFunction";
import SpecItem from "./SpecItem";

class ViewSpecificationItems extends Component {
  constructor(props) {
    super(props);
    this.state = {
      checkDevice: handleResize()
    };
    this.mobileElementRef = React.createRef();
  }

  componentDidMount() {
    let current = this;
    window.addEventListener(
      "resize",
      debounce(function() {
        current.setState({ checkDevice: handleResize() });
      }, 100)
    );
  }

  mobileOpenCloseAnimation = () => {
    if (this.state.checkDevice.isMobile) {
      mobileAnimation(this.mobileElementRef.current);
    }
  };

  render() {
    const {
      data: { viewSpecItemsHeading, enableIfColorSwatch, viewSpecChildItems }
    } = this.props;

    let colorFlag = false;
    if (enableIfColorSwatch) {
      colorFlag = true;
    }
    return (
      <div className="psd-items-group">
        <div
          className="psd-items-category"
          onClick={this.mobileOpenCloseAnimation}
          ref={this.mobileElementRef}
          style={{ color: "#ffffff" }}
        >
          <div
            className="psd-items-category-name"
            dangerouslySetInnerHTML={{
              __html: viewSpecItemsHeading
            }}
          />
          {this.state.checkDevice.isMobile ? (
            <img
              src={`${imageAccountPath}arrow-mobile.svg`}
              className="psd-mobile-arrow"
              alt="mobile arrow"
            />
          ) : null}
        </div>
        <div className="psd-items-contents">
          <div className="psd-item-box">
            {viewSpecChildItems && viewSpecChildItems.length > 0
              ? viewSpecChildItems.map((colItem, index) => {
                  return (
                    <SpecItem
                      key={index}
                      data={colItem}
                      flagColor={colorFlag}
                    />
                  );
                })
              : null}
          </div>
        </div>
      </div>
    );
  }
}

export default ViewSpecificationItems;
