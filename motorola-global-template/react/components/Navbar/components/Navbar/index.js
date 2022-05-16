import React from 'react';
import './Navbar.global.css';

import NavbarItem from '../NavbarItem/index';

const Navbar = (props) => {
  return (
    <nav className="main-nav">
      <div className="nav-inner">
        <ul>
          {props.items.map((item, key) => (
            <NavbarItem key={key} {...item}/>
          ))}
        </ul>
      </div>
    </nav>
  )
}
export default Navbar;