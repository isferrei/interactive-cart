import React, { Component } from "react";
import { ProductPrice } from "vtex.store-components";
import { getRootPath } from "../../../utils/helpers";
import backToTopSvg from "../assets/back-to-top-arrow.svg";
import {
  handleResize,
  debounce
} from "../../ComponentRenderer/common/js/deviceDetection";

class ProductTiles extends Component {
  constructor(props) {
    super(props);
    this.state = {
      checkDevice: handleResize()
    };
  }

  componentDidMount() {
    this.setState({ checkDevice: handleResize() });
    window.addEventListener(
      "resize",
      debounce(() => {
        this.setState({ checkDevice: handleResize() });
      }, 500)
    );
  }

  scrollTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  addWrapperToOddTile = (
    productCount,
    index,
    tile,
    remainderDesktop,
    remainderTablet
  ) => {
    const {
      checkDevice: { isTablet, isDesktop, isWide }
    } = this.state;

    if (
      ((isDesktop || isWide) &&
        (remainderDesktop === 1 || remainderDesktop === 2) &&
        index == productCount - remainderDesktop) ||
      (isTablet && remainderTablet === 1 && index == productCount - remainderTablet)
    ) {
      let remainder = isTablet ? remainderTablet : remainderDesktop;
      return (
        <div key={index} className={"cc-align-center-" + remainder}>
          {tile}
        </div>
      );
    } else {
      return tile;
    }
  };

  render() {
    const {
      checkDevice: { isTablet, isDesktop, isWide }
    } = this.state;
    let {
      devices,
      details,
      leanMore,
      na,
      compatibleColorText,
      compatibleColorBorder,
      notCompatibleColorText,
      notCompatibleColorBorder,
      familySelect,
      carrierSelect,
      toTopText
    } = this.props;

    if (
      familySelect !== "" &&
      carrierSelect !== "" &&
      familySelect !== "cc-select-a-family" &&
      carrierSelect !== "cc-select-a-carrier"
    ) {
      let filteredProductList = [];

      filteredProductList = devices
        .map(e => e)
        .map(d => {
          if (d.categories.length > 0) {
            let getCategory = d.categories[0].split("/");
            if (
              getCategory.length > 0 &&
              getCategory[getCategory.length - 2] == familySelect
            ) {
              return d;
            }
          }
        });

      filteredProductList = filteredProductList.filter(function(element) {
        return element !== undefined;
      });

      if (filteredProductList.length > 0) {
        let data;
        let c = [];
        let productTileHtml = [];
        let index = 0;
        filteredProductList
          .map(e => e)
          .map(d => {
            // Work related with specifications/compatibility.
            let compatibilityText = "";
            let compatibilityFlag = 0;
            let compatibilityDetailsText = "";
            details.map((e, i) => {
              if (e.Name === carrierSelect) {
                const specs = d.specificationGroups.concat(
                  d.specificationGroups.find(
                    g => g.name === "allSpecifications"
                  ).specifications
                );
                data = specs.filter(g => g.name === e.Name)[0];
                if (data !== null && typeof data !== "undefined") {
                  let splittedCompatibilityFlag = data.values[0].split("||");
                  if (
                    splittedCompatibilityFlag &&
                    splittedCompatibilityFlag.length > 0 &&
                    typeof splittedCompatibilityFlag[1] !== "undefined"
                  ) {
                    let compatibilityDetails = splittedCompatibilityFlag[0].split(
                      "|"
                    );
                    if (
                      compatibilityDetails &&
                      compatibilityDetails.length > 0
                    ) {
                      compatibilityText = compatibilityDetails[0].trim();
                      compatibilityFlag = parseInt(
                        splittedCompatibilityFlag[1].trim()
                      );
                      compatibilityDetailsText = compatibilityDetails[1]
                        ? compatibilityDetails[1].trim()
                        : "-";
                    } else {
                      compatibilityText = na ? na : "N/A";
                      compatibilityFlag = 2;
                      compatibilityDetailsText = "-";
                    }
                  } else {
                    compatibilityText = na ? na : "N/A";
                    compatibilityFlag = 2;
                    compatibilityDetailsText = "-";
                  }
                } else {
                  compatibilityText = na ? na : "N/A";
                  compatibilityFlag = 2;
                  compatibilityDetailsText = "-";
                }
              }
            });

            let link = d.linkText ? getRootPath + "/" + d.linkText + "/p" : "#";
            let item = d.items.find(
              i => i.sellers[0].commertialOffer.Price > 0
            );
            let availableItem = item ? d.items.indexOf(item) : 0;
            let productName = d.items[availableItem].nameComplete;
            let img = d.items[availableItem].images[0].imageUrl || "";
            let commercialOffer =
              d.items[availableItem].sellers[0].commertialOffer || "";

            let compatibilityColorText;
            let compatibilityColorBorder;
            if (compatibilityFlag == 0) {
              compatibilityColorText = notCompatibleColorText
                ? notCompatibleColorText
                : "#FF554D";
              compatibilityColorBorder = notCompatibleColorBorder
                ? notCompatibleColorBorder
                : "#FF554D";
            } else if (compatibilityFlag == 1) {
              compatibilityColorText = compatibleColorText
                ? compatibleColorText
                : "#8BFFAA";
              compatibilityColorBorder = compatibleColorBorder
                ? compatibleColorBorder
                : "#8BFFAA";
            } else if (compatibilityFlag == 2) {
              compatibilityColorText = "#808A94";
              compatibilityColorBorder = "#808A94";
            }

            productTileHtml[index] = (
              <div className="cc-product-tile" key={index}>
                <div
                  className="cc-compatibility-box"
                  style={{
                    color: compatibilityColorText,
                    border: "1px solid " + compatibilityColorBorder
                  }}
                >
                  {compatibilityText}
                </div>
                <div className="cc-product-image">
                  <img className="cc-image" src={img} alt={productName} />
                </div>
                <h3>{productName}</h3>
                <div className="cc-compatibility-details-text">
                  {compatibilityDetailsText}
                </div>
                <div className="cc-product-price">
                  <ProductPrice
                    sellingPrice={commercialOffer.Price}
                    listPrice={commercialOffer.ListPrice}
                    installments={commercialOffer.Installments}
                  />
                </div>
                <div className="cc-learn-more">
                  <a className="cc-learn-more-link" href={link} target="_self">
                    {leanMore || ""}
                  </a>
                </div>
              </div>
            );
            index++;
          });

        if (productTileHtml.length > 0) {
          let remainderDesktop = productTileHtml.length % 3;
          let remainderTablet = productTileHtml.length % 2;
          let showBackToTop =
            ((isDesktop || isWide) && productTileHtml.length <= 3) ||
            (isTablet && productTileHtml.length <= 2)
              ? "hide"
              : "show";
          return (
            <div className="cc-product-tiles-back-to-top-wrapper">
              <div className="cc-product-tile-wrapper has-content">
                {productTileHtml.map((tile, i) => {
                  return this.addWrapperToOddTile(
                    productTileHtml.length,
                    i,
                    tile,
                    remainderDesktop,
                    remainderTablet
                  );
                })}
              </div>

              <div className={"cc-back-to-top " + showBackToTop}>
                <div className="cc-back-to-top-image">
                  <img
                    src={backToTopSvg}
                    alt="Back to top arrow"
                    onClick={this.scrollTop}
                  />
                </div>
                {toTopText ? (
                  <div
                    className="cc-back-to-top-text"
                    dangerouslySetInnerHTML={{
                      __html: toTopText
                    }}
                    onClick={this.scrollTop}
                  ></div>
                ) : (
                  ""
                )}
              </div>
            </div>
          );
        } else {
          return <div className="cc-product-tile-wrapper is-empty"></div>;
        }
      } else {
        return <div className="cc-product-tile-wrapper is-empty"></div>;
      }
    } else {
      return <div className="cc-product-tile-wrapper is-empty"></div>;
    }
  }
}

export default ProductTiles;
