import React from "react";
import Logo from "../../utils/LenovoLogo";
class LenovoLogo extends React.Component {
  static schema = {
    title: "Lenovo Logo",
    description: "Lenovo Logo",
    type: "object",
    properties: {
      link: {
        default: "",
        type: "string",
        title: "Item title"
      },
    }
  };

  render() {
    return (
      <a href={this.props.link} target="blank">
        <Logo />
      </a>
    )
  }
}

export default LenovoLogo;
