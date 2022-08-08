import React, { FC, useState, useEffect, useRef } from "react";
import ReactPlayer from "react-player";
import styles from "./imageCard.css";
import { imagePath } from "../../../CommonProductLogic/index";

export interface ImageProps {
  path: string;
  type: string;
  playPause?: boolean;
  description: string;
  alternatePath?: string;
  handleImageEnabled?: boolean;
}

interface ImageCardProps {
  image: ImageProps;
  side?: string;
}

const ImageCard: FC<ImageCardProps> = ({ image, side }) => {
  const [currentVideo, setCurrentVideo] = useState<"first" | "back">("first");
  const [playing, setPlaying] = useState(!image.playPause);

  const video1Ref = useRef<ReactPlayer>(null);
  const video2Ref = useRef<ReactPlayer>(null);

  return (
    <div
      className={
        styles[`image-container__${side === "left" ? "left" : "right"}`]
      }
    >
      {image.type == "video" ? (
        <div className={styles["video-wrapper"]}>
          <ReactPlayer
            id="video-v1"
            className={styles["react-player"]}
            url={image.path}
            frameBorder="0"
            playsinline
            loop
            muted={!image.playPause}
            autoPlay
            controls={false}
            playing={currentVideo === "first" && playing}
            width="100%"
            ref={video1Ref}
            style={{
              visibility: currentVideo === "first" ? "visible" : "hidden"
            }}
          />
          <ReactPlayer
            id="video-v2"
            className={styles["react-player"]}
            url={image.alternatePath}
            frameBorder="0"
            playsinline
            loop
            playing={currentVideo === "back" && playing}
            autoPlay
            controls={false}
            muted={!image.playPause}
            width="100%"
            ref={video2Ref}
            style={{
              visibility: currentVideo === "back" ? "visible" : "hidden"
            }}
          />
          {image.playPause && (
            <div className={styles["react-player-button-wrapper"]}>
              <div
                className={styles["react-player-button-content"]}
                style={{ visibility: playing ? "hidden" : "visible" }}
              >
                <button
                  className={styles["react-player-button"]}
                  onClick={() => setPlaying(!playing)}
                >
                  {playing ? (
                    <svg viewBox="0 0 20 20" fill="white">
                      <rect
                        className="fill"
                        width="6"
                        height="20"
                        x="0"
                        y="0"
                      />
                      <rect
                        className="fill"
                        width="6"
                        height="20"
                        x="12"
                        y="0"
                      />
                    </svg>
                  ) : (
                    <svg viewBox="0 0 20 20" fill="white">
                      <polygon
                        className="fill"
                        points="1,0 20,10 1,20"
                      ></polygon>
                    </svg>
                  )}
                </button>
              </div>
            </div>
          )}
        </div>
      ) : (
        <img
          src={`${imagePath}${
            currentVideo === "first" ? image.path : image.alternatePath
          }`}
          id={image.path}
          alt={image.description}
        />
      )}
      {image.handleImageEnabled && (
        <label className={styles.switch}>
          <input
            type="checkbox"
            id="togBtn"
            checked={currentVideo === "first"}
            onChange={() =>
              setCurrentVideo(currentVideo === "first" ? "back" : "first")
            }
          />
          <div className={`${styles.slider} ${styles.round}`}>
            <span className={styles.on}>ON</span>
            <span className={styles.off}>OFF</span>
          </div>
        </label>
      )}
      <h4 dangerouslySetInnerHTML={{ __html: image.description }}></h4>
    </div>
  );
};

export default ImageCard;
