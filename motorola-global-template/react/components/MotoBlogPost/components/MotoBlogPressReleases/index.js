import React from "react";
import "./MotoBlogPressReleases.global.css";

class MotoBlogPressReleases extends React.Component {
  static schema = {
    title: "Blog - Press Releases",
    description: "Blog - Press Releases",
    type: "object",
    properties: {
      showBlogPressReleases: {
        type: "boolean",
        title: "Blog - Press Releases",
        default: false
      },
      blogPressReleaseTitle: {
        type: "string",
        title: "Blog - Press Release Title",
        default: "Press Releases"
      },
      pressReleases: {
        description: "Press Releases List",
        title: "Press Releases List",
        type: "array",
        minItems: 1,
        items: {
          title: "Press Release Item",
          type: "object",
          properties: {
            categoryName: {
              type: "string",
              title: "First Category"
            },
            categoryLink: {
              type: "string",
              title: "First Category Link"
            },
            openInNewTab: {
              type: "boolean",
              title: "Open First Category Link in new tab",
              default: false
            },
            categoryNameOne: {
              type: "string",
              title: "Second Category"
            },
            categoryLinkOne: {
              type: "string",
              title: "Second Category Link"
            },
            openInNewTabOne: {
              type: "boolean",
              title: "Open Second Category Link in new tab",
              default: false
            },
            pressReleaseTitle: {
              title: "Press Release Title",
              type: "string"
            },
            pressReleaseDescription: {
              title: "Press Release Description",
              type: "string",
              widget: {
                "ui:widget": "textarea"
              }
            },
            pressReleaseDate: {
              description: "Format: MMM DD, YYYY (example: Nov 04, 2020)",
              title: "Press Release - Date Published",
              type: "string"
            },
            pressReleaseImage: {
              description: "Press Release - Image Cover",
              title: "Press Release - Image Cover",
              type: "string",
              widget: {
                "ui:widget": "image-uploader"
              }
            },
            pressReleaseImageAlt: {
              title: "Press Release Image Alt",
              type: "string"
            },
            pressReleaseLink: {
              title: "Press Release Link",
              type: "string"
            },
            openPressReleaseInNewTab: {
              type: "boolean",
              title: "Open Press Release Link in new tab",
              default: false
            }
          }
        }
      }
    }
  };

  render() {
    const { showBlogPressReleases, blogPressReleaseTitle, pressReleases } = this.props;
    return (
      <>
        {showBlogPressReleases ? (
          <div className="moto-blog-press-releases">
            <h1 className="moto-blog-press-releases-section-title">
              {blogPressReleaseTitle}
            </h1>
            <div className="moto-blog-press-releases-container">
              {pressReleases.map(release => {
                return (
                  <div className="moto-blog-press-releases-container-item">
                    <a
                      href={
                        release.pressReleaseLink == ""
                          ? "javascript:void(0);"
                          : release.pressReleaseLink
                      }
                      {...(release.pressReleaseLink == ""
                        ? { className: "no-link" }
                        : {})}
                      {...(release.pressReleaseLink != "" &&
                      release.openPressReleaseInNewTab
                        ? { target: "_blank" }
                        : {})}
                    >
                      <div className="mbpr-image">
                        <img
                          src={release.pressReleaseImage}
                          alt={release.pressReleaseImageAlt}
                        ></img>
                      </div>
                      <div className="mbpr-content">
                        <div className="mbpr-content-wrapper">
                          {release.categoryName ? (
                            <div className="mbpr-category-section">
                              <a
                                href={
                                  release.categoryLink == ""
                                    ? "javascript:void(0);"
                                    : release.categoryLink
                                }
                                {...(release.categoryLink == ""
                                  ? { className: "no-link" }
                                  : {})}
                                {...(release.categoryLink != "" &&
                                release.openInNewTab
                                  ? { target: "_blank" }
                                  : {})}
                              >
                                <span className="mbpr-category">
                                  {release.categoryName}
                                </span>
                              </a>
                            </div>
                          ) : null}
                          {release.categoryNameOne ? (
                            <div className="mbpr-category-section mbpr-category-section-two">
                              <a
                                href={
                                  release.categoryLinkOne == ""
                                    ? "javascript:void(0);"
                                    : release.categoryLinkOne
                                }
                                {...(release.categoryLinkOne == ""
                                  ? { className: "no-link" }
                                  : {})}
                                {...(release.categoryLinkOne != "" &&
                                release.openInNewTabOne
                                  ? { target: "_blank" }
                                  : {})}
                              >
                                <span className="mbpr-category">
                                  {release.categoryNameOne}
                                </span>
                              </a>
                            </div>
                          ) : null}
                          <div className="mbpr-title">
                            {release.pressReleaseTitle}
                          </div>
                          <div className="mbpr-desc">
                            {release.pressReleaseDescription}
                          </div>
                          <div className="mbpr-date">
                            {release.pressReleaseDate}
                          </div>
                        </div>
                      </div>
                    </a>
                  </div>
                );
              })}
            </div>
          </div>
        ) : null}
      </>
    );
  }
}

export default MotoBlogPressReleases;
