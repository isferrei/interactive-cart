import React, { Fragment } from "react";
import "./fullBleedVimeo.global.css";
import { getVimeoId, buildURLQuery } from "./fullBleedVimeoFunctions";
import loadVimeo from "./fullBleedLoadVimeo";
import { imagePath } from "../CommonProductLogic/index";
import LazyLoad from 'react-lazyload';

class FullBleedVimeo extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    loadVimeo.exec();
  }

  componentWillUnmount() {
    loadVimeo.terminateMethodCall();
  }

  render() {
    // Get youtube video id.
    let vimeoVideoId = getVimeoId(this.props.data.fbv_vimeo);
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
      muted: this.props.data.fbv_toggle_muted_auto_play,
      loop: this.props.data.fbv_toggle_muted_auto_play,
      background: this.props.data.fbv_toggle_muted_auto_play
    };
    if (Object.keys(configOptions).length) {
      vimeoURL = vimeoURL + "?" + buildURLQuery(configOptions);
    }

    return (
      <Fragment>
        <div className="full-bleed-video-card">
          <div
            className={
              "fbvc-vimeo-wrapper card-height-" +
              this.props.data.fbv_card_height
            }
          >
            {vimeoVideoId ? (
              <div className="fbvc-vimeo-video">
                <LazyLoad
                  offset={-300}
                  once
                  throttle={300}
                  placeholder={<img className="fbvc-lazyload-default-img" src={imagePath + "Lazy-Load-Full-bleed-card.png"} alt="Lazyload Placeholder Image" />}
                >
                  <iframe
                    src={vimeoURL}
                    id={randomIframeId}
                    width="100%"
                    height="100%"
                    frameBorder="0"
                    data-playflag={this.props.data.fbv_toggle_muted_auto_play}
                  ></iframe>
                </LazyLoad>
              </div>
            ) : null}
          </div>
        </div>
      </Fragment>
    );
  }
}

export default FullBleedVimeo;
