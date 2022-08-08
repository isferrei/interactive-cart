export const schemaComparisonTable = {
  title: "ComparisonTable",
  type: "object",
  description: "ComparisonTable",
  properties: {
    data: {
      title: "ComparisonTable",
      type: "object",
      properties: {
        ct_title: {
          type: "string",
          default: "",
          title: "Content title"
        },
        ct_image_columns: {
          items: {
            title: "Image Columns",
            type: "object",
            properties: {
              ct_image_logo_upload: {
                title: "Upload the image Logo",
                widget: {
                  "ui:widget": "image-uploader"
                },
                type: "string"
              },
              ct_image_logo: {
                title: "Name of the image logo",
                type: "string",
                default: ""
              },
              ct_image_logo_alt_text: {
                title: "Image logo alt text",
                default: "",
                type: "string"
              },
              ct_image_phone_upload: {
                title: "Upload the Phone picture",
                widget: {
                  "ui:widget": "image-uploader"
                },
                type: "string"
              },
              ct_img_phone: {
                title: "Phone picture name",
                default: "",
                type: "string"
              },
              ct_img_phone_alt_text: {
                title: "Phone picture description",
                default: "",
                type: "string"
              },
              ct_cta_link: {
                title: "URL of the CTA Button",
                default: "",
                type: "string"
              },
              ct_cta_text: {
                title: "Name of the CTA Button",
                default: "",
                type: "string"
              }
            }
          },
          title: "Insert Image Columns",
          type: "array",
          default: [],
          maxItems: 5
        },
        ct_rows: {
          items: {
            title: "Info Rows",
            type: "object",
            properties: {
              ct_name_row: {
                type: "string",
                default: "",
                title: "Name of Row",
                widget: {
                  "ui:widget": "textarea"
                }
              },
              ct_col_check: {
                type: "string",
                default: "",
                title: "Options Check"
              }
            }
          },
          title: "Insert table rows",
          type: "array",
          default: [],
          maxItems: 5
        }
      }
    }
  }
};
