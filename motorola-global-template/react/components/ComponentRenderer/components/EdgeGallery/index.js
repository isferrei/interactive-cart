import React, { useState, useEffect, useRef } from "react";
import { SliderLayout } from "vtex.slider-layout";
import { useDevice } from "vtex.device-detector";
import ReactPlayer from "react-player";
import { throttle } from "lodash";

import "./EdgeGallery.global.css";

const EdgeGallery =
  props => {
    const {
      gallery,
      scrollText,
      showOnTop,
      showBulletDots,
      showInsideArrows,
      title
    } = props.data;

    const { device } = useDevice();
    const [playVideo, setPlayVideo] = useState(false);

    const videoPlayer = useRef(null);

    const handleScrollThrottle = throttle(handleScroll, 250);

    useEffect(() => {
      document.addEventListener("scroll", handleScrollThrottle);

      return () => document.removeEventListener("scroll", handleScrollThrottle);
    }, [handleScrollThrottle]);

    function handleScroll() {
      const scrollTop = window.pageYOffset;

      const positionBottom = scrollTop + window.innerHeight;

      if (videoPlayer.current) {
        const videoVtop = videoPlayer.current.offsetTop;

        const videoVBottom = videoPlayer.current.getBoundingClientRect().bottom;

        if (positionBottom > videoVtop && videoVBottom > 0) {
          setPlayVideo(true);
        } else {
          setPlayVideo(false);
        }
      }
    }

    return (
      <section
        className="mv8 ph6 ph0-l edge-gallery"
        id="edge-gallery"
        ref={videoPlayer}
      >
        <div className="eg-container">
          {title && (
            <h3
              className={`title center ${showOnTop ? "tl tc-l" : "tc"
                } white f3 f1-l fw4 ma0 w-100`}
              dangerouslySetInnerHTML={{ __html: title }}
            />
          )}
          {scrollText && (
            <div className="flex justify-center items-center center mt7">
              <img
                src="https://motorolaimgrepo.vteximg.com.br/arquivos/icon-material-arrow-left.svg"
                alt="Arrow Left"
                className="h1 w1"
              />
              <p
                className="white f5 ph6 fw4 tc ma0"
                dangerouslySetInnerHTML={{ __html: scrollText }}
              />
              <img
                src="https://motorolaimgrepo.vteximg.com.br/arquivos/icon-material-arrow-right.svg"
                className="h1 w1"
                alt="Arrow Right"
              />
            </div>
          )}
          <div
            className={`gallery ${showOnTop ? `galleryTop` : `galleryBottom mt7`
              } ${showBulletDots ? `showBulletDots` : ""} ${showBulletDots && !showOnTop ? `showBulletDotsBottom` : ""
              } ${showInsideArrows ? `showInsideArrows` : ""} ${showInsideArrows && !showOnTop ? `showInsideArrowsBottom` : ""
              }`}
          >
            <SliderLayout
              slideTransition={{ speed: 600, delay: 0, timing: "ease-in-out" }}
              itemsPerPage={{ desktop: 1, tablet: 1, phone: 1 }}
              infinite
            >
              {gallery ? gallery.map((galleryItem, galleryIndex) => (
                <div className="w-100" key={galleryIndex}>
                  {showOnTop && galleryItem.title && (
                    <h3
                      className="white f3 f1-l tl tc-l fw4 ma0 w-100"
                      dangerouslySetInnerHTML={{ __html: galleryItem.title }}
                    />
                  )}
                  {showOnTop && galleryItem.description && (
                    <p
                      className="white tl tc-l f5 fw4 mt7 mb7 w-100 w-auto-l"
                      dangerouslySetInnerHTML={{
                        __html: galleryItem.description
                      }}
                    />
                  )}
                  <div
                    className={`galleryItem ${galleryItem.caption ? `galleryItemText` : ""
                      } relative overflow-hidden`}
                    style={{
                      backgroundImage: `url(${!galleryItem.video &&
                        (device === "phone"
                          ? galleryItem.image.mobileSrc ||
                          galleryItem.image.mobile
                          : galleryItem.image.desktopSrc ||
                          galleryItem.image.desktop)
                        })`
                    }}
                  >
                    {galleryItem.video && (
                      <ReactPlayer
                        id="video-v"
                        url={
                          device === "phone"
                            ? galleryItem.video.mobile
                            : galleryItem.video.desktop
                        }
                        frameBorder="0"
                        playsinline
                        controls={false}
                        muted
                        autoPlay={false}
                        loop
                        height="100%"
                        playing={playVideo}
                      />
                    )}
                    <div
                      className={`flex items-center absolute ${showBulletDots ? "mb7" : ""
                        }`}
                    >
                      {galleryItem.caption && (
                        <span
                          className={`text z-3 white`}
                          dangerouslySetInnerHTML={{
                            __html: galleryItem.caption
                          }}
                        />
                      )}
                      {galleryItem.badges ? galleryItem.badges.map((badgeItem, badgeIndex) => (
                        <span
                          className={`badge ${badgeItem.backgroundColor ? "pv3 ph6" : " "
                            } z-3 mr3`}
                          key={badgeIndex}
                          style={{ background: badgeItem.backgroundColor }}
                        >
                          <img
                            src={badgeItem.imageSrc || badgeItem.image}
                            alt="Badge"
                          />
                        </span>
                      )) : null}
                    </div>
                  </div>
                  {!showOnTop && galleryItem.title && (
                    <h3
                      className="white f3 tc fw4 ma0 mt9 w-100"
                      dangerouslySetInnerHTML={{ __html: galleryItem.title }}
                    />
                  )}
                  {!showOnTop && galleryItem.description && (
                    <p
                      className="white tc f5 fw4 mt8 mb0 w-100 w-auto-l"
                      dangerouslySetInnerHTML={{
                        __html: galleryItem.description
                      }}
                    />
                  )}
                </div>
              )) : null}
            </SliderLayout>
          </div>
        </div>
      </section>
    );
  };

export default EdgeGallery;
