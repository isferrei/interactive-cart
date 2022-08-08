import React, { Component } from "react";
import ReactPlayer from "react-player";
import { isInViewport, isIosDevice } from "./SizzleVideoPlayerFunctions";

class SizzleVideoPlayer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      playIconFlag: false,
      playPauseFlag: false,
      playingVideo: false,
      iosDeviceFlag: false,
      pauseIconFlag: false,
    };
  }

  componentDidMount() {
    this.setState({ iosDeviceFlag: isIosDevice() });
  }

  playIconClicked = () => {
    if (!this.state.playIconFlag) {
      this.setState({ playingVideo: false });
    } else {
      this.setState({ playingVideo: true });
    }
    this.setState({
      playIconFlag: true,
      playPauseFlag: true
    });
  }

  pauseIconClicked = () => {
    this.setState({ playingVideo: false });
  }

  handlePlay = () => {
    this.setState({
      playPauseFlag: true,
      pauseIconFlag: true
    });
  }

  handlePause = () => {
    this.setState({ playPauseFlag: false });
  }

  handleEnded = () => {
    this.setState({
      playPauseFlag: true,
      pauseIconFlag: false
    });
  }

  handleScroll = (playerObject, autoplay) => {
    window.addEventListener("scroll", () => { this.triggerScrollWindow(playerObject, autoplay) });
  }

  triggerScrollWindow = (playerObject, autoplay) => {
    if (document.getElementById(playerObject) && !isInViewport(playerObject)) {
      this.setState({ playingVideo: false });
    }
    if (document.getElementById(playerObject) && isInViewport(playerObject) && autoplay === true) {
      this.setState({ playingVideo: true });
    }
  }

  render = () => {
    const { headline, description, intro_video_url, main_video_url } = this.props.data.data;
    const { indexProp } = this.props.data;

    return (
      <div className={`sv-container ${(this.state.iosDeviceFlag && this.state.playIconFlag) ? 'align-ios' : ''}`}>
        <div className="container">
          <div className="sv-wrapper">
            {intro_video_url && !this.state.playIconFlag ? (
              <div id="sv-intro-video" className={`sv-intro-video ${!this.state.playPauseFlag && !this.state.playIconFlag ? 'active' : ''}`}>
                <div className="sv-intro-video-player">
                  <ReactPlayer
                    id={"sv-react-player-intro-" + indexProp}
                    className="sv-react-player"
                    url={intro_video_url}
                    frameBorder="0"
                    playsinline={true}
                    controls={false}
                    muted={true}
                    loop={true}
                    height="100%"
                    width="100%"
                    playing={this.state.playingVideo}
                    onReady={event => {
                      this.handleScroll('sv-react-player-intro-' + indexProp, true);
                    }}
                  />
                </div>
              </div>
            ) : null}
            {main_video_url && this.state.playIconFlag ? (
              <div className={`sv-main-video ${!this.state.playPauseFlag && this.state.playIconFlag ? 'active' : ''}`} >
                <div className="sv-main-video-player">
                  <ReactPlayer
                    id={"sv-react-player-main-" + indexProp}
                    className="sv-react-player"
                    url={main_video_url}
                    frameBorder="0"
                    playsinline={true}
                    controls={this.state.iosDeviceFlag ? true : false}
                    muted={false}
                    loop={false}
                    height="100%"
                    width="100%"
                    playing={this.state.playingVideo}
                    onReady={event => {
                      this.setState({ playingVideo: true });
                      this.handleScroll('sv-react-player-main-' + indexProp, false);
                    }}
                    onPlay={this.handlePlay}
                    onPause={this.handlePause}
                    onEnded={this.handleEnded}
                  />
                  {this.state.playIconFlag && this.state.playingVideo && this.state.pauseIconFlag ? (
                      <div className="sv-pause-icon" onClick={() => this.pauseIconClicked()}></div>
                  ) : null}
                </div>
              </div>
            ) : null}
            {!this.state.playPauseFlag ? (
              <div className="sv-content-wrapper">
                <div className="sv-play-icon" onClick={() => this.playIconClicked()}></div>
                <h3 className="sv-headline">{headline}</h3>
                <h6 className="sv-description" dangerouslySetInnerHTML={{
                  __html: description
                }}
                />
              </div>
            ) : null}

          </div>
        </div>
      </div>
    );
  }
}

export default SizzleVideoPlayer;