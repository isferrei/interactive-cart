import React, { FC, useMemo } from "react";
import ImageCard, { ImageProps } from "./components/ImageCard";

import styles from "./GalleryWallCard.css";

type GalleryWallCardProps = {
  data: {
    gallery: ImageProps[];
    title: string;
    subtitle: string;
  };
};

function calculateArrHalfLength(length) {
  var arrHalfLength = length % 2 == 0 ? length / 2 : length / 2 + 1;
  return arrHalfLength;
}

const GalleryWallCard: FC<GalleryWallCardProps> = ({ data }) => {
  const { title, subtitle, gallery } = data;
  const galleryData = gallery || [];

  const imageArrHalfLength = useMemo(
    () => calculateArrHalfLength(galleryData.length),
    [galleryData.length]
  );

  return (
    <section className={styles["section-container"]}>
      <h1
        className={styles["gallery-wall--title"]}
        dangerouslySetInnerHTML={{ __html: title }}
      />
      <h2
        className={styles["gallery-wall--subtitle"]}
        dangerouslySetInnerHTML={{ __html: subtitle }}
      />
      <div className={styles["gallery-wall"]}>
        <div className={styles["galley-wall__container"]}>
          <div className={styles["gallery-wall__left"]}>
            {galleryData.slice(0, imageArrHalfLength).map((image, index) => {
              return <ImageCard image={image} side="left" key={index} />;
            })}
          </div>
          <div className={styles["gallery-wall__right"]}>
            {galleryData
              .slice(imageArrHalfLength, galleryData.length)
              .map((image, index) => {
                return (
                  <ImageCard
                    image={image}
                    side="right"
                    key={imageArrHalfLength + index}
                  />
                );
              })}
          </div>
        </div>
        <div className={styles["gallery-wall__center"]}>
          {galleryData.map((image, index) => {
            return <ImageCard image={image} side="left" key={index} />;
          })}
        </div>
      </div>
    </section>
  );
};

export default GalleryWallCard;
