import { Component } from "react";
import { ExtensionPoint } from "vtex.render-runtime";

import "./Footer.global.css";

class Footer extends Component {
  render() {
    const { showSocialIcons } = this.props;
    return (
      <footer className="checkout-footer">
        <div className="unsubscribe-wrapper">
          <ExtensionPoint id="unsubscribe-link" />
        </div>
        <ExtensionPoint id="social-icons" />
        <ExtensionPoint id="footer-nav" />
        <section className="checkout-footer-copy">
          <div className="container">
            <div className="f-row">
              <ExtensionPoint id="current-location" />
              <ExtensionPoint id="copy-right" />
            </div>
          </div>
        </section>
      </footer>
    );
  }
}

Footer.schema = {
  title: "Footer",
  description: "Main footer",
  type: "object"
};

export default Footer;
