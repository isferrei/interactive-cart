import { Component } from "react";
import "./MotoBlogMostRecentArticles.global.css";
import ArticlesList from "./components/ArticlesList/index";
import CTA from "../ComponentRenderer/components/CTA";

class MotoBlogMostRecentArticles extends Component {
  constructor(props) {
    super(props);
  }

  static schema = {
    title: 'Moto Blog - Most Recent Articles',
    description: 'Moto Blog - Most Recent Articles',
    type: 'object',
    properties: {
      showMostRecentArticles: {
        type: "boolean",
        title: "Show Most Recent Articles",
        default: false
      },
      heading: {
        type: "string",
        title: "Heading",
        description: "Enter Heading text"
      },
      ctaTextSeeAll: {
        type: "string",
        title: "CTA Text",
        description: "Enter CTA text"
      },
      ctaLinkSeeAll: {
        type: "string",
        title: "CTA Link",
        description: "Enter CTA link"
      },      
      articles: {
        items: {
          title: "Menu item",
          type: "object",
          properties: {            
            headline: {
              type: "string",
              title: "Headline",
              description: "Enter Headline text"
            },
            description: {
              type: "string",
              title: "Description",
              description: "Enter Description text",
              widget: {
                "ui:widget": "textarea"
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
            },
            category: {
              type: "string",
              title: "Category",
              description: "Enter Category text"
            },
            categoryLink: {
              type: "string",
              title: "Category Link",
              description: "Enter Category link"
            },
            datePublished: {
              type: "string",
              title: "Date Published",
              description: "Enter Date Published Format: Nov 18, 2020"
            },
            desktopImage: {
              type: "string",
              title: "Desktop Image",
              widget: {
                "ui:widget": "image-uploader"
              }
            },
            tabletImage: {
              type: "string",
              title: "Tablet Image",
              widget: {
                "ui:widget": "image-uploader"
              }
            },
            mobileImage: {
              type: "string",
              title: "Mobile Image",
              widget: {
                "ui:widget": "image-uploader"
              }
            },
            desktopImageAltText: {
              default: "",
              title: "Image Alt Text",
              type: "string"
            },
          }
        },
        minItems: 1,
        maxItems: 6,
        title: "Add Most Recent Articles",
        type: "array"
      }      
    }
  }

  render() {
    const { showMostRecentArticles, heading, ctaTextSeeAll, ctaLinkSeeAll, articles} = this.props;
    if (!showMostRecentArticles) {
      return null;
    }
    return (
      <div className="moto-blog-most-recent-articles">
        <div className="mbmra-container">
          <h3 className="mbmra-heading">{heading}</h3>
          <div className="mbmra-items-list">
            {articles.map((articlesList, key) => (
              <ArticlesList
                key={key}
                id={key}
                {...articlesList}
              ></ArticlesList>
            ))}
          </div>
          {ctaTextSeeAll && ctaLinkSeeAll ? (
            <div className="mbmra-cta-see-all">
              <CTA
                ctaText={ctaTextSeeAll}
                ctaLink={ctaLinkSeeAll}
              />
            </div>
            ) : null}
          </div>
      </div>
    );
  }
}

export default MotoBlogMostRecentArticles;