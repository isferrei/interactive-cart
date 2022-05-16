import React, { useState, useEffect } from "react";
import { Controller, Scene } from "react-scrollmagic";
import SectionImage from "./SectionImageComponent";
import CameraSliderTab from "./CameraSliderTabComponent";
import { imagePath } from "../../CommonProductLogic/index";
import LazyLoad from 'react-lazyload';

function TabWithImageComponent(props) {
  const [activeTabIndex, setActiveTabIndex] = useState(0);
  const [progressValue, setProgressValue] = useState(0);
  const [activeItem, setActiveItem] = useState(0);
  const {
    isMobile,
    isSlider,
    tabs,
    data: {
      field_cs_content_box_position,
      field_camera_slider,
      field_cs_bg_color_mobile,
      field_cs_bg_color_desktop,
      field_cs_unlock_scroll_desktop
    }
  } = props;

  useEffect(() => {
    setActiveItem(tabs[0]);
  }, [props.tabs]);

  let duration = 1000;
  let pin = true;

  if (isSlider === "1" || field_cs_unlock_scroll_desktop === "1") {
    if (!isMobile || isSlider === "1") {
      duration = 0;
      pin = false;
    }
  }

  const handleChange = val => {
    setProgressValue(val);
  };

  // Identify the tab index by click
  const handleTabClick = index => {
    setActiveTabIndex(index);
    setActiveItem(tabs[index]);
  };

  return (
    <div>
      <Controller>
        <Scene triggerHook="onLeave" duration={duration} pin={pin}>
          {progress => (
            <div className="camera-slider">
              <LazyLoad
                offset={-100}
                once
                throttle={100}
                placeholder={<img className="camera-slider-lazyload-default-img" src={imagePath + "Lazy-Load-Full-bleed-card.png"} alt="Lazyload Placeholder Image" />}
              >
                <SectionImage
                  activeTabIndex={activeTabIndex}
                  opacity={progressValue / 100}
                  isMobile={isMobile}
                  field_camera_slider={field_camera_slider}
                />
              </LazyLoad>
              <div
                className={`cs-tab-container ${field_cs_content_box_position}`}
              >
                {activeItem && (
                  <CameraSliderTab
                    field_cs_bg_color_mobile={field_cs_bg_color_mobile}
                    field_cs_bg_color_desktop={field_cs_bg_color_desktop}
                    tabs={tabs}
                    activeItem={activeItem}
                    activeTabIndex={activeTabIndex}
                    isMobile={isMobile}
                    progressValue={progress}
                    handleTabClick={handleTabClick}
                    handleChange={handleChange}
                    pageLock={pin}
                    isSlider={isSlider}
                  />
                )}
              </div>
            </div>
          )}
        </Scene>
      </Controller>
    </div>
  );
}

export default TabWithImageComponent;
