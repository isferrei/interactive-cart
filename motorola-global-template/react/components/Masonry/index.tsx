import React from "react";
import styles from "./Masonry.modules.css";
import ReactPlayer from "react-player";
import { useDevice } from "vtex.device-detector";

type MasonryProps = {
  headline: string;
  backgroundColor?: string;
  gallery: {
    widthValue: number;
    title: string;
    body: string;
    imageUrl?: string;
    imageMobileUrl?: string;
    videoUrl?: string;
    videoMobileUrl?: string;
  }[][];
};

const Masonry: React.FC<MasonryProps> = ({
  headline,
  backgroundColor,
  gallery = []
}) => {
  const { device } = useDevice();

  if (gallery.length === 0) return null;

  return (
    <div className={styles["masonry-wrapper"]} style={{ backgroundColor }}>
      <div className={styles["masonry-container"]}>
        {headline && (
          <div className={styles["masonry-headline"]}>
            <h2 dangerouslySetInnerHTML={{ __html: headline }} />
          </div>
        )}
        <div className={styles["masonry-content"]}>
          {gallery.map((row, i) => (
            <div className={styles["masonry-row"]}>
              {row.map((col, j) => (
                <div
                  className={styles["masonry-col"]}
                  style={{ flex: col.widthValue }}
                >
                  <div className={styles["masonry-item"]}>
                    <div className={styles["masonry-info"]}>
                      <h4 dangerouslySetInnerHTML={{ __html: col.title }} />
                      <p dangerouslySetInnerHTML={{ __html: col.body }} />
                    </div>
                    <div className={styles["masonry-media"]}>
                      {!!(col.videoMobileUrl || col.videoUrl) ? (
                        <ReactPlayer
                          id={`masonry-video-${i}-${j}`}
                          className={styles["react-player"]}
                          url={
                            device === "desktop" || device === "tablet"
                              ? col.videoUrl || col.videoMobileUrl
                              : col.videoMobileUrl || col.videoUrl
                          }
                          frameBorder="0"
                          playsinline
                          loop
                          autoPlay
                          controls={false}
                          playing
                          width="100%"
                        />
                      ) : !!(col.imageMobileUrl || col.imageUrl) ? (
                        <img
                          src={
                            device === "desktop" || device === "tablet"
                              ? col.imageUrl || col.imageMobileUrl
                              : col.imageMobileUrl || col.imageUrl
                          }
                          alt={`masonry-image-${i}-${j}`}
                        />
                      ) : null}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Masonry;
