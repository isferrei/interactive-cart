import React, { Component } from "react";
import ReactPlayer from "react-player";
import "./pdpMyUx.global.css";


class PdpMyUx extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isMobile: false,
      isTablet: false,
      isDesktop: false,
      width: "auto",
      height: "auto",
      videoRight: true
    };
  }

  componentDidMount() {
    this.handleResize();
    window.addEventListener("resize", this.handleResize);
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.handleResize);
  }

  handleResize = () => {
    this.setState({
      isMobile: window.screen.width < 768 ? true : false,
      isDesktop: window.screen.width >= 992 ? true : false,
      isTablet: (window.screen.width >= 768 && window.screen.width < 992) ? true : false,
    }, () => {
      this.detectVideoSize();
    });
  }

  detectVideoSize = () => {
    const {
      isMobile, isTablet, isDesktop
    } = this.state;

    if (isMobile) {
      this.setState({
        width: "82.5vw",
        height: "74.8vw",
        videoRight: false
      });
    } else if (isTablet || isDesktop) {
      this.setState({
        width: "42vw",
        height: "38vw",
        videoRight: true
      });
    } else {
      this.setState({
        width: "auto",
        height: "auto",
        videoRight: true
      });
    }

  }

  static schema = {
    title: "PDP My UX Video",
    description: "PDP My UX Video",
    type: "object",
    properties: {
      showPdpMyUx: {
        type: "boolean",
        title: "Show Pdp My Ux",
        default: false
      },
      pdpMyUxVideoTitle: {
        type: "string",
        title: "PDP My Ux Video Title"
      },
      pdpMyUxVideoDescription: {
        type: "string",
        title: "PDP My Ux Video Description",
        widget: {
          "ui:widget": "textarea"
        }
      },
      pdpMyUxVideoLink: {
        type: "string",
        title: "PDP My Ux Video Link"
      }
    }
  };

  renderVideo = () => {
    return (
      <div className={`${!this.state.videoRight ? "left" : "" } pmu-item-video`}>

        <ReactPlayer
          className="pmu-react-player"
          url={this.props.pdpMyUxVideoLink}
          frameBorder="0"
          playsinline={true}
          controls={false}
          muted={true}
          autoPlay={true}
          loop={true}
          height={this.state.height}
          width={this.state.width}
          playing={true}
        />

      </div>
    )
  }

  renderText = () => {
    return (
      <div className={`${!this.state.videoRight ? "left" : "bottom" } pmu-video-information`}>
        <h1 className="pmu-video-title">{this.props.pdpMyUxVideoTitle}</h1>
        <p className="pmu-video-description">{this.props.pdpMyUxVideoDescription}</p>
      </div>
    )
  }

  render() {
    const {
      showPdpMyUx,
      pdpMyUxVideoTitle,
      pdpMyUxVideoDescription,
      pdpMyUxVideoLink
    } = this.props;

    if (!showPdpMyUx) {
      return null;
    }
    return (
      <div className="pdp-my-ux">
        <div className="row  pmu-row">
          <div className="col-md-6 col-sm-6 col-xs-12">
            {
              this.state.videoRight ?
              this.renderText() :
              this.renderVideo()
            }
          </div>
          <div className="col-md-6 col-sm-6 col-xs-12">
          {
              this.state.videoRight ?
              this.renderVideo() :
              this.renderText()
            }

          </div>
        </div>
      </div>
    );
  }
}

export default PdpMyUx;
