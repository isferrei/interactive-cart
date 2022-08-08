import { Component } from "react";
import ReactPlayer from "react-player";
import "./CameraGalleryCard.global.css";
import Gallerylist from "./components/Gallerylist/index";
import { imagePath } from "../../components/CommonProductLogic/index";
import LazyLoad from "react-lazyload";

class CameraGalleryCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedIndex: null,
      isPlaying: false,
      isInView: true,
      indexProps: ""
    };
  }

  componentDidMount() {
    this.setState({
      indexProps: this.props.indexProp
    });
    window.addEventListener("scroll", this.isInViewport);
  }

  componentWillUnmount() {
    window.removeEventListener("scroll", this.isInViewport);
  }

  isInViewport = () => {
    if (document.getElementById("cg-vimeo-videoId-" + this.state.indexProps)) {
      let getVideoIdContainer = document.getElementById(
        "cg-vimeo-videoId-" + this.state.indexProps
      );
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

    setTimeout(() => {
      if (selectedIndex !== null) {
        getDetailsContainer.classList.remove("active");
        getDetailsContainer.classList.add("inactive");
      }
    }, 0);

    setTimeout(() => {
      this.setState(
        { 
          selectedIndex: selectedIndex === index ? null : index 
        },
        () => {
          setTimeout(() => {
            if(getDetailsContainer !== null) {
              getDetailsContainer.classList.remove("inactive");
              getDetailsContainer.classList.add("active");
            }
          }, 500);
        }
      );
    }, 500);
  };

  render() {
    const {
      help_text,
      grid_background_image,
      interactive_image_gallery_items,
      slide_image_alt_text
    } = this.props.data;

    const { selectedIndex, isInView, isPlaying } = this.state;

    return (
      <div className="camera-gallery">
        <div className="col-md-12">
          <div
            className={`cg-overlay ${selectedIndex !== null ? "active" : ""}`}
          >
            <div className="cg-close">
              <img
                src={imagePath + "close-icon-light.svg"}
                alt="Close Icon"
                onClick={() => this.cgClose()}
              />
            </div>
          </div>

          <div className="row align-items-sm-center">
            <div className="cg-right col-12 col-lg-6 order-md-last">
              <div
                className={`cg-helptex ${
                  selectedIndex !== null ? "inactive" : ""
                }`}
              >
                {help_text}
              </div>
              <div className="cg-details">
                {selectedIndex != null ? (
                  <div
                    id="cg-details-container"
                    className={`cg-details-wrapper ${
                      selectedIndex !== null ? "active" : ""
                    }`}
                  >
                    {interactive_image_gallery_items[selectedIndex]
                      .video_url ? (
                      <div className={`cg-large-video ${selectedIndex}`}>
                        <ReactPlayer
                          id={"cg-vimeo-videoId-" + this.state.indexProps}
                          className="cg-react-player"
                          url={
                            interactive_image_gallery_items[selectedIndex]
                              .video_url
                          }
                          frameBorder="0"
                          playsinline={true}
                          controls={true}
                          muted={false}
                          autoPlay={false}
                          loop={true}
                          width="100%"
                          height="100%"
                          playing={isPlaying ? true : isInView ? true : false}
                        />
                      </div>
                    ) : (
                      <div className="cg-large-image">
                        <img
                          src={
                            imagePath +
                            interactive_image_gallery_items[selectedIndex]
                              .large_image
                          }
                          alt={
                            interactive_image_gallery_items[selectedIndex]
                              .large_image_alt_text
                          }
                        />
                      </div>
                    )}
                    <h3>
                      {
                        interactive_image_gallery_items[selectedIndex]
                          .headline_text
                      }
                    </h3>
                    <h6>
                      {
                        interactive_image_gallery_items[selectedIndex]
                          .description_text
                      }
                    </h6>
                  </div>
                ) : null}
              </div>
            </div>
            <div className="cg-left col-12 col-lg-6 order-md-first">
              <div className="cg-grid-background">
                <LazyLoad
                  offset={100}
                  once
                  throttle={0}
                  placeholder={
                    <img
                      className="cg-lazyload-default-img"
                      src={imagePath + "Lazy-Load-Builder-card.png"}
                      alt="Lazyload Placeholder Image"
                    />
                  }
                >
                  <img
                    src={imagePath + grid_background_image}
                    alt={slide_image_alt_text}
                  />
                </LazyLoad>
              </div>
              <div className="cg-grid-wrapper">
                {interactive_image_gallery_items.map((galleryList, key) => (
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

export default CameraGalleryCard;
