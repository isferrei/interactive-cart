import React from 'react';
import './SideDrawer.global.css';
import SocialIcons from '../SocialIcons';
import SideDrawerItem from '../SideDrawerItem/index';

const SideDrawer = (props) => {
  return (
    <aside className={props.sideDrawerActive ? "sidedrawer open-sidedrawer" : "sidedrawer"}>
      <ul>
        {props.items.map((item, key) => (
          <SideDrawerItem setSideDrawerOpen={(active) => props.setSideDrawerOpen(active)} key={key} {...item}/>
        ))}
      </ul>
      <ul className="side-sub-nav">
        <li><a href="/">Español</a></li>
        <li><a href="/">Email Sign-Up</a></li>
        <li><a href="/">motorolaBlog</a></li>
        <li><a href="/">MotoCare Extended Warranty</a></li>
        <li><a href="/">Support</a></li>
      </ul>
      <SocialIcons />
    </aside>
  );
}
export default SideDrawer;