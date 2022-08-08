import React from "react";

const SpecItem = props => {
  let headline = props.data.viewSpecChildItemsHeading;
  let descValue = props.data.viewSpecChildItemsBody;
  let whiteColorClass = "";
  if (descValue == "ffffff") {
    whiteColorClass = "white-color";
  }
  if (props.flagColor) {
    return (
      <div className="psd-contents-item-wrapper">
        <div
          className="psd-contents-item-headline"
          dangerouslySetInnerHTML={{
            __html: headline
          }}
        />
        <div
          className={"psd-contents-item-value color-box " + whiteColorClass}
          style={{ backgroundColor: "#" + descValue }}
        ></div>
      </div>
    );
  }

  return (
    <div className="psd-contents-item-wrapper">
      <div
        className="psd-contents-item-headline"
        dangerouslySetInnerHTML={{
          __html: headline
        }}
      />
      <div
        className="psd-contents-item-value"
        dangerouslySetInnerHTML={{
          __html: descValue
        }}
      />
    </div>
  );
};

export default SpecItem;
