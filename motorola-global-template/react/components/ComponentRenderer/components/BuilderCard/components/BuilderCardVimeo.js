import React, { Component } from "react";
import "./builderCardVimeo.global.css";
import { getVimeoId, buildURLQuery } from "./BuilderCardVimeoFunctions";
import loadVimeo from "./BuilderCardLoadVimeo";
import ReactPlayer from "react-player";

class BuilderCardVimeo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      playerObject: null
    };
  }

  componentDidMount() {
    loadVimeo.exec();
  }

  componentWillUnmount() {
    loadVimeo.terminateMethodCall();
  }

  render() {
    const { data } = this.props;
    // Get vimeo video id.
    let vimeoVideoId = getVimeoId(data.region_vimeo_video_url);
    let vimeoURL = "https://player.vimeo.com/video/" + vimeoVideoId;

    // random id
    let randomIframeId = `vimeo-video-${Math.floor(
      1 + Math.random() * (200 - 1)
    )}-${Math.floor(1 + Math.random() * (200 - 1))}`;
    // config options
    const configOptions = {
      byline: 0,
      title: 0,
      portrait: 0,
      autoplay: 0,
      muted: data.scroll_vimeo_play_pause_enable,
      loop: data.scroll_vimeo_play_pause_enable,
      background: data.scroll_vimeo_play_pause_enable
    };
    if (Object.keys(configOptions).length) {
      vimeoURL = vimeoURL + "?" + buildURLQuery(configOptions);
    }

    return (
      <div className="bc-builder-video-container">
        {vimeoVideoId ? (
          <div className="fbvc-vimeo-video">
            {data.vimeo_autoplay ? (
              <ReactPlayer
                url={
                  data.region_vimeo_url_ignore
                    ? data.region_vimeo_video_url
                    : vimeoURL
                }
                frameBorder="0"
                playsinline
                muted
                loop
                autoPlay
                controls={false}
                playing
                width="100%"
              />
            ) : (
              <iframe
                src={
                  data.region_vimeo_url_ignore
                    ? data.region_vimeo_video_url
                    : vimeoURL
                }
                id={randomIframeId}
                width="100%"
                height="100%"
                frameBorder="0"
                data-playflag={data.scroll_vimeo_play_pause_enable}
              ></iframe>
            )}
          </div>
        ) : null}
      </div>
    );
  }
}

export default BuilderCardVimeo;
