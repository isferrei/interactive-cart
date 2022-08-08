import React from "react";
import "./fullBleedImage.global.css";
import CTA from "../CTA/index";
import { imagePath } from "../../components/CommonProductLogic/index";
import { handleResize, debounce } from "../../common/js/deviceDetection";
import LazyLoad from 'react-lazyload';

class FullBleedImage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      checkDevice: handleResize()
    };
  }

  componentDidMount() {
    let current = this;
    window.addEventListener(
      "resize",
      debounce(function() {
        current.setState({ checkDevice: handleResize() });
      }, 500)
    );
  }


  render() {
    let imageSRC;
    let imageBackground;
    let imagealttext;
    if (this.state.checkDevice.isMobile) {
      if(this.props.data.fullb_gradient_start_color && this.props.data.fullb_gradient_end_color && this.props.data.fullb_gradient_effect_direction) {
        imageBackground = {
        backgroundImage: `linear-gradient(${this.props.data.fullb_gradient_effect_direction}, #${this.props.data.fullb_gradient_start_color}, #${this.props.data.fullb_gradient_end_color})`
        };
      } else if (this.props.data.fullb_image) {
        imageSRC = `${imagePath}${this.props.data.fullb_image}`;
        imagealttext = this.props.data.fullb_image_alt_text ? this.props.data.fullb_image_alt_text : '';
      }
      imageBackground = {
        backgroundColor: `#${this.props.data.fullb_color}`
      };

    } else {
      if(this.props.data.fullb_gradient_start_color && this.props.data.fullb_gradient_end_color && this.props.data.fullb_gradient_effect_direction) {
        imageBackground = {
          backgroundImage: `linear-gradient(${this.props.data.fullb_gradient_effect_direction}, #${this.props.data.fullb_gradient_start_color}, #${this.props.data.fullb_gradient_end_color})`,
          minHeight: 650 + "px"
        };
      } else if (this.props.data.fullb_image_desktop) {
        imageSRC = `${imagePath}${this.props.data.fullb_image_desktop}`;
        imagealttext = this.props.data.fullb_image_desktop_alt_text ? this.props.data.fullb_image_desktop_alt_text : '';
      } else {
        imageBackground = {
          backgroundColor: `#${this.props.data.fullb_color_desktop}`,
          minHeight: 650 + "px"
        };
      }
   }
    // const {
    //   data: {fullb_image, fullb_image_desktop, fullb_color, fullb_color_desktop, fullb_text_position,fullb_text_color, fullb_text_color_desktop, fullb_text_alignment, full_bleed_prod_logo, fullb_logo_height_mobile, fullb_logo_height_tablet, fullb_logo_height_desktop, fullb_logo_height_wide, fullb_description }
    // } = this.props;
    return (
      <div className="full-bleed-image" style={imageBackground}>
        <div className="fbi-background-image">
          <LazyLoad
            offset={100}
            once
            throttle={0}
            placeholder={<img className="fbi-lazyload-default-img" src={imagePath + "Lazy-Load-Full-bleed-card.png"} alt="Lazyload Placeholder Image" />}
          >
          <img
            src={imageSRC}
            alt={imagealttext}
            className="fbi-background-img"
          />
          </LazyLoad>
        </div>
        <div className="fbi-description-layer">
          <div className="fbi-description-container">
            <div
              className={"fbi-content " + this.props.data.fullb_text_position}
              style={
                this.state.checkDevice.isMobile
                  ? {
                      color: "#" + this.props.data.fullb_text_color
                    }
                  : {
                      color: "#" + this.props.data.fullb_text_color_desktop
                    }
              }
            >
              <div className={this.props.data.fullb_text_alignment}>
                {this.props.data.full_bleed_prod_logo != "" ? (
                  <img
                    src={imagePath + this.props.data.full_bleed_prod_logo}
                    alt={this.props.data.full_bleed_prod_logo_alt_text ? this.props.data.full_bleed_prod_logo_alt_text : ''}
                    style={{
                      height: this.state.checkDevice.isMobile
                        ? this.props.data.fullb_logo_height_mobile + "px"
                        : this.state.checkDevice.isTablet
                        ? this.props.data.fullb_logo_height_tablet + "px"
                        : this.state.checkDevice.isDesktop
                        ? this.props.data.fullb_logo_height_desktop + "px"
                        : this.state.checkDevice.isWide
                        ? this.props.data.fullb_logo_height_wide + "px"
                        : null
                    }}
                  />
                ) : null}
                <div
                  dangerouslySetInnerHTML={{
                    __html: this.props.data.fullb_description
                  }}
                />
                {this.props.data.fullb_cta_link !== "" ? (
                  <CTA
                    ctaHoverBackgroundColor={
                      this.props.data.fullb_cta_button_hover_background_color
                    }
                    ctaBackgroundColor={
                      this.props.data.fullb_cta_button_background_color
                    }
                    ctaHoverOpacity={
                      this.props.data.fullb_cta_button_hover_opacity
                    }
                    ctaOpacity={this.props.data.fullb_cta_button_opacity}
                    ctaHoverBorderColor={
                      this.props.data.fullb_cta_hover_outline_color
                    }
                    ctaBorderColor={this.props.data.fullb_cta_outline_color}
                    ctaHoverTextColor={
                      this.props.data.fullb_cta_hover_text_color
                    }
                    ctaTextColor={this.props.data.fullb_cta_text_color}
                    ctaAnchorTarget={this.props.data.fullb_cta_target}
                    ctaText={this.props.data.fullb_cta_text}
                    ctaLink={this.props.data.fullb_cta_link}
                  />
                ) : null}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default FullBleedImage;
