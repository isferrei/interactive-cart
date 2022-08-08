import React, { Fragment } from "react";
import { Controller, Scene } from "react-scrollmagic";
import LazyLoad from "react-lazyload";
import styles from "./PeriscopicLens.module.css";
import { useDevice } from "vtex.device-detector";

const PeriscopicLens = props => {

    const {
        data: {
            properties: {
                title,
                description,
                firstImage,
                sliders,
                firstImageMobile
            }
        } } = props;
    const { isMobile } = useDevice();
    const navigationItems = [styles.navigationItemFirst, styles.navigationItemSecond, styles.navigationItemThird];
    const navigationImageClassName = [styles.secondImage, styles.thirdImage + ' o-0 ', styles.fourthImage + ' o-0 '];
    const duration = 5500;

    return (
        <section style={{ height: duration }} className="psl-content">
            <div id="periscopicLensImages" />
            <Controller>
                <Scene
                    duration={isMobile ? duration / 2 : duration}
                    triggerHook="onLeave"
                    triggerElement="#periscopicLensImages"
                >
                    {(progress) => (
                        <div className={styles.periscopicLenseWrapper}>
                            <div
                                style={{
                                    backgroundImage: `url(${(isMobile ? firstImageMobile : firstImage) || ""})`
                                }}
                                className={`${styles.steps}
                            ${progress < 0.2 ? styles.firstStep : ""} ${progress < 0.25 && progress >= 0.15
                                        ? styles.transitionStep
                                        : ""
                                    } ${progress < 0.4 && progress >= 0.2 ? styles.secondStep : ""
                                    } ${progress < 0.6 && progress >= 0.4 ? styles.thirdStep : ""
                                    } ${progress >= 0.6 ? styles.fourthStep : ""
                                    } relative flex items-center justify-center`}
                            >
                                <div
                                    className={`${styles.images} ${styles.firstImage} w-100 absolute relative flex flex-column flex-row-l `}
                                >
                                    <div
                                        className={`${styles.periscopeHeader} flex flex-column content-center justify-start justify-center-l pr10-l ph5`}>
                                        <h3 className="f4 f2-l fw5 mb0">{title}</h3>
                                        <p className="fw2 f4-l f6">{description}</p>
                                    </div>
                                </div>

                                <div
                                    className={`${styles.navigation} justify-end-l absolute w-100 h-100 z-2 flex justify-center items-end items-center-l`}
                                >
                                    <div
                                        className={`${styles.navigationItems} ${styles.navigationItemsRight} flex flex-column-l justify-between w-80 w-auto-l mb6 mb0-l mh8-l`}
                                    >
                                        {sliders && sliders.map((slider, indx) =>
                                            <p
                                                key={slider.contents.imageText}
                                                className={`${styles.navigationItem} ${navigationItems[indx]
                                                    } tr-l justify-end-l relative pt7 pt0-l ma0 justify-center white flex tc items-center-l f5 f3-l ph6`}
                                            >
                                                {slider.contents.imageText}
                                            </p>
                                        )}
                                    </div>
                                </div>

                                {sliders && sliders.map((slider, indx) => (
                                    <Fragment key={slider.contents.imageText}>
                                        <LazyLoad
                                            offset={-30}
                                            once
                                            throttle={300}
                                        >
                                            <div
                                                style={{
                                                    backgroundImage: `url(${(isMobile ? slider.contents.imageMobile : slider.contents.image) || ""
                                                        })`
                                                }}
                                                className={`${styles.images} ${navigationImageClassName[indx]} w-100 vh-100 bg-center cover absolute`}
                                            />
                                        </LazyLoad>
                                    </Fragment>
                                ))}
                            </div>
                        </div>
                    )}
                </Scene>
            </Controller>
        </section>
    )
}

export default PeriscopicLens;
