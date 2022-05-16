import React, { Component } from "react";
import { imagePath } from "../../../../components/CommonProductLogic/index";
import LazyLoad from "react-lazyload";

class Gallerylist extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hoverIndex: null
    };
  }

  onCgGridHover = id => {
    this.setState({ hoverIndex: id });
  };

  onCgGridLeave = () => {
    this.setState({ hoverIndex: null });
  };

  render = () => {
    const {
      thumbnail_image,
      thumbnail_text,
      id,
      thumbnail_image_alt_text
    } = this.props;

    return (
      <div
        className={`cg-gallery-items ${
          this.state.hoverIndex !== null ? "hover" : ""
        } ${
          this.props.selectedItemIndex !== null &&
          this.props.selectedItemIndex === id
            ? "active"
            : ""
        }`}
        id={"cg-item-" + id}
        onMouseEnter={() => this.onCgGridHover(id)}
        onMouseLeave={() => this.onCgGridLeave()}
        onClick={() => {
          this.props.click(id);
        }}
      >
        <LazyLoad
          offset={100}
          once
          throttle={0}
          placeholder={
            <img
              className="cg-lazyload-default-img"
              src={imagePath + "Lazy-Load-Square-batwing-03.png"}
              alt="Lazyload Placeholder Image"
            />
          }
        >
          <img
            src={imagePath + thumbnail_image}
            alt={thumbnail_image_alt_text}
          />
        </LazyLoad>
        <div className="cg-items-background">
          <span>{thumbnail_text}</span>
        </div>
      </div>
    );
  };
}

export default Gallerylist;
