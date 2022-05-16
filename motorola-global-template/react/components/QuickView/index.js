import React, { Component } from "react";
import "./quickView.global.css";
import Itemlist from "./components/Itemlist";
import animation from "./components/Itemlistanimation";


class QuickView extends Component {
  static schema = {
    title: "Quick View",
    description: "Quick View",
    type: "object",
    properties: {
      showquickView: {
        type: "boolean",
        title: "Show Quick View",
        default: false
      },
      quickViewHeadline: {
        type: "string",
        title: "Quick View headline",
        description: "Quick View headline"
      },
      quickViewBody: {
        type: "string",
        title: "Quick View description",
        description: "Quick View description",
        widget: {
          "ui:widget": "textarea"
        }
      },
      quickviewitems: {
        items: {
          title: "Quick View items",
          type: "object",
          properties: {
            quickViewItemDesktopImage: {
              description: "Quick view item image for Desktop",
              title: "Quick view item image for Desktop",
              type: "string",
              widget: {
                "ui:widget": "image-uploader"
              }
            },
            quickViewItemDesktopImageAltText: {
              type: "string",
              title: "Quick View Desktop image alt text",
              description: "Quick View Desktop image alt text"
            },
            quickViewItemTabletImage: {
              description: "Quick view item image for Tablet",
              title: "Quick view item image for Tablet",
              type: "string",
              widget: {
                "ui:widget": "image-uploader"
              }
            },
            quickViewItemTabletImageAltText: {
              type: "string",
              title: "Quick View Tablet image alt text",
              description: "Quick View Tablet image alt text"
            },
            quickViewItemMobileImage: {
              description: "Quick view item image for Mobile",
              title: "Quick view item image for Mobile",
              type: "string",
              widget: {
                "ui:widget": "image-uploader"
              }
            },
            quickViewItemMobileImageAltText: {
              type: "string",
              title: "Quick View Mobile image alt text",
              description: "Quick View Mobile image alt text"
            },
            quickViewItemVideo: {
              description: "Quick View item video",
              type: "string",
              title: "Quick View item video"
            },
            quickViewItemheadline: {
              description: "Quick View item head line",
              title: "Quick View item head line",
              type: "string"
            },
            quickViewItemBody: {
              description: "Quick View item body",
              title: "Quick View item body",
              type: "string",
              widget: {
                "ui:widget": "textarea"
              }
            }
          }
        },
        minItems: 1,
        title: "Quick View item",
        type: "array"
      }
    }
  };

  componentDidMount() {
    animation.exec();
  }

  render() {
    const { showquickView, quickViewHeadline, quickViewBody, quickviewitems } = this.props;
    if (!showquickView) {
      return null;
    }
    return (
      <div className="quick-view">
        <div className="row qv-no-margin">
          <div id = "qv-sticky-content-section" className="col-md-4 col-sm-5 col-xs-12 qv-content-section">
            <div className="qv-left-section">
              <div className="qv-headline">{quickViewHeadline}</div>
              <div
                className="qv-content"
                dangerouslySetInnerHTML={{
                  __html: quickViewBody
                }}
              />
            </div>
          </div>
          <div className="col-md-8 col-sm-7 col-xs-12 qv-content-right-section no-padding">
            <div className="qv-content-animation-sections">
              {quickviewitems &&
                quickviewitems.length > 0 &&
                quickviewitems.map((itemList, key) => (
                  <Itemlist
                    key={key}
                    {...itemList}
                    id={key}
                    ref="quickviewItems"
                  ></Itemlist>
                ))}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default QuickView;
