import React, { Component } from "react";
import CTA from "../../../ComponentRenderer/components/CTA";
import {
  handleResize,
  debounce
} from "../../../ComponentRenderer/common/js/deviceDetection";

class ArticlesList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      checkDevice: handleResize(),
      articleImage: "",
    };
  }

  componentDidMount() {
    this.setState({ checkDevice: handleResize() });
    window.addEventListener(
      "resize",
      debounce(() => {
        this.setState({ checkDevice: handleResize() });
        this.detectArticleImage();
      }, 500)
    );
    this.detectArticleImage();
  }

  detectArticleImage = () => {    
    const {
      desktopImage,
      tabletImage,
      mobileImage
    } = this.props;
    const {
      checkDevice: { isMobile, isTablet }
    } = this.state;
    if (isMobile) {
      this.setState({
        articleImage: mobileImage
      });
    } else if(isTablet) {
      this.setState({
        articleImage: tabletImage
      });
    } else {
      this.setState({
        articleImage: desktopImage
      });
    }
  }

  render = () => {
    const {
      headline,
      articleLink,
      openArticleLinkInNewTab,
      category,
      categoryLink,
      datePublished,
      desktopImageAltText,
      id,      
    } = this.props;

    return (
      <div
        className={`mbmra-items`}
        id={"mbmra-item-" + id}
      >
        <a href={articleLink == "" ? 'javascript:void(0);' : articleLink} {...(articleLink == "" ? { className: "no-link" } : {})} {...(articleLink != "" && openArticleLinkInNewTab ? { target: "_blank" } : {})}>
          <div className="mbmra-image"><img src={this.state.articleImage} alt={desktopImageAltText} /></div>
          <div className="mbmra-bottom">
            <div className="mbmra-category">
              {category && categoryLink ? (
                <CTA
                  ctaBorderColor="FFFFFF"
                  ctaText={category}
                  ctaLink={categoryLink}
                />
              ) : null}
            </div>
            <div className="mbmra-headline">{headline}</div>
            <div className="mbmra-date-published">{datePublished}</div>
          </div>
        </a>
      </div>
    );
  };

}

export default ArticlesList;