import React, { Component } from 'react';
import ReactPlayer from "react-player";
import { handleResize } from "../../common/js/deviceDetection";
import { isInViewport } from "./PdpAutoplayVideoCardHelper";
import "./PdpAutoplayVideoCard.global.css";

class PdpAutoplayVideoCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      playingVideo: false,
      deviceType: handleResize(),
    };
  }

  componentDidMount() {
    this.setState({ deviceType: handleResize() });

    if(document.getElementById('pavc-vimeo-videoid')) {
      this.handleScroll('pavc-vimeo-videoid');
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
      headline, 
      sub_headline, 
      desktop_video_url, 
      tablet_video_url, 
      mobile_video_url 
    } = this.props.data;

    const {
      deviceType: { isMobile, isTablet }
    } = this.state;

    const { playingVideo } = this.state;

    return (
      <div
        className="pdp-autoplay-video-card"
        id="pdp-autoplay-video-card"
      >
        <div className="pavc__video">
          <div className="pavc__details-container">
            <h3 className="pavc__heading">{ headline } </h3>
            <p className="pavc__subheading"> { sub_headline }</p>
            <p>{ playingVideo }</p>
          </div>
          <div className='pavc__player-wrapper'>
            <ReactPlayer
              id="pavc-vimeo-videoid"
              className="react-player pavc__video-player"
              url={ isMobile && mobile_video_url !== null ? 
                mobile_video_url : isTablet && tablet_video_url !== null ?  
                tablet_video_url: desktop_video_url }
              muted
              loop
              autoPlay
              playsinline
              playing={ true }
              height={'100%'}
              width={'100%'}
              frameBorder="0"
            />
          </div>
        </div>
      </div>
    );
  };
}

export default PdpAutoplayVideoCard;
