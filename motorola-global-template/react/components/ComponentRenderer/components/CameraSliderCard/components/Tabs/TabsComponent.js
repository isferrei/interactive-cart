import React from "react";
import Tab from "./TabComponent";
import "./tabs.global.css";

const Tabs = ({ activeTabIndex, data, handleTabClick, tabBgColor }) => (
  <div className="cs-tab-panel">
    {data.map(({ label }, index) => {
      const isActive = activeTabIndex === index;
      return (
        <Tab key={index}
          label={label}
          isActive={isActive}
          handleTabClick={handleTabClick}
          tabIndex={index}
          tabBgColor={tabBgColor}
        />
      );
    })}
  </div>
);

export default Tabs;
