import React, { Fragment } from "react";
import { handleResize, debounce } from "../../../common/js/deviceDetection";
import LogoComponent from "./LogoComponent";
import DescriptionComponent from "./DescriptionComponent";
import BackgroundImageComponent from "./BackgroundImageComponent";
import { parse } from "path";

class ReviewComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      deviceType: handleResize()
    };
  }

  componentDidMount() {
    window.addEventListener(
      "resize",
      debounce(() => {
        this.setState({ deviceType: handleResize() });
      }, 500)
    );
  }

  placeContentBasedOnImageDesign(position) {
    let positionMap = {
      center: "tc",
      right: "tl",
      left: "tr"
    };
    return positionMap[position] || "tc";
  }

  formatColor(value) {
    if (value) {
      return value.search(/#/g) < 0 ? "#" + value : value;
    }
  }

  getNumericalWidth(widthString) {
    if (
      widthString &&
      parseInt(widthString) &&
      typeof parseInt(widthString) == "number"
    ) {
      return parseInt(widthString.replace("%", ""));
    }
    return widthString || 0;
  }

  contructDescLogoLayout(reviewData) {
    let logoHeight;

    const {
      rc_logo_mobile_height,
      rc_logo_tablet_height,
      rc_logo_desktop_height,
      rc_logo_wide_height
    } = reviewData;
    const {
      deviceType: { isMobile, isTablet, isDesktop, isWide }
    } = this.state;

    if (isMobile) {
      logoHeight = rc_logo_mobile_height;
    } else if (isTablet) {
      logoHeight = rc_logo_tablet_height;
    } else if (isDesktop) {
      logoHeight = rc_logo_desktop_height;
    } else if (isWide) {
      logoHeight = rc_logo_wide_height;
    }

    if (reviewData.rc_content_position == "left") {
      return (
        <Fragment>
          <LogoComponent
            position={reviewData.rc_content_position}
            class="fl"
            logoHeight={logoHeight}
            width={100 - this.getNumericalWidth(reviewData.rc_content_width)}
            logo={reviewData.rc_desktop_logo}
            alt={reviewData.rc_desktop_logo_alt_text}
          />
          <DescriptionComponent
            textAlign={reviewData.rc_content_alignment}
            mobileDescription={reviewData.rc_description_mobile}
            desktopDescription={reviewData.rc_description}
            class="fl"
            width={this.getNumericalWidth(reviewData.rc_content_width)}
          />
        </Fragment>
      );
    } else if (reviewData.rc_content_position == "right") {
      return (
        <Fragment>
          <DescriptionComponent
            textAlign={reviewData.rc_content_alignment}
            mobileDescription={reviewData.rc_description_mobile}
            desktopDescription={reviewData.rc_description}
            class="fl"
            width={this.getNumericalWidth(reviewData.rc_content_width)}
          />
          <LogoComponent
            position={reviewData.rc_content_position}
            class="fl"
            logoHeight={logoHeight}
            width={100 - this.getNumericalWidth(reviewData.rc_content_width)}
            logo={reviewData.rc_desktop_logo}
            alt={reviewData.rc_desktop_logo_alt_text}
          />
        </Fragment>
      );
    } else {
      return (
        <Fragment>
          <DescriptionComponent
            textAlign={reviewData.rc_content_alignment}
            mobileDescription={reviewData.rc_description_mobile}
            desktopDescription={reviewData.rc_description}
            width={100}
          />
          <LogoComponent
            position="center"
            width={100}
            logoHeight={logoHeight}
            logo={reviewData.rc_desktop_logo}
            alt={reviewData.rc_desktop_logo_alt_text}
          />
        </Fragment>
      );
    }
  }

  render() {
    let reviewData = this.props.content;
    let description_logo_layout = this.contructDescLogoLayout(reviewData);
    const { rc_content_link, rc_content_target } = this.props.content;
    return (
      <div className="review w-100 ff" onClick={this.props.onClickHandler}>
        <a
          href={rc_content_link}
          target={parseInt(rc_content_target) ? "_blank" : "_self"}
        >
          <div
            className="review-container"
            style={{
              backgroundColor: this.formatColor(reviewData.rc_background_color)
            }}
          >
            <div
              className="review-content w-100 cf"
              style={{
                color: this.formatColor(reviewData.rc_text_color),
                display: "flex"
              }}
            >
              <BackgroundImageComponent
                desktopSrc={reviewData.rc_bg_desktop}
                mobileSrc={reviewData.rc_bg_mobile}
                altDesktopMessage={reviewData.rc_bg_desktop_alt_text}
                altMobileMessage={reviewData.rc_bg_mobile_alt_text}
              />
              {description_logo_layout}
            </div>
          </div>
        </a>
      </div>
    );
  }
}

export default ReviewComponent;
