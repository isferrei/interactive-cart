import React, { Component } from "react";
import { handleResize, debounce } from "../../common/js/deviceDetection";
import { imagePath } from "../../components/CommonProductLogic/index";
import "./PdpBatterySectionSwipeCard.global.css";
import { Controller, Scene } from "react-scrollmagic";
import LazyLoad from 'react-lazyload';

class PdpBatterySectionSwipeCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      checkDevice: handleResize(),
      pdpBatteryBackgroundImageDay: "",
      pdpBatteryBackgroundImageDayAltText: "",
      pdpBatteryBackgroundImageNight: "",
      pdpBatteryBackgroundImageNightAltText: "",
      displayText: false
    };
    this.imgRef = React.createRef();
  }

  componentDidMount() {

    let offsetValue;
    this.setState({ checkDevice: handleResize() });
    window.addEventListener(
      "resize",
      debounce(() => {
        this.setState({ checkDevice: handleResize() });
        this.detectPdpBatteryBgImage();
        offsetValue = offsetVal();
      }, 500)
    );
    this.detectPdpBatteryBgImage();

    this.setDisplayText();
  }

  setDisplayText = () => {
    if (typeof this.imgRef !== "undefined" && this.imgRef.current) {
      this.setState({ displayText: true });
    } else {
      setTimeout(this.setDisplayText, 1000);
    }
  };

  detectPdpBatteryBgImage = () => {
    const { checkDevice: { isMobile, isTablet, isDesktop } } = this.state;

    const {
      bss_mobile_day_bg_img,
      bss_mobile_day_bg_img_alt,
      bss_mobile_night_bg_img,
      bss_mobile_night_bg_img_alt,
      bss_tablet_day_bg_img,
      bss_tablet_day_bg_img_alt,
      bss_tablet_night_bg_img,
      bss_tablet_night_bg_img_alt,
      bss_desktop_day_bg_img,
      bss_desktop_day_bg_img_alt,
      bss_desktop_night_bg_img,
      bss_desktop_night_bg_img_alt
    } = this.props.data;

    if (isMobile) {
      this.setState({
        pdpBatteryBackgroundImageDay: `${imagePath}${bss_mobile_day_bg_img}`,
        pdpBatteryBackgroundImageDayAltText: bss_mobile_day_bg_img_alt,
        pdpBatteryBackgroundImageNight: `${imagePath}${bss_mobile_night_bg_img}`,
        pdpBatteryBackgroundImageNightAltText: bss_mobile_night_bg_img_alt
      });
    } else if (isTablet) {
        this.setState({
          pdpBatteryBackgroundImageDay: bss_tablet_day_bg_img ? `${imagePath}${bss_tablet_day_bg_img}` : `${imagePath}${bss_desktop_day_bg_img}`,
          pdpBatteryBackgroundImageDayAltText: bss_tablet_day_bg_img_alt ? bss_tablet_day_bg_img_alt : bss_desktop_day_bg_img_alt,
          pdpBatteryBackgroundImageNight: bss_tablet_night_bg_img ? `${imagePath}${bss_tablet_night_bg_img}` : `${imagePath}${bss_desktop_night_bg_img}`,
          pdpBatteryBackgroundImageNightAltText: bss_tablet_night_bg_img_alt ? bss_tablet_night_bg_img_alt : bss_desktop_night_bg_img_alt
        });
    } else if (isDesktop) {
      this.setState({
        pdpBatteryBackgroundImageDay: `${imagePath}${bss_desktop_day_bg_img}`,
        pdpBatteryBackgroundImageDayAltText: bss_desktop_day_bg_img_alt,
        pdpBatteryBackgroundImageNight: `${imagePath}${bss_desktop_night_bg_img}`,
        pdpBatteryBackgroundImageNightAltText: bss_desktop_night_bg_img_alt
      });
    }
    else {
      this.setState({
        pdpBatteryBackgroundImageDay: `${imagePath}${bss_desktop_day_bg_img}`,
        pdpBatteryBackgroundImageDayAltText: bss_desktop_day_bg_img_alt,
        pdpBatteryBackgroundImageNight: `${imagePath}${bss_desktop_night_bg_img}`,
        pdpBatteryBackgroundImageNightAltText: bss_desktop_night_bg_img_alt
      });
    }
  };

  render() {

    const { checkDevice: { isMobile, isTablet } } = this.state;

    const {
      bss_day_title_text,
      bss_day_description_text,
      bss_night_title_text,
      bss_night_description_text
    } = this.props.data;

    const { indexProp } = this.props;

    let triggerHookVal = 0.0;

    if (isMobile || isTablet) {
      triggerHookVal = 0.1;
    }

    return (
      <div className="pdp-battery-section-swipe">
        <Controller globalSceneOptions={{ triggerHook: triggerHookVal }} >
          <Scene pin>
            <section id={"section-one-" + indexProp} className="pbss-panel pbss-day-slide-wrapper">
              <LazyLoad
                offset={100}
                once
                throttle={0}
                placeholder={<img className="pbss-lazyload-default-img" src={imagePath + "Lazy-Load-Full-bleed-card.png"} alt="Lazyload Placeholder Image" />}>
                <img
                  className="pbss-bg-image"
                  src={this.state.pdpBatteryBackgroundImageDay}
                  alt={this.state.pdpBatteryBackgroundImageDayAltText}
                  ref={this.imgRef}
                />
              </LazyLoad>
              <div
                className="pbss-text-wrapper"
                style={{
                  display: this.state.displayText ? 'block' : 'none'
                }}
              >
                <div className="pbss-title">{bss_day_title_text}</div>
                <div className="pbss-desc">{bss_day_description_text}</div>
              </div>
            </section>
          </Scene>
          <Scene>
            <section id={"section-two-" + indexProp} className="pbss-panel pbss-night-slide-wrapper">
              <LazyLoad
                offset={100}
                once
                throttle={0}
                placeholder={<img className="pbss-lazyload-default-img" src={imagePath + "Lazy-Load-Full-bleed-card.png"} alt="Lazyload Placeholder Image" />}>
                <img
                  className="pbss-bg-image"
                  src={this.state.pdpBatteryBackgroundImageNight}
                  alt={this.state.pdpBatteryBackgroundImageNightAltText}
                  ref={this.imgRef}
                />
              </LazyLoad>
              <div
                className="pbss-text-wrapper"
                style={{
                  display: this.state.displayText ? 'block' : 'none'
                }}
              >
                <div className="pbss-title">{bss_night_title_text}</div>
                <div className="pbss-desc">{bss_night_description_text}</div>
              </div>
            </section>
          </Scene>
        </Controller>
      </div>
    );
  }
}

export default PdpBatterySectionSwipeCard;
