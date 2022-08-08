import React, { useRef, useState, useEffect } from "react";
import "./BlogHeader.global.css";

const BlogHeader = props => {
  const ref = useRef();
  const [mobileMenu, setMobileMenu] = useState(false);
  const [expandContent1, setExpandContent1] = useState(false);
  const toggleExpandMenu1 = () => {
    if (expandContent2) {
      setExpandContent2(false);
    }
    setExpandContent1(!expandContent1);
  };
  const [expandContent2, setExpandContent2] = useState(false);
  const toggleExpandMenu2 = () => {
    if (expandContent1) {
      setExpandContent1(false);
    }
    setExpandContent2(!expandContent2);
  };
  const toggleMobileMenu = () => {
    setMobileMenu(!mobileMenu);
  };
  useEffect(() => {
    if (expandContent1 || expandContent2) {
      document.addEventListener("click", handleClickOutside);
    } else {
      document.removeEventListener("click", handleClickOutside);
    }
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [expandContent1,expandContent2]);
  const handleClickOutside = e => {
    if (ref.current.contains(e.target)) {
      return;
    }
    // outside click
    setExpandContent1(false);
    setExpandContent2(false);

  };
  return (
    <div className={`blog-header ${mobileMenu ? "bh-responsive" : ""}`}>
      <a href="https://www.motorola.com/blog">
        <div className="bh-logo-image">
          <img src="..."/>
        </div>
      </a>
      <div ref={ref} className="bh-link-section">
        <div className="bh-dropdown">
          <button className="bh-dropbtn" onClick={toggleExpandMenu1}>
            {props.firstMenu}
            {expandContent1 ? (
              <i className="fa fa-caret-up"></i>
            ) : (
              <i className="fa fa-caret-down"></i>
            )}
          </button>
          {expandContent1 ? (
            <div className="bh-dropdown-content">
              {props.firstMenuItems.map((item, key) => (
                <a
                  href={item.itemLink}
                  target={item.externalLink ? "_blank" : "_self"}
                  key={key}
                >
                  {item.itemTitle}
                </a>
              ))}
            </div>
          ) : null}
        </div>
        <hr className="bh-divider" />
        <div className="bh-dropdown">
          <button className="bh-dropbtn" onClick={toggleExpandMenu2}>
            {props.secondMenu}
            {expandContent2 ? (
              <i className="fa fa-caret-up"></i>
            ) : (
              <i className="fa fa-caret-down"></i>
            )}
          </button>
          {expandContent2 ? (
            <div className="bh-dropdown-content">
              {props.secondMenuItems.map((item, key) => (
                <a
                  href={item.itemLink}
                  target={item.externalLink ? "_blank" : "_self"}
                  key={key}
                >
                  {item.itemTitle}
                </a>
              ))}
            </div>
          ) : null}
        </div>
        <hr className="bh-divider" />
        <a
          className="bh-globe-link"
          href={props.globeLink}
          target={props.externalLink ? "_blank" : "_self"}
        >
          <div className="bh-globe" />
        </a>
      </div>
      <button
        onClick={toggleMobileMenu}
        className={`bh-mobile-menu bh-menu-toggle ${
          mobileMenu ? "bh-button-active" : ""
        }`}
      >
        <span className="bh-icon-bar" />
        <span className="bh-icon-bar" />
      </button>
    </div>
  );
};

BlogHeader.schema = {
  title: "Blog Header",
  description: "Configuration for Blog Header",
  type: "object",
  properties: {
    firstMenu: {
      title: "First Menu Header",
      description: "Enter the first item",
      type: "string",
      default: ""
    },
    firstMenuItems: {
      title: "First Menu Items",
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
            title: "Open in new tab?"
          }
        }
      }
    },
    secondMenu: {
      title: "Second Menu Header",
      description: "Enter the second item",
      type: "string",
      default: ""
    },
    secondMenuItems: {
      title: "Second Menu Items",
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
            title: "Open in new tab?"
          }
        }
      }
    },
    globeLink: {
      title: "Globe Link",
      description: "Enter the link for the globe icon",
      type: "string",
      default: ""
    },
    externalLink: {
      default: false,
      type: "boolean",
      title: "Open in new tab?"
    }
  }
};

export default BlogHeader;
