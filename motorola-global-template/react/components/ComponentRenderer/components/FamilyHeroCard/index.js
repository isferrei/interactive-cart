import React, { Fragment } from "react";
import "./familyHeroCard.global.css";
import { imagePath } from "../../components/CommonProductLogic/index";
import { handleResize, debounce } from "../../common/js/deviceDetection";
import CTA from "../../components/CTA/index";
import LazyLoad from 'react-lazyload';

class FamilyHeroCard extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      checkDevice: handleResize(),
    };
  }

  componentDidMount() {
    let current = this;
    window.addEventListener(
      "resize",
      debounce(function() {
        current.setState({ checkDevice: handleResize() });
      }, 500)
    );
  }

  render() {
    const { checkDevice: { isMobile, isTablet, isDesktop, isWide } } = this.state;

    const { data: {
      fh_bg_color_or_image,
      fh_bg_color_mobile,
      fh_bg_color_tablet,
      fh_bg_color_desktop,
      fh_bg_img_mobile,
      fh_bg_img_tablet,
      fh_bg_img_desktop,
      fh_hero_image_mobile,
      fh_hero_image_tablet,
      fh_hero_image_desktop,
      fh_content_alignment_desktop,
      fh_content_alignment_mobile,
      fh_text_color_desktop,
      fh_cta_button_link,
      fh_cta_button_text,
      fh_cta_button_target,
      fh_cta_button_text_color,
      fh_cta_button_hover_text_color,
      fh_cta_button_outline_color,
      fh_cta_button_hover_outline_color,
      sc_cta_button_hover_opacity,
      fh_cta_button_opacity,
      fh_description,
      fh_cta_button_hover_background_color,
      fh_cta_cta_button_background_color,
      fh_bg_img_desktop_alt_text,
      fh_bg_img_tablet_alt_text,
      fh_bg_img_mobile_alt_text,
      fh_hero_image_desktop_alt_text,
      fh_hero_image_tablet_alt_text,
      fh_hero_image_mobile_alt_text } } = this.props;

    let bgColor = '#ffffff';
    if (isMobile && fh_bg_color_mobile) {
      bgColor = fh_bg_color_mobile;
    } else if (isTablet && fh_bg_color_tablet) {
      bgColor = fh_bg_color_tablet;
    } else if (isDesktop && fh_bg_color_desktop) {
      bgColor = fh_bg_color_desktop;
    } else if (isWide && fh_bg_color_desktop) {
      bgColor = fh_bg_color_desktop;
    }

    let bgImgPath = '';
    let bgImgAlt = '';
    if (isMobile && fh_bg_img_mobile) {
      bgImgPath = fh_bg_img_mobile;
      bgImgAlt = fh_bg_img_mobile_alt_text;
    } else if (isTablet && fh_bg_img_tablet) {
      bgImgPath = fh_bg_img_tablet;
      bgImgAlt = fh_bg_img_tablet_alt_text;
    } else if (isDesktop && fh_bg_img_desktop) {
      bgImgPath = fh_bg_img_desktop;
      bgImgAlt = fh_bg_img_desktop_alt_text;
    } else if (isWide && fh_bg_img_desktop) {
      bgImgPath = fh_bg_img_desktop;
      bgImgAlt = fh_bg_img_desktop_alt_text;
    }

    let imgPath = '';
    let imgAlt = '';
    if (isMobile && fh_hero_image_mobile) {
      imgPath = fh_hero_image_mobile;
      imgAlt = fh_hero_image_mobile_alt_text;
    } else if (isTablet && fh_hero_image_tablet) {
      imgPath = fh_hero_image_tablet;
      imgAlt = fh_hero_image_tablet_alt_text;
    } else if (isDesktop && fh_hero_image_desktop) {
      imgPath = fh_hero_image_desktop;
      imgAlt = fh_hero_image_desktop_alt_text;
    } else if (isWide && fh_hero_image_desktop) {
      imgPath = fh_hero_image_desktop ? fh_hero_image_desktop : '';
      imgAlt = fh_hero_image_desktop_alt_text;
    }

    let textAlignment =  '';
    if (fh_content_alignment_desktop !== null) {
      if ((fh_content_alignment_mobile == 0) && (isDesktop || isWide)) {
        textAlignment = fh_content_alignment_desktop;
      } else if (fh_content_alignment_mobile == 1) {
        textAlignment = fh_content_alignment_desktop;
      }
    }

    let textFloat = '';
    if (fh_content_alignment_desktop !== null) {
      if ((fh_content_alignment_mobile == 0) && (isDesktop || isWide)) {
        textFloat = fh_content_alignment_desktop;
      } else if (fh_content_alignment_mobile == 1) {
        textFloat = fh_content_alignment_desktop;
      }
    }

    return (
      <Fragment>
        <div
          className="family-hero-card"
          style={{
            backgroundColor: '#' + bgColor,
            color : fh_text_color_desktop ? ('#' + fh_text_color_desktop) : '#444647'
          }}
        >
          { (fh_bg_color_or_image == "Image") && bgImgPath ?
            <div className="fhc-bg-image">
              <LazyLoad
                offset={-100}
                once
                placeholder={<img className="fhc-lazyload-default-img" src={imagePath + "Lazy-Load-Square-batwing-03.png"} alt="Lazyload Placeholder Image" />}
              >
                <img
                  src={imagePath + bgImgPath}
                  alt={bgImgAlt}
                /></LazyLoad>
            </div> : ''
          }

          <div className="fhc-content container-fluid">
            <div className="fhc-wrapper">
              <div className="fhc-image">
                { imgPath ?
                  <LazyLoad
                    offset={-50}
                    once
                    placeholder={<img className="fhc-lazyload-default-img" src={imagePath + "Lazy-Load-Square-batwing-03.png"} alt="Lazyload Placeholder Image" />}
                  ><img
                    src={imagePath + imgPath}
                    alt={imgAlt}
                  /></LazyLoad> : ''
                }
              </div>
              <div
                className={"fhc-description " + fh_content_alignment_desktop + " alignment-" + fh_content_alignment_mobile}
                style={{
                  textAlign: textAlignment,
                  float: textFloat
                }}
              >
                <div className="fhc-hero-text">
                  <div
                    className="fhc-hero-description"
                    dangerouslySetInnerHTML={{
                      __html: fh_description ? fh_description : ''
                    }}
                  />

                  {fh_cta_button_text ?
                    (<div
                      className="fhc-hero-cta"
                    >
                      <CTA
                        ctaHoverBackgroundColor={
                          fh_cta_button_hover_background_color
                        }
                        ctaBackgroundColor={
                          fh_cta_cta_button_background_color
                        }
                        ctaHoverOpacity={sc_cta_button_hover_opacity}
                        ctaOpacity={fh_cta_button_opacity}
                        ctaHoverBorderColor={
                          fh_cta_button_hover_outline_color
                        }
                        ctaBorderColor={fh_cta_button_outline_color}
                        ctaHoverTextColor={fh_cta_button_hover_text_color}
                        ctaTextColor={fh_cta_button_text_color}
                        ctaAnchorTarget={fh_cta_button_target}
                        ctaText={fh_cta_button_text}
                        ctaLink={fh_cta_button_link}
                      />
                    </div>) : null
                  }
                </div>
              </div>
            </div>
          </div>
        </div>
      </Fragment>
    );
  }
}

export default FamilyHeroCard;