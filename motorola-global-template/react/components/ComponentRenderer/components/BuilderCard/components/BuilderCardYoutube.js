import React, { Component } from "react";
import "./builderCardYoutube.global.css";
import { youTubeGetID } from "./BuilderCardFunctions";
import loadYoutube from "./BuilderCardLoadYouTube";

class BuilderCardYoutube extends Component {
  constructor(props) {
    super(props);
    this.state = {
      playerObject: null
    };
  }

  componentDidMount() {
    loadYoutube.exec();
  }

  componentWillUnmount() {
    loadYoutube.terminateMethodCall();
  }

  render() {
    const { data } = this.props;
    let youtubeVideoId = youTubeGetID(data.region_youtube_video_url);

    return (
      <div className="bc-builder-video-container">
        <div className="bc-video-wrapper">
          <div
            id={`builder-yt-video-${Math.floor(
              1 + Math.random() * (200 - 1)
            )}-${Math.floor(1 + Math.random() * (200 - 1))}`}
            style={{ width: "100%", height: "100%" }}
            data-ytsrc={youtubeVideoId}
            data-playflag={data.scroll_play_pause_enable}
          ></div>
        </div>
      </div>
    );
  }
}

export default BuilderCardYoutube;
