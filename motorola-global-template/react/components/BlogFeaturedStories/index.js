import React from 'react';
import './BlogFeaturedStories.global.css';

const options = { year: 'numeric', month: 'short', day: 'numeric' };

class BlogFeaturedStories extends React.Component {

    static schema = {
        title: "Moto Blog Featured Stories Section",
        description: "Moto Blog Featured Stories Section",
        type: "object",
        properties: {
            sectionTitle: {
                type: "string",
                title: "Section title"
            },
            featuredStoriesList: {
                title: "Category List",
                type: "array",
                minItems: 0,
                items: {
                    title: "Featured Story Item",
                    type: "object",
                    properties: {
                        featuredStoryTitle: {
                            type: "string",
                            title: "Featured Story Title"
                        },
                        featuredStoryDate: {
                            type: "string",
                            format: "date",
                            title: "Featured Story Date"
                        },
                        featuredStoryLink: {
                            type: "string",
                            title: "Featured Story Link",
                        },
                        featuredStoryLinkInNewTab: {
                            type: "boolean",
                            title: "Open Featured Story link in new tab",
                            default: false
                        }
                    }
                }
            }
        }
    }

    render() {
        const { sectionTitle, featuredStoriesList } = this.props;

        return (
            <>
                <div className="blog-featured-stories-container">
                    <div className="blog-featured-stories">
                        <div className="bfs-heading">
                            <h3 className="bfs-title">{sectionTitle}</h3>
                        </div>
                        <div className="bfs-stories-list-container">
                            {
                                featuredStoriesList.map(item => {
                                    return (

                                        <div className="bfs-list">
                                            <a href={item.featuredStoryLink == "" ? 'javascript:void(0);' : item.featuredStoryLink} {...(item.featuredStoryLink == "" ? { className: "no-link" } : {})} {...(item.featuredStoryLink != "" && item.featuredStoryLinkInNewTab ? { target: "_blank" } : {})}>
                                                <h4 className="bfs-story-title">{item.featuredStoryTitle}</h4>
                                                <span className="bfs-date-published">{(new Date(item.featuredStoryDate).toLocaleDateString("en-US", options))}</span>
                                            </a>
                                        </div>
                                    )
                                })
                            }
                        </div>
                    </div>
                </div>
            </>
        )
    }
}

export default BlogFeaturedStories;