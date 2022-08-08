import { Component } from "react";
import ReactPlayer from "react-player";
import schema from "./schema";

import "./CameraGallery.global.css";
import Gallerylist from "./components/Gallerylist/index";
import { imageAccountPath } from "../ComponentRenderer/common/js/globalConstants";

class CameraGallery extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedIndex: null,
      isPlaying: false,
      isInView: true,
    };
  }

  static schema = schema;

  componentDidMount() {
    window.addEventListener("scroll", this.isInViewport);
  }

  isInViewport = () => {
    if (document.getElementById("cg-vimeo-videoId")) {
      let getVideoIdContainer = document.getElementById("cg-vimeo-videoId");
      let scroll = window.scrollY || window.pageYOffset;
      let elementTop =
        getVideoIdContainer.getBoundingClientRect().top + scroll + 100;
      let elementBottom =
        elementTop + getVideoIdContainer.getBoundingClientRect().bottom - 100;
      let viewportTop = scroll;
      let viewportBottom = scroll + window.innerHeight;
      this.setState({
        isInView:
          (elementTop <= viewportBottom && elementTop >= viewportTop) ||
          (elementBottom <= viewportBottom && elementBottom >= viewportTop)
      });
    }
  };

  // Close method for mobile and tablet
  cgClose = () => {
    this.cgDisplayDetails(this.state.selectedIndex);
  };

  cgDisplayDetails = index => {
    const { selectedIndex } = this.state;
    let getDetailsContainer = document.getElementById("cg-details-container");
    if (selectedIndex !== null) {
      getDetailsContainer.classList.remove("active");
      getDetailsContainer.classList.add("inactive");
    }
    setTimeout(() => {
      this.setState(
        { selectedIndex: selectedIndex === index ? null : index },
        () => {
          setTimeout(() => {
            getDetailsContainer.classList.remove("inactive");
            getDetailsContainer.classList.add("active");
          }, 500);
        }
      );
    }, 500);
  };

  render() {
    const {
      showCameraGallery,
      helptext,
      gridBackgroundImage,
      cameragallery,
      gridBgImageAltText,
      gridBackgroundColor
    } = this.props;

    const { selectedIndex, isInView, isPlaying } = this.state;

    if (!showCameraGallery) {
      return null;
    }
    return (
      <div className="camera-gallery" style={{backgroundColor: gridBackgroundColor || "#111e31"}}>
        <div className="col-md-12">
          <div className={`cg-overlay ${selectedIndex !== null ? "active" : ""}`}>
            <div className="cg-close">
              <img src={imageAccountPath + "close-icon-light.svg"} alt="Close Icon" onClick={() => this.cgClose()}/>
            </div>
          </div>

          <div className="row align-items-sm-center">
            <div className="cg-right col-12 col-lg-6 order-md-last">
              <div className={`cg-helptex ${selectedIndex !== null ? "inactive" : ""}`}>{helptext}</div>
              <div className="cg-details">
                {selectedIndex != null ? (
                  <div id="cg-details-container" className={`cg-details-wrapper ${selectedIndex !== null ? "active" : ""}`}>
                    {cameragallery[selectedIndex].videoUrl ? (<div className="cg-large-video">
                      <ReactPlayer
                        id="cg-vimeo-videoId"
                        className="cg-react-player"
                        url={cameragallery[selectedIndex].videoUrl}
                        frameBorder="0"
                        playsinline={true}
                        controls={true}
                        muted={false}
                        autoPlay={false}
                        loop={true}
                        width="100%"
                        height="100%"
                        playing={ isPlaying ? true : isInView ? true : false} 
                      /></div>
                    ) : (
                        <div className="cg-large-image">
                          <img src={cameragallery[selectedIndex].largeImageUrl} alt={cameragallery[selectedIndex].largeImageAltText} /></div>
                      )}
                    <h3>{cameragallery[selectedIndex].headline}</h3>
                    <h6>{cameragallery[selectedIndex].description}</h6>
                  </div>
                ) : null}
              </div>
            </div>
            <div className="cg-left col-12 col-lg-6 order-md-first">
              <div className="cg-grid-background">
                <img src={gridBackgroundImage} alt={gridBgImageAltText} />
              </div>
              <div className="cg-grid-wrapper">
                {cameragallery.map((galleryList, key) => (
                  <Gallerylist
                    key={key}
                    {...galleryList}
                    id={key}
                    click={this.cgDisplayDetails}
                    selectedItemIndex={selectedIndex}
                  ></Gallerylist>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default CameraGallery;
