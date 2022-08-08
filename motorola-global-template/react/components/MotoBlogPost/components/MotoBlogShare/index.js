import React from 'react';
import './MotoBlogShare.global.css';

const facebookIcon = '/arquivos/facebook-f-brands.svg';
const twitterIcon = '/arquivos/twitter-brands.svg';
const instaIcon = '/arquivos/instagram-brands.svg';
const LinkedinIcon = '/arquivos/linkedin-in-brands.svg';

import { FacebookShareButton, TwitterShareButton, InstapaperShareButton, LinkedinShareButton } from 'react-share';

class MotoBlogShare extends React.Component {

    static schema = {
        title: "Blog Post - Share Social",
        description: "Blog Post - Share Social",
        type: "object",
        properties: {
            showSocialShare: {
                type: "boolean",
                title: "Blog Post - Share Social",
                default: false
            },
            socialShareText: {
                type: "string",
                title: "Social Share - text",
                default: ""
            }
        }
    }

    render() {
        const { showSocialShare, socialShareText } = this.props;

        return (
            <>
                {
                    showSocialShare ?
                        <div class="moto-blog-post-share">
                            <div className="moto-blog-post-share-section-text">
                                <span className="share-text">{socialShareText}</span>
                            </div>
                            <div className="moto-blog-post-share-section-icons">
                                <span className="motoblogpost-share-social-icons">
                                    <FacebookShareButton url={window && window.location && window.location.href ? window.location.href : ''}>
                                        <img src={facebookIcon} alt="Facebook Icon" />
                                    </FacebookShareButton>
                                </span>
                                <span className="motoblogpost-share-social-icons">
                                    <TwitterShareButton url={window && window.location && window.location.href ? window.location.href : ''}>
                                        <img src={twitterIcon} alt="Twitter Icon" />
                                    </TwitterShareButton>
                                </span>
                                <span className="motoblogpost-share-social-icons">
                                    <InstapaperShareButton url={window && window.location && window.location.href ? window.location.href : ''}>
                                        <img src={instaIcon} alt="Instagram Icon" />
                                    </InstapaperShareButton>
                                </span>
                                <span className="motoblogpost-share-social-icons">
                                    <LinkedinShareButton url={window && window.location && window.location.href ? window.location.href : ''}>
                                        <img src={LinkedinIcon} alt="Linkden Icon" />
                                    </LinkedinShareButton>
                                </span>
                            </div>
                        </div>
                        :
                        null
                }
            </>
        );
    }
}

export default MotoBlogShare;