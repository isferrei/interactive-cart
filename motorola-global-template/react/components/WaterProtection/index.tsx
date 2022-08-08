import React from "react";
import styles from "./WaterProtection.modules.css";
import { useDevice } from "vtex.device-detector";

type WaterProtectionProps = {
  backgroundColor?: string;
  headline: string;
  title: string;
  body: string;
  imageUrl?: string;
  imageMobileUrl?: string;
};

const WaterProtection: React.FC<WaterProtectionProps> = ({
  headline,
  title,
  body,
  backgroundColor,
  imageUrl,
  imageMobileUrl
}) => {
  const { device } = useDevice();

  return (
    <div className={styles["water-wrapper"]} style={{ backgroundColor }}>
      <img
        className={styles["background-image"]}
        alt={title}
        src={
          device === "desktop" || device === "tablet"
            ? imageUrl || imageMobileUrl
            : imageMobileUrl || imageUrl
        }
      />
      <div className={styles["background-content"]}>
        <div className={styles["content-top"]}>
          <h2 dangerouslySetInnerHTML={{ __html: headline }} />
        </div>
        <div className={styles["content-bottom"]}>
          <h4 dangerouslySetInnerHTML={{ __html: title }} />
          <p dangerouslySetInnerHTML={{ __html: body }} />
        </div>
      </div>
    </div>
  );
};

export default WaterProtection;
