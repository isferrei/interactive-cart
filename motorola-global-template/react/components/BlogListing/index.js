import React from 'react';
import { ExtensionPoint } from 'vtex.render-runtime';
import * as _ from 'lodash';
import { subscriber, subscriber1 } from "../../utils/messageService";
import './BlogListing.global.css';

const options = { year: 'numeric', month: 'short', day: 'numeric' };

class BlogListing extends React.Component {

    static schema = {
        title: "Moto Blog Listing",
        description: "Moto Blog Listing",
        type: "object",
        properties: {
            noOfArticlesPerPage: {
                type: "string",
                title: "Number of articles Per Page",
                default: "3"
            },
            articles: {
                items: {
                    title: "Menu item",
                    type: "object",
                    properties: {
                        image: {
                            type: "string",
                            title: "Article Image",
                            widget: {
                                "ui:widget": "image-uploader"
                            }
                        },
                        imageAltText: {
                            default: "",
                            title: "Article Image Alt Text",
                            type: "string"
                        },
                        headline: {
                            type: "string",
                            title: "Headline",
                            description: "Enter Headline text"
                        },
                        previewtext: {
                            type: "string",
                            title: "Preview Text",
                            description: "Enter Preview text",
                            widget: {
                                "ui:widget": "textarea"
                            }
                        },
                        date: {
                            type: "string",
                            format: "date"
                        },
                        category: {
                            title: "Category List",
                            type: "array",
                            minItems: 0,
                            maxItems: 3,
                            items: {
                                title: "Category item",
                                type: "object",
                                properties: {
                                    categoryName: {
                                        type: "string",
                                        title: "Category name",
                                    },
                                    categoryLink: {
                                        type: "string",
                                        title: "Category Link",
                                    },
                                    openCategoryLinkInNewTab: {
                                        type: "boolean",
                                        title: "Open category link in new tab",
                                        default: false
                                    }
                                }
                            }
                        },
                        articleLink: {
                            type: "string",
                            title: "Target URL Link of the article",
                            description: "Target URL Link of the article",
                        },
                        openArticleLinkInNewTab: {
                            type: "boolean",
                            title: "Open article link in new tab",
                            default: false
                        }
                    }
                },
                minItems: 0,
                title: "Add Listing Articles",
                type: "array"
            }
        }
    }

    constructor(props) {
        super(props);
        this.state = {
            articles: [],
            filteredArticles: [],
            originalData: [],
            loading: false
        }
    }

    componentDidMount() {
        let articleData = [];
        articleData = _.cloneDeep(this.props.articles);

        _.forEach(articleData, (obj) => {
            if (obj.date) {
                obj['datePublished'] = this.formatPublishedDate(obj.date);
            }
        });
        this.setState({
            articles: articleData,
            filteredArticles: articleData,
            loading: true
        }, () => {
            subscriber.next(articleData);
            subscriber1.subscribe(data => {
                if (data !== 0) {
                    this.setState({
                        loading: true,
                        filteredArticles: data
                    }, () => {
                        this.setState({
                            loading: false
                        })
                    });
                }
            });
        })
    }

    formatPublishedDate = (dateString) => {
        let current_datetime = new Date(dateString);
        let formatted_date = current_datetime.getDate() + "-" + (current_datetime.getMonth() + 1) + "-" + current_datetime.getFullYear();
        return formatted_date;
    }

    pageChangeCallback = (data) => {
        this.setState({
            articles: data
        });
    }

    render() {
        const {
            articles
        } = this.state;

        const { noOfArticlesPerPage } = this.props;

        let itemsPerPage = parseInt(noOfArticlesPerPage) != NaN ? parseInt(noOfArticlesPerPage) : 3;

        return (
            <>
                {
                    !this.state.loading &&
                    <div className="blog-listing-container">
                        <>
                            {
                                (articles && articles.length > 0) &&
                                articles.map(articleItem => {
                                    return <div className="blc-item">
                                        <a href={articleItem.articleLink == "" ? 'javascript:void(0);' : articleItem.articleLink} {...(articleItem.articleLink == "" ? { className: "no-link" } : {})} {...(articleItem.articleLink != "" && articleItem.openArticleLinkInNewTab ? { target: "_blank" } : {})}>
                                            <div className="blc-item-image">
                                                <img src={articleItem.image} alt={articleItem.imageAltText}></img>
                                            </div>
                                            <div className="blc-item-content">
                                                <div className="blc-item-content-wrapper">
                                                    <div className="blc-category-list">
                                                        {
                                                            (articleItem.category && articleItem.category.length > 0) &&
                                                            <>
                                                                {
                                                                    articleItem.category.map(category => {
                                                                        return <a href={category.categoryLink == "" ? 'javascript:void(0);' : category.categoryLink} {...(category.categoryLink == "" ? { className: "no-link" } : {})} {...(category.categoryLink != "" && category.openCategoryLinkInNewTab ? { target: "_blank" } : {})}>
                                                                            <span className="blc-category">{category.categoryName}</span>
                                                                        </a>
                                                                    })
                                                                }
                                                            </>
                                                        }
                                                    </div>
                                                    <div className="blc-title">
                                                        <h3>{articleItem.headline}</h3>
                                                    </div>
                                                    <div className="blc-content-preview">
                                                        <p>{articleItem.previewtext}</p>
                                                    </div>
                                                    {
                                                        articleItem.date &&
                                                        <div className="blc-date">
                                                            <span>{(new Date(articleItem.date).toLocaleDateString("en-US", options))}</span>
                                                        </div>
                                                    }

                                                </div>
                                            </div>
                                        </a>
                                    </div>
                                })
                            }
                        </>
                        {
                            !this.state.loading &&
                            <ExtensionPoint id="moto-blog-pagination" data={this.state.filteredArticles} itemsPerPage={itemsPerPage} dataCallBackFn={this.pageChangeCallback}></ExtensionPoint>
                        }
                    </div>
                }
            </>
        );
    }
}

export default BlogListing;