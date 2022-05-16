import React from "react";
import parse from "html-react-parser";

const SpecItem = props => {
  let headline = props.data.category_headline;
  let descValue = props.data.value;
  let clr = props.txtColor;
  let whiteColorClass = "";
  if (descValue == "ffffff") {
    whiteColorClass = "white-color";
  }
  if (props.flagColor) {
    return (
      <div className="psd-contents-item-wrapper">
        <div
          className={"color-box " + whiteColorClass}
          style={{ backgroundColor: "#" + descValue }}
        ></div>
        <div className="color-box-label"> {parse(headline)}</div>
      </div>
    );
  }

  return (
    <div className="psd-contents-item-wrapper">
      <div className="psd-contents-item-headline"> {parse(headline)}</div>
      <div className="psd-contents-item-value" style={{ "--color": `#${clr}` }}>
        {parse(descValue)}
      </div>
    </div>
  );
};

export default SpecItem;
