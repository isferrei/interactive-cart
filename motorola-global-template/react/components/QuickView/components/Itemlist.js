import React, { Component } from "react";
import {
  handleResize,
  debounce
} from "../../ComponentRenderer/common/js/deviceDetection";
import ReactPlayer from "react-player";

class Itemlist extends Component {
  constructor(props) {
    super(props);
    this.state = {
      checkDevice: handleResize(),
      videoplay: false
    };
  }

  componentDidMount() {
    this.setState({ checkDevice: handleResize() });
    window.addEventListener(
      "resize",
      debounce(() => {
        this.setState({ checkDevice: handleResize() });
        this.detectQuickViewImage();
      }, 500)
    );
    this.detectQuickViewImage();
  }
  detectQuickViewImage = () => {
    const {
      quickViewItemMobileImage,
      quickViewItemTabletImage,
      quickViewItemDesktopImage,
      quickViewItemDesktopImageAltText,
      quickViewItemTabletImageAltText,
      quickViewItemMobileImageAltText
    } = this.props;

    if (this.state.checkDevice.isMobile) {
      this.setState({
        quickviewImage: quickViewItemMobileImage,
        quickviewImageAltText:quickViewItemMobileImageAltText

      });
    } else if (this.state.checkDevice.isTablet) {
      this.setState({
        quickviewImage: quickViewItemTabletImage,
        quickviewImageAltText:quickViewItemTabletImageAltText

      });
    } else if (this.state.checkDevice.isDesktop) {
      this.setState({
        quickviewImage: quickViewItemDesktopImage,
        quickviewImageAltText:quickViewItemDesktopImageAltText

      });
    } else {
      this.setState({
        quickviewImage: quickViewItemDesktopImage,
        quickviewImageAltText:quickViewItemDesktopImageAltText

      });
    }
  };
  handleOnScroll = (playerObject, nextDiv, id) => {
    window.addEventListener("scroll", () => {
      this.triggerScroll(playerObject, nextDiv, id);
    });
  };

  triggerScroll = (playerObject, nextDiv, id) => {
    if (this.state.checkDevice.isMobile) {
      if (
        document.getElementById(playerObject) &&
        this.isInViewport(playerObject)
      ) {
        if(id !== 2) {
          let div1 = document
          .getElementById(playerObject)
          .getBoundingClientRect();
        let div2 = document.getElementById(nextDiv).getBoundingClientRect();
        if (
          div1.right > div2.left &&
          div1.left < div2.right &&
          div1.bottom > div2.top &&
          div1.top < div2.bottom
        ) {
          this.setState({ videoplay: false });
        } else {
          this.setState({ videoplay: true });
        }
        } else {
          this.setState({ videoplay: true });
        }
        
      } else {
        this.setState({ videoplay: false });
      }
    } else {
      if (document.getElementById(playerObject).classList.contains("visible")) {
        this.setState({ videoplay: true });
      } else {
        this.setState({ videoplay: false });
      }
    }
  };
  isInViewport = playerObject => {
    let scroll = window.scrollY || window.pageYOffset;
    let elementTop =
      document.getElementById(playerObject).getBoundingClientRect().top +
      scroll +
      250;
    let elementBottom =
      elementTop +
      document.getElementById(playerObject).getBoundingClientRect().bottom -
      250;
    let viewportTop = scroll;
    let viewportBottom = scroll + window.innerHeight;
    return (
      (elementTop <= viewportBottom && elementTop >= viewportTop) ||
      (elementBottom <= viewportBottom && elementBottom >= viewportTop)
    );
  };
  render() {
    const {
      quickViewItemVideo,
      quickViewItemheadline,
      quickViewItemBody,
      id
    } = this.props;
    var quickviewItem;
    const {
      quickviewImage,
      quickviewImageAltText

    } = this.state;
    if (quickviewImage) {
      quickviewItem = <img src={quickviewImage} alt={quickviewImageAltText}/>;
    } else if (quickViewItemVideo) {
      let div = `qv-animation-item-${id}`;
      let nextdiv = `qv-animation-item-${id + 1}`;
      quickviewItem = (
        <div className="qv-item-video">
          <ReactPlayer
            className="react-player"
            url={quickViewItemVideo}
            frameBorder="0"
            playsinline={true}
            controls={false}
            muted={true}
            autoPlay={true}
            loop={true}
            height="auto"
            width="auto"
            playing={this.state.videoplay}
            onReady={event => {
              this.handleOnScroll(div, nextdiv, id);
            }}
          />
        </div>
      );
    }
    return (
      <div className="qv-animation-items" id={"qv-animation-item-" + id}>
        {quickviewItem}
        <div className="qv-items-contents">
          <div className="qv-items-headline">{quickViewItemheadline}</div>
          <div
            className="qv-items-body"
            dangerouslySetInnerHTML={{
              __html: quickViewItemBody
            }}
          />
        </div>
      </div>
    );
  }
}

export default Itemlist;
