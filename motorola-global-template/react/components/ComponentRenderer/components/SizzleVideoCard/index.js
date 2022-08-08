import { Component } from "react";
import "./SizzleVideoCard.global.css";
import { imagePath } from "../../components/CommonProductLogic/index";
import SizzleVideoPlayer from './components/SizzleVideoPlayer/index';
import { handleResize, debounce } from "../../common/js/deviceDetection";
import LazyLoad from 'react-lazyload';

class SizzleVideoCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      checkDevice: handleResize(),
      sizzleBackgroundImage: "",
      sizzleBGImageAlt: ""
    };
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
    const { mobile_background_image, desktop_background_image, mobile_background_image_alt, desktop_background_image_alt } = this.props.data;

    if (this.state.checkDevice.isMobile) {
      this.setState({
        sizzleBackgroundImage: `${imagePath}${mobile_background_image}`
      });
      this.setState({
        sizzleBGImageAlt: mobile_background_image_alt ? mobile_background_image_alt : ""
      });
    } else {
      this.setState({
        sizzleBackgroundImage: `${imagePath}${desktop_background_image}`
      });
      this.setState({
        sizzleBGImageAlt: desktop_background_image_alt ? desktop_background_image_alt : ""
      });
    }
  };

  render() {
    const { background_color } = this.props.data;

    return (
      <div
        className="sizzle-video"
        style={{ backgroundColor: `#${background_color}`}}
      >
      {this.state.sizzleBackgroundImage ? (
        <LazyLoad
          offset={100}
          once
          throttle={0}
          placeholder={<img className="sv-lazyload-default-img" src={imagePath + "Lazy-Load-Full-bleed-card.png"} alt="Lazyload Placeholder Image" />}
        >
          <img
            src={this.state.sizzleBackgroundImage}
            alt={this.state.sizzleBGImageAlt}
            className="sv-background-image"
          />
        </LazyLoad>
      ) : null}
          <LazyLoad
            offset={100}
            once
            throttle={0}
            placeholder={<img className="sv-lazyload-default-img" src={imagePath + "Lazy-Load-Full-bleed-card.png"} alt="Lazyload Placeholder Image" />}
          >
            <SizzleVideoPlayer ref="SizzleVideoPlayerItems" data={this.props}></SizzleVideoPlayer>
          </LazyLoad>
      </div>
    );
  }
}

export default SizzleVideoCard;
