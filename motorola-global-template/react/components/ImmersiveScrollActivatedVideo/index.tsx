import React, { FC } from "react";
import ReactPlayer from "react-player";
import { Controller, Scene } from "react-scrollmagic";
import { handleResize } from "../ComponentRenderer/common/js/deviceDetection";
import styles from "./immersiveScrollActivatedVideo.css";

interface ImmersiveScrollActivatedVideoInterface {
  data: {
    duration: number;
    mobileVideo: string;
    desktopVideo: string;
    title: string;
    description: [
      {
        title: string;
        description: string;
      }
    ];
  };
}

const ImmersiveScrollActivatedVideo: FC<ImmersiveScrollActivatedVideoInterface> = ({
  data
}) => {
  const {
    duration: dataDuration,
    mobileVideo,
    desktopVideo,
    title,
    description
  } = data;

  const deviceDetected = handleResize();

  const duration =
    dataDuration /
    (deviceDetected.isMobile || deviceDetected.isTablet ? 1.5 : 2.4);

  return (
    <section
      style={{ height: `${duration}px` }}
      className={styles["immersive-scroll--main-section"]}
    >
      <div id="triggerImmersiveScrollActivatedVideo" />
      <Controller>
        <Scene
          duration={duration}
          triggerHook="0"
          triggerElement="#triggerImmersiveScrollActivatedVideo"
        >
          {(progress: number) => (
            <div className={styles["immersive-video__animation-wrapper"]}>
              <section className={styles["immersive-video__content"]}>

                {!!(progress > 0.05 && progress < 0.4) && (
                  <div className={styles["immersive-video__text-wrapper"]}>
                    <h3 dangerouslySetInnerHTML={{ __html: title }} />
                  </div>
                )}
                {progress > 0.4 && (
                  <div className={styles["immersive-video__text-description"]}>
                    {description
                      .filter((_, i) => {
                        if (
                          deviceDetected.isMobile ||
                          deviceDetected.isTablet
                        ) {
                          /**
                           *  Total progress is from 28 to 73, so 28/73 = 15 = 0.15 each step
                           **/
                          const current = 0.4 + i * 0.10;
                          if (i === 2 && progress > current) return true;
                          return (
                            progress > current && progress < current + 0.10
                          );
                        }
                        return true;
                      })
                      .map((desc, index) => {
                        return (
                          <div
                            key={desc.title}
                            className={styles["immersive-video__text-column"]}
                          >
                            <h3
                              dangerouslySetInnerHTML={{ __html: desc.title }}
                            />
                            <p
                              dangerouslySetInnerHTML={{
                                __html: desc.description
                              }}
                            />
                          </div>
                        );
                      })}
                  </div>
                )}
                <div className={styles["immersive-video__video-wrapper"]}>
                  <ReactPlayer
                    id="video-v"
                    className={
                      styles["immersive-video_video-wrapper--reactPlayer"]
                    }
                    url={
                      deviceDetected.isMobile || deviceDetected.isTablet
                        ? mobileVideo
                        : desktopVideo
                    }
                    frameBorder="0"
                    playsinline
                    controls={false}
                    muted
                    autoPlay
                    loop
                    height="100vh"
                    width="100%"
                    playing
                  />
                </div>
              </section>
            </div>
          )}
        </Scene>
      </Controller>
    </section>
  );
};

export default ImmersiveScrollActivatedVideo;
