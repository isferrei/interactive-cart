import { Component } from 'react'
import { Link } from 'vtex.render-runtime';
import {Button} from "vtex.styleguide";
import { scroller as scroll } from "react-scroll";
import './FamilyBannerLine.global.css';
import ArrowUp from "../ArrowUp";

class FamilyBannerLine extends Component {
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
      tabletimageUrl: {
        type: 'string',
        title: 'Banner tablet image',
        widget: {
          'ui:widget': 'image-uploader',
        },
      },
      familyBannerLineImageAltText:  {
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
      description: {
        type:'string',
        title:'description',
        description:'Description of the product'
      },
      buttonText: {
        type: 'string',
        title: 'Text for the button'
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

  linkToCollection = (e) => {
    $("html, body").animate(
      {
        scrollTop: $("#collection-title").offset().top - 60
      },
      500
    );
  }

  render () {
    const { showBanner, mobileImageUrl, imageUrl,tabletimageUrl, familyBannerLineImageAltText, heading, subhead,description,buttonText,callToActionLink, callToActionText, subheadSize } = this.props;
    if (showBanner !== undefined && !showBanner) {
      return (
        <div></div>
      )
    }
    return (
      <div className="familyBannerLine">
       <div className="banner-redesign"> 
         <img className="bannerImage bannerImageDesktop" 
          src={ imageUrl } 
          alt={familyBannerLineImageAltText} />
        <img className="bannerImage bannerImageMobile" 
          src={ mobileImageUrl ? mobileImageUrl : imageUrl } 
          alt={familyBannerLineImageAltText} />
          <img className="bannerImage bannerImagetTablet" 
          src={ tabletimageUrl ? tabletimageUrl : imageUrl } 
          alt={familyBannerLineImageAltText} />
        </div>
        <div className="container">
          <div className="familyBannerLineContent">
          {heading != null && heading.length ? <h1 dangerouslySetInnerHTML={{ __html: heading }}></h1> : null}
            
          {subhead != null && subhead.length ? <p className="subhead" dangerouslySetInnerHTML={{ __html: subhead }}></p>: null}
          {description != null && description.length ? <p className="description" dangerouslySetInnerHTML={{ __html: description }}></p>: null}
            {/* {callToActionLink &&
              <Link to={callToActionLink} className="familyBannerLineCta">{callToActionText}</Link>
            } */}
            {buttonText != null && buttonText.length ?
             <Button variation="primary" size="small">
               <a href="#" onClick={this.linkToCollection} className="familyBannerButton">{buttonText}</a>
             </Button>
            : null}
             <ArrowUp />
          </div>
        </div>
      </div>
    )
  }
}

export default FamilyBannerLine