const schema = {
  title: "Camera Gallery",
  description: "Camera Gallery",
  type: "object",
  properties: {
    showCameraGallery: {
      type: "boolean",
      title: "Show Camera Gallery",
      default: false
    },
    helptext: {
      type: "string",
      title: "Help Text",
      description: "Enter help text"
    },
    gridBackgroundImage: {
      type: "string",
      title: "Grid Background image",
      widget: {
        "ui:widget": "image-uploader"
      }
    },
    gridBackgroundColor: {
      type: "string",
      title: "Grid Background Color",
      description: "Enter background color in HEX code format(#001428)"
     },
    gridBgImageAltText: {
      default: "",
      title: "Grid Background Image Alt Text",
      type: "string"
    },
    cameragallery: {
      items: {
        title: "Menu item",
        type: "object",
        properties: {
          thumbnailImageUrl: {
            default: "",
            title: "Thumbnail image",
            type: "string",
            widget: {
              "ui:widget": "image-uploader"
            }
          },
          thumbnailAltText: {
            default: "",
            title: "Thumbnail Image Alt Text",
            type: "string"
          },
          largeImageUrl: {
            default: "",
            title: "Large Image",
            type: "string",
            widget: {
              "ui:widget": "image-uploader"
            }
          },
          largeImageAltText: {
            default: "",
            title: "Large Image Alt Text",
            type: "string"
          },
          videoUrl: {
            title: "Video URL",
            type: "string",
            description: "Video URL"
          },
          headline: {
            default: "",
            title: "Headline",
            type: "string"
          },
          description: {
            default: "",
            title: "Description",
            type: "string"
          },
          thumbnailText: {
            default: "",
            title: "Thumbnail Text",
            type: "string"
          }
        }
      },
      minItems: 1,
      title: "Camera Gallery",
      type: "array"
    }
  }
};
export default schema;
