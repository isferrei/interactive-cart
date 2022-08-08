import React, { useState, useRef, useEffect } from "react";
import ReactPlayer from "react-player";
import { handleResize, debounce } from "../../common/js/deviceDetection";

import "./displayCard.global.css";

const Display = props => {
  const { display_card_title, display_card_bg_color, desktop_video_url, tablet_video_url, mobile_video_url, description } = props.data;

  const [device, setDevice] = useState(handleResize());
  const deviceDetectRef = useRef(device);
  const whichDevice = handleResize();

  const [isTabletPotrait, setIsTabletPotrait] = useState(false);

  const title = display_card_title || '';  
  const display = description || [];
  const displayCardBgColor = display_card_bg_color || '';

  const [play, setPlay] = useState(true);

  const activeVideo = () => {
    const element = document.getElementById("display-card");
    const coords = element.getBoundingClientRect();
    // eslint-disable-next-line radix
    const top = parseInt(coords.top) - 200;
    const elementHeight = (element.offsetHeight + 200) * -1;

    if (!play && top <= 0 && top >= elementHeight) {
      setPlay(true);
    } else if ((play && top > 0) || (play && top <= elementHeight)) {
      setPlay(false);
    }
  };

  const debounce = (func, delay) => {
    let inDebounce;

    return function time(...args) {
      const contextThis = this;

      clearTimeout(inDebounce);
      inDebounce = setTimeout(() => func.apply(contextThis, args), delay);
    };
  };

  window.onscroll = debounce(function scrolling() {
    activeVideo();
  }, 100);

  useEffect(() => {
    deviceDetectRef.current = device;
    window.addEventListener("resize", detectDevice);

    return () => {
      window.removeEventListener("resize", detectDevice);
    };
  }, [device]);

  const detectDevice = () => {
    setDevice(handleResize());
    if((whichDevice.isTablet || device.isTablet) && (window.matchMedia("(orientation: portrait)").matches)) {
      setIsTabletPotrait(true);
    } else {
      setIsTabletPotrait(false);
    }
  }

  const linkVideo = whichDevice.isMobile 
    || device.isMobile 
    || ((whichDevice.isTablet
      || device.isTablet)
      && (window.matchMedia("(orientation: portrait)").matches))
    ?  mobile_video_url
    : desktop_video_url;

  return (
    <div id="display-card"
      className="display-card"
    >
      <section className="display-card-container w-100 h-auto" style={{backgroundColor: `#${displayCardBgColor}`}}>
        <h2
          className="tc fw5"
          dangerouslySetInnerHTML={{ __html: title }}
        />
        <div className="display-card-containerVideo w-100 relative flex justify-center">
          <ReactPlayer
            id="display-card-vimeo-videoid"
            className="display-card-react-player"
            url={linkVideo}            
            frameBorder="0"
            controls={false}
            height={'100%'}
            width={'100%'}
            muted
            loop
            autoplay
            playsinline
            playing={ true }
          />
        </div>
        <div className="display-card-specs justify-center">
          {display.map((item, index) => (
            <div key={index}>
              <h3
                className="highlight title-specs"
                dangerouslySetInnerHTML={{ __html: item.title }}
              />
              <p
                className="description-specs"
                dangerouslySetInnerHTML={{ __html: item.description }}
              />
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Display;