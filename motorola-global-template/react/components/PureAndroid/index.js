import React, { Component } from "react";
import {
  handleResize,
  debounce
} from "../ComponentRenderer/common/js/deviceDetection";
import "./pureAndroid.global.css";
import schema from "./schema";

class PureAndroid extends Component {
  constructor(props) {
    super(props);
    this.state = {
      checkDevice: handleResize()
    };
  }
  static schema = schema;

  componentDidMount() {
    this.setState({ checkDevice: handleResize() });
    window.addEventListener(
      "resize",
      debounce(() => {
        this.setState({ checkDevice: handleResize() });
      }, 500)
    );
  }

  render() {
    const { showPureAndroid, multiColumnItems } = this.props;
    // Toggle Show/Hide component on VTEX
    if (!showPureAndroid) {
      return null;
    }

    // Class name change as per column length
    let columnContentClass;
    if (multiColumnItems && multiColumnItems.length === 2) {
      columnContentClass = "pa-multi-column-content";
    } else if (multiColumnItems && multiColumnItems.length === 3) {
      columnContentClass = "pa-multi-column-content-03";
    } else if (multiColumnItems && multiColumnItems.length === 4) {
      columnContentClass = "pa-multi-column-content-04";
    }

    return (
      <div className="pure-android">
        <div className="pa-container">
          {multiColumnItems.map((item, index) => {
            return (
              <div className={columnContentClass} key={index}>
                <img
                  src={item.multiColumnImage}
                  alt={item.multiColumnImageAltText}
                />
                <h2>{item.pureAndroidTitle}</h2>
                <p>{item.pureAndroidDescription}</p>
              </div>
            );
          })}
        </div>
      </div>
    );
  }
}

export default PureAndroid;
