import React from "react";
import "./MotoBlogMediaContactsContent.global.css";

class MotoBlogMediaContactsContent extends React.Component {
  static schema = {
    title: "Moto Blog Media Contacts - Content",
    description: "Moto Blog Media Contacts - Content",
    type: "object",
    properties: {
      showMediaContactsContent: {
        type: "boolean",
        title: "Media Contacts - Content",
        default: false
      },
      mediaContactsContent: {
        title: "Media Contacts Content Items",
        type: "array",
        minItems: 1,
        items: {
          title: "Media Contacts Content Items",
          type: "object",
          properties: {
            heading: {
              type: "string",
              title: "Heading",
              description: "Enter Heading text"
            },
            contactList: {
              items: {
                title: "Menu item",
                type: "object",
                properties: {
                  name: {
                    type: "string",
                    title: "Name",
                    description:
                      "Enter Name Ex: Charlotte West (based in UK time zone)"
                  },
                  email: {
                    type: "string",
                    title: "email",
                    description: "Enter Email Ex: cwest@lenovo.com"
                  },
                  telephone: {
                    type: "string",
                    title: "Tel/Whatsapp",
                    description: "Enter Tel/Whatsapp Ex: +44 7825 605720"
                  },
                  weChatId: {
                    type: "string",
                    title: "WeChat",
                    description: "Enter WeChat Id Ex: @CharlotteWest"
                  }
                }
              },
              minItems: 1,
              title: "Add Contact List",
              type: "array"
            }
          }
        }
      }
    }
  };

  render() {
    const { showMediaContactsContent, mediaContactsContent } = this.props;
    if (!showMediaContactsContent) {
      return null;
    }
    return (
        <div className="moto-blog-media-contacts-content">
          {mediaContactsContent.map((contactItems, index) => {
            return (
              <>
              <div className="mbmc-content-wrapper">
                <div className="mbmc-content-header"
                  dangerouslySetInnerHTML={{ __html: contactItems.heading }}
                />
                <div className="mbmc-contact-container">
                  {contactItems.contactList.map(contacts => {
                    return (
                      <div className="mbmc-contact-section">
                        <div className="mbmc-contact-name"
                        dangerouslySetInnerHTML={{ __html: contacts.name }}
                        />
                        <div className="mbmc-contact-email"
                        dangerouslySetInnerHTML={{ __html: contacts.email }}
                        />
                        <div className="mbmc-contact-phone"
                        dangerouslySetInnerHTML={{ __html: contacts.telephone }}
                        />
                        <div className="mbmc-contact-wechat"
                        dangerouslySetInnerHTML={{ __html: contacts.weChatId }}
                        />
                      </div>
                    );
                  })}
                </div>
              </div>
              </>
            );
          })}
        </div>
    );
  }
}

export default MotoBlogMediaContactsContent;
