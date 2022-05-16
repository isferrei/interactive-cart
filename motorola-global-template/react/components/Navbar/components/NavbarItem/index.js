import React, { Component } from 'react';
import Dropdown from '../Dropdown/index';

class NavbarItem extends Component {
  state = {
    dropdownOpen: false
  }

  openDropdown = () => {
    this.setState({ dropdownOpen: true })
  }

  closeDropdown = () => {
    this.setState({ dropdownOpen: false })
  }

  render() {
    const { itemTitle } = this.props;
    return (
      <li onMouseOver={this.openDropdown} onMouseOut={this.closeDropdown} className={this.state.dropdownOpen ? "dropdown-open" : "" }>
        <span className="navbar-item">{itemTitle}</span>
        <Dropdown {...this.props} />
      </li>
    )
  }
}
export default NavbarItem;