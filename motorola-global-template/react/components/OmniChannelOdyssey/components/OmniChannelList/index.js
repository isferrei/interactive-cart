import React, { Component } from "react";

class OmniChannelList extends Component {
  constructor(props) {
    super(props);
  }

  render = () => {
    const {
      logoImageUrl,
      imageAltText,
      hyperLink,
      targetWindow,
      id
    } = this.props;

    return (
      <div id={`oco-items-section-${id}`} className="oco-items-image">
        <a href={hyperLink} target={targetWindow}>
          <img src={logoImageUrl} alt={imageAltText}/>
        </a>
      </div>
    );
  };
}

export default OmniChannelList;