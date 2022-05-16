import React, { Component } from 'react';
import SocialIcon from './components/SocialIcon/index';
import { FormattedMessage } from "react-intl";

class SocialIcons extends Component {
  static schema = {
    title: 'Social Icons',
    description: 'Social Icons',
    type: 'object',
    properties: {
      showSocialIcons: {
        type: 'boolean',
        title: 'Show social icons',
        default: true
      },
      socialIcons: {
        type: 'array',
        title: 'Social Icons',
        description: 'Content of the HTML to be rendered in the current page',
        items: {
          title: 'Social Icon Item',
          type: 'object',
          properties: {
            title: {
              default: '',
              title: 'Title',
              description: 'Social network title',
              type: 'string'
            },
            link: {
              default: '',
              title: 'Link',
              description: 'Social network title',
              type: 'string'
            },
            imageIcon: {
              type: 'string',
              title: 'Social network icon',
              widget: {
                'ui:widget': 'image-uploader',
              },
            },
          }
        }
      },
    },
  }

  render() {
    const { socialIcons, showSocialIcons, socialIconsLocation } = this.props;

    if (showSocialIcons) {
      if (socialIconsLocation === "dropdown") {
        return (
          <div className="dropdown-social-icons">
            <span className="social-icons-title">Follow us</span>
            <div className="social-icons">
              <ul>
                {socialIcons && (socialIcons.map((socialIcon, key) => (
                  <SocialIcon key={key} {...socialIcon} />
                )))}
              </ul>
            </div>
          </div>
        )
      }
      return (
        <section className="checkout-footer-social">
          <div className="container">
            <div className="f-row">
              <div className="checkout-footer-social-icons">
                <h4><FormattedMessage id="store/footer.stay-in-touch" /></h4>
                <div className="social-icons">
                  <ul>
                    {socialIcons && (socialIcons.map((socialIcon, key) => (
                      <SocialIcon key={key} {...socialIcon} />
                    )))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>
      )
    }
    return (
      <div></div>
    )
  }
}

export default SocialIcons;
