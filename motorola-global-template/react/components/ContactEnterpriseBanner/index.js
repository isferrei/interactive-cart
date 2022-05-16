import React from "react";
import axios from 'axios';
import { getRootPath } from "../../utils/helpers";
import bannerSvg from "./assets/banner.svg";
import "./ContactEnterpriseBanner.global.css";
import { setApiHeaders } from "../../utils/config";
import { withRuntimeContext } from "vtex.render-runtime";

class ContactEnterpiseBanner extends React.Component {

  static schema = {
    title: "Contact Enterprise Banner",
    description: "Contact Enterprise Banner",
    type: "object",
    properties: {
      useCustomBannerImgs: {
        type: "boolean",
        title: "Use Custom Banner Images",
        default: false
      },
      bannerImages: {
        items: {
          title: 'Banner Images Menu',
          type: "object",
          properties: {
            bannerImageURL: {
              default: "",
              title: "Banner Image",
              type: "string",
              widget: {
                "ui:widget": "image-uploader"
              }
            },
            learnMoreURL: {
              default: "",
              title: "learnMoreURL",
              type: "string"
            },
            openInNewTab: {
              type: "boolean",
              title: "Open learn more URL in new tab",
              default: true
            }
          }
        },
        minItems: 0,
        title: "Banner Images",
        type: "array"
      }
    }
  }

  render() {
    const { useCustomBannerImgs } = this.props;
      if (useCustomBannerImgs && this.props.bannerImages) {
        if (this.props.bannerImages.length > 1) {
          return (
            <>
              <div className="contact-enterprise-form-banner">
                <div className="row">
                  {
                    this.props.bannerImages.map(bannerImage => {
                      return (
                        <div className="column col-md-6 col-sm-6 col-xs-12">
                          <a href={bannerImage.learnMoreURL == "" ? "javascript:void(0);" : bannerImage.learnMoreURL} {...(bannerImage.learnMoreURL == "" ? { className: "no-link" } : {})} {...(bannerImage.learnMoreURL != "" && bannerImage.openInNewTab ? { target: "_blank" } : {})}>
                            <img src={bannerImage.bannerImageURL} alt="Banner Image" />
                          </a>
                        </div>
                      )
                    })
                  }
                </div>
              </div>
            </>
          )
        }
        else if (this.props.bannerImages.length == 1) {
          return (
            <>
              <div className="contact-enterprise-form-banner">
                {
                  this.props.bannerImages.map(bannerImage => {
                    return (
                      <a href={bannerImage.learnMoreURL == "" ? "javascript:void(0);" : bannerImage.learnMoreURL} {...(bannerImage.learnMoreURL == "" ? { className: "no-link" } : {})} {...(bannerImage.learnMoreURL != "" && bannerImage.openInNewTab ? { target: "_blank" } : {})}>
                        <img src={bannerImage.bannerImageURL} alt="Banner Image" />
                      </a>
                    )
                  })
                }
              </div>
            </>
          )
        } else {
          return (
            <div className="contact-enterprise-form-banner">
              <img src={bannerSvg} alt="Banner Image" />
            </div>
          );
        }
      } else {
        return (
          <div className="contact-enterprise-form-banner">
            <img src={bannerSvg} alt="Banner Image" />
          </div>
        );
      }
  }
}

export default withRuntimeContext(ContactEnterpiseBanner);
