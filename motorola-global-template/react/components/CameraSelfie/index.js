import { Component } from "react";
import "./CameraSelfie.global.css";
import Cameralist from './components/Cameralist/index';
import cameraSelfiOnScrollRespond from "./CameraSelfieHelper";
import { offsetVal } from "./CameraSelfieHelperMethods";
import {
  handleResize,
  debounce
} from "../ComponentRenderer/common/js/deviceDetection";

class CameraSelfie extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedIndex: null
    };
  }

  static schema = {
    title: 'Camera Selfie',
    description: 'Camera Selfie',
    type: 'object',
    properties: {
      showCameraSelfie: {
        type: "boolean",
        title: "Show Camera Selfie",
        default: false
      },
      cameraSelfieItems: {
        items: {
          title: 'Menu item',
          type: 'object',
          properties: {
            desktopImageUrl: {
              title: 'Desktop Image',
              type: 'string',
              widget: {
                'ui:widget': 'image-uploader',
              },
            },
            mobileImageUrl: {
              title: 'Mobile Image',
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
            videoUrl: {
              type: "string",
              title: "Video URL",
              description: "Enter Video URL"
            },
            headline: {
              title: 'Headline',
              type: 'string',
              description: "Enter Headline text",
            },
            description: {
              title: 'Description',
              type: 'string',
              description: "Enter Description text",
              widget: {
                "ui:widget": "textarea"
              }
            },
            contentPosition: {
              enum: ["left", "right", "top", "bottom"],
              enumNames: ["Left", "Right", "Top", "Bottom"],
              default: "right",
              type: "string",
              title: "Content position Desktop/Tablet",
              description: "Content position Desktop/Tablet",
              widget: {
                "ui:widget": "select"
              }
            },
          },
        },
        minItems: 1,
        maxItems: 2,
        title: 'Camera Selfie items',
        type: 'array',
      }
    }
  }

  componentDidMount() {
    let offsetValue;
    window.addEventListener(
      "resize",
      debounce(() => {
        offsetValue = offsetVal();
      }, 500)
    );
    offsetValue = offsetVal();
    cameraSelfiOnScrollRespond.exec(offsetValue);
  }

  render() {
    const { showCameraSelfie, cameraSelfieItems } = this.props;
    if (!showCameraSelfie) {
      return null;
    }
    return (
      <div className="camera-selfie">
        <div className="cs-wrapper">          
          {cameraSelfieItems.map((cameraList, key) => (
            <Cameralist key={key} {...cameraList} id={key}></Cameralist>
          ))}
        </div>
      </div>
    );
  }
}

export default CameraSelfie;
