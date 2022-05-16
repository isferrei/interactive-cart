import { Component } from "react";
import "./OmniChannelOdyssey.global.css";
import OmniChannelList from './components/OmniChannelList/index';

class OmniChannelOdyssey extends Component {
  constructor(props) {
    super(props);
  }

  static schema = {
    title: 'Omni Channel Odyssey',
    description: 'Omni Channel Odyssey',
    type: 'object',
    properties: {
      showOmniChannelOdyssey: {
        type: "boolean",
        title: "Show Omni Channel Odyssey",
        default: false
      },
      heading: {
        title: 'Heading',
        type: 'string',
        description: "Enter heading",
      },
      headingColor: {
        title: 'Heading color',
        type: 'string',
        description: "Enter hexcode EX: #000000",
      },
      backgroundColor: {
        title: 'Background color',
        type: 'string',
        description: "Enter hexcode EX: #D2D2D2",
      },
      omniChannelOdysseyItems: {
        items: {
          title: 'Menu item',
          type: 'object',
          properties: {
            logoImageUrl: {
              title: 'Logo Image',
              type: 'string',
              widget: {
                'ui:widget': 'image-uploader',
              },
            },
            imageAltText: {
              default: "",
              title: "Image Alt Text",
              type: "string"
            },
            hyperLink: {
              title: 'Hyper Link',
              type: 'string',
              description: "Enter hyper link",
              widget: {
                "ui:widget": "textarea"
              }
            },
            targetWindow: {
              enum: ["_blank", "_self"],
              enumNames: ["New", "Self"],
              default: "new",
              type: "string",
              title: "Target Window",
              description: "Select target window to open link in new/self tab",
              widget: {
                "ui:widget": "select"
              }
            },
          },
        },
        minItems: 1,
        title: 'Omni Channel Odyssey items',
        type: 'array',
      }
    }
  }

  render() {
    const { showOmniChannelOdyssey, backgroundColor, heading, headingColor, omniChannelOdysseyItems } = this.props;
    if (!showOmniChannelOdyssey) {
      return null;
    }
    return (
      <div
      className="omni-channel-odyssey"
      id="omni-channel-odyssey"
      style={{
        backgroundColor: backgroundColor ? backgroundColor : "#D2D2D2"
      }}
      >
        <div className="container">
          {heading ? (
            <div
            className="oco-heading"
            style={{
              color: headingColor ? headingColor : "#000000"
            }}
            >{heading}</div>
          ) : null}

          <div className="oco-list">
            {omniChannelOdysseyItems.map((OmniList, key) => (
              <OmniChannelList key={key} {...OmniList} id={key}></OmniChannelList>
            ))}
          </div>
        </div>
      </div>
    );
  }
}

export default OmniChannelOdyssey;
