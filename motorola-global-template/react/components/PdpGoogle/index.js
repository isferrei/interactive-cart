import React, { Component } from "react";
import {
  handleResize,
  debounce
} from "../ComponentRenderer/common/js/deviceDetection";
import "./pdpGoogle.global.css";
import schema from "./schema";

class PdpGoogle extends Component {
  constructor(props) {
    super(props);
    this.state = {
      checkDevice: handleResize(),
      changeBgImage01: "",
      changeBgImage02: "",
      altText01: "",
      altText02: ""
    };
  }
  static schema = schema;

  componentDidMount() {
    this.setState({ checkDevice: handleResize() });
    window.addEventListener(
      "resize",
      debounce(() => {
        this.setState({ checkDevice: handleResize() });
        this.detectBgImage();
      }, 500)
    );
    this.detectBgImage();
  }

  detectBgImage = () => {
    const {
      checkDevice: { isMobile }
    } = this.state;
    const {
      bgImageMobile01,
      bgImageMobile02,
      bgImageDesktop01,
      bgImageDesktop02,
      desktopImgAltText01,
      desktopImgAltText02,
      mobileImgAltText01,
      mobileImgAltText02
    } = this.props;
    if (isMobile) {
      this.setState({
        changeBgImage01: bgImageMobile01,
        changeBgImage02: bgImageMobile02,
        altText01: mobileImgAltText01,
        altText02: mobileImgAltText02
      });
    } else {
      this.setState({
        changeBgImage01: bgImageDesktop01,
        changeBgImage02: bgImageDesktop02,
        altText01: desktopImgAltText01,
        altText02: desktopImgAltText02
      });
    }
  };

  render() {
    const {
      showPdpGoogle,
      pdpGoogleTitle01,
      pdpGoogleDescription01,
      pdpGoogleTitle02,
      pdpGoogleDescription02
    } = this.props;
    const {
      changeBgImage01,
      changeBgImage02,
      altText01,
      altText02
    } = this.state;

    if (!showPdpGoogle) {
      return null;
    }
    return (
      <div className="pdp-google">
        <div className="pg-upSection">
          <img src={changeBgImage01} alt={altText01} />
          <div className="pg-upContent">
            <h2>{pdpGoogleTitle01}</h2>
            <p>{pdpGoogleDescription01}</p>
          </div>
        </div>
        <div className="pg-downSection">
          <img src={changeBgImage02} alt={altText02} />
          <div className="pg-downContent">
            <h2>{pdpGoogleTitle02}</h2>
            <p>{pdpGoogleDescription02}</p>
          </div>
        </div>
      </div>
    );
  }
}

export default PdpGoogle;
