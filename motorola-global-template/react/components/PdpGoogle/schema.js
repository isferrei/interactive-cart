const schema = {
  title: "PDP Google",
  description: "PDP Google",
  type: "object",
  properties: {
    showPdpGoogle: {
      type: "boolean",
      title: "Show PDP Google",
      default: false
    },
    bgImageDesktop01: {
      type: "string",
      title: "Desktop/tablet PDP Google background image 01",
      widget: {
        "ui:widget": "image-uploader"
      }
    },
    desktopImgAltText01: {
      default: "",
      title: "01 Desktop Background Image Alt Text",
      type: "string"
    },
    bgImageDesktop02: {
      type: "string",
      title: "Desktop/tablet PDP Google background image 02",
      widget: {
        "ui:widget": "image-uploader"
      }
    },
    desktopImgAltText02: {
      default: "",
      title: "02 Desktop Background Image Alt Text",
      type: "string"
    },
    bgImageMobile01: {
      type: "string",
      title: "Mobile PDP Google background image 01",
      widget: {
        "ui:widget": "image-uploader"
      }
    },
    mobileImgAltText01: {
      default: "",
      title: "01 Mobile Background Image Alt Text",
      type: "string"
    },
    bgImageMobile02: {
      type: "string",
      title: "Mobile PDP Google background image 02",
      widget: {
        "ui:widget": "image-uploader"
      }
    },
    mobileImgAltText02: {
      default: "",
      title: "02 Mobile Background Image Alt Text",
      type: "string"
    },
    pdpGoogleTitle01: {
      type: "string",
      title: "PDP Google Title 01",
      widget: {
        "ui:widget": "textarea"
      }
    },
    pdpGoogleDescription01: {
      type: "string",
      title: "PDP Google Description 01",
      widget: {
        "ui:widget": "textarea"
      }
    },
    pdpGoogleTitle02: {
      type: "string",
      title: "PDP Google Title 02",
      widget: {
        "ui:widget": "textarea"
      }
    },
    pdpGoogleDescription02: {
      type: "string",
      title: "PDP Google Description 02",
      widget: {
        "ui:widget": "textarea"
      }
    }
  }
};
export default schema;
