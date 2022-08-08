import React, { useState } from "react";
import styles from "./CameraSoftwareGallery.modules.css";
import { useDevice } from "vtex.device-detector";
import classNames from "classnames";
import ReactPlayer from "react-player";

type CameraSoftwareGalleryProps = {
  headline?: string;
  body?: string;
  backgroundColor?: string;
  backgroundImage?: string;
  buttonsOnBottom?: boolean;
  cameras: {
    buttonText: string;
    videoUrl?: string;
    imageUrl?: string;
    videoMobileUrl?: string;
    imageMobileUrl?: string;
    title?: string;
    body?: string;
  }[];
};

const CameraSoftwareGallery: React.FC<CameraSoftwareGalleryProps> = ({
  headline,
  backgroundColor,
  backgroundImage,
  buttonsOnBottom,
  body,
  cameras = []
}) => {
  const [current, setCurrent] = useState<
    CameraSoftwareGalleryProps["cameras"][0]
  >(cameras.length > 0 ? cameras[0] : null);
  const { device } = useDevice();

  const renderButtons = () => {
    return (
      <div className={styles["gallery-buttons-wrapper"]}>
        {cameras.map(camera => (
          <button
            key={`button-${camera.buttonText}`}
            className={classNames(
              styles["gallery-button"],
              camera.buttonText === current?.buttonText &&
                styles["button-active"]
            )}
            onClick={() => setCurrent(camera)}
          >
            {camera.buttonText}
          </button>
        ))}
      </div>
    );
  };

  return (
    <div
      className={styles["gallery-software-wrapper"]}
      style={{ backgroundColor }}
    >
      {backgroundImage && (
        <img
          src={backgroundImage}
          className={styles["gallery-software-background-image"]}
          alt="background-software-gallery"
        />
      )}
      <div className={styles["gallery-software-container"]}>
        <div className={styles["gallery-info"]}>
          <h4 dangerouslySetInnerHTML={{ __html: headline }} />
          <p dangerouslySetInnerHTML={{ __html: body }} />
        </div>
        <div className={styles["gallery-details-container"]}>
          {!buttonsOnBottom && renderButtons()}
          {current && (
            <div className={styles["gallery-image-wrapper"]}>
              {!!(current.videoMobileUrl || current.videoUrl) ? (
                <ReactPlayer
                  id="video-gallery-image"
                  url={
                    device === "desktop" || device === "tablet"
                      ? current.videoUrl || current.videoMobileUrl
                      : current.videoMobileUrl || current.videoUrl
                  }
                  frameBorder="0"
                  playsinline
                  loop
                  autoPlay
                  controls={false}
                  playing
                  width="100%"
                />
              ) : !!(current.imageMobileUrl || current.imageUrl) ? (
                <img
                  src={
                    device === "desktop" || device === "tablet"
                      ? current.imageUrl || current.imageMobileUrl
                      : current.imageMobileUrl || current.imageUrl
                  }
                  alt={current.title}
                />
              ) : null}
            </div>
          )}
          {buttonsOnBottom && renderButtons()}
        </div>
        <div className={styles["gallery-bottom-content"]}>
          {current?.title && (
            <h5 dangerouslySetInnerHTML={{ __html: current.title }} />
          )}
          {current?.body && (
            <p dangerouslySetInnerHTML={{ __html: current.body }} />
          )}
        </div>
      </div>
    </div>
  );
};

export default CameraSoftwareGallery;
