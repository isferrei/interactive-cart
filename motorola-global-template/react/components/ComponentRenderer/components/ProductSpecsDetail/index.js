import React, { Component } from "react";
import "./productSpecsDetail.global.css";
import { handleResize, debounce } from "../../common/js/deviceDetection";
import { openAnimate, closeAnimate } from "./components/SpecificationFunctions";
import SpecificationItems from "./components/SpecificationItems";
import { imagePath } from "../../common/js/globalConstants";
import specsCollapseArrow from "../../common/images/specs_detail_collapse.svg";
import specsReturnArrow from "../../common/images/specs_detail_return.svg";
import specsMobileArrow from "../../common/images/specs_detail_mobile.svg";

class ProductSpecsDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      checkDevice: handleResize(),
      isOpen: false
    };
    this.specsElementRef = React.createRef();
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

  toggleSpecificationDetail = () => {
    this.setState({ isOpen: !this.state.isOpen }, () => {
      if (this.state.isOpen) {
        openAnimate(this.specsElementRef.current.offsetTop);
      } else {
        closeAnimate(this.specsElementRef.current);
      }
    });
  };

  render() {
    const {
      data: {
        psd_show_all_text,
        psd_hide_all_text,
        psd_background_color,
        psd_text_color,
        psd_border_color,
        psd_arrow_image,
        psd_bottom_arrow_image,
        psd_mobile_arrow_image,
        Items
      }
    } = this.props;

    const { isOpen } = this.state;

    if (!Array.isArray(Items) || !Items.length) {
      return null;
    }

    let SpecDetailStyle = {
      color: "#" + psd_text_color,
      backgroundColor: "#" + psd_background_color
    };
    let showHideStyle = {
      color: "#" + psd_text_color,
      borderTop: "1px solid #" + psd_border_color,
      borderBottom: "1px solid #" + psd_border_color
    };

    let desktopArrow = !psd_arrow_image
      ? specsCollapseArrow
      : imagePath + psd_arrow_image;
    let desktopBottomArrow = !psd_arrow_image
      ? specsReturnArrow
      : imagePath + psd_bottom_arrow_image;
    let mobileArrowImage = !psd_arrow_image
      ? specsMobileArrow
      : imagePath + psd_mobile_arrow_image;

    return (
      <div
        className="prod-specification-detail"
        ref={this.specsElementRef}
        style={SpecDetailStyle}
      >
        <div className={isOpen ? "psd-container open" : "psd-container"}>
          <div
            className="psd-show-hide-label"
            style={showHideStyle}
            onClick={this.toggleSpecificationDetail}
          >
            <img src={imagePath + desktopArrow} className="psd-top-arrow" alt="Top Arrow Icon" />
            {isOpen ? psd_hide_all_text : psd_show_all_text}
          </div>
          <div
            className="psd-contents-wrapper"
            style={
              this.state.checkDevice.isMobile
                ? { borderTop: "1px solid #" + psd_border_color }
                : null
            }
          >
            {Items.map((specItem, index) => {
              return (
                <SpecificationItems
                  key={index}
                  data={specItem}
                  mobileArrow={mobileArrowImage}
                  borderColor={psd_border_color}
                  textColor={psd_text_color}
                />
              );
            })}
          </div>

          <div
            className="psd-show-hide-label bottom"
            style={showHideStyle}
            onClick={this.toggleSpecificationDetail}
          >
            <img
              src={imagePath + desktopBottomArrow}
              className="psd-bottom-arrow"
              alt="Bottom Arrow Icon"
            />
            {psd_hide_all_text}
          </div>
        </div>
      </div>
    );
  }
}

export default ProductSpecsDetail;
