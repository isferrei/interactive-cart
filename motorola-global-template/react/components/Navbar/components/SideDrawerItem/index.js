import React, { Component }  from 'react';
import Dropdown from '../Dropdown/index';

class SideDrawerItem extends Component {
  state = {
    dropdownOpen: false
  }

  openDropDown = () => {
    this.setState((state) => ({
      dropdownOpen: !state.dropdownOpen
    }))
  }
  render() {
    const { itemTitle } = this.props;
    return (
      <li onClick={this.openDropDown} className={this.state.dropdownOpen ? "dropdown-open" : null}>
        <div className="sidedrawer-item">
          <span className="link-title">{itemTitle}</span>
          <span className="link-arrow" />
        </div>
        <Dropdown setSideDrawerOpen={(active) => this.props.setSideDrawerOpen(active)} {...this.props} />
      </li>
    )
  }
}

export default SideDrawerItem;