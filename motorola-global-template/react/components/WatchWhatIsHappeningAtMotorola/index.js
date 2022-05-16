import React from "react";
import ModalVideo from "./components/ModalVideo";
import "./WatchWhatIsHappeningAtMotorola.global.css";
import {
  handleResize,
  debounce
} from "../ComponentRenderer/common/js/deviceDetection";
import {
  commonProductLogic,
  imagePath
} from "../ComponentRenderer/components/CommonProductLogic/index";

class WatchWhatIsHappeningAtMotorola extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false,
      htmlBody: null,
      checkDevice: handleResize()
    };
    this.openModal = this.openModal.bind(this);
  }

  static schema = {
    title: "Watch what's happening at Motorola Component",
    description: "Watch what's happening at Motorola Component content",
    type: "object",
    properties: {
      showWatchWhatIsHappeningAtMoto: {
        type: "boolean",
        title: "Show Watch What is Happening at Motorola Component toggle",
        default: false
      },
      mainTitle: {
        type: "string",
        title: "Header text",
        description:
          "Header text for Watch What is Happening at Motorola Component"
      },
      videoPositioning: {
        enum: ["left", "right"],
        enumNames: ["Left", "Right"],
        default: "right",
        type: "string",
        title: "Video position",
        description: "Video positioning for the component",
        widget: {
          "ui:widget": "select"
        }
      },
      descTextContainer: {
        type: "string",
        title: "Text container description",
        description: "Text container description"
      },
      youtubeVideoId: {
        type: "string",
        title: "Youtube video id",
        description: "Ex: rVCG-9EUrzU"
      }
    }
  };

  componentDidMount() {
    this.setState({ checkDevice: handleResize() });
    window.addEventListener(
      "resize",
      debounce(() => {
        this.setState({ checkDevice: handleResize() });
      }, 500)
    );
    commonProductLogic();
    this.generateHtml();
  }

  generateHtml = () => {
    const {
      checkDevice: { isMobile, isTablet, isDesktop, isWide }
    } = this.state;

    const { descTextContainer, youtubeVideoId, videoPositioning } = this.props;

    if (isMobile || isTablet) {
      this.setState({
        htmlBody: (
          <div className="wihim-section-body">
            <div className="wihim-section-video">
              <img
                className="wihim-cover-image"
                src={
                  "https://img.youtube.com/vi/" +
                  youtubeVideoId +
                  "/maxresdefault.jpg"
                }
                alt="Youtube Video"
              />
              <img
                className="wihim-play-btn"
                src={imagePath + "play-circle.svg"}
                alt="Play Circle"
                onClick={this.openModal}
              />
            </div>
            <div className="wihim-section-text">
              <div className="wihim-desc">
                {descTextContainer ? descTextContainer : ""}
              </div>
            </div>
          </div>
        )
      });
    } else if (isDesktop || isWide) {
      this.setState({
        htmlBody: (
          <div
            className="wihim-section-body"
            style={{
              flexDirection: videoPositioning == "left" ? "row-reverse" : "row"
            }}
          >
            <div className="wihim-section-text">
              <div className="wihim-desc">
                {descTextContainer ? descTextContainer : ""}
              </div>
            </div>

            <div className="wihim-section-video">
              <img
                className="wihim-cover-image"
                src={
                  "https://img.youtube.com/vi/" +
                  youtubeVideoId +
                  "/maxresdefault.jpg"
                }
                alt="Youtube Video"
              />
              <img
                className="wihim-play-btn"
                src={imagePath + "play-circle.svg"}
                alt="Play Circle"
                onClick={this.openModal}
              />
            </div>
          </div>
        )
      });
    }
  };

  openModal = () => {
    this.setState({ isOpen: true });
    document.body.classList.add("no-scroll");
  };

  closeModal = () => {
    this.setState({ isOpen: false });
    document.body.classList.remove("no-scroll");
  };

  render() {
    const {
      showWatchWhatIsHappeningAtMoto,
      mainTitle,
      youtubeVideoId
    } = this.props;

    if (!showWatchWhatIsHappeningAtMoto) {
      return null;
    }

    return (
      <React.Fragment>
        <div className="what-is-happening-in-motorola">
          <div className="wihim-content">
            <div className="wihim-section-header">
              {mainTitle ? mainTitle : ""}
            </div>
            {this.state.htmlBody}
          </div>
        </div>

        <ModalVideo
          channel="youtube"
          isOpen={this.state.isOpen}
          videoId={youtubeVideoId}
          onClose={this.closeModal}
        />
      </React.Fragment>
    );
  }
}

export default WatchWhatIsHappeningAtMotorola;
