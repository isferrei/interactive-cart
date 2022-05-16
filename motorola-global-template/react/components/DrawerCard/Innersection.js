import React, { Component } from "react";
import {
  handleResize,
  debounce
} from "../ComponentRenderer/common/js/deviceDetection";

class Innersection extends Component {
  constructor(props) {
    super(props);
    this.state = {
      checkDevice: handleResize()
    };
  }

  componentDidMount() {
    this.setState({ checkDevice: handleResize() });
    window.addEventListener(
      "resize",
      debounce(() => {
        this.setState({ checkDevice: handleResize() });
        this.detectDrawerCardImage();
      }, 500)
    );
    this.detectDrawerCardImage();
  }
  detectDrawerCardImage = () => {
    const {
      checkDevice: { isMobile, isTablet, isDesktop }
    } = this.state;
    const {
      drawerCardInnerDesktopImage,
      drawerCardInnerDesktopImageAltText,
      drawerCardInnerMobileImage,
      drawerCardInnerMobileImageAltText,
      drawerCardInnerTabletImage,
      drawerCardInnerTabletImageAltText
    } = this.props;

    if (isMobile) {
      this.setState({
        drawerCardImage: drawerCardInnerMobileImage,
        drawerCardImageAltText: drawerCardInnerMobileImageAltText
      });
    } else if (isTablet) {
      this.setState({
        drawerCardImage: drawerCardInnerTabletImage,
        drawerCardImageAltText: drawerCardInnerTabletImageAltText
      });
    } else if (isDesktop) {
      this.setState({
        drawerCardImage: drawerCardInnerDesktopImage,
        drawerCardImageAltText: drawerCardInnerDesktopImageAltText
      });
    } else {
      this.setState({
        drawerCardImage: drawerCardInnerDesktopImage,
        drawerCardImageAltText: drawerCardInnerDesktopImageAltText
      });
    }
  };
  render() {
    const {
      drawerCardInnerContentPosition,
      drawerCardInnerContentVerticalPosition,
      drawerCardInnerheadline,
      drawerCardInnerBody
    } = this.props;

    let innersectionClass = `dc-inner-section-description-layer content-${drawerCardInnerContentPosition} horizontal-${drawerCardInnerContentVerticalPosition}`;
    return (
      <div className="dc-inner-section">
        <div className="dc-inner-section-background-image">
          <img
            src={this.state.drawerCardImage}
            alt={this.state.drawerCardImageAltText}
          />
        </div>
        <div className={innersectionClass}>
          <div className={"dc-inner-section-content"}>
            <div className="dc-inner-section-headline">
              {drawerCardInnerheadline}
            </div>
            <div
              className="dc-inner-section-body"
              dangerouslySetInnerHTML={{
                __html: drawerCardInnerBody
              }}
            />
          </div>
        </div>
      </div>
    );
  }
}
export default Innersection;
