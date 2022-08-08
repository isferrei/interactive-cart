import React, { Component } from "react";
import ReactPlayer from "react-player";
import $ from "jquery";
import CTA from "../ComponentRenderer/components/CTA";
import { imageAccountPath } from "../ComponentRenderer/common/js/globalConstants";
import {
  handleResize,
  debounce
} from "../ComponentRenderer/common/js/deviceDetection";
import "./drawerCard.global.css";
import Innersection from "./Innersection";

class DrawerCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      checkDevice: handleResize(),
      drawerCardFlag: false,
      isInView: false
    };
  }
  componentDidMount() {
    if (document.getElementById("dc-vimeo-videoid")) {
      window.addEventListener("scroll", this.isInViewport);
    }
  }
  isInViewport = () => {
    let scroll = window.scrollY || window.pageYOffset;
    let elementTop =
      document.getElementById("dc-vimeo-videoid").getBoundingClientRect().top +
      scroll +
      100;
    let elementBottom =
      elementTop +
      document.getElementById("dc-vimeo-videoid").getBoundingClientRect()
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
  static schema = {
    title: "Drawer Card",
    description: "Drawer Card",
    type: "object",
    properties: {
      showdrawerCard: {
        type: "boolean",
        title: "Show Drawer Card",
        default: false
      },
      drawerCardVideo: {
        description: "Drawer Card video",
        type: "string",
        title: "Drawer Card video"
      },
      drawerCardVideoAlignment: {
        enum: ["left", "right"],
        enumNames: ["Left", "Right"],
        default: "left",
        type: "string",
        title: "video Alignment Desktop/Tablet",
        description: "video Alignment Desktop/Tablet",
        widget: {
          "ui:widget": "select"
        }
      },
      drawerCardHeadline: {
        type: "string",
        title: "Drawer Card headline",
        description: "Drawer Card headline"
      },
      drawerCardBody: {
        type: "string",
        title: "Drawer Card description",
        description: "Drawer Card description",
        widget: {
          "ui:widget": "textarea"
        }
      },
      drawerCardCTALabel: {
        type: "string",
        title: "Drawer Card CTA  text label",
        description: "Enter the label for Drawer Card CTA"
      },
      drawerCardInnerSectionCloseIconAltText: {
        type: "string",
        title: "Drawer card inner section close icon alt text",
        description: "Enter the Drawer card inner section close icon alt text"
      },
      drawerCarditems: {
        items: {
          title: "Drawer Card items",
          type: "object",
          properties: {
            drawerCardInnerDesktopImage: {
              description: "Drawer Card inner image for Desktop",
              title: "Drawer Card inner image for Desktop",
              type: "string",
              widget: {
                "ui:widget": "image-uploader"
              }
            },
            drawerCardInnerDesktopImageAltText: {
              type: "string",
              title: "Drawer Card inner image for Desktop alt text",
              description: "Enter the Drawer Card inner image for Desktop alt text"
            },
            drawerCardInnerTabletImage: {
              description: "Drawer Card inner image for Tablet",
              title: "Drawer Card inner image for Tablet",
              type: "string",
              widget: {
                "ui:widget": "image-uploader"
              }
            },
            drawerCardInnerTabletImageAltText: {
              type: "string",
              title: "Drawer Card inner image for Tablet alt text",
              description: "Enter the Drawer Card inner image for Tablet alt text"
            },
            drawerCardInnerMobileImage: {
              description: "Drawer Card inner image for Mobile",
              title: "Drawer Card inner image for Mobile",
              type: "string",
              widget: {
                "ui:widget": "image-uploader"
              }
            },
            drawerCardInnerMobileImageAltText: {
              type: "string",
              title: "Drawer Card inner image for Mobile alt text",
              description: "Enter the Drawer Card inner image for Mobile alt text"
            },
            drawerCardInnerContentPosition: {
              enum: ["left", "right", "center"],
              enumNames: ["Left", "Right", "center"],
              default: "left",
              type: "string",
              title: "Drawer content Horizontal Alignment Desktop/Tablet",
              description: "Drawer content Horizontal Alignment Desktop/Tablet",
              widget: {
                "ui:widget": "select"
              }
            },
            drawerCardInnerContentVerticalPosition: {
              enum: ["top", "bottom", "center"],
              enumNames: ["top", "bottom", "center"],
              default: "center",
              type: "string",
              title: "Drawer content Vertical Alignment Desktop/Tablet",
              description: "Drawer content Vertical Alignment Desktop/Tablet",
              widget: {
                "ui:widget": "select"
              }
            },
            drawerCardInnerheadline: {
              description: "Drawer Card inner section head line",
              title: "Drawer Card inner section head line",
              type: "string"
            },
            drawerCardInnerBody: {
              description: "Drawer Card inner section body",
              title: "Drawer Card inner section body",
              type: "string",
              widget: {
                "ui:widget": "textarea"
              }
            }
          }
        },
        minItems: 1,
        title: "Drawer Card items",
        type: "array"
      }
    }
  };
  drawerCardInnerSectionDisplay = () => {
    this.setState({ drawerCardFlag: true }, () => {
      $("html, body").animate(
        {
          scrollTop: $("#dc-inner-drawregion").offset().top - 60
        },
        500
      );
    });
  };

  drawerCardInnerSectionClose = () => {
    $("html, body").animate(
      {
        scrollTop: $("#drawer-card-wrapper").offset().top - 60
      },
      500
    );
    this.setState({ drawerCardFlag: false });
  };
  render() {
    const {
      drawerCardVideo,
      drawerCardHeadline,
      drawerCardBody,
      drawerCardVideoAlignment,
      drawerCardCTALabel,
      drawerCarditems,
      showdrawerCard,
      drawerCardInnerSectionCloseIconAltText
    } = this.props;

    const { drawerCardFlag, isInView } = this.state;

    if (!showdrawerCard) {
      return null;
    }
    let drawerCardStyle = {
      display: drawerCardFlag ? "block" : "none"
    };
    return (
      <div id="drawer-card-wrapper" className="drawer-card-wrapper">
        <div
          className="dc-card-main-section"
          style={
            drawerCardVideoAlignment == "right"
              ? { flexDirection: "row-reverse" }
              : null
          }
        >
          <div className="dc-video-section col-md-6 col-sm-12 col-xs-12">
            <ReactPlayer
              id="dc-vimeo-videoid"
              className="dc-react-player"
              url={drawerCardVideo}
              frameBorder="0"
              playsinline={true}
              controls={false}
              muted={true}
              autoPlay={true}
              loop={true}
              height="100%"
              width="100%"
              playing={isInView ? true : false}
            />
          </div>
          <div className="dc-content-section col-md-6 col-sm-12 col-xs-12">
            <div className="dc-content-layer">
              <div className="dc-headline">{drawerCardHeadline}</div>
              <div
                className="dc-content"
                dangerouslySetInnerHTML={{
                  __html: drawerCardBody
                }}
              />
              <div className="dc-cta">
                <CTA
                  ctaHoverBackgroundColor="ffffff"
                  ctaBackgroundColor="ffffff"
                  ctaHoverOpacity="0"
                  ctaOpacity="0"
                  ctaHoverBorderColor="ffffff"
                  ctaBorderColor="ffffff"
                  ctaHoverTextColor="ffffff"
                  ctaTextColor="ffffff"
                  ctaText={drawerCardCTALabel}
                  ctaLink={"#dc-inner-drawregion"}
                  click={this.drawerCardInnerSectionDisplay}
                />
              </div>
            </div>
          </div>
        </div>
        <div
          id="dc-inner-drawregion"
          className="dc-inner-sections"
          style={drawerCardStyle}
        >
          {drawerCarditems &&
            drawerCarditems.length > 0 &&
            drawerCarditems.map((section, key) => (
              <Innersection
                key={key}
                {...section}
                id={key}
                ref="drawerCarditems"
              ></Innersection>
            ))}
          <div className="dc-inner-section-close">
            <span className="dc-inner-section-close-icon">
              <img
                src={`${imageAccountPath}close-icon-light.svg`}
                onClick={() => this.drawerCardInnerSectionClose()}
                alt={drawerCardInnerSectionCloseIconAltText}
              />
            </span>
          </div>
        </div>
      </div>
    );
  }
}

export default DrawerCard;
