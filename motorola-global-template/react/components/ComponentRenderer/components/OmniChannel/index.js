import React from "react";
import "./omniChannel.global.css";

import ThirdPartyRetailer from "./components/ThirdPartyRetailer";
import { array } from "prop-types";

class OmniChannel extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    
    if(!Array.isArray(this.props.data.omni_third_party_retailer) || !this.props.data.omni_third_party_retailer.length){
      return null;
    }
        
    let retailers = this.props.data.omni_third_party_retailer.map(
      (retailer, index) => {
        return <ThirdPartyRetailer data={retailer} key={index} />;
      }
    );
    

    return (
      <div
        id="omni-channel"
        className="omni-channel"
        style={{ backgroundColor: "#" + this.props.data.omni_background_color }}
      >
        <div className="oc-container">
          {this.props.data.omni_headline_text != "" ? (
            <div
              className="oc-header"
              style={{ color: "#" + this.props.data.omni_headline_color }}
            >
              {this.props.data.omni_headline_text}
            </div>
          ) : null}
          <div className="oc-retailers-list">{retailers}</div>
        </div>
      </div>
    );
  }
}

export default OmniChannel;
