const schema = {
  title: "Pure Android",
  description: "Pure Android",
  type: "object",
  properties: {
    showPureAndroid: {
      type: "boolean",
      title: "Show Pure Android",
      default: false
    },
    multiColumnItems: {
      items: {
        title: "Multi Column Item",
        type: "object",
        properties: {
          multiColumnImage: {
            type: "string",
            title: "Desktop android image",
            widget: {
              "ui:widget": "image-uploader"
            }
          },
          multiColumnImageAltText: {
            type: "string",
            title: "Desktop android image alt text",
            description: "Enter the Desktop android image alt text"
          },
          pureAndroidTitle: {
            type: "string",
            title: "Android Title",
            widget: {
              "ui:widget": "textarea"
            }
          },
          pureAndroidDescription: {
            type: "string",
            title: "Android Description",
            widget: {
              "ui:widget": "textarea"
            }
          }
        }
      },
      minItems: 1,
      maxItems: 6,
      title: "Multi Column ",
      type: "array"
    }
  }
}
export default schema