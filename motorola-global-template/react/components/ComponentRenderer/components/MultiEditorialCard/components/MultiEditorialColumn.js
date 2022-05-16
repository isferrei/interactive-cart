import React from "react";
import YouTube from 'react-youtube';
import "./multiEditorialColumn.global.css";
import CTA from "../../CTA/index";
import { imagePath } from "../../CommonProductLogic/index";
import { youTubeGetID, setTextColorForH5H6Tags, playIconClick, onStateChangeTrigger, triggerScrollWindow, setBackgroundColorForFourColCard } from "./multiEditorial";
import playIconImg from "../../../common/images/icon_circleplay_100.svg";
import MultiEditorialVimeo from "./MultiEditorialVimeo";
import LazyLoad from 'react-lazyload';

class MultiEditorialColumn extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      playerObject: null,
      imgHeight: 0
    };
    this.colRef = React.createRef();
    this.imgRef = React.createRef();
    this.descRef = React.createRef();
  }

  componentDidMount() {
    if ((typeof this.imgRef !== 'undefined') && this.imgRef.current) {
      this.imgRef.current.addEventListener('load', this.getCoverImageHeight);
    }

    if ((typeof this.descRef !== 'undefined') && this.descRef.current) {
      setTextColorForH5H6Tags(this.descRef.current, this.props.device, this.props.data);
    }

    // Setting background color.
    setBackgroundColorForFourColCard(this.colRef.current, this.props.count);

    this.handleOrientationChange();
  }

  // Get height of uploaded cover image.
  getCoverImageHeight = () => {
    let tmpImageHeight = this.imgRef.current.clientHeight;
    this.setState({ imgHeight: tmpImageHeight });
  }

  handleOrientationChange = () => {
    window.addEventListener("resize", () => {
      if ((typeof this.imgRef !== 'undefined') && this.imgRef.current) {
        this.getCoverImageHeight();
      }
    }, false);
  }

  render() {
    // Get youtube video id.
    let youtubeVideoId = this.props.data.mcedi_video ? youTubeGetID(this.props.data.mcedi_video) : null;
    // Set video options.
    const optsDevice = {
      height: this.state.imgHeight + "px",
      width: '100%',
      playerVars: {
        autoplay: 0,
        controls: 0,
        showinfo: 0,
        playsinline: 1,
        mute: 0,
        rel: 0,
        loop: 0,
        enablejsapi: 1,
        listType: "playlist",
        list: "PL" + youtubeVideoId,
        iv_load_policy : 3 }
    }
    return (
      <div
        className={"mec-multi-editorial-column cols-" + this.props.count}
      >
        <div
          className="mec-column-wrapper"
          style={{
            backgroundColor:
              (this.props.device.isMobile && this.props.data.mcedi_cl_bg_color_mobile) ? "#" + this.props.data.mcedi_cl_bg_color_mobile
              : (this.props.device.isDesktop && this.props.data.mcedi_cl_bg_color_desktop) ? "#" + this.props.data.mcedi_cl_bg_color_desktop
              : (!this.props.device.isMobile && !this.props.device.isDesktop && this.props.data.mcedi_cl_bg_color_desktop) ? "#" + this.props.data.mcedi_cl_bg_color_desktop
              : '#ffffff',
          }}
          ref={this.colRef}>
          {(this.props.data.mcedi_type == 1) ?
            <div className="mec-image">
              <LazyLoad
                offset={-100}
                once
                placeholder={<img className="mec-lazyload-default-img" src={imagePath + "Lazy-Load-Square-batwing-03.png"} alt="Lazyload Placeholder Image" />}>
              <img
                src={imagePath + ((this.props.device.isMobile && this.props.data.mcedi_image_mobile) ? this.props.data.mcedi_image_mobile
                  : (this.props.device.isDesktop && this.props.data.mcedi_image_desktop) ? this.props.data.mcedi_image_desktop
                  : this.props.data.mcedi_image_desktop)}
                alt={((this.props.device.isMobile && this.props.data.mcedi_image_mobile_alt_text) ? this.props.data.mcedi_image_mobile_alt_text
                  : (this.props.device.isDesktop && this.props.data.mcedi_image_desktop_alt_text) ? this.props.data.mcedi_image_desktop_alt_text
                  : this.props.data.mcedi_image_desktop_alt_text)}
              />
              </LazyLoad>
            </div>
            : (<div className="mec-video">
                {this.props.data.mcedi_vimeo_video ? (<MultiEditorialVimeo data={this.props.data} />) : youtubeVideoId ?
                  (<div
                    className="mec-video-wrapper"
                    style={{
                      height: this.state.imgHeight + "px"
                    }}
                  >
                    <LazyLoad
                      offset={-100}
                      once
                    >
                    <YouTube
                    videoId={youtubeVideoId}
                    opts={optsDevice}
                    onReady= {(event) => {
                      this.setState({ playerObject : event.target });
                      triggerScrollWindow(event.target);
                    }}
                    onStateChange= {(event) => {
                      onStateChangeTrigger(event);
                    }}
                  /></LazyLoad>
                  <div
                    className="mec-background-image"
                    style={{
                      height: (this.state.imgHeight + 4) + "px"
                    }}
                  >
                <LazyLoad
                  offset={-100}
                  once
                  placeholder={<img
                    id={"mec-video-thumb-" + youtubeVideoId}
                    className="mec-video-thumb"
                    src={"https://img.youtube.com/vi/" + youtubeVideoId + "/maxresdefault.jpg"}
                    alt="Youtube Icon"
                    ref={this.imgRef}
                  />}
                >
                    <img
                      id={"mec-video-thumb-" + youtubeVideoId}
                      className="mec-video-thumb"
                      src={"https://img.youtube.com/vi/" + youtubeVideoId + "/maxresdefault.jpg"}
                      alt="Youtube Icon"
                      ref={this.imgRef}
                    >
                    </img>
                    </LazyLoad>
                  </div>
                  {this.state.playerObject != null?
                    <div className="mec-play-btn-wrapper"><img
                      src={playIconImg}
                      alt="Play Icon"
                      className="mec-play-btn"
                      onClick={(e) => playIconClick(e, this.state.playerObject)} /></div> : null}
                    </div>)
                : null}
            </div>)
          }
          {this.props.data.mcedi_text ?
            (<div
              className="mec-description"
              dangerouslySetInnerHTML={{
                __html: this.props.data.mcedi_text
              }}
              ref={this.descRef}
              style={!this.props.device.isMobile?{ textAlign: this.props.data.text_alignment }:null}
              />) : null
          }
          {this.props.data.mcedi_cta_button_text ?
            (<div
              className="mec-cta"
            >
              <CTA
                ctaHoverBackgroundColor={
                  this.props.data.mcedi_cta_button_hover_background_color
                }
                ctaBackgroundColor={
                  this.props.data.mcedi_cta_button_background_color
                }
                ctaHoverOpacity={this.props.data.mcedi_cta_button_hover_opacity}
                ctaOpacity={this.props.data.mcedi_cta_button_opacity}
                ctaHoverBorderColor={
                  this.props.data.mcedi_cta_button_hover_outline_color
                }
                ctaBorderColor={this.props.data.mcedi_cta_button_outline_color}
                ctaHoverTextColor={this.props.data.mcedi_cta_button_hover_text_color}
                ctaTextColor={this.props.data.mcedi_cta_button_text_color}
                ctaAnchorTarget={this.props.data.mcedi_cta_button_target}
                ctaText={this.props.data.mcedi_cta_button_text}
                ctaLink={this.props.data.mcedi_cta_button_link}
              />
            </div>) : null
          }
        </div>
      </div>
    )
  }
}

export default MultiEditorialColumn;
