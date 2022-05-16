import React, { Component } from "react";
import ImageVideoCarousel from "./ImageVideoCarousel/index";
import gallerycarousel from "./assets/imageVideoGallery";
import "./imageVideoGallery.global.css";
import { imagePath } from "../CommonProductLogic/index";

import Slider from "react-slick";
import LazyLoad from 'react-lazyload';

class ImageVideoGallery extends Component {
  constructor(props) {
    super(props);
    gallerycarousel.exec();
  }

  render() {
    let settings = {
      dots: true,
      infinite: true,
      centerPadding: "12%",
      centerMode: true,
      slidesToShow: 1,
      slidesToScroll: 1,
      responsive: [
        {
          breakpoint: 991,
          settings: {
            centerPadding: "15%"
          }
        }
      ]
    };

    const {
      data: {
        gallery_header_title,
        field_gallery_header_description,
        field_gallery_background_color,
        field_gallery_text_color,
        field_gallery_sub_layer,
        field_gallery_footer_title,
        field_gallery_footer_description
      }
    } = this.props;
    //image flag for vimeo player
    let imageFlag = false;
    if (field_gallery_sub_layer.length) {
      for (var i = 0; i < field_gallery_sub_layer.length; i++) {
        if (field_gallery_sub_layer[i].gallery_type == "image") {
          imageFlag = true;
          break;
        }
        if (field_gallery_sub_layer[i].gallery_desktop_image) {
          imageFlag = true;
          break;
        }
      }
    }

    const textColor = { color: `#${field_gallery_text_color}` };
    return (
      <div
        className="image-video-gallery"
        style={{ backgroundColor: `#${field_gallery_background_color}` }}
      >
        <div className="ivg-header">
          <div
            className="ivg-title"
            style={textColor}
            dangerouslySetInnerHTML={{ __html: gallery_header_title }}
          ></div>
          <div
            className="ivg-desc"
            style={textColor}
            dangerouslySetInnerHTML={{
              __html: field_gallery_header_description
            }}
          ></div>
        </div>
        <div className="ivg-carousel">
          <LazyLoad
            offset={-100}
            once
            throttle={200}
            placeholder={<img className="ivg-lazyload-default-img" src={imagePath + "Lazy-Load-Full-bleed-card.png"} alt="Lazyload Placeholder Image" />}
          >
          <Slider {...settings}>
            {field_gallery_sub_layer.map((galleryEle, index) => (
              <figure key={index} className="ivg-slide">
                <ImageVideoCarousel
                  galleryItem={galleryEle}
                  id={index}
                  isGalleryFirst={index === 0 ? true : false}
                  imageFlag={imageFlag}
                ></ImageVideoCarousel>
                <figcaption className="ivg-caption">
                  <div
                    className="ivg-caption-title"
                    style={textColor}
                    dangerouslySetInnerHTML={{
                      __html: galleryEle.gallery_caption_title
                    }}
                  ></div>
                  <div
                    className="ivg-caption-desc"
                    style={textColor}
                    dangerouslySetInnerHTML={{
                      __html: galleryEle.gallery_caption_desc
                    }}
                  ></div>
                </figcaption>
              </figure>
            ))}
          </Slider>
          </LazyLoad>
        </div>
        <div className="ivg-footer">
          <div
            className="ivg-title"
            style={textColor}
            dangerouslySetInnerHTML={{ __html: field_gallery_footer_title }}
          ></div>
          <div
            className="ivg-desc"
            style={textColor}
            dangerouslySetInnerHTML={{
              __html: field_gallery_footer_description
            }}
          ></div>
        </div>
        <div className="ivg-fullscreen">
          <span className="ivg-close-icon"></span>
        </div>
      </div>
    );
  }
}

export default ImageVideoGallery;
