import React, { Component, Fragment } from "react";
import { ExtensionPoint } from "vtex.render-runtime";
import "./NewsLine.global.css";

class NewsLine extends Component {
  static schema = {
    title: "News line",
    type: "object",
    description: "News line",
    properties: {
      backgroundColor: {
        type: "string",
        title: "Background color"
      },
      enabled: {
        type: "boolean",
        title: "Enabled",
        default: true
      }
    }
  };
  render() {
    const { backgroundColor, children, enabled } = this.props;
    if (!enabled) {
      return <Fragment />;
    }
    return (
      <Fragment>
        <div
          className="news-line-container"
          style={{ backgroundColor: backgroundColor }}
        >
          <div className="container">
            <div className="news-line">{children}</div>
          </div>
        </div>
      </Fragment>
    );
  }
}

export default NewsLine;
