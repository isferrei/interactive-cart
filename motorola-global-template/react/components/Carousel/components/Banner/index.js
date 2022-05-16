import React, { Component } from "react";
import { Link } from "vtex.render-runtime";
import useRuntime from "../../../useRuntime";
import YouTube from "react-youtube";
import "./Banner.global.css";

class Banner extends Component {
  render = () => {
    const {
      imageUrl,
      imageMobileUrl,
      bannerImageAltText,
      floatImage,
      floatImageAltText,
      headlineBook,
      originalPrice,
      promoPrice,
      description,
      callToActionBorderColor,
      callToActionBackgroundColor,
      callToActionTextColor,
      callToActionText,
      productUrl,
      youTubeIdDesktop,
      youTubeIdMobile
    } = this.props;

    const optsDesktop = {
      height: "763px",
      width: "100%",
      playerVars: {
        autoplay: 1,
        controls: 0,
        showinfo: 0,
        playsinline: 1,
        mute: 1,
        rel: 0,
        loop: 1,
        playlist: youTubeIdDesktop,
        enablejsapi: 1,
        iv_load_policy: 3
      }
    };

    const optsMobile = {
      height: "395px",
      width: "100%",
      playerVars: {
        autoplay: 1,
        controls: 0,
        showinfo: 0,
        playsinline: 1,
        mute: 1,
        rel: 0,
        loop: 1,
        playlist: youTubeIdMobile,
        enablejsapi: 1,
        iv_load_policy: 3
      }
    };
    const { culture } = this.props.runtime;
    return (
      <div className={`banner ${culture.locale == "en-US" || culture.locale == "es-US" || culture.locale == "en-CA" || culture.locale == "fr-CA" ? "banner-new" : ""}`}>
        <div className="banner-background">
          {youTubeIdDesktop ? (
            <div className="youtube-id-desktop">
              <YouTube
                videoId={youTubeIdDesktop}
                opts={optsDesktop}
                onReady={this._onReady}
              />
            </div>
          ) : (
            <img src={imageUrl} alt={Boolean(bannerImageAltText) ? bannerImageAltText : headlineBook} />
          )}
        </div>
        {culture.locale == "en-US" || culture.locale == "es-US" || culture.locale == "en-CA" || culture.locale == "fr-CA" ?
          <div className="banner-content banner-content-mobile">
            <div className="container">
              <div className="banner-text">
                <div className="banner-float-image">
                  {floatImage ? <img src={floatImage} alt={floatImageAltText} /> : null}
                </div>
                {headlineBook ? (
                  <div
                    className="banner-title"
                    dangerouslySetInnerHTML={{ __html: headlineBook }}
                  ></div>
                ) : null}
                {description ? (
                  <div
                    className="banner-description"
                    dangerouslySetInnerHTML={{ __html: description }}
                  ></div>
                ) : null}
                {originalPrice || promoPrice ? (
                  <h6 className="white">
                    <strong>
                      {originalPrice ? (
                        <span className="strike mh3">{originalPrice}</span>
                      ) : null}
                      {promoPrice ? <span>{promoPrice}</span> : null}
                    </strong>
                  </h6>
                ) : null}
                {callToActionText && (
                  <Link
                    className="banner-cta-new"
                    style={{
                      borderColor: callToActionBorderColor || "#FFFFFF",
                      backgroundColor: callToActionBackgroundColor,
                      color: callToActionTextColor || "#FFFFFF"
                    }}
                    to={productUrl}
                  >
                    <span className="banner-cta-new-text">{callToActionText}</span>
                  </Link>
                )}
              </div>
            </div>
          </div>
          : null
        }
        <div className={`banner-background-mobile ${culture.locale == "en-US" || culture.locale == "es-US" || culture.locale == "en-CA" || culture.locale == "fr-CA" ? "banner-background-mobile-new" : ""}`}>
          {youTubeIdMobile ? (
            <div className="youtube-id-mobile">
              <YouTube
                videoId={youTubeIdMobile}
                opts={optsMobile}
                onReady={this._onReady}
              />
            </div>
          ) : (
            <img src={imageMobileUrl ? imageMobileUrl : imageUrl} alt={Boolean(bannerImageAltText) ? bannerImageAltText : headlineBook} />
          )}
        </div>
        <div className={`banner-content ${culture.locale == "en-US" || culture.locale == "es-US" || culture.locale == "en-CA" || culture.locale == "fr-CA" ? "banner-content-desktop" : ""}`}>
          <div className="container">
            <div className="banner-text">
              <div className="banner-float-image">
                {floatImage ? <img src={floatImage} alt={floatImageAltText} /> : null}
              </div>
              <div
                className="banner-title"
                dangerouslySetInnerHTML={{ __html: headlineBook }}
              ></div>
              {originalPrice || promoPrice ? (
                <h6 className="white">
                  <strong>
                    {originalPrice ? (
                      <span className="strike mh3">{originalPrice}</span>
                    ) : null}
                    {promoPrice ? <span>{promoPrice}</span> : null}
                  </strong>
                </h6>
              ) : null}
              <div
                className="banner-description"
                dangerouslySetInnerHTML={{ __html: description }}
              ></div>
              {callToActionText && (
                <Link
                  className="banner-cta"
                  style={{
                    borderColor: callToActionBorderColor || "#eb150a",
                    backgroundColor: callToActionBackgroundColor || "#eb150a",
                    color: callToActionTextColor || "#FFFFFF"
                  }}
                  to={productUrl}
                >
                  <span className="banner-cta-text">{callToActionText}</span>
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  };

  _onReady = event => {
    event.target.playVideo();
  };
}

export default useRuntime(Banner);
