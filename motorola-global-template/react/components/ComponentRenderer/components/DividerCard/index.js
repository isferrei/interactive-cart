import React from "react";
import "./dividerCard.global.css";

class DividerCard extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    let dividerCardId = this.props && this.props.data && this.props.data.divider_id;
    if(!dividerCardId) {
      return null;
    }
    return (
      <div className="dvdr-card"  id={dividerCardId}>
      </div>
    );
  }
}

export default DividerCard;
