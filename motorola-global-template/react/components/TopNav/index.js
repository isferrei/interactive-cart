import React from "react";
import "./TopNav.global.css";
import { ExtensionPoint } from 'vtex.render-runtime';

class TopNav extends React.Component {
  static schema = {
    title: "Topnav",
    description: "Topnav",
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
        <ul className="side-top-nav">
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
      <div className="header-top-nav">
        <div className="header-top-nav-items">
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

export default TopNav;
