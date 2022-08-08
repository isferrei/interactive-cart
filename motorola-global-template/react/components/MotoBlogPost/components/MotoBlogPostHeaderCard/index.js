import React from "react";
import "./MotoBlogPostHeaderCard.global.css";

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

class MotoBlogPostHeaderCard extends React.Component {
  static schema = {
    title: "Blog Post - Header",
    description: "Blog Post - Header",
    type: "object",
    properties: {
      showBlogHeader: {
        type: "boolean",
        title: "Blog Post - Header",
        default: false
      },
      blogHomePageURL: {
        description: "Blog Homepage URL",
        title: "Blog Homepage URL",
        type: "string"
      },
      blogPostOptionalTitle: {
        description: "Blog Post - Optional Title for Other Detail page",
        title: "Blog Post - Optional Title for Other Detail page",
        type: "string"
      },
      blogPostTitle: {
        description: "Blog Post - Title",
        title: "Blog Post - Title",
        type: "string"
      },
      blogHeaderImage: {
        description: "Blog Post - Header Image",
        title: "Blog Post - Header Image",
        type: "string",
        widget: {
          "ui:widget": "image-uploader"
        }
      },
      blogHeaderImageAlt: {
        description: "Blog Post - Header Image Alt",
        title: "Blog Post - Header Image Alt",
        type: "string"
      },
      blogPostAuthor: {
        description: "Blog Post - Author name",
        title: "Blog Post - Author name",
        type: "string"
      },
      blogPostAuthorProfile: {
        description: "Blog Post - Author Profile Picture",
        title: "Blog Post - Author Profile Picture",
        type: "string",
        widget: {
          "ui:widget": "image-uploader"
        }
      },
      blogPostAuthorImageAlt: {
        description: "Blog Post - Author Profile Image Alt",
        title: "Blog Post - Author Profile Image Alt",
        type: "string"
      },
      blogPostDate: {
        description: "Format: MMM DD, YYYY (example: Nov 04, 2020)",
        title: "Blog Post - Date Published",
        type: "string"
      },
      categories: {
        description: "Category List",
        title: "Category List",
        type: "array",
        minItems: 0,
        maxItems: 3,
        items: {
          title: "Category Item",
          type: "object",
          properties: {
            categoryName: {
              type: "string",
              title: "Category"
            },
            categoryLink: {
              type: "string",
              title: "Category Link"
            },
            openInNewTab: {
              type: "boolean",
              title: "Open Category Link in new tab",
              default: false
            }
          }
        }
      },
      hideSocialShareSection: {
        type: "boolean",
        title: "Hide Social Share Section",
        default: false
      }
    }
  };

  render() {
    const {
      showBlogHeader,
      blogHomePageURL,
      blogPostOptionalTitle,
      blogPostTitle,
      blogHeaderImage,
      blogHeaderImageAlt,
      blogPostAuthor,
      blogPostAuthorProfile,
      blogPostAuthorImageAlt,
      blogPostDate,
      categories,
      hideSocialShareSection
    } = this.props;
    return (
      <>
        {showBlogHeader ? (
          <>
            <div class="motoblogpost-header-container">
              <div className="motoblogpost-header-image">
                <img src={blogHeaderImage} alt={blogHeaderImageAlt}></img>
              </div>
              <div className="mbphc-navigation-breadcrumb">
                <a
                  className="mbphc-home-link"
                  href={
                    blogHomePageURL && blogHomePageURL != ""
                      ? blogHomePageURL
                      : "javascript:void(0);"
                  }
                >
                  Home
                </a>
                <span className="mbphc-separator">&#62;</span>
                {blogPostOptionalTitle ? <span className="mbphc-breadcrumb-optional-title">{blogPostOptionalTitle}<span className="mbphc-breadcrumb-optional-separator">&#62;</span></span> : null}
                <span className="mbphc-breadcrumb-title">{blogPostTitle}</span>
              </div>
              <div className="motoblogpost-header-content container">
                <div className="row mbphc-categories">
                  <div className="col-sm-12">
                    {(categories && categories.length > 0) ? categories.map(item => (
                      <a
                        href={
                          item.categoryLink == ""
                            ? "javascript:void(0);"
                            : item.categoryLink
                        }
                        {...(item.categoryLink == ""
                          ? { className: "no-link" }
                          : {})}
                        {...(item.categoryLink != "" && item.openInNewTab
                          ? { target: "_blank" }
                          : {})}
                      >
                        <span className="motoblogpost-category">
                          {item.categoryName}
                        </span>
                      </a>
                    )) : null}
                  </div>
                </div>
                <div className="row">
                  <div className="col-sm-12">
                    <h1 className="motoblogpost-header">{blogPostTitle}</h1>
                  </div>
                </div>
                {blogPostAuthor ? (
                  <div className="motoblogpost-header-meta-section-one">
                    <div className="motoblogpost-header-meta-item">
                      <a href="#0" class="motoblogpost-profile-pic">
                        <img
                          class="motoblogpost-avatar"
                          src={blogPostAuthorProfile}
                          alt={blogPostAuthorImageAlt}
                        />
                      </a>
                    </div>
                    <div className="motoblogpost-header-meta-item">
                      <span className="motoblogpost-author">
                        By {blogPostAuthor}
                      </span>
                    </div>
                  </div>
                ) : null}

                <div className="motoblogpost-header-meta-section-two">
                  <div className="motoblogpost-header-meta-item">
                    {blogPostAuthor ? (
                      <span className="motoblogpost-separator mobile-none"></span>
                    ) : <span className="motoblogpost-no-author" />}
                    <span className="motoblogpost-date">{blogPostDate}</span>
                    {
                      blogPostDate &&
                      <span className="motoblogpost-separator"></span>
                    }
                    {
                      !hideSocialShareSection &&
                      <>
                        <span className="motoblogpost-share">Share</span>
                        <span className="motoblogpost-share-social-icons">
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
                        <span className="motoblogpost-share-social-icons">
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
                        <span className="motoblogpost-share-social-icons">
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
                        <span className="motoblogpost-share-social-icons">
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
                      </>
                    }
                  </div>
                </div>
              </div>
            </div>
          </>
        ) : null}
      </>
    );
  }
}

export default MotoBlogPostHeaderCard;
