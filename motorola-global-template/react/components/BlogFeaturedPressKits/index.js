import React from 'react';
import './BlogFeaturedPressKits.global.css';

class BlogFeaturedPressKits extends React.Component {

    static schema = {
        title: "Moto Blog Featured Press Kits Section",
        description: "Moto Blog Featured Press Kits Section",
        type: "object",
        properties: {
            sectionTitle: {
                type: "string",
                title: "Section title"
            },
            viewAllText: {
                type: "string",
                title: "View all Text"
            },
            viewAllURL: {
                type: "string",
                title: "View All URL"
            },
            openViewAllInNewTab: {
                type: "boolean",
                title: "Open view all link in new tab",
                default: false
            },
            featuredPressKitsList: {
                title: "Category List",
                type: "array",
                minItems: 0,
                items: {
                    title: "Featured Press Kit Item",
                    type: "object",
                    properties: {
                        pressKitImage: {
                            type: "string",
                            title: "Press Kit Image",
                            widget: {
                                "ui:widget": "image-uploader"
                            }
                        },
                        pressKitImageAltText: {
                            default: "",
                            title: "Press Kit Image Alt Text",
                            type: "string"
                        },
                        pressKitText: {
                            type: "string",
                            title: "Press Kit Text",
                            widget: {
                                "ui:widget": "textarea"
                            }
                        },
                        pressKitLink: {
                            type: "string",
                            title: "Press Kit Link",
                        },
                        openPressKitLinkInNewTab: {
                            type: "boolean",
                            title: "Open press kit link in new tab",
                            default: false
                        }
                    }
                }
            }
        }
    }

    render() {
        const { sectionTitle, viewAllText, viewAllURL, openViewAllInNewTab, featuredPressKitsList } = this.props;
        return (
            <div className="blog-featured-press-kits-container">
                <div className="bfpkc-header">
                    <div className="bfpkc-header-title">
                        <h3 className="bfpkc-title">{sectionTitle}</h3>
                        {
                            viewAllText &&
                            <span className="bfpkc-learn-more">
                                <a className="bfpkc-learn-more-link" href={viewAllURL == "" ? 'javascript:void(0);' : viewAllURL} {...(viewAllURL == "" ? { className: "no-link" } : {})} {...(viewAllURL != "" && openViewAllInNewTab ? { target: "_blank" } : {})}>
                                    <span>{viewAllText}</span><span className="bfpkc-learn-more-arrow">&#x25B6;</span></a></span>
                        }
                    </div>
                </div>
                <div className="bfpkc-gallery">
                    {
                        this.props.featuredPressKitsList.map(item => {
                            return (

                                <div className="bfpkc-leader-section">
                                    <a href={item.pressKitLink == "" ? 'javascript:void(0);' : item.pressKitLink} {...(item.pressKitLink == "" ? { className: "no-link" } : {})} {...(item.pressKitLink != "" && item.openPressKitLinkInNewTab ? { target: "_blank" } : {})}>
                                        <div className="bfpkc-image">
                                            <img src={item.pressKitImage} alt={item.pressKitImageAltText}></img>
                                        </div>
                                        <div className="bfpkc-text">
                                            <div className="bfpkc-leader-name">
                                                {item.pressKitText}
                                            </div>
                                        </div>
                                    </a>
                                </div>
                            )
                        })
                    }
                </div>
            </div>
        )
    }
}

export default BlogFeaturedPressKits;