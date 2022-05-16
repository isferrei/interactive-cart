import React, { Fragment } from 'react';
import './OfferCard.global.css';

const OfferCard = (props) => {
  return (
    <Fragment>
      <div className="offer-card-container" style={{ backgroundColor: props.backgroundColor }}>
        <a href={props.link}>
          <div className="offer-card">
            <div className="offer-card-image">
              <img alt={props.imageAltText ? props.imageAltText : props.title} src={props.imageUrl} />
            </div>
            <div className="offer-card-content">
              <div className="offer-card-title">{props.title}</div>
              <div className="offer-card-description" dangerouslySetInnerHTML={{ __html: props.description }}></div>
            </div>
          </div>
        </a>
      </div>
    </Fragment>
  )
}
export default OfferCard;