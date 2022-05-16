import React from "react";
import CSSTransition from "react-transition-group/CSSTransition";
import {
  commonProductLogic,
  imagePath
} from "../../ComponentRenderer/components/CommonProductLogic/index";

export default class ModalVideo extends React.Component {
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

  getQueryString(obj) {
    let url = "";
    for (var key in obj) {
      if (obj.hasOwnProperty(key)) {
        if (obj[key] !== null) {
          url += key + "=" + obj[key] + "&";
        }
      }
    }
    return url.substr(0, url.length - 1);
  }

  getYoutubeUrl(youtube, videoId) {
    const query = this.getQueryString(youtube);
    return "//www.youtube.com/embed/" + videoId + "?" + query;
  }

  getVideoUrl(opt, videoId) {
    if (opt.channel === "youtube") {
      return this.getYoutubeUrl(opt.youtube, videoId);
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
        classNames={this.props.classNames.modalVideoEffect}
        timeout={this.props.animationSpeed}
      >
        {() => {
          if (!this.state.isOpen) {
            return null;
          }

          return (
            <div
              className={this.props.classNames.modalVideo}
              tabIndex="-1"
              role="dialog"
              aria-label={this.props.aria.openMessage}
              onClick={this.closeModal}
              ref={node => {
                this.modal = node;
              }}
              onKeyDown={this.updateFocus}
            >
              <div className={this.props.classNames.modalVideoBody}>
                <div className={this.props.classNames.modalVideoInner}>
                  <div
                    className={this.props.classNames.modalVideoIframeWrap}
                    style={style}
                  >
                    <button
                      className={this.props.classNames.modalVideoCloseBtn}
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
                        id="watch-blog-video"
                        width="460"
                        height="230"
                        src={this.getVideoUrl(this.props, this.props.videoId)}
                        frameBorder="0"
                        allow={
                          "accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                        }
                        allowFullScreen={this.props.allowFullScreen}
                        tabIndex="-1"
                      />
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

ModalVideo.defaultProps = {
  channel: "youtube",
  isOpen: false,
  youtube: {
    autoplay: 1,
    cc_load_policy: 1,
    color: null,
    controls: 1,
    disablekb: 0,
    enablejsapi: 1,
    end: null,
    fs: 1,
    h1: null,
    iv_load_policy: 1,
    list: null,
    listType: null,
    loop: 0,
    modestbranding: null,
    origin: null,
    playlist: null,
    playsinline: null,
    rel: 0,
    showinfo: 0,
    start: 0,
    wmode: "transparent",
    theme: "dark",
    mute: 0
  },
  ratio: "16:9",
  allowFullScreen: true,
  animationSpeed: 300,
  classNames: {
    modalVideoEffect: "modal-video-effect",
    modalVideo: "modal-video",
    modalVideoClose: "modal-video-close",
    modalVideoBody: "modal-video-body",
    modalVideoInner: "modal-video-inner",
    modalVideoIframeWrap: "modal-video-movie-wrap",
    modalVideoCloseBtn: "modal-video-close-btn"
  },
  aria: {
    openMessage: "You just openned the modal video",
    dismissBtnMessage: "Close the modal by clicking here"
  }
};
