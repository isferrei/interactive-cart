import { Component } from "react";

class DividerCard extends Component {
  static schema = {
    title: "Divider Card",
    description: "Divider Card",
    type: "object",
    properties: {
      showDividercard: {
        type: "boolean",
        title: "Show Divider Card",
        default: false
      },
      idTag: {
        type: "string",
        title: "Card ID",
        description: "Enter the ID of the Card"
      }
    }
  };

  render() {
    const {
      showDividercard
    } = this.props;

    if (!showDividercard) {
      return null;
    }

    return <div id={this.props.idTag}></div>;
  }
}

export default DividerCard;
