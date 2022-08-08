import React from 'react';
import parse from 'html-react-parser';
import {imagePath} from  '../../CommonProductLogic/index';
import LazyLoad from 'react-lazyload';

const LogoComponent = (props) => {
  const {logoHeight} =props;
  if(!props.logo) {
    return null;
  }

  function addBorder(position) {
    if(position == "right") {
      return 'logo-border-left';
    } else if (position == "left") {
      return 'logo-border-right';
    } else {
      return '';
    }
  }


  return (

    <LazyLoad
      offset={-300}
      once
      throttle={300}
      placeholder={<img className="review-lazyload-default-img" src={imagePath + "Lazy-Load-Square-batwing-03.png"} alt="Lazyload Placeholder Image" />}
    >
      <div className={ "review-logo-container padding-left-right " + props.class + ' ' + addBorder(props.position) }
          style={{ textAlign: "center", width: (props.width) + '%', minHeight: (props.position == "center" ? '0px' : '150px')}}>
            {
            logoHeight ? (<img className="review-logo-image" src={imagePath + props.logo} alt={props.alt} style={{height:`${logoHeight}px`, width: 'auto'}} />) : ( <img className="review-logo-image" src={imagePath + props.logo} alt={props.alt} />)
            }
      </div>
    </LazyLoad>
  );
}

export default LogoComponent;