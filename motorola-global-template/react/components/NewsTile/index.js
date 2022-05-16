import React from 'react';
import { Link } from 'vtex.render-runtime';

class NewsTile extends React.Component {
  static schema = {
    title: 'News tile',
    type: 'object',
    description: 'News tile',
    properties: {
      imageUrl: {
        default: '',
        type: 'string',
        title: 'News Image',
        widget: {
          'ui:widget': 'image-uploader',
        },
      },
      imageAltText:  {
        default: "",
        title: "News image alt text",
        type: "string"
      },
      title: {
        default: '',
        type: 'string',
        title: 'Title',
      },
      subTitle: {
        default: '',
        type: 'string',
        title: 'Sub title',
      },
      subTitleTextColor: {
        type: 'string',
        title: 'Sub title text color'
      },
      backgroundColor: {
        type: 'string',
        title: 'Background color'
      },
      date: {
        default: '',
        type: 'string',
        title: 'Date',
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
        title: 'Call to action text color'
      }
    }
  }

  render() {
    const { title, subTitle, date, callToActionLink, backgroundColor, externalLink, callToActionText, imageUrl, imageAltText, callToActionTextColor, subTitleTextColor } = this.props;
    return (
      <div style={{ backgroundColor: backgroundColor}} className="news-tile">
        <img src={imageUrl} alt={imageAltText} />
        <div className="news-content">
          <div
            dangerouslySetInnerHTML={{__html: subTitle}}
            className="news-title"
            style={{
              color: subTitleTextColor ? subTitleTextColor : '#FFFFFF'
            }}
          />
          <div dangerouslySetInnerHTML={{__html: title}} className="news-headline" />
          <div dangerouslySetInnerHTML={{__html: date}} className="news-date" />
          { externalLink ?
            <Link
              className="news-cta"
              to={callToActionLink}
              style={{
                color: callToActionTextColor ? callToActionTextColor : '#FFFFFF'
              }}
            >{ callToActionText }</Link>
          :
            <a
              href={callToActionLink}
              target="blank"
              className="news-cta"
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

export default NewsTile;