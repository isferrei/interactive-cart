import React, { Component } from "react";
import $ from "jquery";

class Gallerylist extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hoverIndex: null
    };
  }

  onCgGridHover = (id) => {
    this.setState({ hoverIndex: id });
  };

  onCgGridLeave = () => {
    this.setState({ hoverIndex: null });
  };

  render = () => {
    const {
      thumbnailImageUrl,
      thumbnailText,
      id, thumbnailAltText
    } = this.props;

    return (
      <div className={`cg-gallery-items ${this.state.hoverIndex !== null ? 'hover' : ''} ${this.props.selectedItemIndex !== null && this.props.selectedItemIndex === id ? 'active' : ''}`}
        id={"cg-item-" + id}
        onMouseEnter={() => this.onCgGridHover(id)}
        onMouseLeave={() => this.onCgGridLeave()}
        onClick={() => { this.props.click(id)}}>
        <img src={thumbnailImageUrl} alt={thumbnailAltText} />
        <div className="cg-items-background"><span>{thumbnailText}</span></div>
      </div>
    );
  };

}

export default Gallerylist;