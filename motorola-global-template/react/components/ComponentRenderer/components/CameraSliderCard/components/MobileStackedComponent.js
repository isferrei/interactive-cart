import React, { useState } from "react";
import SectionImage from "./SectionImageComponent";

function MobileStackedView(props) {
  const [progressValue, setProgressValue] = useState(0);
  const {
    isMobile,
    activeTabIndex,
    tabContent,
    isSlider,
    data: {
      field_camera_slider,
      field_cs_bg_color_mobile,
      field_cs_mobile_stacked_toggle
    }
  } = props;

  const handleChange = e => {
    const val = e.target.value;
    setProgressValue(val);
  };

  return (
    <div className="cs-mobile-stacked-container">
      <SectionImage
        activeTabIndex={activeTabIndex}
        opacity={progressValue / 100}
        isMobile={isMobile}
        field_camera_slider={field_camera_slider}
        mobile_stacked={field_cs_mobile_stacked_toggle}
      />
      <div className="cs-stacked-container">
        {isSlider === '0' && <input
          className="cs-stacked-input-range"
          type="range"
          min="0"
          max="100"
          value={progressValue}
          onChange={handleChange}
        /> }
        
        <div
          className="cs-stacked-content"
          style={{ backgroundColor: `#${field_cs_bg_color_mobile}` }}
        >
          {tabContent}
        </div>
      </div>
    </div>
  );
}

export default MobileStackedView;
