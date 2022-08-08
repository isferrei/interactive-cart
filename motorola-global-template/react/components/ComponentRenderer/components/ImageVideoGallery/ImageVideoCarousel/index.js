import React, { Component } from "react";
import { imagePath } from "../../../components/CommonProductLogic/index";
import "./imageVideoCarousel.global.css";
import "./imageGalleryVimeo.global.css";
import $ from "jquery";
import carouselFunc from "../assets/imageVideoGallery";
import { handleResize, debounce } from "../../../common/js/deviceDetection";
import loadVimeo from "../assets/imageGalleryLoadVimeo";
import {
  getVimeoId,
  buildURLQuery
} from "../assets/imageGalleryVimeoFunctions";
import ReactPlayer from "react-player";

class imageVideoCarousel extends Component {
  constructor(props) {
    super(props);
    this.state = {
      checkDevice: handleResize()
    };
    this.imgGalleryRef = React.createRef();
    loadVimeo.exec();
  }

  componentDidMount() {
    if (this.props.isGalleryFirst) {
      if (
        typeof this.imgGalleryRef !== "undefined" &&
        this.imgGalleryRef.current
      ) {
        this.imgGalleryRef.current.addEventListener(
          "load",
          this.setSlickArrowHeight
        );
      }
    }
    let current = this;
    window.addEventListener(
      "resize",
      debounce(function() {
        current.setState({ checkDevice: handleResize() });
        carouselFunc.adjustBtnCarousel(
          current.props.imageFlag,
          current.state.checkDevice
        );
      }, 500)
    );
  }

  componentDidUpdate() {
    let current = this;
    if (this.props.isGalleryFirst) {
      setTimeout(function() {
        carouselFunc.adjustBtnCarousel(
          current.props.imageFlag,
          current.state.checkDevice
        );
      }, 1000);
    }
  }

  setSlickArrowHeight = () => {
    let imgHeight = this.imgGalleryRef.current.clientHeight;
    if (imgHeight > 0) {
      carouselFunc.setCarouselArrowHeight(
        imgHeight,
        this.props.imageFlag,
        this.state.checkDevice
      );
    }
  };

  render() {
    let galleryElement;
    let videoId = "ivg-video-" + this.props.id;

    if (this.props.galleryItem.gallery_type == "image") {
      galleryElement = (
        <div className="ivg-container">
          <img
            className="ivg-image"
            ref={this.imgGalleryRef}
            src={imagePath + this.props.galleryItem.gallery_desktop_image}
            alt={this.props.galleryItem.gallery_desktop_image_alt_text}
          />
        </div>
      );
    } else {
      if (
        this.props.galleryItem.gallery_desktop_image != null &&
        this.props.galleryItem.gallery_desktop_image != "" &&
        this.props.galleryItem.gallery_desktop_image != undefined
      ) {
        galleryElement = (
          <React.Fragment>
            <div className="ivg-container">
              <img
                className="ivg-image --cover"
                ref={this.imgGalleryRef}
                src={imagePath + this.props.galleryItem.gallery_desktop_image}
                alt="ivg play icon"
              />
              <div className="ivg-play-icon"></div>
            </div>
            <iframe
              id={videoId}
              className="ivg-video"
              type="text/html"
              width="640"
              height="360"
              enablejsapi="1"
              data-ytsrc={this.props.galleryItem.gallery_youtube_video}
            ></iframe>
          </React.Fragment>
        );
      } else {
        if (this.props.galleryItem.gallery_youtube_video) {
          galleryElement = (
            <iframe
              id={videoId}
              className="ivg-video"
              type="text/html"
              width="640"
              height="360"
              enablejsapi="1"
              data-ytsrc={this.props.galleryItem.gallery_youtube_video}
            ></iframe>
          );
        }
        if (this.props.galleryItem.gallery_vimeo_video) {
          let vimeoVideoId = getVimeoId(
            this.props.galleryItem.gallery_vimeo_video
          );
          let vimeoURL = "https://player.vimeo.com/video/" + vimeoVideoId;
          const configOptions = {
            byline: 0,
            title: 0,
            portrait: 0
          };
          if (Object.keys(configOptions).length) {
            vimeoURL = vimeoURL + "?" + buildURLQuery(configOptions);
          }
          // random id
          let randomVimeoId = `ivg-vimeo-video-${Math.floor(
            1 + Math.random() * (200 - 1)
          )}-${Math.floor(1 + Math.random() * (200 - 1))}`;
          galleryElement = (
            <div
              className="ivg-vimeo-wrapper"
              style={{
                width: "100%",
                height: this.props.galleryItem.gallery_height || "500px"
              }}
            >
              {this.props.galleryItem.vimeo_autoplay ? (
                <ReactPlayer
                  url={
                    this.props.galleryItem.gallery_vimeo_url_ignore
                      ? this.props.galleryItem.gallery_vimeo_video
                      : vimeoURL
                  }
                  frameBorder="0"
                  playsinline
                  muted
                  loop
                  autoPlay
                  controls={false}
                  playing
                  width="100%"
                />
              ) : (
                <iframe
                  id={randomVimeoId}
                  src={
                    this.props.galleryItem.gallery_vimeo_url_ignore
                      ? this.props.galleryItem.gallery_vimeo_video
                      : vimeoURL
                  }
                  width="100%"
                  height="100%"
                  frameBorder="0"
                ></iframe>
              )}
            </div>
          );
        }
      }
    }
    return galleryElement;
  }
}
export default imageVideoCarousel;
