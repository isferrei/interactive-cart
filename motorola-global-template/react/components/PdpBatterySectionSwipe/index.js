import React, { Component } from "react";
import {
  handleResize,
  debounce
} from "../ComponentRenderer/common/js/deviceDetection";
import "./PdpBatterySectionSwipe.global.css";
import pdpBatteryOnScrollRespond from "./pdpBatteryHelper";
import { offsetVal } from "./pdpBatteryHelperMethods";

class PdpBatterySectionSwipe extends Component {
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

    offsetValue = offsetVal();

    pdpBatteryOnScrollRespond.exec(offsetValue);
  }

  setDisplayText = () => {
    if (typeof this.imgRef !== "undefined" && this.imgRef.current) {
      this.setState({ displayText: true });
    } else {
      setTimeout(this.setDisplayText, 1000);
    }
  };

  static schema = {
    title: "Pdp Battery",
    description: "Pdp Battery Section Swipe",
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
      titleTextDay: {
        type: "string",
        title: "Day: PDP Battery title",
        widget: {
          "ui:widget": "textarea"
        }
      },
      descTextDay: {
        type: "string",
        title: "Day: PDP Battery description",
        widget: {
          "ui:widget": "textarea"
        }
      },
      titleTextNight: {
        type: "string",
        title: "Night: PDP Battery title",
        widget: {
          "ui:widget": "textarea"
        }
      },
      descTextNight: {
        type: "string",
        title: "Night: PDP Battery description",
        widget: {
          "ui:widget": "textarea"
        }
      }
    }
  };

  detectPdpBatteryBgImage = () => {
    const { checkDevice: { isMobile, isTablet, isDesktop } } = this.state;
    if (isMobile) {
      this.setState({
        pdpBatteryBackgroundImageDay: this.props.bgImageMobileDay,
        pdpBatteryBackgroundImageDayAltText: this.props.bgImageMobileDayAltText,
        pdpBatteryBackgroundImageNight: this.props.bgImageMobileNight,
        pdpBatteryBackgroundImageNightAltText: this.props.bgImageMobileNightAltText
      });
    } else if (isTablet) {
        this.setState({
          pdpBatteryBackgroundImageDay: this.props.bgImageTabletDay ? this.props.bgImageTabletDay : this.props.bgImageDesktopDay,
          pdpBatteryBackgroundImageDayAltText: this.props.bgImageTabletDayAltText ? this.props.bgImageTabletDayAltText: this.props.bgImageDesktopDayAltText,
          pdpBatteryBackgroundImageNight: this.props.bgImageTabletNight ? this.props.bgImageTabletNight : this.props.bgImageDesktopNight,
          pdpBatteryBackgroundImageNightAltText: this.props.bgImageTabletNightAltText ? this.props.bgImageTabletNightAltText : this.props.bgImageDesktopNightAltText
        });
    } else if (isDesktop) {
      this.setState({
        pdpBatteryBackgroundImageDay: this.props.bgImageDesktopDay,
        pdpBatteryBackgroundImageDayAltText: this.props.bgImageDesktopDayAltText,
        pdpBatteryBackgroundImageNight: this.props.bgImageDesktopNight,
        pdpBatteryBackgroundImageNightAltText: this.props.bgImageDesktopNightAltText
      });
    }
    else {
      this.setState({
        pdpBatteryBackgroundImageDay: this.props.bgImageDesktopDay,
        pdpBatteryBackgroundImageDayAltText: this.props.bgImageDesktopDayAltText,
        pdpBatteryBackgroundImageNight: this.props.bgImageDesktopNight,
        pdpBatteryBackgroundImageNightAltText: this.props.bgImageDesktopNightAltText
      });
    }
  };

  render() {
    const {
        showPdpBattery,
        titleTextDay,
        descTextDay,
        titleTextNight,
        descTextNight
    } = this.props;

    if (!showPdpBattery) {
      return null;
    }

    return (
      <div className="pdp-battery-section-swipe">
        <section id="section-one" className="pbss-panel pbss-day-slide-wrapper">
          <img
            className="pbss-bg-image"
            src={this.state.pdpBatteryBackgroundImageDay}
            alt={this.state.pdpBatteryBackgroundImageDayAltText}
            ref={this.imgRef}
          />
          <div
            className="pbss-text-wrapper"
            style={{
              display: this.state.displayText ? 'block' : 'none'
            }}
          >
            <div className="pbss-title">{titleTextDay}</div>
            <div className="pbss-desc">{descTextDay}</div>
          </div>
        </section>
        <section id="section-two" className="pbss-panel pbss-night-slide-wrapper">
          <img
            className="pbss-bg-image"
            src={this.state.pdpBatteryBackgroundImageNight}
            alt={this.state.pdpBatteryBackgroundImageNightAltText}
            ref={this.imgRef}
          />
          <div
            className="pbss-text-wrapper"
            style={{
              display: this.state.displayText ? 'block' : 'none'
            }}
          >
            <div className="pbss-title">{titleTextNight}</div>
            <div className="pbss-desc">{descTextNight}</div>
          </div>
        </section>
      </div>
    );
  }
}

export default PdpBatterySectionSwipe;
