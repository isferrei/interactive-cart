import React, { Component } from "react";
import {
  handleResize,
  debounce
} from "../ComponentRenderer/common/js/deviceDetection";
import "./pdpBatteryFadeInJack.global.css";
import { Controller, Scene } from "react-scrollmagic";

class PdpBatteryFadeInJack extends Component {
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

  static schema = {
    title: "Pdp Battery Fade In Jack",
    description: "Pdp Battery Fade In Jack",
    type: "object",
    properties: {
      showPdpBattery: {
        type: "boolean",
        title: "Show Pdp Battery",
        default: false
      },
      bgImageDesktopDay: {
        type: "string",
        title: "Day: Desktop Pdp Battery background image",
        widget: {
          "ui:widget": "image-uploader"
        }
      },
      bgImageDesktopDayAltText: {
        type: "string",
        title: "Day: Desktop Pdp Battery background image alt text",
        description: "Enter the Day: Desktop Pdp Battery background image alt text"
      },
      bgImageDesktopNight: {
        type: "string",
        title: "Night: Desktop Pdp Battery background image",
        widget: {
          "ui:widget": "image-uploader"
        }
      },
      bgImageDesktopNightAltText: {
        type: "string",
        title: "Night: Desktop Pdp Battery background image alt text",
        description: "Enter the Night: Desktop Pdp Battery background image alt text"
      },
      bgImageTabletDay: {
        type: "string",
        title: "Day: Tablet Pdp Battery background image",
        widget: {
          "ui:widget": "image-uploader"
        }
      },
      bgImageTabletDayAltText: {
        type: "string",
        title: "Day: Tablet Pdp Battery background image alt text",
        description: "Enter the Day: Tablet Pdp Battery background image alt text"
      },
      bgImageTabletNight: {
        type: "string",
        title: "Night: Tablet Pdp Battery background image",
        widget: {
          "ui:widget": "image-uploader"
        }
      },
      bgImageTabletNightAltText: {
        type: "string",
        title: "Night: Tablet Pdp Battery background image alt text",
        description: "Enter the Night: Tablet Pdp Battery background image alt text"
      },
      bgImageMobileDay: {
        type: "string",
        title: "Day: Mobile Pdp Battery background image",
        widget: {
          "ui:widget": "image-uploader"
        }
      },
      bgImageMobileDayAltText: {
        type: "string",
        title: "Day: Mobile Pdp Battery background image alt text",
        description: "Enter the Day: Mobile Pdp Battery background image alt text"
      },
      bgImageMobileNight: {
        type: "string",
        title: "Night: Mobile Pdp Battery background image",
        widget: {
          "ui:widget": "image-uploader"
        }
      },
      bgImageMobileNightAltText: {
        type: "string",
        title: "Night: Mobile Pdp Battery background image alt text",
        description: "Enter the Night: Mobile Pdp Battery background image alt text"
      },
      titleText: {
        type: "string",
        title: "PDP Battery title",
        widget: {
          "ui:widget": "textarea"
        }
      },
      descText: {
        type: "string",
        title: "PDP Battery description",
        widget: {
          "ui:widget": "textarea"
        }
      }
    }
  };

  detectPdpBatteryBgImage = () => {
    const {
      checkDevice: { isMobile, isTablet, isDesktop }
    } = this.state;
    if (isMobile) {
      this.setState({
        pdpBatteryBackgroundImageDay: this.props.bgImageMobileDay,
        pdpBatteryBackgroundImageDayAltText: this.props.bgImageMobileDayAltText,
        pdpBatteryBackgroundImageNight: this.props.bgImageMobileNight,
        pdpBatteryBackgroundImageNightAltText: this.props.bgImageMobileNightAltText
      });
    } else if (isTablet) {
      this.setState({
        pdpBatteryBackgroundImageDay: this.props.bgImageTabletDay
          ? this.props.bgImageTabletDay
          : this.props.bgImageDesktopDay,
        pdpBatteryBackgroundImageDayAltText: this.props.bgImageTabletDayAltText ? this.props.bgImageTabletDayAltText : this.props.bgImageDesktopDayAltText,
        pdpBatteryBackgroundImageNight: this.props.bgImageTabletNight
          ? this.props.bgImageTabletNight
          : this.props.bgImageDesktopNight,
        pdpBatteryBackgroundImageNightAltText: this.props.bgImageTabletNightAltText ? this.props.bgImageTabletNightAltText : this.props.bgImageDesktopNightAltText
      });
    } else if (isDesktop) {
      this.setState({
        pdpBatteryBackgroundImageDay: this.props.bgImageDesktopDay,
        pdpBatteryBackgroundImageDayAltText: this.props.bgImageDesktopDayAltText,
        pdpBatteryBackgroundImageNight: this.props.bgImageDesktopNight,
        pdpBatteryBackgroundImageNightAltText: this.props.bgImageDesktopNightAltText
      });
    } else {
      this.setState({
        pdpBatteryBackgroundImageDay: this.props.bgImageDesktopDay,
        pdpBatteryBackgroundImageDayAltText: this.props.bgImageDesktopDayAltText,
        pdpBatteryBackgroundImageNight: this.props.bgImageDesktopNight,
        pdpBatteryBackgroundImageNightAltText: this.props.bgImageDesktopNightAltText
      });
    }
  };

  render() {
    const { showPdpBattery, titleText, descText } = this.props;

    if (!showPdpBattery) {
      return null;
    }

    return (
      <div className="pdp-battery-fade-in-jack">
        <div id="pbfij-section-battery">
          <div className="pbfij-section-one">
            <img
              className="pbfij-bg-image-day"
              src={this.state.pdpBatteryBackgroundImageDay}
              alt={this.state.pdpBatteryBackgroundImageDayAltText}
            />
            <div className="pbfij-text-container">
              <div className="pbfij-title">{titleText}</div>
              <div className="pbfij-desc">{descText}</div>
            </div>
          </div>
          <Controller>
            <Scene
              triggerHook={0.2}
              classToggle="fade-in-jack-effect"
              triggerElement="#pbfij-section-battery"
              reverse={true}
            >
              <div className="pbfij-section-two">
                <img
                  className="pbfij-bg-image-night"
                  src={this.state.pdpBatteryBackgroundImageNight}
                  alt={this.state.pdpBatteryBackgroundImageNightAltText}
                />
                <div className="pbfij-text-container">
                  <div className="pbfij-title">{titleText}</div>
                  <div className="pbfij-desc">{descText}</div>
                </div>
              </div>
            </Scene>
          </Controller>
        </div>
      </div>
    );
  }
}

export default PdpBatteryFadeInJack;
