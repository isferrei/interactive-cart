import React from "react";
import "./thirdPartyRetailer.global.css";
import { imagePath } from "../../CommonProductLogic/index";

const ThirdPartyRetailer = props => {
  let targetWindowValue;
  if(props.data.omni_retailer_url_target){
    if( props.data.omni_retailer_url_target === "1"){
       targetWindowValue = "_blank"
    }
    else {
      targetWindowValue = "_self"
    }
 }
  else{
    targetWindowValue = "_self"
  }

  return (
    <div className="third-party-retailer">
      <a
        href={props.data.omni_retailer_url}
        target={targetWindowValue}
      >
        <img
          src={imagePath + props.data.omni_retailer_logo}
          alt={props.data.omni_retailer_logo_alt_text}
          title={props.data.omni_retailer_name}
        />
      </a>
    </div>
  );
};

export default ThirdPartyRetailer;
