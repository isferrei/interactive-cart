import React, { Component, Fragment } from "react";

class InPageNavItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: props.value,
      linkValue: props.linkValue,
      color: props.color,
      hover: false
    };
  }

  toggleHover = () => {
    this.setState({ hover: !this.state.hover });
  };

  render() {
    var linkStyle;
    if (this.state.hover) {
      linkStyle = { color: this.props.highlightColor, cursor: "pointer" };
    } else {
      linkStyle = { color: this.props.color };
    }
    return (
      <li
        className={
          this.props.seletedItem == this.state.linkValue ? "active" : ""
        }
      >
        <a
          href={"#" + this.state.linkValue}
          style={
            this.props.seletedItem == this.state.linkValue
              ? { color: this.props.highlightColor }
              : { color: this.props.color, ...linkStyle }
          }
          onClick={this.props.click}
          onMouseEnter={this.toggleHover}
          onMouseLeave={this.toggleHover}
        >
          {decodeURIComponent(this.state.value)}
        </a>
      </li>
    );
  }
}
export default InPageNavItem;
