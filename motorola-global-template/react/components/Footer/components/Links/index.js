import { Component } from 'react';
import LinkItem from './LinkItem';

class Links extends Component {
  render() {
    const { lists } = this.props;
    return (
      <section className="checkout-footer-links">
        <div className="container">
          <div className="f-row">
            <div className="checkout-footer-links-row">
              {lists.map((list, key) => (
                <LinkItem key={key} {...list} />
              ))}
            </div>
          </div>
        </div>
      </section>
    )
  }
}

export default Links;