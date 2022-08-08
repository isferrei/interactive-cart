import { Component } from "react";
import "./SizzleVideo.global.css";
import SizzleVideoPlayer from './components/SizzleVideoPlayer/index';
import {
  handleResize,
  debounce
} from "../ComponentRenderer/common/js/deviceDetection";

class SizzleVideo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      checkDevice: handleResize(),
      sizzleBackgroundImage: "",      
    };
  }

  static schema = {
    title: 'Sizzle Video',
    description: 'Sizzle Video',
    type: 'object',
    properties: {
      showSizzleVideo: {
        type: "boolean",
        title: "Show Sizzle Video",
        default: false
      },
      headline: {
        type: "string",
        title: "Headline",
        description: "Enter Headline text"
      },
      description: {
        type: "string",
        title: "Description",
        description: "Enter Description text",
        widget: {
          "ui:widget": "textarea"
        }
      },
      introVideoUrl: {
        type: "string",
        title: "Intro Video URL",
        description: "Enter Intro Video URL"
      },
      mainVideoUrl: {
        type: "string",
        title: "Main Video URL",
        description: "Enter Main Video URL"
      },
      backgroundColor: {
        type: "string",
        title: "Background Color",
        description: "Enter the hexa code color ex: 111E31"
      },
      desktopBackgroundImage: {
        type: "string",
        title: "Desktop Background Image",
        widget: {
          "ui:widget": "image-uploader"
        }
      },
      mobileBackgroundImage: {
        type: "string",
        title: "Mobile Background Image",
        widget: {
          "ui:widget": "image-uploader"
        }
      },
    }
  }

  componentDidMount() {
    this.setState({ checkDevice: handleResize() });
    window.addEventListener(
      "resize",
      debounce(() => {
        this.setState({ checkDevice: handleResize() });
        this.detectBackgroundImage();
      }, 500)
    );
    this.detectBackgroundImage();
  }

  detectBackgroundImage = () => {
    if (this.state.checkDevice.isMobile) {
      this.setState({
        sizzleBackgroundImage: this.props.mobileBackgroundImage
      });
    } else {
      this.setState({
        sizzleBackgroundImage: this.props.desktopBackgroundImage
      });
    }
  };

  render() {
    const { showSizzleVideo, backgroundColor } = this.props;
    if (!showSizzleVideo) {
      return null;
    }
    return (
      <div 
        className="sizzle-video"
        style={{ backgroundColor: `#${backgroundColor}`}}
      >
      {this.state.sizzleBackgroundImage ? (
        <img
        src={this.state.sizzleBackgroundImage}
        className="sv-background-image"
        />
      ) : null}
        <SizzleVideoPlayer ref="SizzleVideoPlayerItems" data={this.props}></SizzleVideoPlayer>
      </div>
    );
  }
}

export default SizzleVideo;
