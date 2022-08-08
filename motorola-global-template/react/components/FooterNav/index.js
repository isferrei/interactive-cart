import React, { Component } from 'react';
import LinkItem from './components/LinkItem';

class FooterNav extends Component {
  static schema = {
    title: "Footer nav",
    description: 'Footer navbar',
    type: 'object',
    properties: {
      lists: {
        items: {
          title: 'Link block',
          type: 'object',
          properties: {
            listTitle: {
              default: '',
              title: 'Block title',
              type: 'string',
            },
            listItems: {
              items: {
                title: 'Link',
                type: 'object',
                properties: {
                  linkTitle: {
                    default: '',
                    title: 'Link title',
                    type: 'string',
                  },
                  linkPath: {
                    default: '/',
                    title: 'Link path',
                    type: 'string',
                  },
                },
              },
              minItems: 1,
              title: 'List items',
              type: 'array',
            }
          },
        },
        minItems: 1,
        title: 'Link blocks',
        type: 'array',
      }
    }
  }

  render () {
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

export default FooterNav;