import React, { useState, useEffect } from "react";
import Tabs from "./Tabs/TabsComponent";

// Single Content without TAB and TABS with respective content rendering
function CameraSliderTab(props) {
  const {
    field_cs_bg_color_mobile,
    field_cs_bg_color_desktop,
    tabs,
    activeItem,
    activeTabIndex,
    isMobile,
    handleTabClick,
    progressValue,
    pageLock,
    handleChange,
    isSlider
  } = props;
  const sectionBgColor = isMobile
    ? field_cs_bg_color_mobile
    : field_cs_bg_color_desktop;

  const [rangeSliderValue, setRangeSliderValue] = useState(0);

  // Listen on page scroll
  useEffect(() => {
    const prgVal = progressValue * 100;
    if (pageLock) {
      setRangeSliderValue(prgVal);
      handleChange(prgVal);
    }
  }, [props.progressValue]);

  // Listen on range slider scroll
  const hanldeSliderChange = e => {
    const val = e.target.value;
    if (!pageLock) {
      setRangeSliderValue(val);
      handleChange(val);
    } else {
      if (val < rangeSliderValue) {
        // window.scrollBy(0, 10);
        setRangeSliderValue(val);
        handleChange(val);
      } else {
        setRangeSliderValue(val);
        handleChange(val);
        // window.scrollBy(0, -10);
      }
    }
  };

  if (tabs && tabs.length === 1) {
    return (
      <div
        className="cs-tab-content"
        style={{ backgroundColor: `#${sectionBgColor}` }}
      >
        {activeItem.content}
        {isSlider === '0' && <input
          className="cs-input-range"
          type="range"
          min="0"
          max="100"
          value={rangeSliderValue}
          onChange={hanldeSliderChange}
        />}
        
      </div>
    );
  }

  return (
    <>
      <Tabs
        handleTabClick={handleTabClick}
        data={tabs}
        activeTabIndex={activeTabIndex}
        tabBgColor={sectionBgColor}
      />
      <div
        className="cs-tab-content"
        style={{ backgroundColor: `#${sectionBgColor}` }}
      >
        {activeItem.content}

        {isSlider === "0" && <input
          className="cs-input-range"
          type="range"
          min="0"
          max="100"
          value={rangeSliderValue}
          onChange={hanldeSliderChange}
        />}
      </div>
    </>
  );
}

export default CameraSliderTab;
