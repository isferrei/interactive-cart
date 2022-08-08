import React from "react";
import Slider from "react-slick";

import ReviewComponent from "./components/ReviewComponent";
import slickSettings from "./slick-config";
import "./reviewsCard.global.css";

class ReviewsCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentActiveSlick: 0
    };
  }

  checkIfReviewsExist() {
    return (
      this.props &&
      this.props.data &&
      this.props.data.reviews &&
      Array.isArray(this.props.data.reviews) &&
      this.props.data.reviews.length > 0
    );
  }

  populateReviews() {
    if (this.checkIfReviewsExist()) {
      return this.props.data.reviews.map((review, index) => {
        return (
          <ReviewComponent
            content={review}
            key={index}
            index={index}
          />
        );
      });
    }
    return null;
  }

  afterChangeHandler(currentIndex) {
    this.setState({ currentActiveSlick: currentIndex });
  }

  render() {
    let reviews = this.populateReviews();
    slickSettings.afterChange = this.afterChangeHandler.bind(this);
    
    return (
      <div className="rc_container">
        <Slider {...slickSettings}>{reviews}</Slider>
      </div>
    );
  }
}

export default ReviewsCard;
