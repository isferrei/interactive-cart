import React from 'react';
import './BlogLeadership.global.css';

class BlogLeadership extends React.Component {

    static schema = {
        title: "Moto Blog Leadership Section",
        description: "Moto Blog Leadership Section",
        type: "object",
        properties: {
            sectionTitle: {
                type: "string",
                title: "Section title"
            },
            learnMore: {
                type: "string",
                title: "Learn More Text"
            },
            learnMoreURL: {
                type: "string",
                title: "Learn More URL"
            },
            openLearnMoreInNewTab: {
                type: "boolean",
                title: "Open learn more link in new tab",
                default: false
            },
            leadershipList: {
                title: "Leadership List",
                type: "array",
                minItems: 0,
                items: {
                    title: "Featured Story Item",
                    type: "object",
                    properties: {
                        leaderImage: {
                            type: "string",
                            title: "Leader Image",
                            widget: {
                                "ui:widget": "image-uploader"
                            }
                        },
                        leaderImageAltText: {
                            default: "",
                            title: "Leader Image Alt Text",
                            type: "string"
                        },
                        leaderName: {
                            default: "",
                            title: "Leader Name",
                            type: "string"
                        },
                        leaderDesignation: {
                            default: "",
                            title: "Leader Designation",
                            type: "string"
                        },
                        leaderProfileLink: {
                            type: "string",
                            title: "Leader Profile Link",
                        },
                        leaderProfileLinkInNewTab: {
                            type: "boolean",
                            title: "Open Leader Profile link in new tab",
                            default: false
                        }
                    }
                }
            }
        }
    }

    render() {

        const { sectionTitle, learnMore, learnMoreURL, openLearnMoreInNewTab, leadershipList } = this.props;

        return (
            <div className="blog-our-leaders-container">
                <div className="bolc-header">
                    <div className="bolc-header-title">
                        <h3 className="bolc-title">{sectionTitle}</h3>

                        {
                            learnMore &&
                            <span className="bolc-learn-more">
                                <a className="bolc-learn-more-link" href={learnMoreURL == "" ? 'javascript:void(0);' : learnMoreURL} {...(learnMoreURL == "" ? { className: "no-link" } : {})} {...(learnMoreURL != "" && openLearnMoreInNewTab ? { target: "_blank" } : {})}>
                                    <span>{learnMore}</span><span className="bolc-learn-more-arrow">&#x25B6;</span>
                                </a>
                            </span>
                        }
                    </div>
                </div>
                <div className="bolc-gallery">
                    {
                        leadershipList.map(item => {
                            return (

                                <div className="bolc-leader-section">
                                    <a href={item.leaderProfileLink == "" ? 'javascript:void(0);' : item.leaderProfileLink} {...(item.leaderProfileLink == "" ? { className: "no-link" } : {})} {...(item.leaderProfileLink != "" && item.leaderProfileLinkInNewTab ? { target: "_blank" } : {})}>
                                        <div className="bolc-image">
                                            <img src={item.leaderImage} alt={item.leaderImageAltText}></img>
                                        </div>
                                        <div className="bolc-text">
                                            <div className="bolc-leader-name">
                                                {item.leaderName}
                                            </div>
                                            <div className="bolc-leader-position">
                                                {item.leaderDesignation}
                                            </div>
                                        </div>
                                    </a>
                                </div>

                            )
                        })
                    }
                </div>
            </div >
        )
    }
}

export default BlogLeadership;