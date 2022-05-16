import React, { Fragment } from "react";
import "./fullBleedVideoCard.global.css";
import FullBleedYoutube from "./fullBleedYoutube";
import FullBleedVimeo from "./fullBleedVimeo";
class FullBleedVideoCard extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { fbv_video, fbv_vimeo } = this.props.data;
    if (!fbv_video && !fbv_vimeo) {
      return null;
    }
    return (
      <Fragment>
        {fbv_vimeo ? (
          <FullBleedVimeo data={this.props.data} />
        ) : fbv_video ? (
          <FullBleedYoutube data={this.props.data} />
        ) : null}
      </Fragment>
    );
  }
}

export default FullBleedVideoCard;