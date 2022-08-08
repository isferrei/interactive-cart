import React, { Fragment } from "react";
import YouTube from "react-youtube";
import "./fullBleedVideoCard.global.css";
import { handleResize, debounce } from "../../common/js/deviceDetection";
import loaderImg from "../../common/images/loading.gif";
import playIconImg from "../../common/images/icon_circleplay_100.svg";
import { imagePath } from "../../components/CommonProductLogic/index";
import {
  youTubeGetID,
  triggerScrollWindow,
  onStateChangeTrigger,
  playIconClick
} from "./fullBleedVideo";
import LazyLoad from 'react-lazyload';

class FullBleedYoutube extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      checkDevice: handleResize(),
      isLoaded: false,
      imgHeight: 0,
      defaultImgHeight: 0,
      playerObject: null
    };
    this.imgRef = React.createRef();
    this.defaultImgRef = React.createRef();
  }

  componentDidMount() {
    let current = this;
    window.addEventListener(
      "resize",
      debounce(function() {
        current.setState({ checkDevice: handleResize() });
      }, 500)
    );

    if (typeof this.imgRef !== "undefined" && this.imgRef.current) {
      this.imgRef.current.addEventListener("load", this.getCoverImageHeight);
    }

    if (
      typeof this.defaultImgRef !== "undefined" &&
      this.defaultImgRef.current
    ) {
      this.defaultImgRef.current.addEventListener(
        "load",
        this.getDefaultImageHeight
      );
    }

    this.handleOrientationChange();
  }

  // Get height of uploaded cover image.
  getCoverImageHeight = () => {
    let tmpImageHeight = this.imgRef.current.clientHeight;
    this.setState({ imgHeight: tmpImageHeight });
  };

  // Get height of default image.
  getDefaultImageHeight = () => {
    let tmpDefaultImageHeight = this.defaultImgRef.current.clientHeight;
    this.setState({ defaultImgHeight: tmpDefaultImageHeight });
  };

  handleOrientationChange = () => {
    window.addEventListener(
      "resize",
      () => {
        if (typeof this.imgRef !== "undefined" && this.imgRef.current) {
          this.getCoverImageHeight();
        }

        if (
          typeof this.defaultImgRef !== "undefined" &&
          this.defaultImgRef.current
        ) {
          this.getDefaultImageHeight();
        }
      },
      false
    );
  };

  render = () => {
    // Get youtube video id.
    let youtubeVideoId = youTubeGetID(this.props.data.fbv_video);
    // Set flag if no cover image is uploaded.
    let flag =
      (!this.props.data.fbv_bg_image_mobile &&
        this.state.checkDevice.isMobile) ||
      (!this.props.data.fbv_bg_image_desktop &&
        (this.state.checkDevice.isTablet ||
          this.state.checkDevice.isDesktop ||
          this.state.checkDevice.isWide))
        ? 1
        : 0;

    // Set video options.
    const optsDevice = {
      height: "100%",
      width: "100%",
      playerVars: {
        autoplay: this.props.data.fbv_toggle_muted_auto_play
          ? this.props.data.fbv_toggle_muted_auto_play
          : 0,
        controls: 0,
        showinfo: 0,
        playsinline: 1,
        mute: this.props.data.fbv_toggle_muted_auto_play
          ? this.props.data.fbv_toggle_muted_auto_play
          : 0,
        rel: 0,
        loop: 0,
        enablejsapi: 1,
        listType: "playlist",
        list: "PL" + youtubeVideoId,
        iv_load_policy: 3
      }
    };

    return (
      <Fragment>
        <div
          className={
            "full-bleed-video-card card-height-" +
            this.props.data.fbv_card_height
          }
          style={{
            height:
              flag &&
              this.state.defaultImgHeight > 0 &&
              this.props.data.fbv_card_height == "default"
                ? this.state.defaultImgHeight + "px"
                : !flag &&
                  this.props.data.fbv_card_height == "default" &&
                  this.state.imgHeight > 0
                ? this.state.imgHeight + "px"
                : "300px"
          }}
        >
          <div
            className={
              "fbvc-content" + (this.state.isLoaded ? " fbvc-loaded" : "")
            }
          >
            <div className="fbvc-headline-wrapper">
              {this.props.data.fbv_logo ? (
                <div className="fbvc-header-logo-wrapper">
                  <img
                    id={"fbvc-logo-" + youtubeVideoId}
                    src={imagePath + this.props.data.fbv_logo}
                    alt="fbvc logo"
                    className="fbvc-header-logo"
                    style={{
                      height:
                        this.state.checkDevice.isMobile &&
                        this.props.data.fbv_logo_height_mobile
                          ? this.props.data.fbv_logo_height_mobile + "px"
                          : this.state.checkDevice.isTablet &&
                            this.props.data.fbv_logo_height_tablet
                          ? this.props.data.fbv_logo_height_tablet + "px"
                          : this.state.checkDevice.isDesktop &&
                            this.props.data.fbv_logo_height_desktop
                          ? this.props.data.fbv_logo_height_desktop + "px"
                          : this.state.checkDevice.isWide &&
                            this.props.data.fbv_logo_height_wide
                          ? this.props.data.fbv_logo_height_wide + "px"
                          : "auto"
                    }}
                  />
                </div>
              ) : null}

              {this.props.data.fbv_headline ? (
                <div
                  className="fbvc-headline-text"
                  dangerouslySetInnerHTML={{
                    __html: this.props.data.fbv_headline
                  }}
                  style={{
                    color: "#" + this.props.data.fbv_headline_color
                  }}
                />
              ) : null}

              <div className="fbvc-loader-spinner-wrapper">
                <img
                  src={loaderImg}
                  alt="Loading..."
                  className="fbvc-loader-spinner"
                />

                {this.props.data.fbv_play_icon &&
                this.state.playerObject != null ? (
                  <img
                    src={imagePath + this.props.data.fbv_play_icon}
                    alt="Play Icon"
                    className="fbvc-play-btn"
                    onClick={e => playIconClick(e, this.state.playerObject)}
                  />
                ) : (
                  <img
                    src={playIconImg}
                    alt="Play Icon"
                    className="fbvc-play-btn"
                    onClick={e => playIconClick(e, this.state.playerObject)}
                  />
                )}
              </div>
            </div>
            {youtubeVideoId ? (
              <div className="fbvc-youtube-video">
                <LazyLoad
                  offset={-100}
                  once
                >
                  <YouTube
                    videoId={youtubeVideoId}
                    opts={optsDevice}
                    onReady={event => {
                      this.setState({ playerObject: event.target });
                      triggerScrollWindow(event.target);
                      if (this.state.playerObject != null) {
                        this.setState({ isLoaded: true });
                      }
                    }}
                    onStateChange={event => {
                      onStateChangeTrigger(event);
                    }}
                  />
                </LazyLoad>

                {flag ? (
                  <div className="fbvc-background-image-deafult">
                    <LazyLoad
                      offset={-100}
                      once
                      placeholder={<img
                        id={"fbvc-video-thumb-" + youtubeVideoId}
                        className="fbvc-video-thumb"
                        src={
                          "https://img.youtube.com/vi/" +
                          youtubeVideoId +
                          "/maxresdefault.jpg"
                        }
                        alt="fbvc video thumb"
                        ref={this.defaultImgRef}
                      />}
                    >
                      <img
                        id={"fbvc-video-thumb-" + youtubeVideoId}
                        className="fbvc-video-thumb"
                        src={
                          "https://img.youtube.com/vi/" +
                          youtubeVideoId +
                          "/maxresdefault.jpg"
                        }
                        alt="fbvc video thumb"
                        ref={this.defaultImgRef}
                      ></img>
                    </LazyLoad>
                  </div>
                ) : null}
              </div>
            ) : null}

            <div className="fbvc-background-image-wrapper">
              {!flag &&
              this.props.data.fbv_bg_image_mobile &&
              this.state.checkDevice.isMobile ? (
                <div className="fbvc-background-image-mobile">
                  <img
                    id={"fbvc-video-thumb-" + youtubeVideoId}
                    src={imagePath + this.props.data.fbv_bg_image_mobile}
                    alt="fbvc video thumb"
                    ref={this.imgRef}
                  ></img>
                </div>
              ) : null}
              {!flag &&
              this.props.data.fbv_bg_image_desktop &&
              (this.state.checkDevice.isTablet ||
                this.state.checkDevice.isDesktop ||
                this.state.checkDevice.isWide) ? (
                <div className="fbvc-background-image-desktop">
                  <img
                    id={"fbvc-video-thumb-" + youtubeVideoId}
                    src={imagePath + this.props.data.fbv_bg_image_desktop}
                    alt="fbvc video thumb"
                    ref={this.imgRef}
                  ></img>
                </div>
              ) : null}
            </div>
          </div>
        </div>
      </Fragment>
    );
  };
}

export default FullBleedYoutube;
