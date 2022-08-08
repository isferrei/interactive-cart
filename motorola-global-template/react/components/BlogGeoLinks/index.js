import React from 'react';
import './BlogGeoLinks.global.css';

class BlogGeoLinks extends React.Component {

    static schema = {
        title: "See all stories - Geo Links",
        description: "See all stories - Geo Links",
        type: "object",
        properties: {
            showGeoLinksSection: {
                type: "boolean",
                title: "Show See all stories - Geo Links",
                default: false
            },
            geoLinkPageTitle: {
                type: "string",
                title: "Geo Link Page Title"
            },
            homePageTitle: {
                type: "string",
                title: "Homepage Title"
            },
            homePageURL: {
                type: "string",
                title: "Homepage URL"
            },
            geoLinkPageNavigationTitle: {
                type: "string",
                title: "Page Navigation Title"
            },
            geoLinksObject: {
                type: "array",
                title: "Geo Links",
                items: {
                    type: "object",
                    properties: {
                        geoName: {
                            type: "string",
                            title: "Geo Name"
                        },
                        geoDetails: {
                            type: "array",
                            title: "Geo Details",
                            items: {
                                type: "object",
                                properties: {
                                    countryName: {
                                        type: "string",
                                        title: "Country name"
                                    },
                                    languageName: {
                                        type: "string",
                                        title: "Language name"
                                    },
                                    geoTargerLink: {
                                        type: "string",
                                        title: "Link"
                                    },
                                    openGeoLinkInNewTab: {
                                        type: "boolean",
                                        title: "Open Geo Link in new tab",
                                        default: false
                                    }
                                }
                            }
                        },
                        useCustomHTMLDetails: {
                            type: "boolean",
                            title: "Use Custom HTML Details",
                            default: false
                        },
                        customHTMLContent: {
                            type: "string",
                            title: "Custom HTML Content",
                            widget: {
                                "ui:widget": "textarea"
                            }
                        }
                    }
                }

            }
        }
    }


    render() {

        const { geoLinkPageTitle, homePageTitle, homePageURL, geoLinkPageNavigationTitle, geoLinksObject } = this.props;

        return (
            <>
                <div className="moto-geo-links-container">
                    <span className="mglc-page-nav-history"> <a
                        className="mglc-home-link"
                        href={
                            homePageURL && homePageURL != ""
                                ? homePageURL
                                : "javascript:void(0);"
                        }
                    >{homePageTitle}</a> &gt; {geoLinkPageNavigationTitle}</span>
                    <h1 className="mglc-title">{geoLinkPageTitle}</h1>

                    {
                        (geoLinksObject && geoLinksObject.length > 0) &&
                        <>
                            {
                                geoLinksObject.map(geoItem => {
                                    return (
                                        <div className="mglc-geo-section">
                                            <h2 className="mglc-geo-name">{geoItem.geoName}</h2>
                                            {
                                                geoItem.useCustomHTMLDetails ?
                                                    <div dangerouslySetInnerHTML={{ __html: geoItem.customHTMLContent }} />
                                                    :
                                                    <>
                                                        {
                                                            (geoItem.geoDetails && geoItem.geoDetails.length > 0) &&
                                                            <ul className="mglc-geo-data-section">
                                                                {
                                                                    geoItem.geoDetails.map(geoData => {
                                                                        return (<li className="mglc-geo-data"><a href={geoData.geoTargerLink == "" ? 'javascript:void(0);' : geoData.geoTargerLink} {...(geoData.geoTargerLink == "" ? { className: "no-link" } : {})} {...(geoData.geoTargerLink != "" && geoData.openGeoLinkInNewTab ? { target: "_blank" } : {})}>{geoData.countryName} / {geoData.languageName}</a></li>);
                                                                    })
                                                                }
                                                            </ul>
                                                        }

                                                    </>
                                            }
                                        </div>
                                    )
                                })
                            }
                        </>
                    }

                </div>
            </>
        );
    }
}

export default BlogGeoLinks;