import React, { FC } from "react";
import ReactPlayer from "react-player";
import { Controller, Scene } from 'react-scrollmagic';
import { handleResize } from "../ComponentRenderer/common/js/deviceDetection";
import styles from "./ScrollVideoPerformance.css";

interface VideoPerformanceProps {
  data: {
    mobileVideo?: string;
    desktopVideo?: string;
    duration: number;
    title?: string;
    description?: string;
  }
}

const ScrollVideoPerformance: FC<VideoPerformanceProps> = ({ data }) => {
  const deviceDetected = handleResize();
  const { duration, title, description, desktopVideo, mobileVideo } = data

  return (
    <section
      className={styles["scroll-video--section-wapper"]}
      style={{ height: `${duration}px` }}
    >
      <div id="triggerScrollVideoPerformance" />
      <Controller>
        <Scene
          duration={duration}
          triggerHook="0"
          triggerElement="#triggerScrollVideoPerformance"
        >
          {(progress: number) => (
            <div className={styles["scroll-video__animation-container"]}>
              <section className={styles["scroll-video__animation-section"]}>
                <div className={styles["scroll-video__text-wrapper"]} style={{ transform: deviceDetected.isMobile ? `scale(${0 + progress})` : deviceDetected.isTablet ? `scale(${0 + progress * 2})` : `scale(${0 + progress * 4})` }}>
                  <h1 dangerouslySetInnerHTML={{ __html: title }} />
                  <p dangerouslySetInnerHTML={{ __html: description }} />
                </div>
                <div className={styles["scroll-video__player-wrapper"]} style={{ transform: deviceDetected.isMobile ? `translateY(${0 + progress * 700}px) scale(${0.9 + progress * 20})` : deviceDetected.isTablet ? `translateY(${0 + progress * 1000}px) scale(${0.9 + progress * 20})` : `translateY(${0 + progress * 1000}px) scale(${0.9 + progress * 50})` }}>
                  <ReactPlayer
                    id="video-v"
                    className={styles["scroll-video__player-wrapper--react-video"]}
                    url={deviceDetected.isDesktop ? desktopVideo : deviceDetected.isWide ? desktopVideo : mobileVideo}
                    frameBorder="0"
                    playsinline
                    controls={false}
                    muted
                    autoPlay={true}
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
    </section >
  );
};

export default ScrollVideoPerformance;
