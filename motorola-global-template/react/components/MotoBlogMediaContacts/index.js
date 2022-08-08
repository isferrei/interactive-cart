import React from "react";
import { ExtensionPoint } from "vtex.render-runtime";

class MotoBlogMediaContacts extends React.Component {
  static schema = {
    title: "Motorola Blog Media Contacts",
    description: "Motorola Blog Media Contacts",
    type: "object",
    properties: {
      showMediaContacts: {
        type: "boolean",
        title: "Show Motorola Blog Media Contacts",
        default: false
      }
    }
  };

  render() {
    const { showMediaContacts } = this.props;
    return showMediaContacts ? (
      <>
        <ExtensionPoint id="moto-blog-post-header"></ExtensionPoint>
        <ExtensionPoint id="moto-blog-media-contacts-content"></ExtensionPoint>
        <ExtensionPoint id="moto-blog-post-share"></ExtensionPoint>
      </>
    ) : null;
  }
}

export default MotoBlogMediaContacts;
