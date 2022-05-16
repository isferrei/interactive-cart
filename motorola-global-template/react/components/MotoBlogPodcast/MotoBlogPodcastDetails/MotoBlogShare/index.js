import React from "react";
import "./MotoBlogShare.global.css";

const facebookIcon = "/arquivos/facebook-f-brands.svg";
const twitterIcon = "/arquivos/twitter-brands.svg";
const instaIcon = "/arquivos/instagram-brands.svg";
const LinkedinIcon = "/arquivos/linkedin-in-brands.svg";

import {
  FacebookShareButton,
  TwitterShareButton,
  InstapaperShareButton,
  LinkedinShareButton
} from "react-share";

class MotoBlogShare extends React.Component {
  render() {
    const { socialShareText } = this.props;

    return (
      <>
        <div class="moto-blog-podcast-share">
          <div className="moto-blog-podcast-share-section-text">
            <span className="share-text">{socialShareText}</span>
          </div>
          <div className="moto-blog-podcast-share-section-icons">
            <span className="motoblogpodcast-share-social-icons">
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
            <span className="motoblogpodcast-share-social-icons">
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
            <span className="motoblogpodcast-share-social-icons">
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
            <span className="motoblogpodcast-share-social-icons">
              <LinkedinShareButton
                url={
                  window && window.location && window.location.href
                    ? window.location.href
                    : ""
                }
              >
                <img src={LinkedinIcon} alt="Linkden Icon" />
              </LinkedinShareButton>
            </span>
          </div>
        </div>
      </>
    );
  }
}

export default MotoBlogShare;
