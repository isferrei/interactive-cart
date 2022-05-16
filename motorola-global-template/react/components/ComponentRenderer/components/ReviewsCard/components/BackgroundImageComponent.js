import React from 'react';
import { imagePath } from "../../CommonProductLogic/index";
import { default as eventBinder } from '../../../common/js/eventBinder';
import { debounce, handleResize as sizeSpecifier } from '../../../common/js/deviceDetection';
import LazyLoad from 'react-lazyload';

class BackgroundImageComponent extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      isDesktop : this.isDesktop()
    };
  }

  setResizeHandlerForBackgroundImage() {
    eventBinder.windowResize(debounce(() => {
          this.setState({});
      }
    ))
  }

  isDesktop () {
    let device = sizeSpecifier();
    return device && !device.isMobile;
  }

  componentDidMount() {
    this.setResizeHandlerForBackgroundImage();
  }

  render() {
    if(!this.props.desktopSrc && !this.props.mobileSrc) {
      return null;
    }
    let isDesktop = this.state.isDesktop;
    return (
      <LazyLoad
        offset={-300}
        once
        throttle={300}
        placeholder={<img className="review-lazyload-default-img" src={imagePath + "Lazy-Load-Square-batwing-03.png"} alt="Lazyload Placeholder Image" />}
      >
        <img className="review-image" src={(imagePath) + (isDesktop ? this.props.desktopSrc : this.props.mobileSrc)}
          alt={isDesktop ? this.props.altDesktopMessage : this.props.altMobileMessage} />
      </LazyLoad>
    );
  }
}

export default BackgroundImageComponent;