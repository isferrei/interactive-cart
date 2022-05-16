import React, {Fragment, useState, useEffect, useRef} from "react";
import {Block, ExtensionPoint} from "vtex.render-runtime";
import {any, path, pathOr} from "ramda";
import {getAssetsUrl, getRootPath} from "../../utils/helpers";
import "./MotoProductDetails.global.css";
import "./Colors.global.css";
import "./SkuSelector.global.css";
import "./RogueHeroCard.global.css";
import {
  FacebookShareButton,
  TwitterShareButton,
  PinterestShareButton,
} from "react-share";
import {FormattedMessage} from "react-intl";
import {useProduct} from "vtex.product-context";

function useEventListener(eventName, handler, element = window) {
  const savedHandler = useRef();
  useEffect(() => {
    savedHandler.current = handler;
  }, [handler]);

  useEffect(
      () => {
        const isSupported = element && element.addEventListener;
        if (!isSupported) return;
        const eventListener = (event) => savedHandler.current(event);
        element.addEventListener(eventName, eventListener);
        return () => {
          element.removeEventListener(eventName, eventListener);
        };
      },
      [eventName, element], // Re-run if eventName or element changes
  );
}

const MotoProductDetails = (props) => {
  const [loading, setLoading] = useState(true);
  const [product, setProduct] = useState({});
  const [skuSelector, setSkuSelector] = useState({});
  const [selectedQuantity, setSelectedQuantity] = useState(1);
  const [disableAddButton, setDisableAddButton] = useState(false);
  const [tradeInSelected, setTradeInSelected] = useState(false);
  const [tradeInProductIdLinked, setTradeInProductIdLinked] = useState("");
  const [windowWidth, setWindowWith] = useState(window.innerWidth);
  const [isMobile, setIsMobile] = useState(
    window.innerWidth < 768 ? true : false,
  );
  const [isTablet, setIsTablet] = useState(
    window.innerWidth >= 768 && window.innerWidth < 992 ? true : false,
  );
  const [isDesktop, setIsDesktop] = useState(
    window.innerWidth >= 992 ? true : false,
  );

  const [currentLocationUrl, setCurrentLocationUrl] = useState();
  const context = useProduct();
  const [isOpen, setIsOpen] = useState(false);
  const [showModal3D, setShowModal3DBlock] = useState("FALSE");
  const [modelKey, setModelKey] = useState();

  useEffect(() => {
    setProduct(context.product);
    setSkuSelector(context.skuSelector);

    if (typeof modal3DBlock() !== "undefined") {
      const showModal3DBlock = modal3DBlock().find(
          (item) => item.name === "Display 3D AR Experience",
      );

      const showModal3DBlockFlag =
        path(["values", "0"], showModal3DBlock) || "FALSE";

      setShowModal3DBlock(showModal3DBlockFlag);

      const modelKeyField = modal3DBlock().find(
          (item) => item.name === "3D Model key",
      );

      const modelKeyValue =
        path(["values", "0"], modelKeyField) || null;

      setModelKey(modelKeyValue);
    }

    setLoading(context.loading);
  }, [context]);

  const specificationGroups = () => {
    const groups = path(["specificationGroups"], product) || [];
    return groups;
  };

  const modal3DBlock = () => {
    if (specificationGroups()) {
      const modal3D = specificationGroups().find(
          (item) => item.name === "Blocks",
      );
      return path(["specifications"], modal3D);
    }
  };

  const handleResize = (event) => {
    setWindowWith(window.innerWidth);
    setIsMobile(window.innerWidth < 768 ? true : false);
    setIsTablet(
      window.innerWidth >= 768 && window.innerWidth < 992 ? true : false,
    );
    setIsDesktop(window.innerWidth >= 992 ? true : false);
  };

  const handleAddToCartDisable = (tradeInFlag, productId) => {
    if (productId == selectedItem().itemId && tradeInFlag) {
      setDisableAddButton(true);
    } else {
      setDisableAddButton(false);
    }
  };

  const setTradeInSelection = (tradeInFlag, productId) => {
    setTradeInSelected(tradeInFlag);
    setTradeInProductIdLinked(productId);
  };

  useEffect(() => {
    if (tradeInSelected && tradeInProductIdLinked == skuSelector.selectedImageVariationSKU) {
      setDisableAddButton(true);
    } else {
      setDisableAddButton(false);
    }
  }, [skuSelector]);

  useEffect(() => {
    if (window.location) {
      setCurrentLocationUrl(window.location.href);
    }
  }, []);

  useEventListener("resize", handleResize);

  const heroBlock = () => {
    if (specificationGroups()) {
      const hero = specificationGroups().find((item) => item.name === "Blocks");
      return path(["specifications"], hero);
    }
  };

  const logoImage = () => {
    if (heroBlock()) {
      let logo;
      if (isMobile) {
        logo = heroBlock().find((item) => item.name === "Logo PDP Mobile");
      } else if (isTablet) {
        logo = heroBlock().find((item) => item.name === "Logo PDP Tablet");
      } else if (isDesktop) {
        logo = heroBlock().find((item) => item.name === "Logo PDP");
      }

      if (!logo && (isMobile || isTablet)) {
        logo = heroBlock().find((item) => item.name === "Logo PDP");
      }

      return path(["values", "0"], logo);
    }
  };

  const logoDescAlignment = () => {
    if (heroBlock()) {
      const logoDescAlignment = heroBlock().find(
          (item) => item.name === "Logo_Desc Alignment",
      );

      return logoDescAlignment ?
        path(["values", "0"], logoDescAlignment) :
        "center";
    }
  };

  const backgroundImage = () => {
    if (heroBlock()) {
      const background = heroBlock().find(
          (item) => item.name === "ImageBackground",
      );
      return path(["values", "0"], background);
    }
  };

  const targetWindow = () => {
    if (heroBlock()) {
      const targetWindow = heroBlock().find(
          (item) => item.name === "Target_window",
      );
      return path(["values", "0"], targetWindow);
    }
  };

  const backgroundImageMobile = () => {
    if (heroBlock()) {
      const background = heroBlock().find(
          (item) => item.name === "imageBackgroundMobile",
      );
      return path(["values", "0"], background);
    }
  };

  const buyButton = () => {
    if (specificationGroups()) {
      const buyButton = specificationGroups().find(
          (item) => item.name === "Buy Button",
      );
      const specifications = path(["specifications"], buyButton);

      if (specifications) {
        // const storeName = specifications.find(spec => spec.name === "Buy button store name")
        // const storeUrl = specifications.find(spec => spec.name === "Buy button store URL")
        return {
          name: specifications.find(
              (spec) => spec.name === "Buy button store name",
          ).values[0],
          url: specifications.find((spec) => spec.name === "Buy button store URL")
              .values[0],
        };
      }
    }
  };

  const hasSellerWithAvailableItems = (item) => {
    return (
      item.sellers &&
      any(
          (s) => s.commertialOffer && s.commertialOffer.AvailableQuantity > 0,
          item.sellers,
      )
    );
  };

  const selectedItem = () => {
    const items = path(["items"], product) || [];
    if (!props.query || !props.query.skuId) {
      return items.find(hasSellerWithAvailableItems) || items[0];
    }
    return items.find((sku) => sku.itemId === props.query.skuId);
  };

  const skuItems = () => {
    return pathOr([], ["items"], product);
  };

  const sellerId = () => {
    return path(["sellers", 0, "sellerId"], selectedItem());
  };

  const commertialOffer = () => {
    return path(["sellers", 0, "commertialOffer"], selectedItem());
  };

  const buyButtonProps = {
    skuItems: selectedItem() &&
      selectedItem() && [
      {
        skuId: selectedItem().itemId,
        quantity: selectedQuantity,
        seller: sellerId(),
        name: selectedItem().nameComplete,
        price: commertialOffer().Price,
        variant: selectedItem().name,
        brand: product.brand,
        index: 0,
        detailUrl: `/${product.linkText}/p`,
        imageUrl: path(["images", "0", "imageUrl"], selectedItem()),
        listPrice: path(
            ["sellers", "0", "commertialOffer", "ListPrice"],
            selectedItem(),
        ),
      },
    ],
    large: true,
    available: true,
  };

  const productPriceProps = {
    listPrice: path(["ListPrice"], commertialOffer()),
    sellingPrice: path(["Price"], commertialOffer()),
    installments: path(["Installments"], commertialOffer()),
  };

  const baseUrlRegex = new RegExp(/.+ids\/(\d+)/);

  const cleanImageUrl = (imageUrl) => {
    const result = baseUrlRegex.exec(imageUrl);
    if (result.length > 0) return result[0];
  };

  const replaceLegacyFileManagerUrl = (imageUrl, width, height) => {
    const legacyUrlPattern = `${getAssetsUrl}/arquivos/ids/`;
    const isLegacyUrl = imageUrl.includes(legacyUrlPattern);
    if (!isLegacyUrl) return imageUrl;
    return `${cleanImageUrl(imageUrl)}-${width}-${height}`;
  };

  const changeImageUrlSize = (
      imageUrl,
      width = DEFAULT_WIDTH,
      height = DEFAULT_HEIGHT,
  ) => {
    if (!imageUrl) return;
    typeof width === "number" && (width = Math.min(width, MAX_WIDTH));
    typeof height === "number" && (height = Math.min(height, MAX_HEIGHT));

    const normalizedImageUrl = replaceLegacyFileManagerUrl(
        imageUrl,
        width,
        height,
    );
    const queryStringSeparator = normalizedImageUrl.includes("?") ? "&" : "?";

    return `${normalizedImageUrl}${queryStringSeparator}width=${width}&height=${height}&aspect=true`;
  };

  const thresholds = [640];
  const imageSizes = [1280, 1920];
  const thumbnailSize = 160;

  const DEFAULT_WIDTH = "auto";
  const DEFAULT_HEIGHT = "auto";
  const MAX_WIDTH = 3000;
  const MAX_HEIGHT = 4000;

  const getImages = () => {
    const images = path(["images"], selectedItem());

    return images ?
      images.map((image) => ({
        imageUrls: imageSizes.map((size) =>
          changeImageUrlSize(image.imageUrl, size),
        ),
        thresholds,
        thumbnailUrl: changeImageUrlSize(image.imageUrl, thumbnailSize),
        imageText: image.imageText,
      })) :
      [];
  };
  const getReviewsBlock = () => {
    if (specificationGroups()) {
      const blocks = specificationGroups().find(
          (specificationGroup) => specificationGroup.name === "Blocks",
      );
      if (blocks) {
        const showReviews = blocks.specifications.find(
            (spec) => spec.name === "Show Reviews",
        );
        if (showReviews) {
          if (showReviews.values[0].toLowerCase() == "true") {
            return true;
          }
        }
      }
    }
  };

  if (!selectedItem()) {
    return <div />;
  }

  const descAlignment = isMobile ? logoDescAlignment() : null;

  const productUnavailableOffers = () => {
    if (specificationGroups()) {
      const blocks = specificationGroups().find(
          (specificationGroup) => specificationGroup.name === "Blocks",
      );
      const specifications = path(["specifications"], blocks);

      if (specifications) {
        return {
          text: specifications.find(
              (spec) => spec.name === "Product unavailable text",
          ) ?
            specifications.find(
                (spec) => spec.name === "Product unavailable text",
            ).values[0] :
            "",
          linkText: specifications.find(
              (spec) => spec.name === "Product unavailable offer link text",
          ) ?
            specifications.find(
                (spec) => spec.name === "Product unavailable offer link text",
            ).values[0] :
            "",
          link: specifications.find(
              (spec) => spec.name === "Product unavailable offer link",
          ) ?
            specifications.find(
                (spec) => spec.name === "Product unavailable offer link",
            ).values[0] :
            "",
          target: specifications.find(
              (spec) => spec.name === "Target window product unavailable link",
          ) ?
            specifications.find(
                (spec) => spec.name === "Target window product unavailable link",
            ).values[0] :
            "",
        };
      }
    }
  };

  const setAlignmentClass = () => {
    let className = "";
    if (selectedItem() && selectedItem().sellers[0].commertialOffer.Price > 0 && selectedItem().sellers[0].commertialOffer.AvailableQuantity > 0) {
      className = "align-top-pdp-add-to-cart-section";
    } else if (buyButton()) {
      className = "align-top-pdp-buy-now-section";
    } else {
      className = "";
    }
    return className;
  };

  const openModal = () => {
    setIsOpen(true);
    document.body.classList.add("no-scroll");
  };

  const closeModal = () => {
    setIsOpen(false);
    document.body.classList.remove("no-scroll");
  };

  const modal3DIcon = "Dusk-Blue.gif";

  const pdpLayout = () => {
    if (heroBlock()) {
      const item = heroBlock().find(
          (item) => item.name === "PDP Layout",
      );

      return path(["values", "0"], item);
    }
  };

  return (
    <Fragment>
      <div
        id="product-details"
        className={`moto-product-details  ${pdpLayout() === "Rogue" ? "product-details-rogue" : ""}`}
        style={{
          backgroundImage: !(pdpLayout() === "Rogue") ?
            "url(" +
            (backgroundImageMobile() && (isMobile || isTablet) ?
              getAssetsUrl + backgroundImageMobile() :
              backgroundImage() ?
                getAssetsUrl + backgroundImage() :
                "https://images.unsplash.com/photo-1557682224-5b8590cd9ec5?ixlib=rb-1.2.1&auto=format&fit=crop&w=1315&q=80") +
            ")" : "",
        }}
      >
        <div className="container moto-product-details-container">
          <div className={`product-details-block-content ${setAlignmentClass()}`}>
            {
              !(pdpLayout() === "Rogue") &&
              <div className="product-details-float-image">
                {logoImage() ? (
                  <img src={logoImage()} alt={product.productName} />
                ) : (
                    <h1>{product.productName}</h1>
                  )}
              </div>
            }
            {
              (isMobile || isTablet) &&
              <>
                <div className="product-details-images">
                  {product &&
                    selectedItem() &&
                    selectedItem().images &&
                    selectedItem().images.length > 0 && (
                    <ExtensionPoint
                      id="product-images"
                      images={getImages()}
                      position="left"
                    />
                  )}

                  {showModal3D == "TRUE" ?
                  (<div className="modal-3d-wrapper">
                    <ExtensionPoint
                      id="modal-3d-render"
                      modelKey={modelKey}
                    /></div>) : null}
                </div>
              </>
            }
            {
              (pdpLayout() === "Rogue") &&
              <div className="product-details-float-image">
                {logoImage() ? (
                  <img src={logoImage()} alt={product.productName} />
                ) : (
                    <h1>{product.productName}</h1>
                  )}
              </div>
            }
            <div
              className="product-details-description"
              style={{
                textAlign: descAlignment,
              }}
            >
              <div dangerouslySetInnerHTML={{__html: product.description}} />
            </div>

            {getReviewsBlock() && (
              <div className="container moto-product-details-rating-inline">
                <ExtensionPoint id="bazaarvoiceinline" />
              </div>
            )}

            {
              props.showCustomSKU ?
                <div className="sku-selector">
                  {product &&
                    !buyButton() &&
                    skuItems() &&
                    selectedItem() &&
                    selectedItem().variations &&
                    selectedItem().variations.length > 0 && (
                    <ExtensionPoint
                      id="sku-selector-custom"
                      skuItems={skuItems()}
                      skuSelected={selectedItem()}
                      productSlug={product.linkText}
                      variations={selectedItem().variations}
                    />
                  )}
                </div> :
                <div className="sku-selector">
                  {product &&
                    !buyButton() &&
                    skuItems() &&
                    selectedItem() &&
                    selectedItem().variations &&
                    selectedItem().variations.length > 0 && (
                    <ExtensionPoint
                      id="sku-selector"
                      skuItems={skuItems()}
                      skuSelected={selectedItem()}
                      productSlug={product.linkText}
                      variations={selectedItem().variations}
                    />
                  )}
                </div>
            }

            {selectedItem() &&
              selectedItem().sellers[0].commertialOffer.Price > 0 && selectedItem().sellers[0].commertialOffer.AvailableQuantity > 0 ? (
                <Fragment>
                  <div className="product-details-price">
                    {product && (
                      <ExtensionPoint id="product-price" {...productPriceProps} />
                    )}
                  </div>
                  <div className="affirm-product-details">
                    <ExtensionPoint id="product-teaser.product.affirm" />
                  </div>
                  {
                    <div className="moto-trade-in">
                      <ExtensionPoint id="moto-trade-in" skuSelected={selectedItem()} specificationGroups={specificationGroups()} {...productPriceProps} skuSelector={skuSelector} addToCartBtnCallBack={handleAddToCartDisable} setTradeInSelection={setTradeInSelection} />
                    </div>
                  }
                  <div className="product-details-buy-button">
                    <ExtensionPoint id="add-to-cart-button" disabled={disableAddButton} />
                  </div>
                </Fragment>
              ) : buyButton() ? (
                <div className="product-details-buy-button">
                  <a target={targetWindow() ? targetWindow() : "_blank"} href={buyButton().url} rel="noreferrer">
                    {buyButton().name}
                  </a>
                </div>
              ) : productUnavailableOffers() ? (
                <p className="product-unavailable">
                  <span className="product-unavailable-text">
                    {productUnavailableOffers().text ? (
                      productUnavailableOffers().text
                    ) : (
                        <FormattedMessage id="store/moto-product-details.product-unavailable" />
                      )}
                  </span>
                  <span className="offers-link">
                    {productUnavailableOffers().linkText &&
                      productUnavailableOffers().link &&
                      productUnavailableOffers().target ? (
                        <a
                          target={productUnavailableOffers().target}
                          href={productUnavailableOffers().link}
                        >
                          {productUnavailableOffers().linkText}
                        </a>
                      ) : (
                        <a target="_self" href="#">
                          <FormattedMessage id="store/moto-product-details.product-unavailable-link-text" />
                        </a>
                      )}
                  </span>
                </p>
              ) : null}

            <Block id="unsubscribe-link" />
          </div>
          {
            (isMobile || isTablet) ?
              null :
              <><div className="product-details-images">
                {product &&
                  selectedItem() &&
                  selectedItem().images &&
                  selectedItem().images.length > 0 && (
                  <ExtensionPoint
                    id="product-images"
                    images={getImages()}
                    position="left"
                  />
                )}

                {showModal3D == "TRUE" ?
                  (<div className="modal-3d-wrapper">
                    <ExtensionPoint
                      id="modal-3d-render"
                      modelKey={modelKey}
                    /></div>) : null}
              </div>
              </>
          }
        </div>
      </div>
    </Fragment>
  );
};

export default MotoProductDetails;
