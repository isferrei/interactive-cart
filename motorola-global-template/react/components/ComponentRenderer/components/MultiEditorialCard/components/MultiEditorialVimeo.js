import React, { Component } from "react";
import "./multiEditorialVimeo.global.css";
import { handleResize, debounce } from "../../../common/js/deviceDetection";
import { getVimeoId, buildURLQuery } from "./multiEditorialVimeoFunctions";
import loadVimeo from "./multiEditorialLoadVimeo";
import { imagePath } from "../../CommonProductLogic/index";
import LazyLoad from 'react-lazyload';

class MultiEditorialVimeo extends Component {
  constructor(props) {
    super(props);
    this.state = {
        checkDevice: handleResize()
    };
    loadVimeo.exec();
  }
  componentDidMount() {
    let current = this;
    window.addEventListener(
      "resize",
      debounce(function() {
        current.setState({ checkDevice: handleResize() });
      }, 200)
    );
  }

  render() {
    const { data } = this.props;
    // Get vimeo video id.
    let vimeoVideoId = getVimeoId(data.mcedi_vimeo_video);
    //let vimeoVideoId="372485450";
    let vimeoURL = "https://player.vimeo.com/video/" + vimeoVideoId;

    // random id
    let randomIframeId = `mec-vimeo-video-${Math.floor(
      1 + Math.random() * (200 - 1)
    )}-${Math.floor(1 + Math.random() * (200 - 1))}`;
    // config options
    const configOptions = {
      byline: 0,
      title: 0,
      portrait: 0
    };
    if (Object.keys(configOptions).length) {
      vimeoURL = vimeoURL + "?" + buildURLQuery(configOptions);
    }
    // height values fixed
    let fixedHeight = "200px";
    if(this.state.checkDevice.isWide){
      fixedHeight = "210px";
    }
    if(this.state.checkDevice.isDesktop){
      fixedHeight = "165px";
    }
    if(this.state.checkDevice.isTablet){
      fixedHeight = "125px";
    }
    if(this.state.checkDevice.isMobile){
      fixedHeight = "200px";
    }
    return (
      <div className="mec-vimeo-wrapper" style={{height:fixedHeight}}>
        {vimeoVideoId ? (
            <LazyLoad
              offset={-300}
              once
              throttle={300}
              placeholder={<img className="mec-lazyload-default-img" src={imagePath + "Lazy-Load-Square-batwing-03.png"} alt="Lazyload Placeholder Image" />}
            >
              <iframe
                src={vimeoURL}
                id={randomIframeId}
                width="100%"
                height="100%"
                frameBorder="0"
              ></iframe>
            </LazyLoad>
        ) : null}
      </div>
    );
  }
}

export default MultiEditorialVimeo;
