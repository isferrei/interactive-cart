import React from "react";
import "./EmployeeSpotlight.global.css";
import {
  handleResize,
  debounce
} from "../ComponentRenderer/common/js/deviceDetection";

class EmployeeSpotlight extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      htmlBody: "",
      checkDevice: handleResize()
    };
  }

  static schema = {
    title: "Employee Spotlight Component",
    description: "Employee Spotlight Component content",
    type: "object",
    properties: {
      showEmployeeSpotlight: {
        type: "boolean",
        title: "Show Employee Spotlight Component toggle",
        default: false
      },
      bgImage: {
        type: "string",
        title: "Background image",
        widget: {
          "ui:widget": "image-uploader"
        }
      },
      mainTitle: {
        type: "string",
        title: "Header text",
        description:
          "Header text for Employee Spotlight Component"
      },
      descText: {
        type: "string",
        title: "Description Text",
        description: "Description Text"
      },
      ctaText: {
        type: "string",
        title: "CTA text",
        description: "CTA text"
      },
      imagePositioning: {
        enum: ["left", "right"],
        enumNames: ["Left", "Right"],
        default: "left",
        type: "string",
        title: "Image position",
        description: "Image positioning for the component",
        widget: {
          "ui:widget": "select"
        }
      },
      ctaLink: {
        type: "string",
        title: "CTA link",
        description: "Ex: https://www.google.com or, /example"
      },
    }
  };

  componentDidMount() {
    this.setState({ checkDevice: handleResize() });
    window.addEventListener(
      "resize",
      debounce(() => {
        this.setState({ checkDevice: handleResize() });
        this.generateHtml();
      }, 500)
    );
    this.generateHtml();
  }



  generateHtml = () => {
    const {
      checkDevice: { isMobile, isTablet, isDesktop, isWide }
    } = this.state;

    const {
      bgImage,
      mainTitle,
      descText,
      ctaText,
      imagePositioning,
      ctaLink
    } = this.props;

    if (isMobile || isTablet) {
      this.setState({
        htmlBody: (
          <a
            className="es-section-body"
            href={ctaLink}
            target="_self"
          >
            <div className="es-section-image">
              <img
                className="es-cover-image"
                src={bgImage}
                alt={mainTitle ? mainTitle : "employee-session-image"}
              />
            </div>
            <div className="es-section-text">
              <div className="es-section-header">
                {mainTitle ? mainTitle : ""}
              </div>
              <div className="es-desc">
                {descText ? descText : ""}
              </div>
            </div>
          </a>
        )
      });
    } else if (isDesktop || isWide) {
      this.setState({
        htmlBody: (
          <div
            className="es-section-body"
            style={{
              flexDirection: imagePositioning == "left" ? "row-reverse" : "row"
            }}
          >
            <div className="es-section-text">
              <div className="es-section-header">
                {mainTitle ? mainTitle : ""}
              </div>
              <div className="es-desc">
                {descText ? descText : ""}
              </div>
              <a
                className="es-cta-text"
                href={ctaLink}
                target="_self"
              >
                {ctaText ? ctaText : ""}
              </a>
            </div>

            <div className="es-section-image">
              <img
                className="es-cover-image"
                src={bgImage}
                alt={mainTitle ? mainTitle : "employee-session-image"}
              />
            </div>
          </div>
        )
      });
    }
  };

  render() {
    const {
      showEmployeeSpotlight
    } = this.props;

    if (!showEmployeeSpotlight) {
      return null;
    }

    return (
      <React.Fragment>
        <div className="employee-spotlight">
          <div className="es-content">
            {this.state.htmlBody}
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default EmployeeSpotlight;
