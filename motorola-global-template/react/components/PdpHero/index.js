import React, { Component } from "react";
import {
  handleResize,
  debounce
} from "../ComponentRenderer/common/js/deviceDetection";
import "./pdpHero.global.css";
import CTA from "../ComponentRenderer/components/CTA";

class PdpHero extends Component {
  constructor(props) {
    super(props);
    this.state = {
      checkDevice: handleResize(),
      pdpheroBackgroundImage: "",
      pdpheroBackgroundImageAltText: "",
      pdpheroImage: "",
      pdpheroImageAltText: "",
      pdpheroLogo: "",
      pdpheroLogoAltText: "",
      sectionone: false,
      sectiontwo: false,
      sectionthree: false
    };
  }

  componentDidMount() {
    this.setState({ checkDevice: handleResize() });
    window.addEventListener(
      "resize",
      debounce(() => {
        this.setState({ checkDevice: handleResize() });
        this.detectPdpBgImage();
      }, 500)
    );
    this.detectPdpBgImage();
    setTimeout(() => {
      this.setState({ sectionone: true });
    }, 1000);
    setTimeout(() => {
      this.setState({ sectiontwo: true });
    }, 2000);
    setTimeout(() => {
      this.setState({ sectionthree: true });
    }, 3000);
  }
  static schema = {
    title: "PDP Hero",
    description: "PDP Hero",
    type: "object",
    properties: {
      showPdpHero: {
        type: "boolean",
        title: "Show Pdp Hero",
        default: false
      },
      bgImageDesktop: {
        type: "string",
        title: "Desktop/tablet PDP hero background image",
        widget: {
          "ui:widget": "image-uploader"
        }
      },
      bgImageDesktopAltText: {
        type: "string",
        title: "Desktop/tablet PDP hero background image alt text",
        description: "Enter the Desktop/tablet PDP hero background image alt text"
      },
      bgImageMobile: {
        type: "string",
        title: "Mobile PDP hero background image",
        widget: {
          "ui:widget": "image-uploader"
        }
      },
      bgImageMobileAltText: {
        type: "string",
        title: "Mobile PDP hero background image alt text",
        description: "Enter the Mobile PDP hero background image alt text"
      },
      heroImageDesktop: {
        type: "string",
        title: "Desktop PDP hero image",
        widget: {
          "ui:widget": "image-uploader"
        }
      },
      heroImageDesktopAltText: {
        type: "string",
        title: "Desktop PDP hero image alt text",
        description: "Enter the Desktop PDP hero image alt text"
      },
      heroImageMobile: {
        type: "string",
        title: "Mobile PDP hero image",
        widget: {
          "ui:widget": "image-uploader"
        }
      },
      heroImageMobileAltText: {
        type: "string",
        title: "Mobile PDP hero image alt text",
        description: "Enter the Mobile PDP hero image alt text"
      },
      desktopLogo: {
        type: "string",
        title: "Desktop Logo",
        widget: {
          "ui:widget": "image-uploader"
        }
      },
      desktopLogoAltText: {
        type: "string",
        title: "Desktop Logo alt text",
        description: "Enter the Desktop Logo alt text"
      },
      mobileLogo: {
        type: "string",
        title: "Mobile Logo",
        widget: {
          "ui:widget": "image-uploader"
        }
      },
      mobileLogoAltText: {
        type: "string",
        title: "Mobile Logo alt text",
        description: "Enter the Mobile Logo alt text"
      },
      tabletLogo: {
        type: "string",
        title: "Tablet Logo",
        widget: {
          "ui:widget": "image-uploader"
        }
      },
      tabletLogoAltText: {
        type: "string",
        title: "Tablet Logo alt text",
        description: "Enter the Tablet Logo alt text"
      },
      pdpHeroText: {
        type: "string",
        title: "PDP Hero description",
        widget: {
          "ui:widget": "textarea"
        }
      },
      pdpHeroCTALabel: {
        type: "string",
        title: "pdphero CTA  text label",
        description: "Enter the label for pdphero CTA"
      },
      pdpHeroCTALink: {
        type: "string",
        title: "pdphero CTA  link",
        description: "Enter the link for pdphero CTA "
      },
      openCTAInNewTab: {
        type: "boolean",
        title: "Open in new tab for pdphero CTA",
        default: false
      }
    }
  };

  detectPdpBgImage = () => {
    const {
      checkDevice: { isMobile, isTablet }
    } = this.state;
    if (isMobile) {
      this.setState({
        pdpheroBackgroundImage: this.props.bgImageMobile,
        pdpheroBackgroundImageAltText: this.props.bgImageMobileAltText,
        pdpheroLogo: this.props.mobileLogo,
        pdpheroLogoAltText: this.props.mobileLogoAltText,
        pdpheroImage: this.props.heroImageMobile,
        pdpheroImageAltText: this.props.heroImageMobileAltText
      });
    } else if (isTablet) {
      this.setState({
        pdpheroBackgroundImage: this.props.bgImageDesktop,
        pdpheroBackgroundImageAltText: this.props.bgImageDesktopAltText,
        pdpheroLogo: this.props.desktopLogo,
        pdpheroLogoAltText: this.props.desktopLogoAltText,
        pdpheroImage: this.props.heroImageDesktop,
        pdpheroImageAltText: this.props.heroImageDesktopAltText
      });
    } else {
      this.setState({
        pdpheroBackgroundImage: this.props.bgImageDesktop,
        pdpheroBackgroundImageAltText: this.props.bgImageDesktopAltText,
        pdpheroLogo: this.props.desktopLogo,
        pdpheroLogoAltText: this.props.desktopLogoAltText,
        pdpheroImage: this.props.heroImageDesktop,
        pdpheroImageAltText: this.props.heroImageDesktopAltText
      });
    }
  };
  render() {
    const {
      pdpHeroCTALabel,
      pdpHeroCTALink,
      openCTAInNewTab,
      showPdpHero,
      pdpHeroText
    } = this.props;

    if (!showPdpHero) {
      return null;
    }
    return (
      <div className="pdp-hero">
        <img
          className="ph-bg"
          src={this.state.pdpheroBackgroundImage}
          alt={this.state.pdpheroBackgroundImageAltText} />
        <div className="ph-animation-section">
          <img
            className={`ph-logo no-visible ${
              this.state.sectionone ? "ph-animation-logo" : ""
            }`}
            src={this.state.pdpheroLogo}
            alt={this.state.pdpheroLogoAltText}
          />
          <img
            className={`ph-mobile no-visible ${
              this.state.sectiontwo ? "ph-animation" : ""
            }`}
            src={this.state.pdpheroImage}
            alt={this.state.pdpheroImageAltText}
          />
          <div
            className={`no-visible ${
              this.state.sectionthree ? "ph-animation" : ""
            }`}
          >
            <div
              className="ph-content"
              dangerouslySetInnerHTML={{
                __html: pdpHeroText
              }}
            />
            <div className="ph-cta">
              <CTA
                ctaHoverBackgroundColor="ffffff"
                ctaBackgroundColor="ffffff"
                ctaHoverOpacity="0"
                ctaOpacity="0"
                ctaHoverBorderColor="ffffff"
                ctaBorderColor="ffffff"
                ctaHoverTextColor="ffffff"
                ctaTextColor="ffffff"
                ctaAnchorTarget={openCTAInNewTab ? "1" : "0"}
                ctaText={pdpHeroCTALabel}
                ctaLink={pdpHeroCTALink}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default PdpHero;
