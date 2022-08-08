import React from 'react';
import ArrowComponent from '../../common/components/ArrowComponent';

const slickSettings = {
  slidesToShow: 1,
  dots: false,
  centerMode: true,
  focusOnSelect: true,
  centerPadding: '18%',
  slidesToScroll: 1,
  infinite: true,
  responsive: [{
    breakpoint: 991,
    settings: {
      centerPadding: '8%'
    }
  }],
  nextArrow: <ArrowComponent arrowDirection="next" customClassNames="review-arrow review-arrow-next "/>,
  prevArrow: <ArrowComponent arrowDirection="previous" customClassNames="review-arrow review-arrow-previous "/>
};

export default slickSettings;