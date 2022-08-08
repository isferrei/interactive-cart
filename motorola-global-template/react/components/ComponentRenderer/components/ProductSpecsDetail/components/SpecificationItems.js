import React, { Component } from "react";
import "./specificationItems.global.css";
import { handleResize, debounce } from "../../../common/js/deviceDetection";
import { mobileAnimation } from "./SpecificationFunctions";
import { imagePath } from "../../CommonProductLogic/index";
import SpecItem from "./SpecItem";

class SpecificationItems extends Component {
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
      mobileArrow,
      borderColor,
      textColor,
      data: {
        psdi_category_value,
        data: { column_one_data, column_two_data, column_three_data }
      }
    } = this.props;

    let colorFlag = false;
    if (psdi_category_value == "Colors") {
      colorFlag = true;
    }

    return (
      <div
        className="psd-items-group"
        style={{ borderBottom: "1px solid #" + borderColor }}
      >
        <div
          className="psd-items-category"
          onClick={this.mobileOpenCloseAnimation}
          ref={this.mobileElementRef}
          style={{ color: "#" + textColor }}
        >
          <div className="psd-items-category-name">{psdi_category_value}</div>
          {this.state.checkDevice.isMobile ? (
            <img src={imagePath + mobileArrow} className="psd-mobile-arrow" alt="Mobile Arrow Icon" />
          ) : null}
        </div>
        <div className="psd-items-contents">
          <div className="psd-item-box">
            {Array.isArray(column_one_data) && column_one_data.length > 0
              ? column_one_data.map((colItem, index) => {
                  return (
                    <SpecItem
                      key={index}
                      data={colItem}
                      flagColor={colorFlag}
                      txtColor={textColor}
                    />
                  );
                })
              : null}
          </div>
          <div className="psd-item-box">
            {Array.isArray(column_two_data) && column_two_data.length > 0
              ? column_two_data.map((colItem, index) => {
                  return (
                    <SpecItem
                      key={index}
                      data={colItem}
                      flagColor={colorFlag}
                      txtColor={textColor}
                    />
                  );
                })
              : null}
          </div>
          <div className="psd-item-box">
            {Array.isArray(column_three_data) && column_three_data.length > 0
              ? column_three_data.map((colItem, index) => {
                  return (
                    <SpecItem
                      key={index}
                      data={colItem}
                      flagColor={colorFlag}
                      txtColor={textColor}
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

export default SpecificationItems;
