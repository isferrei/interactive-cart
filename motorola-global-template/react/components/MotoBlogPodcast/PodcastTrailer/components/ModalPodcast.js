import React from "react";
import CSSTransition from "react-transition-group/CSSTransition";
import {
  commonProductLogic,
  imagePath
} from "../../../ComponentRenderer/components/CommonProductLogic/index";

export default class ModalPodcast extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false
    };
    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.updateFocus = this.updateFocus.bind(this);
  }

  openModal() {
    this.setState({ isOpen: true });
  }

  closeModal() {
    this.setState({ isOpen: false });
    if (typeof this.props.onClose === "function") {
      this.props.onClose();
    }
  }

  keydownHandler(e) {
    if (e.keyCode === 27) {
      this.closeModal();
    }
  }

  componentDidMount() {
    commonProductLogic();
    document.addEventListener("keydown", this.keydownHandler.bind(this));
  }

  componentWillUnmount() {
    document.removeEventListener("keydown", this.keydownHandler.bind(this));
  }

  static getDerivedStateFromProps(props) {
    return { isOpen: props.isOpen };
  }

  componentDidUpdate() {
    if (this.state.isOpen && this.modal) {
      this.modal.focus();
    }
  }

  updateFocus(e) {
    if (e.keyCode === 9) {
      e.preventDefault();
      e.stopPropagation();
      if (this.modal === document.activeElement) {
        this.modalbtn.focus();
      } else {
        this.modal.focus();
      }
    }
  }

  getPadding(ratio) {
    const arr = ratio.split(":");
    const width = Number(arr[0]);
    const height = Number(arr[1]);
    const padding = (height * 100) / width;
    return padding + "%";
  }

  render() {
    const style = {
      paddingBottom: this.getPadding(this.props.ratio)
    };

    return (
      <CSSTransition
        classNames={this.props.classNames.modalPodcastEffect}
        timeout={this.props.animationSpeed}
      >
        {() => {
          if (!this.state.isOpen) {
            return null;
          }

          return (
            <div
              className={this.props.classNames.modalPodcast}
              tabIndex="-1"
              role="dialog"
              aria-label={this.props.aria.openMessage}
              onClick={this.closeModal}
              ref={node => {
                this.modal = node;
              }}
              onKeyDown={this.updateFocus}
            >
              <div className={this.props.classNames.modalPodcastBody}>
                <div className={this.props.classNames.modalPodcastInner}>
                  <div
                    className={this.props.classNames.modalPodcastIframeWrap}
                    style={style}
                  >
                    <button
                      className={this.props.classNames.modalPodcastCloseBtn}
                      aria-label={this.props.aria.dismissBtnMessage}
                      ref={node => {
                        this.modalbtn = node;
                      }}
                      onKeyDown={this.updateFocus}
                      style={{
                        backgroundImage: "url(" + imagePath + "close.svg" + ")",
                        backgroundRepeat: "no-repeat"
                      }}
                    />
                    {this.props.children || (
                      <iframe
                        src={"https://open.spotify.com/embed-podcast/episode/" + this.props.trailerPodcastId}
                        width="100%"
                        height="232"
                        frameborder="0"
                        allowtransparency="true"
                        allow="encrypted-media"
                        tabIndex="-1"
                      ></iframe>
                    )}
                  </div>
                </div>
              </div>
            </div>
          );
        }}
      </CSSTransition>
    );
  }
}

ModalPodcast.defaultProps = {
  isOpen: false,
  ratio: "16:9",
  animationSpeed: 300,
  classNames: {
    modalPodcastEffect: "modal-podcast-effect",
    modalPodcast: "modal-podcast",
    modalPodcastClose: "modal-podcast-close",
    modalPodcastBody: "modal-podcast-body",
    modalPodcastInner: "modal-podcast-inner",
    modalPodcastIframeWrap: "modal-podcast-movie-wrap",
    modalPodcastCloseBtn: "modal-podcast-close-btn"
  },
  aria: {
    openMessage: "You just openned the modal podcast",
    dismissBtnMessage: "Close the modal by clicking here"
  }
};
