import React, { useState, useEffect, useRef } from "react";
import classNames from "classnames";
import styles from "./CameraOverview.modules.css";
import ReactPlayer from "react-player";
import { useDevice } from "vtex.device-detector";

type CameraOverviewProps = {
  headline?: string;
  autoloop?: boolean;
  backgroundColor?: string;
  cameras: {
    description: string;
    videoUrl?: string;
    imageUrl?: string;
    videoMobileUrl?: string;
    imageMobileUrl?: string;
    buttonTitle: string;
  }[];
};

const CameraOverview: React.FC<CameraOverviewProps> = ({
  headline,
  backgroundColor,
  cameras = [],
  autoloop = true
}) => {
  const [current, setCurrent] = useState(0);
  const [isVideoPlaying, setVideoPlaying] = useState(false);

  const { device } = useDevice();

  const loopInterval = useRef(null);

  useEffect(() => {
    if (autoloop && isVideoPlaying) {
      loopInterval.current = setInterval(() => {
        setCurrent(current => {
          if (current === cameras.length - 1) return 0;
          return current + 1;
        });
      }, 7500);
      return () => clearInterval(loopInterval.current);
    }
  }, [autoloop, isVideoPlaying]);

  return cameras.length > 0 ? (
    <div
      className={styles["camera-overview-wrapper"]}
      style={{ backgroundColor }}
    >
      <div className={styles["camera-container"]}>
        {cameras.map((button, i) => {
          const active = current === i;
          return (
            <div
              key={`camera-${i}`}
              className={classNames(
                styles["camera-media-wrapper"],
                styles[`media-${active ? "active" : "inactive"}`]
              )}
            >
              <div className={styles["camera-media"]}>
                <div className={styles["camera-player"]}>
                  {!!(button.videoUrl || button.videoMobileUrl) ? (
                    <ReactPlayer
                      id="video-v1"
                      className={styles["react-player"]}
                      url={
                        device === "desktop" || device === "tablet"
                          ? button.videoUrl
                          : button.videoMobileUrl
                      }
                      frameBorder="0"
                      playsinline
                      loop
                      onStart={() => setVideoPlaying(true)}
                      onProgress={e => setVideoPlaying(!!e.loaded)}
                      muted
                      autoPlay
                      controls={false}
                      playing={active}
                      height="100%"
                    />
                  ) : !!(button.imageUrl || button.imageMobileUrl) ? (
                    <img
                      alt={button.buttonTitle}
                      src={
                        device === "desktop" || device === "tablet"
                          ? button.imageUrl
                          : button.imageMobileUrl
                      }
                      height="100%"
                      width="100%"
                    />
                  ) : null}
                </div>
                {headline && (
                  <h1
                    dangerouslySetInnerHTML={{ __html: headline }}
                    className={classNames(
                      styles["camera-media-headline"],
                      styles[`media-${i === 0 ? "active" : "inactive"}`]
                    )}
                  />
                )}
              </div>
              <div
                dangerouslySetInnerHTML={{ __html: button.description }}
                className={styles["camera-media-text"]}
              />
            </div>
          );
        })}
      </div>
      <div className={styles["buttons-container"]}>
        {cameras.map((button, i) => {
          const active = current === i;
          return (
            <button
              key={`camera-button-${i}`}
              className={classNames(
                styles["button-item"],
                styles[`button-${active ? "active" : "inactive"}-overview`]
              )}
              onClick={() => {
                setCurrent(i);
                setVideoPlaying(false);
              }}
            >
              {active && isVideoPlaying && (
                <div className={styles["button-animated-background"]} />
              )}
              <p>{button.buttonTitle}</p>
            </button>
          );
        })}
      </div>
    </div>
  ) : null;
};

export default CameraOverview;
