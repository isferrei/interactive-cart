import React from 'react';
import { Link } from 'vtex.render-runtime';

class MotoTile extends React.Component {
  static schema = {
    title: 'Moto tile',
    description: 'Moto tile with a Call to Action',
    type: 'object',
    properties: {
      imageUrl: {
        type: 'string',
        title: 'Icon',
        widget: {
          'ui:widget': 'image-uploader',
        },
      },
      imageAltText:  {
        default: "",
        title: "Icon image alt text",
        type: "string"
      },
      title: {
        type: 'string',
        title: 'Title',
      },
      backgroundColor: {
        type: 'string',
        title: 'Background color'
      },
      callToActionLink: {
        type: 'string',
        title: 'Call to action link',
      },
      externalLink: {
        type: 'boolean',
        title: 'External link',
        default: false
      },
      callToActionText: {
        type: 'string',
        title: 'Call to action text',
      },
      callToActionTextColor: {
        type: 'string',
        title: 'Call to action text Color'
      }
    },
  }

  render() {
    const { imageUrl, imageAltText, backgroundColor, title, callToActionLink, externalLink, callToActionText, callToActionTextColor } = this.props;
    return (
      <div
        className="moto-tile"
        style={{
          backgroundColor: backgroundColor
        }}
      >
        <div className="tile-icon">
          <img src={ imageUrl } alt={imageAltText} />
        </div>
        <div dangerouslySetInnerHTML={{ __html: title }} className="tile-title" />
        <div className="moto-tile-content">
          { externalLink ?
            <Link
              className="tile-cta"
              to={callToActionLink}
              style={{
                color: callToActionTextColor ? callToActionTextColor : '#FFFFFF'
              }}
            >{ callToActionText }</Link>
          :
            <a
              href={callToActionLink}
              target="blank"
              className="tile-cta"
              style={{
                color: callToActionTextColor ? callToActionTextColor : '#FFFFFF'
              }}
            >{ callToActionText }</a>
          }
        </div>
      </div>
    )
  }
}

export default MotoTile;