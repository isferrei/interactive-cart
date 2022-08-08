import React, { Component } from "react";
import { imagePath } from "../../components/CommonProductLogic/index";
import { handleResize, debounce } from "../../common/js/deviceDetection";
import "./PdpBatteryFadeInJackCard.global.css";
import { Controller, Scene } from "react-scrollmagic";
import LazyLoad from 'react-lazyload';

class PdpBatteryFadeInJackCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      checkDevice: handleResize(),
      pdpBatteryBackgroundImageDay: "",
      pdpBatteryBackgroundImageDayAltText: "",
      pdpBatteryBackgroundImageNight: "",
      pdpBatteryBackgroundImageNightAltText: ""
    };
  }

  componentDidMount() {
    window.addEventListener(
      "resize",
      debounce(() => {
        this.setState({ checkDevice: handleResize() });
        this.detectPdpBatteryBgImage();
      }, 500)
    );

    this.detectPdpBatteryBgImage();
  }

  detectPdpBatteryBgImage = () => {
    const {
      mobile_day_bg_image,
      mobile_day_bg_image_alt,
      mobile_night_bg_image,
      mobile_night_bg_image_alt,
      tablet_day_bg_image,
      tablet_day_bg_image_alt,
      tablet_night_bg_image,
      tablet_night_bg_image_alt,
      desktop_day_bg_image,
      desktop_day_bg_image_alt,
      desktop_night_bg_image,
      desktop_night_bg_image_alt
    } = this.props.data;

    const {
      checkDevice: { isMobile, isTablet, isDesktop }
    } = this.state;

    if (isMobile) {
      this.setState({
        pdpBatteryBackgroundImageDay: `${imagePath}${mobile_day_bg_image}`,
        pdpBatteryBackgroundImageDayAltText: mobile_day_bg_image_alt,
        pdpBatteryBackgroundImageNight: `${imagePath}${mobile_night_bg_image}`,
        pdpBatteryBackgroundImageNightAltText: mobile_night_bg_image_alt
      });
    } else if (isTablet) {
      this.setState({
        pdpBatteryBackgroundImageDay: tablet_day_bg_image
          ? `${imagePath}${tablet_day_bg_image}`
          : `${imagePath}${desktop_day_bg_image}`,
        pdpBatteryBackgroundImageDayAltText: tablet_day_bg_image_alt
          ? tablet_day_bg_image_alt
          : desktop_day_bg_image_alt,
        pdpBatteryBackgroundImageNight: tablet_night_bg_image
          ? `${imagePath}${tablet_night_bg_image}`
          : `${imagePath}${desktop_night_bg_image}`,
        pdpBatteryBackgroundImageNightAltText: tablet_night_bg_image_alt
          ? tablet_night_bg_image_alt
          : desktop_night_bg_image_alt
      });
    } else if (isDesktop) {
      this.setState({
        pdpBatteryBackgroundImageDay: `${imagePath}${desktop_day_bg_image}`,
        pdpBatteryBackgroundImageDayAltText: desktop_day_bg_image_alt,
        pdpBatteryBackgroundImageNight: `${imagePath}${desktop_night_bg_image}`,
        pdpBatteryBackgroundImageNightAltText: desktop_night_bg_image_alt
      });
    } else {
      this.setState({
        pdpBatteryBackgroundImageDay: `${imagePath}${desktop_day_bg_image}`,
        pdpBatteryBackgroundImageDayAltText: desktop_day_bg_image_alt,
        pdpBatteryBackgroundImageNight: `${imagePath}${desktop_night_bg_image}`,
        pdpBatteryBackgroundImageNightAltText: desktop_night_bg_image_alt
      });
    }
  };

  render() {
    const { battery_title, battery_description } = this.props.data;

    const { indexProp } = this.props;

    return (
      <div className="pdp-battery-fade-in-jack">
        <div id={"pbfij-section-battery-" + indexProp} className="pbfij-section-battery">
          <div className="pbfij-section-one">
            <LazyLoad
              offset={100}
              once
              throttle={0}
              placeholder={<img className="pbfij-lazyload-default-img" src={imagePath + "Lazy-Load-Full-bleed-card.png"} alt="Lazyload Placeholder Image" />}>
              <img
                className="pbfij-bg-image-day"
                src={this.state.pdpBatteryBackgroundImageDay}
                alt={this.state.pdpBatteryBackgroundImageDayAltText}
              />
            </LazyLoad>
            <div className="pbfij-text-container">
              <div className="pbfij-title">{battery_title}</div>
              <div className="pbfij-desc">{battery_description}</div>
            </div>
          </div>
          <Controller>
            <Scene
              triggerHook={0.2}
              classToggle="fade-in-jack-effect"
              triggerElement={"#pbfij-section-battery-" + indexProp}
              reverse={true}
            >
              <div className="pbfij-section-two">
                <LazyLoad
                  offset={100}
                  once
                  throttle={0}
                  placeholder={<img className="pbfij-lazyload-default-img" src={imagePath + "Lazy-Load-Full-bleed-card.png"} alt="Lazyload Placeholder Image" />}>
                  <img
                    className="pbfij-bg-image-night"
                    src={this.state.pdpBatteryBackgroundImageNight}
                    alt={this.state.pdpBatteryBackgroundImageNightAltText}
                  />
                </LazyLoad>
                <div className="pbfij-text-container">
                  <div className="pbfij-title">{battery_title}</div>
                  <div className="pbfij-desc">{battery_description}</div>
                </div>
              </div>
            </Scene>
          </Controller>
        </div>
      </div>
    );
  }
}

export default PdpBatteryFadeInJackCard;
