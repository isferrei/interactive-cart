import React from 'react';
import './MenuToggle.global.css';

const MenuToggle = (props) => {
  return (
    <button onClick={props.click} className={ props.active ? "menu-toggle button-active" : "menu-toggle" }>
      <span className="icon-bar" />
      <span className="icon-bar" />
    </button>
  )
}

export default MenuToggle;