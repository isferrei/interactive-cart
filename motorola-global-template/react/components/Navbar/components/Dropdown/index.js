import React, { Component } from 'react';
import './Dropdown.global.css';
import SocialIcons from '../SocialIcons/index';
import PromoBlock from '../PromoBlock/index';
import { Link } from 'vtex.render-runtime';

class Dropdown extends Component {
  state = {
    windowWith: window.innerWidth,
    isMobile: window.innerWidth <= 991 ? true : false
  }

  handleResize = (event) => {
    this.setState((state) => ({
      windowWith: window.innerWidth,
      isMobile: state.windowWith <= 991 ? true : false
    }))
  }

  componentDidMount() {
    window.addEventListener('resize', this.handleResize)
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.handleResize)
  }

  updateSidedrawer = () => {
    if (this.props.setSideDrawerOpen) {
      this.props.setSideDrawerOpen(false)
    }
  }

  render() {
    const { promoBlock, dropdownItems } = this.props;
    const items = dropdownItems.filter((item) => (
      item.imageUrl
    ))

    const itemsWithoutImage = () => {
      const items = dropdownItems.filter((item) => (
        !item.imageUrl
      ))
      const result = []
      let itemsPerColumn = 4;
      for (let x = 0; x <= Math.ceil(items.length / itemsPerColumn); x++) {
        result.push(items.slice(x * itemsPerColumn, x * itemsPerColumn + itemsPerColumn))
      }
      return result;
    }

    return (
      <div className="dropdown-box">
        <div className="container">
          <div className="dropdown-container">
            <div className="dropdown-inner">
              <ul>
                {items.map((item, key) => (
                  !item.isHide && 
                  <li key={key}>
                    {item.externalLink ? 
                    <a onClick={this.updateSidedrawer} href={item.itemLink} title={item.itemTitle} target="blank" className="moto-family-image">
                      <figure>
                        <img alt={item.itemTitle} src={item.imageUrl}  />
                        <figcaption>{item.itemTitle}</figcaption>
                      </figure>
                    </a>
                    : 
                    <Link onClick={this.updateSidedrawer} className="moto-family-image" title={item.itemTitle} to={item.itemLink}>
                      <figure>
                        <img alt={item.itemTitle} src={item.imageUrl} />
                        <figcaption>{item.itemTitle}</figcaption>
                      </figure>
                    </Link>
                    }
                  </li>                  
                ))}
                {itemsWithoutImage().map((items, key) => (
                  items.length ? (
                    <li key={key} className="without-image">
                      <ul>
                        {items.map((item, key) => (
                          !item.isHide && 
                          <li key={key}>
                            {item.externalLink ? 
                            <a onClick={this.updateSidedrawer} href={item.itemLink} title={item.itemTitle} target="blank" className="title">
                              <span className="sub-menu-title">{item.itemTitle}</span>
                            </a>
                            : 
                            <Link onClick={this.updateSidedrawer} className="title" title={item.itemTitle} to={item.itemLink}>
                              <span className="sub-menu-title">{item.itemTitle}</span>
                            </Link>
                            }
                          </li>
                        ))}
                      </ul>
                    </li>
                  ) : null
                ))}
              </ul>
              {!this.state.isMobile ? <SocialIcons /> : null}
            </div>
            { promoBlock ? <PromoBlock {...promoBlock} /> : null }
          </div>
        </div>
      </div>
    )
  }
}

export default Dropdown;