import { Component } from 'react'
import { Link } from 'vtex.render-runtime';

class LinkItem extends Component {
  state = {
    accordionOpen: false
  }

  openAccordion = () => {
    this.setState((oldState) => ({
      accordionOpen: !oldState.accordionOpen
    }))
  }

  render() {
    const { listTitle, listItems } = this.props;
    return (
      <div className="checkout-footer-links-accordion">
        <h6 className={(this.state.accordionOpen ? "show" : "")} onClick={this.openAccordion}>{ listTitle }</h6>
        { listItems ? 
        <ul className={(this.state.accordionOpen ? "footer-accordion-open" : "")}>
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