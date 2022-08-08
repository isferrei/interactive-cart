import React from 'react';
import { Link } from 'vtex.render-runtime';
import './PromoBlock.global.css';

const PromoBlock = props => {
  const block = () => (
    props.imageUrl && props.blockTitle && props.blockDescription && (
    <div className="promo-block" style={{ background: 'url(' + props.imageUrl + ')' }}>
      <div className="promo-text">
        <div className="promo-title">
          {props.blockTitle}
        </div>
        <div className="promo-description">
          {props.blockDescription}
        </div>
      </div>
    </div>
    )
  )
  return (
    props.externalLink ?
    <a href={props.link} target="blank">
      {block()}
    </a>
    :
    <Link to={props.link}>
      {block()}
    </Link>
  )
}
export default PromoBlock;