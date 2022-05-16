import React, { Component } from "react";
import ReactPlayer from "react-player";
import { isInViewport } from "./CameralistFunctions";
import {
  handleResize,
  debounce
} from "../../../ComponentRenderer/common/js/deviceDetection";

class Cameralist extends Component {
  constructor(props) {
    super(props);
    this.state = {
      playingVideo: false,
      checkDevice: handleResize(),
    };
  }

  componentDidMount() {
    this.setState({ checkDevice: handleResize() });
    window.addEventListener(
      "resize",
      debounce(() => {
        this.setState({ checkDevice: handleResize() });
        this.detectCameraSelfieImage();
      }, 500)
    );
    this.detectCameraSelfieImage();
  }

  detectCameraSelfieImage = () => {    
    const {
      desktopImageUrl,
      mobileImageUrl,
    } = this.props;
    const {
      checkDevice: { isMobile, isTablet, isDesktop }
    } = this.state;
    this.setState({
      cameraSelfieImage: desktopImageUrl
    });
    if (isMobile) {
      this.setState({
        cameraSelfieImage: mobileImageUrl
      });
    }
  }

  handleScroll = (playerObject) => {
    window.addEventListener("scroll", () => { this.triggerScrollWindow(playerObject) });
  }

  triggerScrollWindow = (playerObject) => {    
    if (document.getElementById(playerObject) && isInViewport(playerObject)) {
      this.setState({ playingVideo: true });
    } else {
      this.setState({ playingVideo: false });
    }
  }

  render = () => {
    const {
      videoUrl,
      headline,
      description,
      contentPosition,
      imageAltText,
      id
    } = this.props;

    return (
      <div id={`cs-items-section-${id}`} className="cs-items-wrapper">
        {videoUrl != null && videoUrl != undefined && videoUrl != ""  ?
          <div className={`cs-items-video ${this.state.playingVideo ? 'active' : ''}`}>
            <div className="cs-items-video-player">
              <ReactPlayer
                id={`cs-react-player-${id}`}
                className="cs-react-player-item"
                url={videoUrl}
                frameBorder="0"
                playsinline={true}
                controls={false}
                muted={true}
                autoPlay={false}
                loop={true}
                height="100%"
                width="100%"
                playing={this.state.playingVideo}
                onReady={event => {
                  this.handleScroll(`cs-react-player-${id}`);
                }}
              />
            </div>
          </div>
          :
          <div className="cs-items-image"><img src={this.state.cameraSelfieImage} alt={imageAltText}/></div>
        }
        <div className={`cs-content-wrapper cs-align-${contentPosition} ${videoUrl ? 'cs-content-video' : 'cs-content-image'}`}>
          <div className="cs-content-box">
            {headline != null ? <h3 className="cs-headline">{headline}</h3> : null}
            {description != null ? <h6 className="cs-description" dangerouslySetInnerHTML={{
              __html: description
            }}          
            /> : null}
          </div>
        </div>
      </div>
    );
  };
}

export default Cameralist;