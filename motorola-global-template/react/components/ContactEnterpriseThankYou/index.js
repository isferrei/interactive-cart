import React from "react";
import thanksIcon from "./assets/thanks_icon.svg";
import "./ContactEnterpriseThankYou.global.css";
class ContactEnterpriseThankYou extends React.Component {
  static schema = {
    title: "Contact enterprise thank you",
    description: "Contact enterprise thank you",
    type: "object",
    properties: {
      buttonLink: {
        type: "string",
        title: "Link button",
        default: "/"
      },
      header: {
        type: "string",
        title: "Header",
        default: "thank you!"
      },
      subHeader: {
        type: "string",
        title: "Sub header",
        default: "We’ll get in touch with you soon."
      }
    }
  };

  render() {
    return (
      <div className="contact-enterprise-thank-you-container">
        <div className="thankyou-artwork">
          <img src={thanksIcon} alt="Thankyou Icon" />
        </div>
        <div className="header">{this.props.header || "thank you!"}</div>
        <div className="body">
          {this.props.subHeader || "We’ll get in touch with you soon."}
        </div>
        <div className="aer-btn">
          <a href={this.props.buttonLink || "/"}>Keep browsing</a>
        </div>
      </div>
    );
  }
}

export default ContactEnterpriseThankYou;
