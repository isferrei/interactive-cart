import { Component } from "react";
import NavbarItem from "./components/NavbarItem/index";
import SideDrawerItem from "./components/SideDrawerItem/index";
import "./Navbar.global.css";
class Navbar extends Component {
  static schema = {
    title: "Navbar",
    description: "Main navbar",
    type: "object",
    properties: {
      items: {
        items: {
          title: "Menu item",
          type: "object",
          properties: {
            itemTitle: {
              default: "",
              title: "Title",
              type: "string"
            },
            dropdownItems: {
              title: "Dropdown items",
              type: "array",
              minItems: 1,
              items: {
                title: "Dropdown item",
                type: "object",
                properties: {
                  imageUrl: {
                    type: "string",
                    title: "Image",
                    widget: {
                      "ui:widget": "image-uploader"
                    }
                  },
                  itemTitle: {
                    type: "string",
                    title: "Item title"
                  },
                  itemLink: {
                    type: "string",
                    title: "Item link"
                  },
                  externalLink: {
                    default: false,
                    type: "boolean",
                    title: "External?"
                  },
                  isHide: {
                    default: false,
                    type: "boolean",
                    title: "Hide"
                  }
                }
              }
            },
            promoBlock: {
              type: "object",
              title: "Promo block",
              properties: {
                blockTitle: {
                  default: "",
                  type: "string",
                  title: "Promotion title"
                },
                blockDescription: {
                  default: "",
                  type: "string",
                  title: "Promotion description"
                },
                link: {
                  default: "",
                  type: "string",
                  title: "Promotion link"
                },
                externalLink: {
                  default: false,
                  type: "boolean",
                  title: "External?"
                },
                imageUrl: {
                  default: "",
                  type: "string",
                  title: "Promotion image",
                  widget: {
                    "ui:widget": "image-uploader"
                  }
                }
              }
            }
          }
        },
        minItems: 1,
        title: "Menu items",
        type: "array"
      }
    }
  };

  render() {
    const { items, isMobile, setSideDrawerOpen } = this.props;
    return (
      <ul>
        {items.map((item, key) =>
          isMobile ? (
            <SideDrawerItem
              setSideDrawerOpen={setSideDrawerOpen}
              key={key}
              {...item}
            />
          ) : (
            <NavbarItem key={key} {...item} />
          )
        )}
      </ul>
    );
  }
}

export default Navbar;
