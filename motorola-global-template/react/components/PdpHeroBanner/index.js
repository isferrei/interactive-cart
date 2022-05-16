import React, { Component } from "react";
import ReactPlayer from "react-player";
import CTA from "../ComponentRenderer/components/CTA";
import {
  handleResize,
  debounce
} from "../ComponentRenderer/common/js/deviceDetection";
import "./pdpHeroBanner.global.css";

class PdpHeroBanner extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isMobile: false,
      loadingComplete: false,
      isInView: false
    };
  }

  componentDidMount() {
    this.setState({
      loadingComplete: false
    });
    this.findViewPort();
    window.addEventListener("resize", this.findViewPort);
    window.addEventListener("scroll", this.isInViewport);
  }

  findViewPort = () => {
    this.setState({ isMobile: handleResize().isMobile }, () => {
      this.setState({ loadingComplete: true });
    });
  };
  isInViewport = () => {
    let scroll = window.scrollY || window.pageYOffset;
    let elementTop =
      document.getElementById("phb-react-player").getBoundingClientRect().top +
      scroll +
      100;
    let elementBottom =
      elementTop +
      document.getElementById("phb-react-player").getBoundingClientRect()
        .bottom -
      100;
    let viewportTop = scroll;
    let viewportBottom = scroll + window.innerHeight;
    this.setState({
      isInView:
        (elementTop <= viewportBottom && elementTop >= viewportTop) ||
        (elementBottom <= viewportBottom && elementBottom >= viewportTop)
    });
  };

  componentWillUnmount() {
    window.removeEventListener("resize", this.findViewPort);
    window.removeEventListener("scroll", this.isInViewport);
  }

  handleResize = () => {
    this.setState(
      {
        isMobile: window.screen.width < 768 ? true : false,
        isDesktop: window.screen.width >= 992 ? true : false,
        isTablet:
          window.screen.width >= 768 && window.screen.width < 992 ? true : false
      },
      () => {
        this.detectVideoSize();
      }
    );
  };

  detectVideoSize = () => {
    const { isMobile, isTablet, isDesktop } = this.state;
  };
  static schema = {
    title: "PDP Hero Banner",
    description: "PDP Hero Banner",
    type: "object",
    properties: {
      showPdpHeroBanner: {
        type: "boolean",
        title: "Show Pdp Hero Banner",
        default: false
      },
      pdpHeroBannerDesktopLogo: {
        type: "string",
        title: "PDP Hero Banner Desktop Logo",
        widget: {
          "ui:widget": "image-uploader"
        }
      },
      pdpHeroBannerMobileLogo: {
        type: "string",
        title: "PDP Hero Banner Mobile Logo",
        widget: {
          "ui:widget": "image-uploader"
        }
      },
      pdpHeroBannerTabletLogo: {
        type: "string",
        title: "PDP Hero Banner Tablet Logo",
        widget: {
          "ui:widget": "image-uploader"
        }
      },
      pdpHeroBannerDesktopVideoLink: {
        type: "string",
        title: "PDP Hero Banner Desktop Video Link"
      },
      pdpHeroBannerMobileVideoLink: {
        type: "string",
        title: "PDP Hero Banner Mobile Video Link"
      },
      pdpHeroBannerTabletVideoLink: {
        type: "string",
        title: "PDP Hero Banner Tablet Video Link"
      },
      pdpHeroBannerLogoAlt: {
        type: "string",
        title: "PDP Hero Banner Logo Alt"
      },
      pdpHeroBannerTitle: {
        type: "string",
        title: "PDP Hero Banner Title"
      },
      pdpHeroBannerCTALabel: {
        type: "string",
        title: "pdpHeroBanner CTA  text label",
        description: "Enter the label for pdpHeroBanner CTA"
      },
      pdpHeroBannerCTALink: {
        type: "string",
        title: "pdpHeroBanner CTA  link",
        description: "Enter the link for pdpHeroBanner CTA "
      },
      openCTAInNewTab: {
        type: "boolean",
        title: "Open in new tab for pdpHeroBanner CTA",
        default: false
      }
    }
  };
  render() {
    const {
      showPdpHeroBanner,
      pdpHeroBannerDesktopLogo,
      pdpHeroBannerMobileLogo,
      pdpHeroBannerTabletLogo,
      pdpHeroBannerDesktopVideoLink,
      pdpHeroBannerMobileVideoLink,
      pdpHeroBannerTabletVideoLink,
      pdpHeroBannerLogoAlt,
      pdpHeroBannerTitle,
      pdpHeroBannerCTALabel,
      pdpHeroBannerCTALink,
      openCTAInNewTab
    } = this.props;

    if (!showPdpHeroBanner) {
      return null;
    }
    return (
      <div className="pdp-hero-banner">
        <div className="phb-video-container">
          <ReactPlayer
            id="phb-react-player"
            className="phb-react-player"
            url={
              this.state.isMobile
                ? pdpHeroBannerMobileVideoLink
                : pdpHeroBannerDesktopVideoLink
            }
            frameBorder="0"
            playsinline={true}
            controls={true}
            muted={false}
            loop={true}
            height="100%"
            width="100%"
            playing={this.state.isInView}
            config={{
              file: {
                attributes: {
                  preload: "none"
                }
              }
            }}
          />
        </div>
        {this.state.loadingComplete && (
          <>
            <div
              className={`phb-container${this.state.isMobile ? "-mobile" : ""}`}
            >
              <div>
                <img
                  className="phb-logo-img"
                  src={pdpHeroBannerDesktopLogo}
                  alt={pdpHeroBannerLogoAlt}
                ></img>
              </div>

              <h1 className="phb-title">{pdpHeroBannerTitle}</h1>
              <div className="phb-cta">
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
                  ctaText={pdpHeroBannerCTALabel}
                  ctaLink={pdpHeroBannerCTALink}
                />
              </div>
            </div>
          </>
        )}
      </div>
    );
  }
}

export default PdpHeroBanner;
