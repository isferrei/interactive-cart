import React, { Component } from "react";
import {
  handleResize,
  debounce
} from "../ComponentRenderer/common/js/deviceDetection";
import "./pdpProcessorFullBleedOdyssey.global.css";
import { Controller, Scene } from "react-scrollmagic";

class PdpProcessorFullBleedOdyssey extends Component {
  constructor(props) {
    super(props);
    this.state = {
      checkDevice: handleResize(),
      pdpProcessorBgImage: "",
      pdpProcessorBgImageAltText: "",
      displayText: false,
      titleFontSize: "30px"
    };
    this.imgRef = React.createRef();
  }

  componentDidMount() {
    this.setState({ checkDevice: handleResize() });
    window.addEventListener(
      "resize",
      debounce(() => {
        this.setState({ checkDevice: handleResize() });
        this.detectPdpProcessorBgImageAndOutlineFontSize();
      }, 500)
    );

    this.detectPdpProcessorBgImageAndOutlineFontSize();
    this.setDisplayText();
  }

  setDisplayText = () => {
    if (typeof this.imgRef !== "undefined" && this.imgRef.current) {
      this.setState({ displayText: true });
    } else {
      setTimeout(this.setDisplayText, 1000);
    }
  };

  static schema = {
    title: "Pdp Processor Full Bleed",
    description: "5G Pdp Processor",
    type: "object",
    properties: {
      showPdpProcessor: {
        type: "boolean",
        title: "Show Pdp Processor",
        default: false
      },
      bgColor: {
        type: "string",
        title: "Pdp Processor background color"
      },
      bgImageDesktop: {
        type: "string",
        title: "Desktop Pdp Processor background image",
        widget: {
          "ui:widget": "image-uploader"
        }
      },
      bgImageDesktopAltText: {
        type: "string",
        title: "Desktop Pdp Processor background image alt text",
        description: "Enter the Desktop Pdp Processor background image alt text"
      },
      bgImageTablet: {
        type: "string",
        title: "Tablet Pdp Processor background image",
        widget: {
          "ui:widget": "image-uploader"
        }
      },
      bgImageTabletAltText: {
        type: "string",
        title: "Tablet Pdp Processor background image alt text",
        description: "Enter the Tablet Pdp Processor background image alt text"
      },
      bgImageMobile: {
        type: "string",
        title: "Mobile Pdp Processor background image",
        widget: {
          "ui:widget": "image-uploader"
        }
      },
      bgImageMobileAltText: {
        type: "string",
        title: "Mobile Pdp Processor background image alt text",
        description: "Enter the Mobile Pdp Processor background image alt text"
      },
      titleText: {
        type: "string",
        title: "PDP Processor title",
        widget: {
          "ui:widget": "textarea"
        }
      },
      titleTextOutline: {
        enum: ["yes", "no"],
        enumNames: ["Yes", "No"],
        default: "no",
        type: "string",
        title: "Title text outline",
        description: "If title text to be outlined",
        widget: {
          "ui:widget": "select"
        }
      },
      titleTextOutlineFontSizeDesktop: {
        type: "string",
        title: "Title text outline font size Desktop"
      },
      titleTextOutlineFontSizeTablet: {
        type: "string",
        title: "Title text outline font size Tablet"
      },
      titleTextOutlineFontSizeMobile: {
        type: "string",
        title: "Title text outline font size Mobile"
      },
      descText: {
        type: "string",
        title: "PDP Processor description",
        widget: {
          "ui:widget": "textarea"
        }
      },
      textAlignmentDesktop: {
        enum: ["left", "right"],
        enumNames: ["Left", "Right"],
        default: "left",
        type: "string",
        title: "Text Alignment Desktop/Tablet",
        description: "Text Alignment Desktop/Tablet",
        widget: {
          "ui:widget": "select"
        }
      }
    }
  };

  detectPdpProcessorBgImageAndOutlineFontSize = () => {
    const {
      checkDevice: { isMobile, isTablet, isDesktop }
    } = this.state;
    if (isMobile) {
      this.setState({
        pdpProcessorBgImage: this.props.bgImageMobile,
        pdpProcessorBgImageAltText: this.props.bgImageMobileAltText,
        titleFontSize:
          this.props.titleTextOutline == "yes" &&
          this.props.titleTextOutlineFontSizeMobile
            ? this.props.titleTextOutlineFontSizeMobile + "px"
            : ((this.props.titleTextOutline == "no") ? "18px" : this.state.titleFontSize)
      });
    } else if (isTablet) {
      this.setState({
        pdpProcessorBgImage: this.props.bgImageTablet
          ? this.props.bgImageTablet
          : this.props.bgImageDesktop,
        pdpProcessorBgImageAltText: this.props.bgImageTabletAltText
          ? this.props.bgImageTabletAltText
          : this.props.bgImageDesktopAltText,
        titleFontSize:
          this.props.titleTextOutline == "yes" &&
          this.props.titleTextOutlineFontSizeTablet
            ? this.props.titleTextOutlineFontSizeTablet + "px"
            : this.state.titleFontSize
      });
    } else if (isDesktop) {
      this.setState({
        pdpProcessorBgImage: this.props.bgImageDesktop,
        pdpProcessorBgImageAltText: this.props.bgImageDesktopAltText,
        titleFontSize:
          this.props.titleTextOutline == "yes" &&
          this.props.titleTextOutlineFontSizeDesktop
            ? this.props.titleTextOutlineFontSizeDesktop + "px"
            : this.state.titleFontSize
      });
    } else {
      this.setState({
        pdpProcessorBgImage: this.props.bgImageDesktop,
        pdpProcessorBgImageAltText: this.props.bgImageDesktopAltText,
        titleFontSize:
          this.props.titleTextOutline == "yes" &&
          this.props.titleTextOutlineFontSizeDesktop
            ? this.props.titleTextOutlineFontSizeDesktop + "px"
            : this.state.titleFontSize
      });
    }
  };

  render() {
    const {
      showPdpProcessor,
      bgColor,
      titleText,
      titleTextOutline,
      descText,
      textAlignmentDesktop
    } = this.props;

    let bgImageAlignmentDesktop;
    if (textAlignmentDesktop) {
      if (textAlignmentDesktop === "left") {
        bgImageAlignmentDesktop = "right";
      } else {
        bgImageAlignmentDesktop = "left";
      }
    }

    if (!showPdpProcessor) {
      return null;
    }

    return (
      <div
        className="pdp-processor-odyssey"
        style={{
          backgroundColor: "#" + bgColor
        }}
      >
        <div
          className={"ppo-image-layer " + bgImageAlignmentDesktop + "-aligned"}
        >
          <Controller>
            <Scene
              triggerHook={0.8}
              classToggle="zoom-in-effect"
              triggerElement=".ppo-image-layer"
              reverse={true}
            >
              <div className="ppo-img-wrap">
                <img
                  src={this.state.pdpProcessorBgImage}
                  ref={this.imgRef}
                  alt={this.state.pdpProcessorBgImageAltText}
                />
              </div>
            </Scene>
          </Controller>
        </div>
        <div className="ppo-text-layer">
          {this.state.displayText ? (
            <div className="ppo-text-container">
              <div
                className={
                  "ppo-text-content " + textAlignmentDesktop + "-aligned"
                }
              >
                <div className="ppo-center-vertical">
                  <div
                    className={"ppo-title " + titleTextOutline}
                    style={{
                      fontSize: this.state.titleFontSize
                    }}
                  >
                    {titleText}
                  </div>
                  <div className="ppo-desc">{descText}</div>
                </div>
              </div>
            </div>
          ) : null}
        </div>
      </div>
    );
  }
}

export default PdpProcessorFullBleedOdyssey;
