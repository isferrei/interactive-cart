import React, { Component } from "react";
import {
  handleResize,
  debounce
} from "../ComponentRenderer/common/js/deviceDetection";
import { imageAccountPath } from "../ComponentRenderer/common/js/globalConstants";
import ViewSpecificationItems from "./components/ViewSpecificationItems";
import {
  openAnimate,
  closeAnimate
} from "./components/ViewSpecificationFunction";
import "./ViewSpec.global.css";

class ViewSpec extends Component {
  constructor(props) {
    super(props);
    this.state = {
      checkDevice: handleResize(),
      isOpen: false
    };
    this.specsElementRef = React.createRef();
  }
  componentDidMount() {
    let current = this;
    window.addEventListener(
      "resize",
      debounce(function() {
        current.setState({ checkDevice: handleResize() });
      }, 100)
    );
  }

  toggleSpecificationDetail = () => {
    this.setState({ isOpen: !this.state.isOpen }, () => {
      if (this.state.isOpen) {
        openAnimate(this.specsElementRef.current.offsetTop);
      } else {
        closeAnimate(this.specsElementRef.current);
      }
    });
  };
  static schema = {
    title: "View Specification Card",
    description: "View Specification Card",
    type: "object",
    properties: {
      showViewSpecification: {
        type: "boolean",
        title: "Show View Specification Card",
        default: false
      },
      viewSpecShowAllText: {
        type: "string",
        title: "View Specification Card view all text",
        description: "View Specification Card view all text"
      },
      viewSpecHideAllText: {
        type: "string",
        title: "View Specification Card hide all text",
        description: "View Specification Card hide all text"
      },
      viewSpecItems: {
        items: {
          title: "View Specification items",
          type: "object",
          properties: {
            viewSpecItemsHeading: {
              type: "string",
              title: "View Specification items heading",
              description: "View Specification items heading"
            },
            enableIfColorSwatch: {
              type: "boolean",
              title: "enable if its color swatch",
              default: false
            },
            viewSpecChildItems: {
              items: {
                title: "View Specification Child items",
                type: "object",
                properties: {
                  viewSpecChildItemsHeading: {
                    type: "string",
                    title: "View Specification Child items heading",
                    description: "View Specification Child items heading"
                  },
                  viewSpecChildItemsBody: {
                    description: "View Specification Child items description",
                    title: "View Specification Child items description",
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
        },
        minItems: 1,
        title: "Specification items",
        type: "array"
      }
    }
  };

  render() {
    const {
      showViewSpecification,
      viewSpecShowAllText,
      viewSpecHideAllText,
      viewSpecItems
    } = this.props;

    const { isOpen } = this.state;

    if (!showViewSpecification) {
      return null;
    }

    let showHideStyle = {
      borderTop: "1px solid #ffffff",
      borderBottom: "1px solid #ffffff"
    };
    return (
      <div className="prod-specification-detail" ref={this.specsElementRef}>
        <div className={isOpen ? "psd-container open" : "psd-container"}>
          <div
            className="psd-show-hide-label"
            style={showHideStyle}
            onClick={this.toggleSpecificationDetail}
          >
            <img
              src={`${imageAccountPath}Arrow-right.svg`}
              className="psd-top-arrow"
              alt="show hide top arrow"
            />
            {isOpen ? viewSpecHideAllText : viewSpecShowAllText}
          </div>
          <div
            className="psd-contents-wrapper"
            style={
              this.state.checkDevice.isMobile
                ? { borderTop: "1px solid #ffffff" }
                : null
            }
          >
            {viewSpecItems.map((specItem, index) => {
              return <ViewSpecificationItems key={index} data={specItem} />;
            })}
          </div>

          <div
            className="psd-show-hide-label bottom"
            style={showHideStyle}
            onClick={this.toggleSpecificationDetail}
          >
            <img
              src={`${imageAccountPath}Arrow-top-hide.svg`}
              className="psd-bottom-arrow"
              alt="show hide bottom arrow"
            />
            {viewSpecHideAllText}
          </div>
        </div>
      </div>
    );
  }
}

export default ViewSpec;
