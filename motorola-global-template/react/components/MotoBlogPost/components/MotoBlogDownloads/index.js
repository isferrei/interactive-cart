import React from "react";
import "./MotoBlogDownloads.global.css";
const DownloadIcon = "/arquivos/external-link.svg";

class MotoBlogDownloads extends React.Component {
  static schema = {
    title: "Blog Post - Downloads",
    description: "Blog Post - Downloads",
    type: "object",
    properties: {
      showBlogDownloads: {
        type: "boolean",
        title: "Blog Post - Downloads",
        default: false
      },
      blogDownloadsTitle: {
        type: "string",
        title: "Blog - Press Downloads Main Title",
        default: "Downloads"
      },
      downloadList: {
        description: "Downloads List",
        title: "Downloads List",
        type: "array",
        minItems: 1,
        items: {
          title: "Download Item",
          type: "object",
          properties: {
            downloadTitle: {
              title: "Download Title",
              type: "string"
            },
            downloadImage: {
              description: "Download - Image Cover",
              title: "Download - Image Cover",
              type: "string",
              widget: {
                "ui:widget": "image-uploader"
              }
            },
            downloadImageAlt: {
              title: "Download Image Alt",
              type: "string"
            },
            downloadLinkTitle: {
              title: "Download Link Title",
              type: "string"
            },
            downloadLink: {
              title: "Download Link",
              type: "string"
            },
            openDownloadLinkInNewTab: {
              type: "boolean",
              title: "Open Download Link in new tab",
              default: false
            }
          }
        }
      }
    }
  };

  render() {
    const { showBlogDownloads, blogDownloadsTitle, downloadList } = this.props;
    return (
      <>
        {showBlogDownloads ? (
          <div className="moto-blog-downloads">
            <h1 className="moto-blog-downloads-section-title">{blogDownloadsTitle}</h1>
            <div className="moto-blog-downloads-container">
              {downloadList.map(list => {
                return (
                  <div className="moto-blog-downloads-container-item">
                    <div className="mbd-content-wrapper">
                      <div className="mbd-image">
                        <img
                          src={list.downloadImage}
                          alt={list.downloadImageAlt}
                        ></img>
                      </div>
                      <div className="mbd-content">
                        <div className="mbd-title">{list.downloadTitle}</div>
                      </div>
                    </div>
                    {list.downloadLinkTitle ? (
                      <div className="mbd-cta-section">
                        <a
                          href={
                            list.downloadLink == ""
                              ? "javascript:void(0);"
                              : list.downloadLink
                          }
                          {...(list.downloadLink == ""
                            ? { className: "no-link" }
                            : {})}
                          {...(list.downloadLink != "" &&
                          list.openDownloadLinkInNewTab
                            ? { target: "_blank" }
                            : {})}
                        >
                          <span className="mbd-category">
                            <span className="mbd-download-link-text">{list.downloadLinkTitle}</span>
                            <img src={DownloadIcon} alt="Download Icon" />
                          </span>
                        </a>
                      </div>
                    ) : null}
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

export default MotoBlogDownloads;
