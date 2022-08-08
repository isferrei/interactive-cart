import React from 'react';

const MotoCareItem = props => {
  return (
    <div onClick={props.selectAssembly} className="moto-care-option">
      <div className={props.checked ? "moto-care-radio-input radio-checked" : "moto-care-radio-input"}></div>
      <div className="moto-care-option-details">
        <div className="moto-care-option-price"><strong>{props.price}</strong></div>
        <div className="moto-care-option-name">{props.name}</div>
      </div>
    </div>
  )
}

export default MotoCareItem