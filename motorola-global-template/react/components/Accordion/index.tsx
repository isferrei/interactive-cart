import classNames from "classnames";
import React, { useState } from "react";
import ReactPlayer from "react-player";

import styles from "./Accordion.css";

export type AccordionProps = {
  headline: string;
  body: string;
  device?: string;
  backgroundColor?: string;
  options: {
    title: string;
    body: string;

    videoUrl?: string;
    imageUrl?: string;
    videoMobileUrl?: string;
    imageMobileUrl?: string;
  }[];
};

const Accordion: React.FC<AccordionProps> = ({
  headline,
  backgroundColor,
  body,
  options
}) => {
  const [current, setCurrent] = useState<AccordionProps["options"][0] | null>(
    options.length > 0 ? options[0] : null
  );

  return (
    <div className={styles["accordion-wrapper"]} style={{ backgroundColor }}>
      <div className={styles["accordion-content"]}>
        <div>
          <h2 dangerouslySetInnerHTML={{ __html: headline }} />
          <p dangerouslySetInnerHTML={{ __html: body }} />
          <div>
            {options.map(option => (
              <div className={styles["accordion-item-content"]}>
                <button
                  className={styles["accordion-item-content-button"]}
                  onClick={() =>
                    setCurrent(current?.title === option.title ? null : option)
                  }
                >
                  <h3 dangerouslySetInnerHTML={{ __html: option.title }} />
                  <svg
                    className={classNames(
                      current?.title === option.title
                        ? styles["icon-active"]
                        : styles["icon-inactive"]
                    )}
                    xmlns="http://www.w3.org/2000/svg"
                    width={24}
                    height={24}
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M5 15l7-7 7 7"
                    />
                  </svg>
                </button>
                <div
                  className={classNames(
                    styles["accordion-item-info"],
                    current?.title === option.title
                      ? styles["accordion-item-info-active"]
                      : styles["accordion-item-info-inative"]
                  )}
                >
                  {current?.title === option.title && (
                    <p dangerouslySetInnerHTML={{ __html: option.body }} />
                  )}
                  {current?.title === option.title && (
                    <div className={styles["accordion-media-mobile"]}>
                      {!!(option.videoMobileUrl || option.videoUrl) ? (
                        <ReactPlayer
                          url={option.videoMobileUrl || option.videoUrl}
                          frameBorder="0"
                          playsinline
                          loop
                          autoPlay
                          controls={false}
                          playing
                          width="100%"
                        />
                      ) : !!(option.imageMobileUrl || option.imageUrl) ? (
                        <img
                          src={option.imageMobileUrl || option.imageUrl}
                          alt={option.title}
                        />
                      ) : null}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className={styles["accordion-media"]}>
        {current && (
          <div>
            {!!(current.videoMobileUrl || current.videoUrl) ? (
              <ReactPlayer
                url={current.videoUrl || current.videoMobileUrl}
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
                src={current.imageUrl || current.imageMobileUrl}
                alt={current.title}
              />
            ) : null}
          </div>
        )}
      </div>
    </div>
  );
};

export default Accordion;
