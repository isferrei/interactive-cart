import React from "react";
import ModalPodcast from "./components/ModalPodcast";
import "./PodcastTrailer.global.css";
import {
  handleResize,
  debounce
} from "../../ComponentRenderer/common/js/deviceDetection";

class PodcastTrailer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false,
      htmlBody: null,
      checkDevice: handleResize()
    };
    this.openModal = this.openModal.bind(this);
  }

  componentDidMount() {
    this.setState({ checkDevice: handleResize() });
    window.addEventListener(
      "resize",
      debounce(() => {
        this.setState({ checkDevice: handleResize() });
        this.generateHtml();
      }, 500)
    );
    this.generateHtml();
  }

  generateHtml = () => {
    const {
      checkDevice: { isMobile }
    } = this.state;

    const {
      trailerPCDescText,
      trailerPodcastImage,
      trailerPodcastImageAlt,
      trailerPodcastListenNowText
    } = this.props;

    let listenIcon = isMobile ? "listen-icon-m.svg" : "listen-icon.svg";

    this.setState({
      htmlBody: (
        <div className="pt-section-body">
          <div className="pt-section-video">
            <img
              className="pt-cover-image"
              src={trailerPodcastImage}
              alt={trailerPodcastImageAlt}
            />
          </div>

          <div className="pt-section-text">
            <div className="pt-desc">
              {trailerPCDescText ? trailerPCDescText : ""}
            </div>
            <div className="pt-listennow" onClick={this.openModal}>
              <div className="text">{trailerPodcastListenNowText}</div>
              <div className="image">
                <img src={`https://motorolaimgrepo.myvtex.com/arquivos/${listenIcon}`} alt="Listen Icon" />
              </div>
            </div>
          </div>
        </div>
      )
    });
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
    const { heading, trailerPodcastId } = this.props;

    return (
      <React.Fragment>
        <div className="podcast-trailer">
          <div className="pt-content">
            <div className="pt-section-header">{heading ? heading : ""}</div>
            {this.state.htmlBody}
          </div>
        </div>

        <ModalPodcast
          isOpen={this.state.isOpen}
          trailerPodcastId={trailerPodcastId}
          onClose={this.closeModal}
        />
      </React.Fragment>
    );
  }
}

export default PodcastTrailer;
