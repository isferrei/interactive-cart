import "./motorolaQuizResponsePage.global.css";
import {
  FacebookShareButton,
  TwitterShareButton,
  InstapaperShareButton,
  LinkedinShareButton
} from "react-share";
import { imageAccountPath } from "../ComponentRenderer/common/js/globalConstants";

const facebookIcon = imageAccountPath + "mqp-w-facebook.svg";
const twitterIcon = imageAccountPath + "mqp-w-twitter.svg";
const instaIcon = imageAccountPath + "mqp-w-instagram.svg";
const LinkedinIcon = imageAccountPath + "mqp-w-linkedin-in.svg";

const MotorolaQuizResponsePage = props => {
  return (
    <div
      className="motorola-quiz-response-page"
      style={{ backgroundColor: props.backgroundColor }}
    >
      <div className="mqrp-image-container">
        <img src={props.productImage} alt={props.headerText} />
      </div>
      <div
        className="mqrp-text-container"
        style={{ backgroundColor: props.backgroundColor }}
      >
        <div className="mqrp-text-wrapper">
          <div className="mqrp-header-text">{props.headerText}</div>
          <div className="mqrp-product-logo">
            <img src={props.productLogoImage} alt={props.ctaText} />
          </div>
          <div className="mqrp-content">{props.content}</div>
          <a href={props.ctaLink} className="mqrp-cta">{props.ctaText}</a>
        </div>
        {props.showShare ? (
          <div className="mqrp-share-wrapper">
            <div className="mqrp-share-title">{props.shareText}</div>
            <div className="mqrp-share-icons-container">
              <span className="mqrp-share-social-icons">
                <FacebookShareButton
                  url={
                    window && window.location && window.location.href
                      ? window.location.href
                      : ""
                  }
                >
                  <img src={facebookIcon} alt="Facebook Icon" />
                </FacebookShareButton>
              </span>
              <span className="mqrp-share-social-icons">
                <TwitterShareButton
                  url={
                    window && window.location && window.location.href
                      ? window.location.href
                      : ""
                  }
                >
                  <img src={twitterIcon} alt="Twitter Icon" />
                </TwitterShareButton>
              </span>
              <span className="mqrp-share-social-icons">
                <InstapaperShareButton
                  url={
                    window && window.location && window.location.href
                      ? window.location.href
                      : ""
                  }
                >
                  <img src={instaIcon} alt="Instagram Icon" />
                </InstapaperShareButton>
              </span>
              <span className="mqrp-share-social-icons">
                <LinkedinShareButton
                  url={
                    window && window.location && window.location.href
                      ? window.location.href
                      : ""
                  }
                >
                  <img src={LinkedinIcon} alt="Linkedin Icon" />
                </LinkedinShareButton>
              </span>
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
};

MotorolaQuizResponsePage.schema = {
  title: "Motorola Quiz Response",
  description: "Configuration for Quiz",
  type: "object",
  properties: {
    productImage: {
      description: "Upload the product image",
      title: "Product Image",
      type: "string",
      widget: {
        "ui:widget": "image-uploader"
      }
    },
    productLogoImage: {
      description: "Upload the product logo image",
      title: "Product Logo",
      type: "string",
      widget: {
        "ui:widget": "image-uploader"
      }
    },
    headerText: {
      description: "Enter the header text",
      title: "Title",
      type: "string",
      default: ""
    },
    content: {
      description: "Enter the content",
      title: "Content",
      type: "string",
      default: ""
    },
    backgroundColor: {
      description:
        "Enter the background color code of the page(in #000A13 format)",
      title: "Background color",
      type: "string",
      default: "#000A13"
    },
    ctaText: {
      description: "Enter the CTA text",
      title: "CTA text",
      type: "string",
      default: ""
    },
    ctaLink: {
      description: "Enter the CTA link",
      title: "CTA Link",
      type: "string",
      default: ""
    },
    showShare: {
      description: "Show social share",
      title: "Show social share",
      type: "boolean",
      default: false
    },
    shareText: {
      description: "Enter the share text",
      title: "Share title",
      type: "string",
      default: ""
    }
  }
};

export default MotorolaQuizResponsePage;
