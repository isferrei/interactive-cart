import React, { Component } from "react";
import "./Subnav.global.css";
import { Link } from "vtex.render-runtime";

class Subnav extends Component {
  static schema = {
    title: "Subnav",
    description: "Subnav",
    type: "object",
    properties: {
      items: {
        title: "Items",
        type: "array",
        minItems: 1,
        items: {
          title: "Item",
          type: "object",
          properties: {
            itemTitle: {
              default: "",
              type: "string",
              title: "Item title"
            },
            itemLink: {
              default: "",
              type: "string",
              title: "Item link"
            },
            externalLink: {
              default: false,
              type: "boolean",
              title: "External?"
            }
          }
        }
      }
    }
  };
  render() {
    const { items, isMobile } = this.props;
    if (isMobile) {
      return (
        <ul className="side-sub-nav">
          {items.map((item, key) => (
            <li key={key}>
              {item.externalLink ? (
                <a target="blank" href={item.itemLink}>
                  {item.itemTitle}
                </a>
              ) : (
                <Link to={item.itemLink}>{item.itemTitle}</Link>
              )}
            </li>
          ))}
        </ul>
      );
    }

    return (
      <div className="sub-nav">
        <div className="container">
          <ul>
            {items.map((item, key) => (
              <li key={key}>
                {item.externalLink ? (
                  <a target="blank" href={item.itemLink}>
                    {item.itemTitle}
                  </a>
                ) : (
                  <Link to={item.itemLink}>{item.itemTitle}</Link>
                )}
              </li>
            ))}
          </ul>
        </div>
      </div>
    );
  }
}

export default Subnav;
