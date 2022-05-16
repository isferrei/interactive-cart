import { Component } from 'react'
import { Link } from 'vtex.render-runtime';

class LinkItem extends Component {
  render() {
    const { listTitle, listItems } = this.props;
    return (
      <div className="checkout-footer-links-accordion">
        <h6>{ listTitle }</h6>
        { listItems ? 
        <ul>
          {
            listItems.map((item, itemKey) => (
              <li key={itemKey}><Link to={item.linkPath}>{item.linkTitle}</Link></li>
            ))
          }
        </ul> : null }
      </div>
    )
  }
}

export default LinkItem;