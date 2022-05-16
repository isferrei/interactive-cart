import React, { Component } from "react";
import "./productSpec.global.css";

class ProductSpec extends Component {
  constructor(props) {
    super(props);
  }
  static schema = {
    title: "Specification Card",
    description: "Specification Card",
    type: "object",
    properties: {
      showSpecifications: {
        type: "boolean",
        title: "Show Specification Card",
        default: false
      },
      specificationMainText: {
        type: "string",
        title: "Specification card main heading",
        description: "Specification card main heading"
      },
      specificationItems: {
        items: {
          title: "Specification items",
          type: "object",
          properties: {
            specificationItemsHeading: {
              type: "string",
              title: "Specification item heading",
              description: "Specification item heading"
            },
            specificationItemsBody: {
              description: "Specification item description",
              title: "Specification item description",
              type: "string",
              widget: {
                "ui:widget": "textarea"
              }
            }
          }
        },
        minItems: 1,
        title: "Specification items",
        type: "array"
      }
    }
  };

  render() {
    const {
      specificationMainText,
      specificationItems,
      showSpecifications
    } = this.props;
    if (!showSpecifications) {
      return null;
    }
    return (
      <div className="prod-specs-summary">
        <div className="ps-items">
          <div className="ps-container">
            <p className="ps-heading">
              <h3>
                <strong>{specificationMainText}</strong>
              </h3>
            </p>
          </div>
          <div className="ps-wrapper row">
            {specificationItems.map((specItem, index) => (
              <div className="ps-item" key={index}>
                <div className="ps-desc">
                  <h6>
                    <strong
                      dangerouslySetInnerHTML={{
                        __html: specItem.specificationItemsHeading
                      }}
                    ></strong>
                  </h6>
                  <p
                    dangerouslySetInnerHTML={{
                      __html: specItem.specificationItemsBody
                    }}
                  ></p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }
}

export default ProductSpec;
