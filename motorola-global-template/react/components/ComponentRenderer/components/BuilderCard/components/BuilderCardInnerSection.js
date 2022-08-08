import React, { Component } from "react";
import parse from "html-react-parser";
import "./builderCardInnerSection.global.css";
import { imagePath } from "../../CommonProductLogic/index";
import { handleResize, debounce } from "../../../common/js/deviceDetection";
import BuilderCardYoutube from "./BuilderCardYoutube.js";
import CTA from "../../CTA/index";
import { isHTML } from "./BuilderCardFunctions";
import BuilderCardVimeo from "./BuilderCardVimeo";
import LazyLoad from 'react-lazyload';

class BuilderCardInnerSection extends Component {
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
    const { data, panelType, panelDrawDisplay, panelDrawID } = this.props;
    let video_url_check = data.region_vimeo_video_url ? data.region_vimeo_video_url : data.region_youtube_video_url;

    let verticalPanelStyle = {
      backgroundColor: data.region_background_color
        ? "#" + data.region_background_color
        : "#fff",
      color: "#" + data.region_text_color,
      padding: video_url_check
        ? "0vh"
        : data.region_background_image
        ? 0
        : null
    };

    let singlePanelStyle = {
      padding: data.region_background_image ? 0 : null,
      backgroundColor: data.region_background_color
        ? "#" + data.region_background_color
        : "#fff",
      color: "#" + data.region_text_color
    };

    let horizontalPanelStyle = {
      padding: data.region_background_image ? 0 : null,
      backgroundColor: data.region_background_color
        ? "#" + data.region_background_color
        : "#fff",
      color: "#" + data.region_text_color
    };

    let textDeskAlignment = {
      textAlign: !data.region_text_alignment
        ? data.region_content_alignment
        : data.region_text_alignment,
      verticalAlign:
        data.region_content_position == "centre"
          ? "middle"
          : data.region_content_position == "top"
          ? "top"
          : data.region_content_position == "bottom"
          ? "bottom"
          : null
    };

    let mobilePositionClassName = "mobile-centre";
    if (data.mobile_content_alignment == "top") {
      mobilePositionClassName = "mobile-top";
    }
    if (data.mobile_content_alignment == "bottom") {
      mobilePositionClassName = "mobile-bottom";
    }

    let alignText =
      data.region_content_alignment + "-" + data.region_content_position;

    let imageOverTextDeskAlignment = {
      textAlign: data.region_text_alignment
    };

    return (
      <section
        className="bc-panel-region"
        style={
          panelType == "vertical"
            ? verticalPanelStyle
            : panelType == "single"
            ? singlePanelStyle
            : horizontalPanelStyle
        }
      >
        {data.region_background_image ? (
          <LazyLoad
            offset={-100}
            once
            throttle={100}
            placeholder={<img className="bc-lazyload-default-img" src={imagePath + "Lazy-Load-Builder-card.png"} alt="Lazyload Placeholder Image" />}
          >
            <img
              src={
                this.state.checkDevice.isMobile || this.state.checkDevice.isTablet
                  ? imagePath + data.region_background_image_mb
                  : imagePath + data.region_background_image
              }
              alt={
                this.state.checkDevice.isMobile || this.state.checkDevice.isTablet
                  ? data.region_background_image_mb_alt_text
                  : data.region_background_image_alt_text
              }
              style={{ width: "100%", height: "100%", display: "block" }}
            />
          </LazyLoad>
        ) : null}

        <div
          className="colmd-12"
          style={
            this.state.checkDevice.isDesktop || this.state.checkDevice.isWide
              ? textDeskAlignment
              : null
          }
        >
          <div
            className={
              data.region_background_image_mb || data.region_background_image
                ? `bc-position-wrapper bc-image-over ${alignText} ${mobilePositionClassName}`
                : "bc-position-wrapper"
            }
            style={
              data.region_background_image &&
              (this.state.checkDevice.isDesktop ||
                this.state.checkDevice.isWide)
                ? imageOverTextDeskAlignment
                : null
            }
          >
            <div className="bc-position-content">
              {data.region_logo ? (
                <div className="bc-region-logo-container bc-region-container">
                  <LazyLoad
                    offset={-100}
                    once
                    throttle={100}
                    placeholder={<img className="bc-lazyload-default-img" src={imagePath + "Lazy-Load-Builder-card.png"} alt={data.region_logo_alt_text} />}
                  >
                    <img
                      className="bc-region-logo"
                      src={imagePath + data.region_logo}
                      alt={data.region_logo_alt_text}
                    />
                  </LazyLoad>
                </div>
              ) : null}
              {data.region_title ? (
                <div className="bc-region-title-container bc-region-container">
                  <h3 className="bc-region-title">
                    {parse(data.region_title)}
                  </h3>
                </div>
              ) : null}

              {data.region_body ? (
                <div className="bc-region-body-container bc-region-container bc-region-description">
                  {isHTML(data.region_body) ? (
                    parse(data.region_body)
                  ) : (
                    <p className="bc-region-body">{data.region_body}</p>
                  )}
                </div>
              ) : null}

              {data.region_vimeo_video_url ? (
                <LazyLoad
                  offset={-100}
                  once
                  throttle={100}
                  placeholder={<img className="bc-lazyload-default-img" src={imagePath + "Lazy-Load-Builder-card.png"} alt={data.region_logo_alt_text} />}
                >
                <BuilderCardVimeo data={this.props.data} /></LazyLoad>
              ) : data.region_youtube_video_url ? (
                <LazyLoad
                  offset={-100}
                  once
                  throttle={100}
                  placeholder={<img className="bc-lazyload-default-img" src={imagePath + "Lazy-Load-Builder-card.png"} alt={data.region_logo_alt_text} />}
                >
                  <BuilderCardYoutube data={this.props.data} />
                </LazyLoad>
              ) : null}

              {data.region_cta_text ? (
                <div className="bc-custom-cta-container">
                  <CTA
                    ctaHoverBackgroundColor={
                      this.props.data.region_cta_button_hover_background_color
                    }
                    ctaBackgroundColor={
                      this.props.data.region_cta_button_background_color
                    }
                    ctaHoverOpacity={
                      this.props.data.region_cta_button_hover_opacity
                    }
                    ctaOpacity={this.props.data.region_cta_button_opacity}
                    ctaHoverBorderColor={
                      this.props.data.region_cta_hover_outline_color
                    }
                    ctaBorderColor={this.props.data.region_cta_outline_color}
                    ctaHoverTextColor={
                      this.props.data.region_cta_hover_text_color
                    }
                    ctaTextColor={this.props.data.region_cta_text_color}
                    ctaAnchorTarget="0"
                    ctaText={this.props.data.region_cta_text}
                    ctaLink={this.props.data.region_cta_link}
                    click={() => panelDrawDisplay(panelDrawID)}
                  />
                </div>
              ) : null}
            </div>
          </div>
        </div>
      </section>
    );
  }
}

export default BuilderCardInnerSection;
