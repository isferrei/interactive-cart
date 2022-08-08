import { Component } from "react";
import "./MotoBlogProductInnovation.global.css";
import BlogFilter from "../BlogFilter/index";
import { ExtensionPoint } from "vtex.render-runtime";
import { subscriber, subscriber1 } from "../../utils/messageService";

class MotoBlogProductInnovation extends Component {
  constructor(props) {
    super(props);
    this.state = {
      filterData: this.props.productInnovation,
      paginationData: [],
      loading: false
    };
  }
  static schema = {
    title: "Motorola Blog - Product Innovation",
    description: "Motorola Blog - Product Innovation",
    type: "object",
    properties: {
      showProductInnovation: {
        type: "boolean",
        title: "Show Product Innovation",
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
        description: "Enter Heading text"
      },
      noOfArticlesPerPage: {
        type: "number",
        title: "Number of articles Per Page",
        default: 3
      },
      productInnovation: {
        description: "Product Innovation List",
        title: "Product Innovation List",
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
              title: "Target URL",
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
    subscriber.next(this.props.productInnovation);
    subscriber1.subscribe(data => {
      if (data !== 0) {
        this.setState({ filterData: data, loading: true }, () => {
          this.setState({ loading: false });
        });
      }
    });
  }

  componentWillUnmount() {
    subscriber.unsubscribe();
    subscriber1.unsubscribe();
  }

  render() {
    const { showProductInnovation, blogHomePageURL, heading, noOfArticlesPerPage } = this.props;
    let itemsPerPage =
      parseInt(noOfArticlesPerPage) != NaN ? parseInt(noOfArticlesPerPage) : 3;
    if (!showProductInnovation) {
      return null;
    }
    return (
      <div className="moto-blog-product-innovation">
        <div className="mbpi-navigation-breadcrumb">
          <a
            className="mbpi-home-link"
            href={
              blogHomePageURL && blogHomePageURL != ""
                ? blogHomePageURL
                : "javascript:void(0);"
            }
          >
            Home
          </a>
          <span className="mbpi-separator">&#62;</span>
          <span className="mbpi-breadcrumb-title">{heading}</span>
        </div>
        <div className="mbpi-top">
          <h1 className="mbpi-heading">{heading}</h1>
          <div className="mbpi-filter">
            <BlogFilter />
          </div>
        </div>
        <div className="mbpi-container">
          {this.state.paginationData &&
            !this.state.loading &&
            this.state.paginationData.map(item => {
              return (
                <div className="mbpi-container-item">
                  <a href={item.targetUrl == "" ? 'javascript:void(0);' : item.targetUrl} {...(item.targetUrl == "" ? { className: "no-link" } : {})} {...(item.targetUrl != "" && item.openTargetUrlInNewTab ? { target: "_blank" } : {})}>
                    <div className="mbpi-image">
                      <img src={item.image} alt={item.imageAlt}></img>
                    </div>
                    <div className="mbpi-content">
                      {item.category ? (
                        <div className="mbpi-category-section">
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
                                    <span className="mbpi-category">
                                      {item.categoryName}
                                    </span>
                                  </a>
                                );
                              }
                            })}
                        </div>
                      ) : null}
                      <div className="mbpi-title">{item.title}</div>
                      <div className="mbpi-date">{item.datePublished}</div>
                    </div>
                  </a>
                </div>
              );
            })}
        </div>
        <div className="mbpi-bottom">
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

export default MotoBlogProductInnovation;
