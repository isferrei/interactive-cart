import { Component } from 'react'
import { Link } from 'vtex.render-runtime';
import './BannerLine.global.css'

class BannerLine extends Component {
  static schema = {
    title: 'Banner Line',
    description: 'Banner Line with a Call to Action',
    type: 'object',
    properties: {
      showBanner: {
        type: 'boolean',
        title: 'Show banner',
        default: true
      },
      imageUrl: {
        type: 'string',
        title: 'Banner image',
        widget: {
          'ui:widget': 'image-uploader',
        },
      },
      mobileImageUrl: {
        type: 'string',
        title: 'Banner mobile image',
        widget: {
          'ui:widget': 'image-uploader',
        },
      },
      bannerLineImageAltText:  {
        default: "",
        title: "Banner line image alt text",
        type: "string"
      },
      heading: {
        type: 'string',
        title: 'Heading',
        description: 'Title of the banner line',
      },
      subhead: {
        type: 'string',
        title: 'Subheading',
        description: 'Description of the banner line',
      },
      subheadSize: {
        enum: ["small", "big"],
        enumNames: ["Small ", "Big"],
        default: "big",
        type: 'string',
        title: 'Subheading size',
        description: 'Size of the description of the banner line',
        widget: {
          'ui:widget': 'select',
        },
      },
      callToActionLink: {
        type: 'string',
        title: 'Call to action link',
      },
      callToActionText: {
        type: 'string',
        title: 'Call to action text',
      },
    },
  }

  render () {
    const { showBanner, mobileImageUrl, imageUrl, bannerLineImageAltText, heading, subhead, callToActionLink, callToActionText, subheadSize } = this.props;
    if (showBanner !== undefined && !showBanner) {
      return (
        <div></div>
      )
    }
    return (
      <div className="bannerLine">
        <img className="bannerImage bannerImageDesktop" 
          src={ imageUrl } 
          alt={bannerLineImageAltText} />
        <img className="bannerImage bannerImageMobile" 
          src={ mobileImageUrl ? mobileImageUrl : imageUrl } 
          alt={bannerLineImageAltText} />
        <div className="container">
          <div className="bannerLineContent">
            <h1 dangerouslySetInnerHTML={{ __html: heading }}></h1>
            <p style={{fontSize: (subheadSize === "big" ? "22px" : "18px")}} dangerouslySetInnerHTML={{ __html: subhead }}></p>
            {callToActionLink &&
              <Link to={callToActionLink} className="bannerLineCta">{callToActionText}</Link>
            }
          </div>
        </div>
      </div>
    )
  }
}

export default BannerLine