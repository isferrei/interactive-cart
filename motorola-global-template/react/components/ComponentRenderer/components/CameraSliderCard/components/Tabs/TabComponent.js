import React, { Component } from "react";

export default class Tab extends Component {
  constructor(props) {
    super(props);
  }

  onTabClick = () => {
    this.props.handleTabClick(this.props.tabIndex);
  };
  render() {
    const { label, isActive, handleTabClick, tabBgColor } = this.props;

    return (
      <button
        style={{ backgroundColor: `#${tabBgColor}` }}
        className={isActive ? "active" : ""}
        onClick={this.onTabClick}
      >
        {label}
      </button>
    );
  }
}
