import React from 'react';
import { ExtensionPoint } from 'vtex.render-runtime';
import BlogFilter from '../BlogFilter/index';
import './BlogListPage.global.css';

class BlogListPage extends React.Component {

    static schema = {
        title: "Moto Blog Listing Page",
        description: "Moto Blog Listing Page",
        type: "object",
        properties: {
            pageTitle: {
                type: "string",
                title: "Page Title"
            },
            homePageTitle: {
                type: "string",
                title: "Homepage Title"
            },
            homePageURL: {
                type: "string",
                title: "Homepage URL"
            },
            showListingSection: {
                type: "boolean",
                title: "Show Listing Section"
            },
            showLeadershipSection: {
                type: "boolean",
                title: "Show Leadership Section"
            },
            showPressKitsSection: {
                type: "boolean",
                title: "Show Featured Press Kits Section"
            },
            showFeaturedStoriesSection: {
                type: "boolean",
                title: "Show Featured Stories Section"
            }
        }
    };

    render() {
        const { pageTitle, homePageTitle, homePageURL, showListingSection, showLeadershipSection, showFeaturedStoriesSection, showPressKitsSection } = this.props;
        return (
            <div className="blog-list-page">
                <div className="blog-list-page-history-links">
                    <span>
                        <a
                            className="blpc-home-link"
                            href={
                                homePageURL && homePageURL != ""
                                    ? homePageURL
                                    : "javascript:void(0);"
                            }
                        >{homePageTitle}</a>
                    </span>
                    <span className="blpc-separator">&#62;</span>
                    <span>{pageTitle}</span>
                </div>
                <div className="blog-list-page-container">
                    <div className="blpc-filter-wrapper">
                        <div className="blpc-left-area">
                            <h1 className="blpc-page-title">{pageTitle}</h1>
                        </div>
                        <div className="blpc-right-area">
                            <BlogFilter></BlogFilter>
                        </div>
                    </div>
                    <div className="blpc-left-area">
                        {
                            showListingSection &&
                            <ExtensionPoint id="blog-listing"></ExtensionPoint>
                        }
                    </div>
                    <div className="blpc-right-area">
                        {
                            showLeadershipSection &&
                            <ExtensionPoint id="blog-leadership"></ExtensionPoint>
                        }
                        {
                            showPressKitsSection &&
                            <ExtensionPoint id="blog-featured-press-kits"></ExtensionPoint>
                        }
                        {
                            showFeaturedStoriesSection &&
                            <ExtensionPoint id="blog-featured-stories"></ExtensionPoint>
                        }
                    </div>
                </div>
            </div>
        );
    }
}

export default BlogListPage;