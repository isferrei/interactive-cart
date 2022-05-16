import { Component } from "react";
import Slider from "react-slick";
import { imagePath } from "../../components/CommonProductLogic/index";
import "../../common/css/slick.global.css";
import "../../common/css/slick-theme.global.css";
import "./ModernizedImageGalleryCard.global.css";
import LazyLoad from 'react-lazyload';

class ModernizedImageGalleryCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentSlide: 0
    };
  }

  render() {
    const { modernized_image_gallery_item, modernized_image_gallery_title, modernized_style } = this.props.data;

    var settings = {
      dots: true,
      infinite: true,
      lazyLoad: true,
      autoplay: true,
      speed: 1000,
      autoplaySpeed: 3000,
      slidesToShow: 1,
      slidesToScroll: 1,
      nextArrow: <SampleNextArrow />,
      prevArrow: <SamplePrevArrow />,
      beforeChange: (current, next) => this.setState({ currentSlide: next })
    };
    return (
      <div className={`modernized-image-gallery ${modernized_style ? 'modernized-styles': 'mig-floating-text-wrapper'}`}>
        <div className="mig-container">
        <div className="mig-gallery-title">{modernized_image_gallery_title}</div>
          <Slider {...settings}>
            {modernized_image_gallery_item.map((slide, index) => {
              return (
                <div className="mig-slide-wrapper" key={index}>
                  <LazyLoad
                    offset={100}
                    once
                    throttle={0}
                    placeholder={<img className="mig-lazyload-default-img" src={imagePath + "Lazy-Load-Full-bleed-card.png"} alt="Lazyload Placeholder Image" />}
                  >
                    <img src={imagePath + slide.slide_image} alt={slide.slide_image_alt_text} />
                  </LazyLoad>
                </div>
              );
            })}
          </Slider>
        </div>
        <div className="mig-text-wrapper">
          {modernized_image_gallery_item[this.state.currentSlide].slide_heading ? (
            <div className="mig-text-header">
              {modernized_image_gallery_item[this.state.currentSlide].slide_heading}
            </div>
          ) : null}
          {modernized_image_gallery_item[this.state.currentSlide].slide_body ? (
            <div className="mig-text-desc">
              {modernized_image_gallery_item[this.state.currentSlide].slide_body}
            </div>
          ) : null}
        </div>
      </div>
    );
  }
}
export default ModernizedImageGalleryCard;

function SampleNextArrow(props) {
  const { className, style, onClick } = props;
  return (
    <img
      src={imagePath + "right arrow.svg"}
      alt="Right arrow"
      className={className}
      style={{ ...style }}
      onClick={onClick}
    />
  );
}

function SamplePrevArrow(props) {
  const { className, style, onClick } = props;
  return (
    <img
      src={imagePath + "left arrow.svg"}
      alt="Left arrow"
      className={className}
      style={{ ...style }}
      onClick={onClick}
    />
  );
}
