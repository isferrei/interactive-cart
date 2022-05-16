import { Component } from "react";
import "./MotoBlogPodcast.global.css";
import BlogFilter from "../BlogFilter/index";
import { Block, ExtensionPoint } from "vtex.render-runtime";
import { subscriber, subscriber1 } from "../../utils/messageService";
import PodcastTrailer from "./PodcastTrailer";
import {
  handleResize,
  debounce
} from "../ComponentRenderer/common/js/deviceDetection";

class MotoBlogPodcast extends Component {
  constructor(props) {
    super(props);
    this.state = {
      filterData: this.props.recentPodcastsList,
      paginationData: [],
      loading: false,
      checkDevice: handleResize()
    };
  }
  static schema = {
    title: "Motorola Blog - Podcast",
    description: "Motorola Blog - Podcast",
    type: "object",
    properties: {
      showPodcastList: {
        type: "boolean",
        title: "Show Podcast List",
        default: false
      },
      blogHomePageURL: {
        description: "Blog Homepage URL",
        title: "Blog Homepage URL",
        type: "string"
      },
      heading: {
        type: "string",
        title: "Heading",
        description: "Enter Heading Text for Trailer Podcast"
      },
      noOfRecentPodcastsPerPage: {
        type: "number",
        title: "Number of Recent Podcasts Per Page",
        default: 3
      },
      listenNowText: {
        type: "string",
        title: "Listen Now text",
        description: "Enter Listen Now text",
        default: "Listen Now"
      },
      trailerPCDescText: {
        type: "string",
        title: "Trailer Podcast Text",
        description: "Trailer Podcast Text"
      },
      trailerPodcastListenNowText: {
        type: "string",
        title: "Listen Now text for Trailer Podcast",
        description: "Enter Listen Now text for Trailer Podcast",
        default: "Check out the trailer"
      },
      trailerPodcastId: {
        type: "string",
        title: "Trailer Podcast Id",
        description: "Ex: 71mvGXupfKcmO6jlmOJQTP"
      },
      trailerPodcastImage: {
        title: "Image",
        type: "string",
        widget: {
          "ui:widget": "image-uploader"
        }
      },
      trailerPodcastImageAlt: {
        title: "Trailer podcast Image Alt",
        type: "string"
      },
      recentPodcastsHeading: {
        type: "string",
        title: "Recent Podcasts Heading",
        description: "Enter Heading Text for Recent Podcasts"
      },
      recentPodcastsList: {
        description: "Recent Podcasts List",
        title: "Recent Podcasts List",
        type: "array",
        minItems: 3,
        items: {
          title: "Menu item",
          type: "object",
          properties: {
            category: {
              description: "Category List",
              title: "Category List",
              type: "array",
              minItems: 1,
              maxItems: 2,
              items: {
                title: "Category Item",
                type: "object",
                properties: {
                  categoryName: {
                    type: "string",
                    title: "Category Name",
                    description: "Enter Category name"
                  },
                  categoryLink: {
                    type: "string",
                    title: "Category Link",
                    description: "Enter Category link"
                  },
                  openInNewTab: {
                    type: "boolean",
                    title: "Open Category Link in new tab",
                    default: false
                  }
                }
              }
            },
            title: {
              title: "Title",
              type: "string"
            },
            datePublished: {
              description: "Format: MMM DD, YYYY (example: Nov 04, 2020)",
              title: "Date Published",
              type: "string"
            },
            image: {
              title: "Image",
              type: "string",
              widget: {
                "ui:widget": "image-uploader"
              }
            },
            imageAlt: {
              title: "Image Alt",
              type: "string"
            },
            targetUrl: {
              title: "Target URL for listen now CTA",
              type: "string"
            },
            openTargetUrlInNewTab: {
              type: "boolean",
              title: "Open Target URL Link in new tab",
              default: false
            }
          }
        }
      }
    }
  };

  pageChangeCallback = data => {
    this.setState({ paginationData: data });
  };

  componentDidMount() {
    subscriber.next(this.props.recentPodcastsList);
    subscriber1.subscribe(data => {
      if (data !== 0) {
        this.setState({ filterData: data, loading: true }, () => {
          this.setState({ loading: false });
        });
      }
    });

    this.setState({ checkDevice: handleResize() });
    window.addEventListener(
      "resize",
      debounce(() => {
        this.setState({ checkDevice: handleResize() });
      }, 500)
    );
  }

  componentWillUnmount() {
    subscriber.unsubscribe();
    subscriber1.unsubscribe();
  }

  render() {
    const {
      showPodcastList,
      blogHomePageURL,
      heading,
      noOfRecentPodcastsPerPage,
      listenNowText,
      trailerPCDescText,
      trailerPodcastId,
      trailerPodcastImage,
      trailerPodcastImageAlt,
      trailerPodcastListenNowText,
      recentPodcastsHeading
    } = this.props;

    const {
      checkDevice: { isMobile }
    } = this.state;

    let listenIcon = isMobile ? "listen-icon-m.svg" : "listen-icon.svg";
    let itemsPerPage =
      parseInt(noOfRecentPodcastsPerPage) != NaN
        ? parseInt(noOfRecentPodcastsPerPage)
        : 3;
    if (!showPodcastList) {
      return null;
    }
    return (
      <div className="moto-blog-podcast-list">
        <div className="mbpl-navigation-breadcrumb">
          <a
            className="mbpl-home-link"
            href={
              blogHomePageURL && blogHomePageURL != ""
                ? blogHomePageURL
                : "javascript:void(0);"
            }
          >
            Home
          </a>
          <span className="mbpl-separator">&#62;</span>
          <span className="mbpl-breadcrumb-title">{heading}</span>
        </div>
        <div>
          <Block id="unsubscribe-link" />
        </div>
        <div className="mbpl-podcast-trailer">
          <div className="mbpl-podcast-trailer-content">
            <PodcastTrailer
              heading={heading}
              trailerPCDescText={trailerPCDescText}
              trailerPodcastImage={trailerPodcastImage}
              trailerPodcastImageAlt={trailerPodcastImageAlt}
              trailerPodcastId={trailerPodcastId}
              trailerPodcastListenNowText={trailerPodcastListenNowText}
            />
          </div>
        </div>
        <div className="mbpl-top">
          <h1 className="mbpl-heading">{recentPodcastsHeading}</h1>
          <div className="mbpl-filter">
            <BlogFilter />
          </div>
        </div>
        <div className="mbpl-container">
          {this.state.paginationData &&
            !this.state.loading &&
            this.state.paginationData.map(item => {
              return (
                <div className="mbpl-container-item">
                  <div className="mbpl-image">
                    <img src={item.image} alt={item.imageAlt}></img>
                  </div>
                  <div className="mbpl-content">
                    {item.category ? (
                      <div className="mbpl-category-section">
                        {item.category &&
                          item.category.map(item => {
                            if (item.categoryName) {
                              return (
                                <a
                                  href={
                                    item.categoryLink == ""
                                      ? "javascript:void(0);"
                                      : item.categoryLink
                                  }
                                  {...(item.categoryLink == ""
                                    ? { className: "no-link" }
                                    : {})}
                                  {...(item.categoryLink != "" &&
                                  item.openInNewTab
                                    ? { target: "_blank" }
                                    : {})}
                                >
                                  <span className="mbpl-category">
                                    {item.categoryName}
                                  </span>
                                </a>
                              );
                            }
                          })}
                      </div>
                    ) : null}
                    <div className="mbpl-title">{item.title}</div>
                    <div className="mbpl-date">{item.datePublished}</div>
                    <a
                      href={
                        item.targetUrl == ""
                          ? "javascript:void(0);"
                          : item.targetUrl
                      }
                      {...(item.targetUrl == ""
                        ? { className: "no-link" }
                        : {})}
                      {...(item.targetUrl != "" && item.openTargetUrlInNewTab
                        ? { target: "_blank" }
                        : {})}
                    >
                      <div className="mbpl-listennow">
                        <div className="text">{listenNowText}</div>
                        <div className="image">
                          <img src={`https://motorolaimgrepo.myvtex.com/arquivos/${listenIcon}`} alt="Listen Icon" />
                        </div>
                      </div>
                    </a>
                  </div>
                </div>
              );
            })}
        </div>
        <div className="mbpl-bottom">
          {!this.state.loading && (
            <ExtensionPoint
              id="moto-blog-pagination"
              data={this.state.filterData}
              itemsPerPage={itemsPerPage}
              dataCallBackFn={this.pageChangeCallback}
            ></ExtensionPoint>
          )}
        </div>
      </div>
    );
  }
}

export default MotoBlogPodcast;
