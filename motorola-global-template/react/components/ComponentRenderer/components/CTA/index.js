import React from "react";
import "./cta.global.css";

class CTA extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isHover: false
    };
  }

  toggleHover = () => {
    this.setState({ isHover: !this.state.isHover });
  };

  render() {
    let linkStyle;
    if (this.state.isHover) {
      linkStyle = {
        backgroundColor: `rgba(${this.props.ctaHoverBackgroundColor})`,
        borderColor: "#" + this.props.ctaHoverBorderColor,
        color: "#" + this.props.ctaHoverTextColor
      };
    } else {
      linkStyle = {
        backgroundColor: `rgba(${this.props.ctaBackgroundColor})`,
        borderColor: "#" + this.props.ctaBorderColor,
        color: "#" + this.props.ctaTextColor
      };
    }
    return (
      <div className="cta">
        <a
          href={this.props.ctaLink}
          target={this.props.ctaAnchorTarget === "1" ? "_blank" : "_self"}
          style={linkStyle}
          onMouseEnter={this.toggleHover}
          onMouseLeave={this.toggleHover}
          onClick={this.props.click}
        >
          {this.props.ctaText}
        </a>
      </div>
    );
  }
}

export default CTA;
