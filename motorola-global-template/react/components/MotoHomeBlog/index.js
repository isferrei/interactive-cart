import React, { Component } from "react";
import CTA from "../ComponentRenderer/components/CTA";

import {
  handleResize,
  debounce
} from "../ComponentRenderer/common/js/deviceDetection";
import "./motoHomeBlog.global.css";

class MotoHomeBlog extends Component {
  constructor(props) {
    super(props);
    this.state = {
      checkDevice: handleResize()
    };
  }
  componentDidMount() {
    this.setState({ checkDevice: handleResize() });
    window.addEventListener(
      "resize",
      debounce(() => {
        this.setState({ checkDevice: handleResize() });
        this.detectMotoHomeBlogImage();
      }, 500)
    );
    this.detectMotoHomeBlogImage();
  }
  static schema = {
    title: "Motorola Homepage Blog",
    description: "Motorola Homepage Blog",
    type: "object",
    properties: {
      showmotoHomeBlog: {
        type: "boolean",
        title: "Motorola Homepage Blog",
        default: false
      },
      motoHomeBlogFirstTargetURL: {
        title: "Target URL for the first blog",
        type: "string"
      },
      motoHomeBlogFirstOpenInNewTab: {
        type: "boolean",
        title: "Open first blog in new tab",
        default: false
      },
      motoHomeBlogImageAltTextFirst: {
        type: "string",
        title: "Section First Moto Home blog  image alt text",
        description: "Enter the Alt text for Moto Home blog image"
      },
      motoHomeBlogDesktopImageFirst: {
        description: "Section First Moto Home blog image for Tablet landscape",
        title: "Section First Moto Home blog image for Tablet landscape",
        type: "string",
        widget: {
          "ui:widget": "image-uploader"
        }
      },
      motoHomeBlogTabletImageFirst: {
        description: "Section First Moto Home blog image for Tablet portrait",
        title: "Section First Moto Home blog image for Tablet portrait",
        type: "string",
        widget: {
          "ui:widget": "image-uploader"
        }
      },
      motoHomeBlogTabletlandscapeImageFirst: {
        description: "Section First Moto Home blog image for Desktop",
        title: "Section First Moto Home blog image for Desktop",
        type: "string",
        widget: {
          "ui:widget": "image-uploader"
        }
      },
      motoHomeBlogMobileImageFirst: {
        description: "Section First Moto Home blog image for Mobile",
        title: "Section First Moto Home blog image for Mobile",
        type: "string",
        widget: {
          "ui:widget": "image-uploader"
        }
      },
      motoHomeBlogDescriptionFirst: {
        description: "Section First Moto Home blog description",
        title: "Section First Moto Home blog description",
        type: "string",
        widget: {
          "ui:widget": "textarea"
        }
      },
      motoHomeBlogPublishedDateFirst: {
        description: "Section First Moto Home blog published date",
        title: "Section First Moto Home blog published date",
        type: "string"
      },
      motoHomeBlogCtaItemsFirst: {
        items: {
          title: "Moto Home blog CTA items",
          type: "object",
          properties: {
            motoHomeBlogItemsCtaText: {
              type: "string",
              title: "Moto Home blog items CTA label",
              description: "Enter the Moto Home blog items CTA label"
            },
            motoHomeBlogItemsCtaLink: {
              type: "string",
              title: "Moto Home blog items CTA link",
              description: "Enter the Moto Home blog items CTA link"
            }
          }
        },
        minItems: 1,
        title: "Moto Home blog CTA",
        type: "array"
      },
      motoHomeBlogSecondTargetURL: {
        title: "Target URL for the second blog",
        type: "string"
      },
      motoHomeBlogSecondOpenInNewTab: {
        type: "boolean",
        title: "Open second blog in new tab",
        default: false
      },
      motoHomeBlogImageAltTextSecond: {
        type: "string",
        title: "Section Second Moto Home blog image alt text",
        description: "Enter the Alt text for Moto Home blog image"
      },
      motoHomeBlogDesktopImageSecond: {
        description: "Section Second Moto Home blog image for Tablet landscape",
        title: "Section Second Moto Home blog image for Tablet landscape",
        type: "string",
        widget: {
          "ui:widget": "image-uploader"
        }
      },
      motoHomeBlogTabletImageSecond: {
        description: "Section Second Moto Home blog image for Tablet portrait",
        title: "Section Second Moto Home blog image for Tablet portrait",
        type: "string",
        widget: {
          "ui:widget": "image-uploader"
        }
      },
      motoHomeBlogTabletlandscapeImageSecond: {
        description: "Section Second Moto Home blog image for  Desktop",
        title: "Section Second Moto Home blog image for  Desktop",
        type: "string",
        widget: {
          "ui:widget": "image-uploader"
        }
      },
      motoHomeBlogMobileImageSecond: {
        description: "Section Second Moto Home blog image for Mobile",
        title: "Section Second Moto Home blog image for Mobile",
        type: "string",
        widget: {
          "ui:widget": "image-uploader"
        }
      },
      motoHomeBlogDescriptionSecond: {
        description: "Section Second Moto Home blog description",
        title: "Section Second Moto Home blog description",
        type: "string",
        widget: {
          "ui:widget": "textarea"
        }
      },
      motoHomeBlogPublishedDateSecond: {
        description: "Section Second Moto Home blog published date",
        title: "Section Second Moto Home blog published date",
        type: "string"
      },
      motoHomeBlogCtaItemsSecond: {
        items: {
          title: "Moto Home blog CTA items",
          type: "object",
          properties: {
            motoHomeBlogItemsCtaText: {
              type: "string",
              title: "Moto Home blog items CTA label",
              description: "Enter the Moto Home blog items CTA label"
            },
            motoHomeBlogItemsCtaLink: {
              type: "string",
              title: "Moto Home blog items CTA link",
              description: "Enter the Moto Home blog items CTA link"
            }
          }
        },
        minItems: 1,
        title: "Moto Home blog CTA",
        type: "array"
      },
      motoHomeBlogThirdTargetURL: {
        title: "Target URL for the third blog",
        type: "string"
      },
      motoHomeBlogThirdOpenInNewTab: {
        type: "boolean",
        title: "Open third blog in new tab",
        default: false
      },
      motoHomeBlogImageAltTextThird: {
        type: "string",
        title: "Section Third Moto Home blog image alt text",
        description: "Enter the Alt text for Moto Home blog image"
      },
      motoHomeBlogDesktopImageThird: {
        description: "Section Third Moto Home blog image for Tablet Desktop",
        title: "Section Third Moto Home blog image for Tablet landscape",
        type: "string",
        widget: {
          "ui:widget": "image-uploader"
        }
      },
      motoHomeBlogTabletImageThird: {
        description: "Section Third Moto Home blog image for Tablet portrait",
        title: "Section Third Moto Home blog image for Tablet portrait",
        type: "string",
        widget: {
          "ui:widget": "image-uploader"
        }
      },
      motoHomeBlogTabletlandscapeImageThird: {
        description: "Section Third Moto Home blog image for Desktop",
        title: "Section Third Moto Home blog image for Desktop",
        type: "string",
        widget: {
          "ui:widget": "image-uploader"
        }
      },
      motoHomeBlogMobileImageThird: {
        description: "Section Third Moto Home blog image for Mobile",
        title: "Section Third Moto Home blog image for Mobile",
        type: "string",
        widget: {
          "ui:widget": "image-uploader"
        }
      },
      motoHomeBlogDescriptionThird: {
        description: "Section Third Moto Home blog description",
        title: "Section Third Moto Home blog description",
        type: "string",
        widget: {
          "ui:widget": "textarea"
        }
      },
      motoHomeBlogPublishedDateThird: {
        description: "Section Third Moto Home blog published date",
        title: "Moto Home blog published date",
        type: "string"
      },
      motoHomeBlogCtaItemsThird: {
        items: {
          title: "Moto Home blog CTA items",
          type: "object",
          properties: {
            motoHomeBlogItemsCtaText: {
              type: "string",
              title: "Moto Home blog items CTA label",
              description: "Enter the Moto Home blog items CTA label"
            },
            motoHomeBlogItemsCtaLink: {
              type: "string",
              title: "Moto Home blog items CTA link",
              description: "Enter the Moto Home blog items CTA link"
            }
          }
        },
        minItems: 1,
        title: "Moto Home blog CTA",
        type: "array"
      }
    }
  };
  detectMotoHomeBlogImage = () => {
    const {
      checkDevice: { isMobile, isTablet, isDesktop, isWide }
    } = this.state;
    const {
      motoHomeBlogDesktopImageFirst,
      motoHomeBlogTabletImageFirst,
      motoHomeBlogMobileImageFirst,
      motoHomeBlogDesktopImageSecond,
      motoHomeBlogTabletImageSecond,
      motoHomeBlogMobileImageSecond,
      motoHomeBlogDesktopImageThird,
      motoHomeBlogTabletImageThird,
      motoHomeBlogMobileImageThird,
      motoHomeBlogTabletlandscapeImageFirst,
      motoHomeBlogTabletlandscapeImageSecond,
      motoHomeBlogTabletlandscapeImageThird
    } = this.props;

    if (isMobile) {
      this.setState({
        motHomeBlogImageOne: motoHomeBlogMobileImageFirst,
        motHomeBlogImageTwo: motoHomeBlogMobileImageSecond,
        motHomeBlogImageThree: motoHomeBlogMobileImageThird
      });
    } else if (isTablet) {
      this.setState({
        motHomeBlogImageOne: motoHomeBlogTabletImageFirst,
        motHomeBlogImageTwo: motoHomeBlogTabletImageSecond,
        motHomeBlogImageThree: motoHomeBlogTabletImageThird
      });
    } else if (isDesktop) {
      this.setState({
        motHomeBlogImageOne: motoHomeBlogDesktopImageFirst,
        motHomeBlogImageTwo: motoHomeBlogDesktopImageSecond,
        motHomeBlogImageThree: motoHomeBlogDesktopImageThird
      });
    } else if (isWide) {
      this.setState({
        motHomeBlogImageOne: motoHomeBlogTabletlandscapeImageFirst,
        motHomeBlogImageTwo: motoHomeBlogTabletlandscapeImageSecond,
        motHomeBlogImageThree: motoHomeBlogTabletlandscapeImageThird
      });
    }
  };

  render() {
    const {
      showmotoHomeBlog,
      motoHomeBlogFirstTargetURL,
      motoHomeBlogFirstOpenInNewTab,
      motoHomeBlogImageAltTextFirst,
      motoHomeBlogDescriptionFirst,
      motoHomeBlogPublishedDateFirst,
      motoHomeBlogCtaItemsFirst,
      motoHomeBlogSecondTargetURL,
      motoHomeBlogSecondOpenInNewTab,
      motoHomeBlogImageAltTextSecond,
      motoHomeBlogDescriptionSecond,
      motoHomeBlogPublishedDateSecond,
      motoHomeBlogCtaItemsSecond,
      motoHomeBlogThirdTargetURL,
      motoHomeBlogThirdOpenInNewTab,
      motoHomeBlogImageAltTextThird,
      motoHomeBlogDescriptionThird,
      motoHomeBlogPublishedDateThird,
      motoHomeBlogCtaItemsThird
    } = this.props;
    if (!showmotoHomeBlog) {
      return null;
    }
    return (
      <div id="moto-home-blog-wrapper" className="moto-home-blog-wrapper">
        <div className="mhb-inner-sections">
          <div className="mhb-left-inner-section col-lg-7 col-md-6 col-sm-12 col-xs-12 ">
            <div className="mhb-left-section">
              <a href={motoHomeBlogFirstTargetURL == "" ? 'javascript:void(0);' : motoHomeBlogFirstTargetURL} {...(motoHomeBlogFirstTargetURL == "" ? { className: "no-link" } : {})} {...(motoHomeBlogFirstTargetURL != "" && motoHomeBlogFirstOpenInNewTab ? { target: "_blank" } : {})}>
                <img
                  src={this.state.motHomeBlogImageOne}
                  alt={motoHomeBlogImageAltTextFirst}
                />
                <div className="mhb-left-content-wrapper">
                  <div className="mhb-left-content-section">
                    <div className="mhb-left-section-cta">
                      {motoHomeBlogCtaItemsFirst &&
                        motoHomeBlogCtaItemsFirst.length > 0 &&
                        motoHomeBlogCtaItemsFirst.map((section, key) => (
                          <CTA
                            ctaHoverBackgroundColor="ffffff"
                            ctaBackgroundColor="ffffff"
                            ctaHoverOpacity="0"
                            ctaOpacity="0"
                            ctaHoverBorderColor="ffffff"
                            ctaBorderColor="ffffff"
                            ctaHoverTextColor="ffffff"
                            ctaTextColor="ffffff"
                            ctaText={section.motoHomeBlogItemsCtaText.toUpperCase()}
                            ctaLink={section.motoHomeBlogItemsCtaLink}
                          />
                        ))}
                    </div>
                    <div
                      className="mhb-left-section-body"
                      dangerouslySetInnerHTML={{
                        __html: motoHomeBlogDescriptionFirst
                      }}
                    />
                    <div
                      className="mhb-left-section-date-published"
                      dangerouslySetInnerHTML={{
                        __html: motoHomeBlogPublishedDateFirst
                      }}
                    />
                  </div>
                </div>
              </a>
            </div>
          </div>
          <div className="mhb-right-inner-section col-lg-5 col-md-6 col-sm-12 col-xs-12">
            <div className="mhb-right-sections">

              <div className="mhb-right-first-section">
                <a href={motoHomeBlogSecondTargetURL == "" ? 'javascript:void(0);' : motoHomeBlogSecondTargetURL} {...(motoHomeBlogSecondTargetURL == "" ? { className: "no-link" } : {})} {...(motoHomeBlogSecondTargetURL != "" && motoHomeBlogSecondOpenInNewTab ? { target: "_blank" } : {})}>
                  <img
                    src={this.state.motHomeBlogImageTwo}
                    alt={motoHomeBlogImageAltTextSecond}
                  />
                  <div className="mhb-right-content-wrapper">
                    <div className="mhb-right-first-content-section">
                      <div className="mhb-right-section-cta">
                        {motoHomeBlogCtaItemsSecond &&
                          motoHomeBlogCtaItemsSecond.length > 0 &&
                          motoHomeBlogCtaItemsSecond.map((section, key) => (
                            <CTA
                              ctaHoverBackgroundColor="ffffff"
                              ctaBackgroundColor="ffffff"
                              ctaHoverOpacity="0"
                              ctaOpacity="0"
                              ctaHoverBorderColor="ffffff"
                              ctaBorderColor="ffffff"
                              ctaHoverTextColor="ffffff"
                              ctaTextColor="ffffff"
                              ctaText={section.motoHomeBlogItemsCtaText.toUpperCase()}
                              ctaLink={section.motoHomeBlogItemsCtaLink}
                            />
                          ))}
                      </div>
                      <div
                        className="mhb-right-section-body"
                        dangerouslySetInnerHTML={{
                          __html: motoHomeBlogDescriptionSecond
                        }}
                      />
                      <div
                        className="mhb-right-section-date-published"
                        dangerouslySetInnerHTML={{
                          __html: motoHomeBlogPublishedDateSecond
                        }}
                      />
                    </div>
                  </div>
                </a>
              </div>

              <div className="mhb-right-second-section">
                <a href={motoHomeBlogThirdTargetURL == "" ? 'javascript:void(0);' : motoHomeBlogThirdTargetURL} {...(motoHomeBlogThirdTargetURL == "" ? { className: "no-link" } : {})} {...(motoHomeBlogThirdTargetURL != "" && motoHomeBlogThirdOpenInNewTab ? { target: "_blank" } : {})}>
                  <img
                    src={this.state.motHomeBlogImageThree}
                    alt={motoHomeBlogImageAltTextThird}
                  />
                  <div className="mhb-right-content-wrapper">
                    <div className="mhb-right-second-content-section">
                      <div className="mhb-right-section-cta">
                        {" "}
                        {motoHomeBlogCtaItemsThird &&
                          motoHomeBlogCtaItemsThird.length > 0 &&
                          motoHomeBlogCtaItemsThird.map((section, key) => (
                            <CTA
                              ctaHoverBackgroundColor="ffffff"
                              ctaBackgroundColor="ffffff"
                              ctaHoverOpacity="0"
                              ctaOpacity="0"
                              ctaHoverBorderColor="ffffff"
                              ctaBorderColor="ffffff"
                              ctaHoverTextColor="ffffff"
                              ctaTextColor="ffffff"
                              ctaText={section.motoHomeBlogItemsCtaText.toUpperCase()}
                              ctaLink={section.motoHomeBlogItemsCtaLink}
                            />
                          ))}
                      </div>
                      <div
                        className="mhb-right-section-body"
                        dangerouslySetInnerHTML={{
                          __html: motoHomeBlogDescriptionThird
                        }}
                      />
                      <div
                        className="mhb-right-section-date-published"
                        dangerouslySetInnerHTML={{
                          __html: motoHomeBlogPublishedDateThird
                        }}
                      />
                    </div>
                  </div>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default MotoHomeBlog;
