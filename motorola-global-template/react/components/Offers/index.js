import React, { Fragment, Component } from 'react';
import './Offers.global.css';
import OfferCard from './components/OfferCard/index';

class Offers extends Component {
  static schema = {
    title: 'Offer cards',
    description: 'Offer cards',
    type: 'object',
    properties: {
      offerCards: {
        title: 'Offer cards',
        type: 'array',
        description: 'Offer cards',
        items: {
          title: 'Offer card',
          type: 'object',
          description: 'Offer card',
          properties: {
            imageUrl: {
              default: '',
              title: 'Card image',
              type: 'string',
              widget: {
                'ui:widget': 'image-uploader',
              },
            },
            imageAltText:  {
              default: "",
              title: "Card image alt text",
              type: "string"
            },
            title: {
              default: '',
              title: 'Title',
              type: 'string'
            },
            description: {
              default: '',
              title: 'Description',
              type: 'string'
            },
            link: {
              default: '',
              title: 'Offer Link',
              type: 'string'
            },
            backgroundColor: {
              default: '#fff',
              title: 'Background color',
              type: 'string'
            }
          }
        },
      }
    }
  }
  render() {
    const { offerCards } = this.props;
    return (
      <Fragment>
        <div className="offer-cards">
          {offerCards.map((banner, key) => (
            <OfferCard key={key} {...banner} />
          ))}
        </div>
      </Fragment>
    )
  }
}
export default Offers;