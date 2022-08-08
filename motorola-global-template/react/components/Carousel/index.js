import { Slider } from 'vtex.store-components'
import { Component } from 'react';
import Banner from './components/Banner/index'
import './Carousel.global.css';

class Carousel extends Component {
  static schema = {
    title: 'Carousel',
    description: 'Main navbar',
    type: 'object',
    properties: {
      autoplay: {
        title: 'Auto Play Carousel',
        type: 'boolean',
        default: false
      },
      banners: {
        items: {
          title: 'Menu item',
          type: 'object',
          properties: {
            imageUrl: {
              default: '',
              title: 'Banner image (desktop)',
              type: 'string',
              widget: {
                'ui:widget': 'image-uploader',
              },
            },
            imageMobileUrl: {
              default: '',
              title: 'Banner image (mobile)',
              type: 'string',
              widget: {
                'ui:widget': 'image-uploader',
              },
            },
            bannerImageAltText:  {
              default: "",
              title: "Banner image alt text",
              type: "string"
            },
            floatImage: {
              default: '',
              title: 'Float image',
              type: 'string',
              widget: {
                'ui:widget': 'image-uploader',
              },
            },
            floatImageAltText:  {
              default: "",
              title: "Float image alt text",
              type: "string"
            },
            headlineBook: {
              default: '',
              title: 'Headline',
              type: 'string',
            },
            description: {
              default: '',
              title: 'Description',
              type: 'string',
            },
            originalPrice: {
              default: '',
              title: 'Original price',
              type: 'string',
            },
            promoPrice: {
              default: '',
              title: 'Promotion price',
              type: 'string',
            },
            callToActionBorderColor: {
              default: "#eb150a",
              title: 'Call to action border color',
              type: 'string',
              description: 'eg. #eb150a',
            },
            callToActionBackgroundColor: {
              default: "#eb150a",
              title: 'Call to action background color',
              type: 'string',
              description: 'eg. #eb150a',
            },
            callToActionTextColor: {
              default: "#FFFFFF",
              title: 'Call to action text color',
              type: 'string',
              description: 'eg. #FFFFFF',
            },
            callToActionText: {
              default: 'Buy now',
              title: 'Call to action text',
              type: 'string',
            },
            productUrl: {
              default: '',
              title: 'Product URL',
              type: 'string',
            },
            youTubeIdDesktop: {
              default: '',
              title: 'YouTube Id Desktop',
              type: 'string',
              description: 'Add Id of youtube video for desktop for 16:9.',
            },
            youTubeIdMobile: {
              default: '',
              title: 'YouTube Id Mobile',
              type: 'string',
              description: 'Add Id of youtube video for desktop for 3:4.',
            },
          },
        },
        minItems: 1,
        title: 'Banners',
        type: 'array',
      }
    }
  }

  render() {
    const { banners, autoplay } = this.props

    const settings = {
      dots: true,
      infinite: true,
      autoplay: autoplay,
    };

    return (
      <div className="motoMainCarouselHome">
        <Slider sliderSettings={settings}>
          {banners.map((banner, key) => (
            <Banner key={key} {...banner}></Banner>
          ))}
        </Slider>
      </div>
    )
  }
}

export default Carousel;