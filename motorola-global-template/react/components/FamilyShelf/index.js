import React, { Component, Fragment } from "react";
import "./FamilyShelf.global.css";
import ProductFamily from "./components/ProductFamily/index";
import ProductFamilyMobile from "./components/ProductFamilyMobile/index";
import { Slider } from "vtex.store-components";

class FamilyShelf extends Component {
  state = {
    hover: false,
  }
  handleMouseEnter = () => {
    this.setState({ hover: true });
  }
  handleMouseLeave = () => {
    this.setState({ hover: false });
  }
  static schema = {
    title: "Family shelf",
    type: "object",
    description: "Family shelf",
    properties: {
      block: {
        type: "object",
        title: "Block",
        properties: {
          showFamilyShelf: {
            default: false,
            type: "boolean",
            title: "Show Family Shelf"
          },
          showFamilyShelfWithModalForDesktop: {
            default: false,
            type: "boolean",
            title: "Show Family Shelf With Modal For Desktop & Tablet"
          },
          blockTitle: {
            default: "",
            type: "string",
            title: "Block title"
          },
          blockDescription: {
            default: "",
            type: "string",
            title: "Block description"
          },
          linkTitle: {
            default: "",
            type: "string",
            title: "Link title"
          },
          linkTitleTextColor: {
            type: 'string',
            title: 'Link title text Color'
          },
          ctaBorderColor: {
            type: 'string',
            title: 'CTA border Color'
          },
          ctaHoverBorderColor: {
            type: 'string',
            title: 'CTA Hover Border Color'
          },
          ctaBackgroundColor: {
            type: 'string',
            title: 'CTA background Color'
          },
          ctaHoverBgColor: {
            type: 'string',
            title: 'CTA background Hover Color'
          },
          linkSrc: {
            default: "",
            type: "string",
            title: "Link"
          }
        }
      },

      items: {
        title: "Family items",
        type: "array",
        minItems: 1,
        items: {
          title: "Family item",
          type: "object",
          properties: {
            itemImage: {
              default: "",
              type: "string",
              title: "Image",
              widget: {
                "ui:widget": "image-uploader"
              }
            },
            itemImageAltText:  {
              default: "",
              title: "Item image alt text",
              type: "string"
            },
            floatImage: {
              default: "",
              type: "string",
              title: "Float image",
              widget: {
                "ui:widget": "image-uploader"
              }
            },
            floatImageAltText:  {
              default: "",
              title: "Float image alt text",
              type: "string"
            },
            itemTitle: {
              default: "",
              type: "string",
              title: "Item title"
            },
            buttonText: {
              default: "Learn More",
              type: "string",
              title: "Button title"
            },
            buttonTextColor: {
              type: 'string',
              title: 'Button text Color'
            },
            buttonBgColor: {
              type: 'string',
              title: 'Button background Color'
            },
            buttonBorderColor: {
              type: 'string',
              title: 'Button border Color'
            },
            itemPrice: {
              default: "",
              type: "string",
              title: "Item price range"
            },
            itemLink: {
              default: "",
              type: "string",
              title: "Item link"
            },
            specifications: {
              title: "Specifications",
              type: "array",
              minItems: 1,
              items: {
                title: "Family item",
                type: "object",
                properties: {
                  specificationName: {
                    default: "",
                    type: "string",
                    title: "Specification name"
                  }
                }
              }
            }
          }
        }
      }
    }
  };
  render() {
    const { block, items } = this.props;
    const { hover } = this.state;
    const settings = {
      dots: false,
      infinite: true
    };

    if (!block.showFamilyShelf) {
      return null;
    }

    let ctaBackground;
    if (hover) {
      ctaBackground = {
        color: block.linkTitleTextColor ? block.linkTitleTextColor : '#FFFFFF',
        border: block.ctaHoverBorderColor ? '1px solid ' + block.ctaHoverBorderColor : '1px solid #f784b4',
        backgroundColor: block.ctaHoverBgColor ? block.ctaHoverBgColor : '#f784b4'
      };
    } else {
      ctaBackground = {
        color: block.linkTitleTextColor ? block.linkTitleTextColor : '#FFFFFF',
        border: block.ctaBorderColor ? '1px solid ' + block.ctaBorderColor : '1px solid #f04187',
        backgroundColor: block.ctaBackgroundColor ? block.ctaBackgroundColor : '#EB150A'
      };
    }

    return (
      <Fragment>
        <div className="family-shelf-container">
          <div className="container">
            <div className="family-shelf">
              <div className="intro-content">
                <h1 dangerouslySetInnerHTML={{ __html: block.blockTitle }}></h1>
                <p
                  dangerouslySetInnerHTML={{ __html: block.blockDescription }}
                ></p>
                <a
                  className="intro-cta"
                  href={block.linkSrc}
                  style={ctaBackground}
                  onMouseEnter={this.handleMouseEnter}
                  onMouseLeave={this.handleMouseLeave}
                >
                  <span className="intro-cta-text">{block.linkTitle}</span>
                </a>
              </div>
              <div className="family-content">
                {items.map((item, key) => (
                  <ProductFamily key={key} {...item} showModal={block.showFamilyShelfWithModalForDesktop} />
                ))}
              </div>
            </div>
            <div className="family-content-slider">
              <Slider sliderSettings={settings}>
                {items.map((item, key) => (
                  <ProductFamilyMobile key={key} {...item} />
                ))}
              </Slider>
            </div>
          </div>
        </div>
      </Fragment>
    );
  }
}

export default FamilyShelf;
