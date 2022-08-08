import React from 'react';
import './MotoBlogRelatedStories.global.css';

class MotoBlogRelatedStories extends React.Component {

    static schema = {
        title: "Blog Post - Related Stories",
        description: "Blog Post - Related Stories",
        type: "object",
        properties: {
            showBlogPostRelatedStories: {
                type: "boolean",
                title: "Blog Post - Related Stories",
                default: false
            },
            relatedStories: {
                description: "Related Stories List",
                title: "Related Stories List",
                type: "array",
                minItems: 2,
                maxItems: 3,
                items: {
                    title: "Story Item",
                    type: "object",
                    properties: {
                        categoryName: {
                            type: "string",
                            title: "Category",
                        },
                        categoryLink: {
                            type: "string",
                            title: "Category Link",
                        },
                        openInNewTab: {
                            type: "boolean",
                            title: "Open Category Link in new tab",
                            default: false
                        },
                        storyTitle: {
                            title: "Story Title",
                            type: "string"
                        },
                        storyDate: {
                            description: "Format: MMM DD, YYYY (example: Nov 04, 2020)",
                            title: "Story - Date Published",
                            type: "string"
                        },
                        storyImage: {
                            description: "Story - Image Cover",
                            title: "Story - Image Cover",
                            type: "string",
                            widget: {
                                "ui:widget": "image-uploader"
                            }
                        },
                        storyImageAlt: {
                            title: "Story Image Alt",
                            type: "string"
                        },
                        storyLink: {
                            title: "Story Link",
                            type: "string"
                        },
                        openStoryInNewTab: {
                            type: "boolean",
                            title: "Open Story Link in new tab",
                            default: false
                        }
                    }
                }
            }
        }
    }

    render() {

        const { showBlogPostRelatedStories, relatedStories } = this.props;

        return (
            <>
                {
                    showBlogPostRelatedStories ?
                        <div className="moto-blog-related-stories">
                            <h1 className="moto-blog-related-stories-section-title">Related Stories</h1>
                            <div className="moto-blog-story-container">
                                {
                                    (relatedStories && relatedStories.length > 0) ?
                                        relatedStories.map(story => {
                                            return (

                                                <div className="moto-blog-story-container-item">
                                                    <a href={story.storyLink == "" ? 'javascript:void(0);' : story.storyLink} {...(story.storyLink == "" ? { className: "no-link" } : {})} {...(story.storyLink != "" && story.openStoryInNewTab ? { target: "_blank" } : {})}>
                                                        <div className="mbrs-image">
                                                            <img src={story.storyImage} alt={story.storyImageAlt}></img>
                                                        </div>
                                                        <div className="mbrs-content">
                                                            {story.categoryName ?
                                                                <div className="mbrs-category-section">

                                                                    <a href={story.categoryLink == "" ? 'javascript:void(0);' : story.categoryLink} {...(story.categoryLink == "" ? { className: "no-link" } : {})} {...(story.categoryLink != "" && story.openInNewTab ? { target: "_blank" } : {})}><span className="mbrs-category">{story.categoryName}</span></a>
                                                                </div> : null}
                                                            <div className="mbrs-title">{story.storyTitle}</div>
                                                            <div className="mbrs-date">{story.storyDate}</div>
                                                        </div>
                                                    </a>
                                                </div>

                                            );
                                        })
                                        :
                                        null
                                }

                            </div>
                        </div>
                        :
                        null
                }
            </>
        )
    }
}

export default MotoBlogRelatedStories;