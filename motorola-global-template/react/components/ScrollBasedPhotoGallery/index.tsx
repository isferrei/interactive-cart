import React, { FC } from "react";
import { Controller, Scene } from "react-scrollmagic";

import { TImages } from "./components/typings";
import styles from "./ScrollBasedPhotoGallery.css";
import Images from "./components/Images";
import Navigation from "./components/Navigation";
import Text from "./components/Text";

type Photo = {
  text: string;
  images: TImages;
};

type ScrollBasedPhotoGalleryProps = {
  data: {
    photos: Photo[];
    background: string;
    triggerElement: string;
    maxWidth: string;
    isMobileImageFull: boolean;
  };
};

const ScrollBasedPhotoGallery: FC<
  ScrollBasedPhotoGalleryProps
> = ({
  data: {
    photos,
    background = "#000A13",
    triggerElement = "triggerScrollBasedPhotoGallery",
    maxWidth = "1920px",
    isMobileImageFull = false
  }
}) => {
    // 640px is the size of the content wrapper (images)
    const DURATION = 640 * photos.length;
    const lastProgress = (1 / photos.length) * (photos.length - 1);
    const previousLastProgress =
      (1 / photos.length) * (photos.length - 1) - 1 / photos.length;

    const classGeneralAnimations = (progress: number) =>
      photos
        // eslint-disable-next-line consistent-return
        .map((_: Photo, index: number) => {
          const firstProgress = (1 / photos.length) * (index + 1);

          const secondProgress =
            (1 / photos.length) * (index + 1) + 1 / photos.length;

          const previousLastClass =
            progress >= previousLastProgress && progress <= lastProgress
              ? styles.stepPreviousLast
              : "";

          if (progress < 1 / photos.length) {
            return `${styles.step1} ${previousLastClass}`;
          }

          if (
            secondProgress <= lastProgress &&
            progress >= firstProgress &&
            progress < secondProgress
          ) {
            return `${styles[`step${index + 2}`]} ${previousLastClass}`;
          }

          if (progress >= lastProgress) return styles.stepLast;
        })
        .filter((item: string[]) => !!item)[0];

    const classAnimation = (
      index: number,
      length: number,
      classNamePrefix: string
    ) => {
      const generalClass = styles[`${classNamePrefix}${index + 1}`];

      if (index + 1 === length - 1) {
        return `${styles[`${classNamePrefix}PreviousLast`]} ${generalClass}`;
      }

      if (index + 1 === length) {
        return styles[`${classNamePrefix}Last`];
      }

      return generalClass;
    };

    const classNameImages = {
      first: styles.firstImage,
      second: styles.secondImage,
      third: styles.thirdImage,
      mobile: styles.mobileImage,
      main: styles.image
    };

    return (
      <>
        <section
          style={{
            height: `${DURATION + (640 * 2)}px`,
            background
          }}
        >
          <div id={triggerElement} />
          <Controller>
            <Scene
              duration={DURATION}
              triggerHook="onLeave"
              triggerElement={`#${triggerElement}`}
            >
              {(progress: number) => {
                return (
                  <div
                    className={`${styles.cameraOverview} ${classGeneralAnimations(
                      progress
                    )} top-0 vh-100 center`}
                    style={{ maxWidth }}
                  >
                    <Navigation
                      classNameTopButton={styles.topButton}
                      classNameBottomButton={styles.bottomButton}
                      length={photos.length}
                      height={DURATION}
                      isMobileImageFull={isMobileImageFull}
                    />
                    <div className="flex justify-center items-center vh-100">
                      {photos.map(({ images }, index) => (
                        <Images
                          key={index}
                          className={`${classAnimation(
                            index,
                            photos.length,
                            "photoWrapper"
                          )} ${styles.photoWrapper} pv8 ph6 pv6-l ph8-l`}
                          images={images}
                          classNameImages={classNameImages}
                          isMobileImageFull={isMobileImageFull}
                        />
                      ))}
                    </div>
                    <div
                      className="pv10 ph6 absolute bottom-0 w-100 flex justify-center items-end"
                      style={{
                        background: `linear-gradient(transparent 60%, ${background} )`
                      }}
                    >
                      {photos.map(({ text }, index) => (
                        <Text
                          key={index}
                          className={`${classAnimation(
                            index,
                            photos.length,
                            "textWrapper"
                          )} ${styles.textWrapper}`}
                        >
                          {text}
                        </Text>
                      ))}
                    </div>
                  </div>
                );
              }}
            </Scene>
          </Controller>
        </section>
      </>
    );
  };

export default ScrollBasedPhotoGallery;
