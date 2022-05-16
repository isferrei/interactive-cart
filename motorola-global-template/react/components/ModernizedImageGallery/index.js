import { Component } from "react";
import Slider from "react-slick";
import { imageAccountPath } from "../ComponentRenderer/common/js/globalConstants";
import "../ComponentRenderer/common/css/slick.global.css";
import "../ComponentRenderer/common/css/slick-theme.global.css";
import "./ModernizedImageGallery.global.css";

class ModernizedImageGallery extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentSlide: 0
    };
  }

  static schema = {
    title: "Modernized Image Gallery",
    description: "Modernized Image Gallery",
    type: "object",
    properties: {
      showModernizedImageGallery: {
        type: "boolean",
        title: "Show Modernized Image Gallery",
        default: false
      },
      modernizedImageGallery: {
        items: {
          title: "Slide Item",
          type: "object",
          properties: {
            SlideImageUrl: {
              default: "",
              title: "Slide Image",
              type: "string",
              widget: {
                "ui:widget": "image-uploader"
              }
            },
            slideImageUrlAltText: {
              type: "string",
              title: "Slide Image alt text",
              description: "Enter the Slide Image alt text"
            },
            SlideHeading: {
              default: "",
              title: "Slide Heading",
              type: "string",
              description: "Enter slide heading"
            },
            SlideBody: {
              default: "",
              title: "Slide Body",
              type: "string",
              description: "Enter slide body"
            }
          }
        },
        minItems: 1,
        title: "Modernized Image Gallery",
        type: "array"
      },
      modernizedImageGalleryTitle: {
        type: "string",
        title: "Modernized Image Gallery Title"
      },
    }
  };

  render() {
    const { showModernizedImageGallery, modernizedImageGallery, modernizedImageGalleryTitle } = this.props;
    if (!showModernizedImageGallery) {
      return null;
    }
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
      <div className="modernized-image-gallery">
        <div className="mig-container">
        <div className="mig-gallery-title">{modernizedImageGalleryTitle}</div>
          <Slider {...settings}>
            {modernizedImageGallery.map((slide, index) => {
              return (
                <div className="mig-slide-wrapper" key={index}>
                  <img src={slide.SlideImageUrl} alt={slide.slideImageUrlAltText} />
                </div>
              );
            })}
          </Slider>
        </div>
        <div className="mig-text-wrapper">
          {modernizedImageGallery[this.state.currentSlide].SlideHeading ? (
            <div className="mig-text-header">
              {modernizedImageGallery[this.state.currentSlide].SlideHeading}
            </div>
          ) : null}
          {modernizedImageGallery[this.state.currentSlide].SlideBody ? (
            <div className="mig-text-desc">
              {modernizedImageGallery[this.state.currentSlide].SlideBody}
            </div>
          ) : null}
        </div>
      </div>
    );
  }
}
export default ModernizedImageGallery;

function SampleNextArrow(props) {
  const { className, style, onClick } = props;
  return (
    <img
      src={imageAccountPath + "right arrow.svg"}
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
      src={imageAccountPath + "left arrow.svg"}
      alt="Left arrow"
      className={className}
      style={{ ...style }}
      onClick={onClick}
    />
  );
}
