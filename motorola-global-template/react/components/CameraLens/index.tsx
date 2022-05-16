import React, { useState, useRef } from "react";
import { useDevice } from "vtex.device-detector";
import classNames from "classnames";

import styles from "./CameraLens.module.css";

type Cameras = {
  title: string;
  description: string;
  imageSrc: string;
  imageSrcMobile: string;
  image?: string;
  imageMobile?: string;
};

type CameraLensProps = {
  data: {
    title: string;
    description: string;
    backgroundColor: string;
    cameras: Cameras[];
  };
};

const CameraLens: React.FC<CameraLensProps> = ({
  data: { cameras, description, title, backgroundColor }
}) => {
  const [selectedButton, setSelectedButton] = useState(0);

  const { device } = useDevice();

  const scrollRef = useRef(null);

  const handleSelectButton = (index: number) => {
    setSelectedButton(index);
    if (scrollRef.current) {
      scrollRef.current.scrollTo({ behavior: "smooth", left: index * 110 });
    }
  };

  return (
    <div style={{ backgroundColor: backgroundColor || "transparent" }}>
      <div
        className={classNames(
          styles.container,
          "flex flex-column flex-row-l w-100 h-100"
        )}
      >
        <div
          className={classNames(styles.textContainer, "flex flex-column pt7")}
        >
          <div className={classNames(styles.containerInfo, "w-100")}>
            <div className="flex flex-column w-100 pa6 pb3">
              <h1
                className="f2 f1-m w-100 fw5 mv0"
                dangerouslySetInnerHTML={{ __html: title }}
              />
              <p
                className="f6 f5-m w-100 fw4 lh-copy mv5"
                dangerouslySetInnerHTML={{ __html: description }}
              />
            </div>
            <div
              ref={scrollRef}
              className={classNames(
                styles.scrollContainer,
                "w-100 pb6",
                device === "phone" ? "overflow-x-scroll" : ""
              )}
            >
              <div
                className={classNames(
                  styles.buttomContainer,
                  "flex flex-row flex-column-l pl7",
                  device === "phone"
                    ? "nowrap items-center"
                    : "w-100 items-start"
                )}
              >
                {cameras.map((camera, index) => (
                  <button
                    key={`camera-button-lens-${index}`}
                    type="button"
                    onClick={() => handleSelectButton(index)}
                    className={classNames(
                      styles.buttonCamera,
                      selectedButton === index
                        ? "bg-white-20 white"
                        : "bg-transparent gray"
                    )}
                    style={{
                      transform: `scale(${
                        selectedButton === index ? "1.05" : "1"
                      })`
                    }}
                  >
                    {camera.title}
                  </button>
                ))}
                <button className={styles.emptyButton}>{` `}</button>
              </div>
            </div>
          </div>
        </div>
        <div className={classNames(styles.cameraContainer, "flex relative")}>
          {cameras.map((camera, i) => (
            <img
              key={`len-camera-${i}`}
              src={
                camera[
                  device === "desktop" || device === "tablet"
                    ? "imageSrc"
                    : "imageSrcMobile"
                ]
              }
              style={{
                visibility: i === selectedButton ? "visible" : "hidden",
                position: i === selectedButton ? "initial" : "absolute"
              }}
              alt={`${camera.title || "Smartphone"}`}
            />
          ))}
          <div className={styles.cameraDescriptionContainer}>
            <span
              className="f5 f3-m fw5"
              dangerouslySetInnerHTML={{
                __html: cameras[selectedButton].title
              }}
            />
            <p
              className="f6 f5-m lh-copy"
              dangerouslySetInnerHTML={{
                __html: cameras[selectedButton].description
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CameraLens;
