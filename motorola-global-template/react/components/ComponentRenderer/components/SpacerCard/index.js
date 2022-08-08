import React, { Component } from "react";
import "./spacerCard.global.css";
import { handleResize, debounce } from "../../common/js/deviceDetection";
import {imagePath} from "../../components/CommonProductLogic/index"

class SpacerCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      checkDevice: handleResize(),
      hover: false
    };
  }

  toggleHover = () => {
    this.setState({ hover: !this.state.hover });
  };

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
    let linkStyle;
    if (this.state.hover) {
      linkStyle = {
        backgroundColor: `rgba(${
          this.props.data.sc_cta_button_hover_background_color
        })`,
        opacity: this.props.data.sc_cta_button_hover_opacity,
        borderColor: "#" + this.props.data.sc_cta_button_hover_outline_color,
        color: "#" + this.props.data.sc_cta_button_hover_text_color
      };
    } else {
      linkStyle = {
        backgroundColor: `rgba(${
          this.props.data.sc_cta_button_background_color
        })`,
        opacity: this.props.data.sc_cta_button_opacity,
        borderColor: "#" + this.props.data.sc_cta_button_outline_color,
        color: "#" + this.props.data.sc_cta_button_text_color
      };
    }
    let bgcolor;
    if(this.props.data.spacer_gradient_start_color && this.props.data.spacer_gradient_end_color && this.props.data.spacer_gradient_effect_direction) {
      bgcolor = {
        backgroundImage: `linear-gradient(${this.props.data.spacer_gradient_effect_direction}, #${this.props.data.spacer_gradient_start_color}, #${this.props.data.spacer_gradient_end_color})`,
        color: `#${this.props.data.spacer_text_color}`
      };
    } else {
      bgcolor = {
        backgroundColor: `#${this.props.data.spacer_background_color}`,
        color: `#${this.props.data.spacer_text_color}`
      };
    }
    return (
      <div
        className="spacer-card"
        style={bgcolor}
      >
        {this.props.data.spacer_icon !== "" ? (
          <img
            src={imagePath + this.props.data.spacer_icon}
            alt={this.props.data.spacer_icon_alt_text ? this.props.data.spacer_icon_alt_text : ""}
            style={{
              height: this.state.checkDevice.isMobile
                ? this.props.data.icon_height_mobile + "px"
                : this.state.checkDevice.isTablet
                ? this.props.data.icon_height_tablet + "px"
                : this.state.checkDevice.isDesktop
                ? this.props.data.icon_height_desktop + "px"
                : this.state.checkDevice.isWide
                ? this.props.data.icon_height_wide + "px"
                : null
            }}
          />
        ) : null}
        <div
          className="spacer-card-content" 
          dangerouslySetInnerHTML={{
            __html: this.props.data.spacer_text_content
          }}
        />
        {this.props.data.sc_cta_button_link !== "" ? (
          <div className="spacer-card-cta">
            <a
              href={this.props.data.sc_cta_button_link}
              target={
                this.props.data.sc_cta_button_target === "1"
                  ? "_blank"
                  : "_self"
              }
              style={linkStyle}
              onMouseEnter={this.toggleHover}
              onMouseLeave={this.toggleHover}
            >
              {this.props.data.sc_cta_button_text}
            </a>
          </div>
        ) : null}
      </div>
    );
  }
}

export default SpacerCard;
