import React from 'react';
import './MotoBlogPostContent.global.css';

class MotoBlogPostContent extends React.Component {

    static schema = {
        title: "Blog Post - Content",
        description: "Blog Post - Content",
        type: "object",
        properties: {
            showBlogPostContent: {
                type: "boolean",
                title: "Blog Post - Content",
                default: false
            },
            blogPostContent: {
                title: "Blog Post Content Items",
                type: "array",
                minItems: 1,
                items: {
                    title: "Post Content Item",
                    type: "object",
                    properties: {
                        contentPara: {
                            type: "string",
                            title: "Content Para",
                            widget: {
                                "ui:widget": "textarea"
                            }
                        }
                    }
                }
            },
            blogPostContentImages: {
                title: "Blog Post Content Images",
                type: "array",
                minItems: 2,
                maxItems: 2,
                items: {
                    title: "Post Content Image Item",
                    type: "object",
                    properties: {
                        imageItem: {
                            description: "Post Content - Image",
                            title: "Post Content - Image Cover",
                            type: "string",
                            widget: {
                                "ui:widget": "image-uploader"
                            }
                        },
                        imageAlt: {
                            title: "Post Content Image Alt",
                            type: "string"
                        }
                    }
                }
            }
        }
    }

    render() {
        const { showBlogPostContent, blogPostContent, blogPostContentImages } = this.props;
        let blogPostContentBreakPoint = 0;

        if (blogPostContent && blogPostContent.length > 0) {
            if (blogPostContent.length == 1) {
                blogPostContentBreakPoint = 1;
            } else {
                blogPostContentBreakPoint = Math.round(blogPostContent.length / 2);
            }
        }



        return (
            <>
                {
                    showBlogPostContent ?
                        <div className="moto-blog-post-content">
                            {
                                (blogPostContent && blogPostContent.length > 0) ?
                                blogPostContent.map((content, index) => {
                                    if (index === blogPostContentBreakPoint-1) {
                                        return (
                                            <>
                                                <div dangerouslySetInnerHTML={{ __html: content.contentPara }} />
                                                <div className="moto-blog-post-image-container">
                                                    {

                                                        blogPostContentImages.map(image => {
                                                            return (
                                                                <div className="moto-blog-post-image-section">
                                                                    <img className="post-content-image" src={image.imageItem} alt={image.imageAlt}></img>
                                                                </div>
                                                            )
                                                        })
                                                    }
                                                </div>

                                            </>
                                        );
                                    } else {
                                        return (
                                            <>
                                                <div dangerouslySetInnerHTML={{ __html: content.contentPara }} />

                                            </>
                                        );
                                    }

                                })
                                :
                                null
                            }
                        </div>
                        :
                        null
                }


            </>
        );
    }
}

export default MotoBlogPostContent;