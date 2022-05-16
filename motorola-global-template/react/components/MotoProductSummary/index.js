import { useState, useEffect } from "react";
import { path } from "ramda";
import { ProductPrice } from "vtex.store-components";
import { Link, withRuntimeContext } from "vtex.render-runtime";
import "./MotoProductSummary.global.css";
import { FormattedMessage } from "react-intl";
import { getRootPath } from '../../utils/helpers.js';
import BottomSheet from "../MotoFilterBy/components/BottomSheet";
const tradeInLogo = "/arquivos/trade-in-tm.svg";

const MotoProductSummary = props => {
  const [badgeText, setBadgeText] = useState(null);
  const [familypageImageUrl, setFamilypageImageUrl] = useState('');
  const [buyButton, setBuyButton] = useState(false);
  const [loading, setLoading] = useState(true);
  const [availableIndex, setAvailableIndex] = useState(0);
  const [loadedItem, setLoadedItem] = useState(false);
  const [isCheck, setIsCheck] = useState(false);
  const [availableForTradeIn, setAvailableForTradeIn] = useState(false);
  const [tradeInValue, setTradeInValue] = useState(null);
  const {
    id,
    items,
    list,
    linkText,
    productName,
    description,
    specificationGroups,
    showBuyNowButton,
    getCompare,
    cacheId
  } = props;

  useEffect(() => {
    if (loading && specificationGroups) {
      setLoading(false);
      const buyButtonGroup = specificationGroups.find(
        item => item.name === "Buy Button"
      );
      if (buyButtonGroup) {
        setBuyButton(true);
      }

      const blocksGroup = specificationGroups.find(
        item => item.name === "Blocks"
      );
      const blocks = path(["specifications"], blocksGroup);
      if (!blocks) return;
      const badgeSpec = blocks.find(item => item.name === "dynamicbadge");
      const badgeValue = path(["values", "0"], badgeSpec);
      if (badgeValue) {
        setBadgeText(badgeValue);
      }
      const availableTradeIn = blocks.find(item => item.name === "Available for trade in");
      if (!availableTradeIn) return;
      const availableForTradeInFlag = path(["values", "0"], availableTradeIn);
      if (availableForTradeInFlag && availableForTradeInFlag == "Yes") {
        setAvailableForTradeIn(true);
        const estimatedTradeInValue = blocks.find(item => item.name === "Estimated trade-in value");
        if (!estimatedTradeInValue) return;
        const tradeInValue = path(["values", "0"], estimatedTradeInValue);
        if (tradeInValue && !isNaN(Number(tradeInValue))) {
          setTradeInValue(Number(tradeInValue));
        }
      }
      const familyPageImageUrlSpec = blocks.find(item => item.name === "Family page image Url");
      const familyPageImageUrlValue = path(["values", "0"], familyPageImageUrlSpec) || '';
      setFamilypageImageUrl(familyPageImageUrlValue)
    }
  }, []);

  useEffect(() => {
    if (!loadedItem) {
      setLoadedItem(true);
      const item = items.find(i => i.sellers[0].commertialOffer.Price > 0);
      setAvailableIndex(item ? items.indexOf(item) : 0);
    }
  }, []);

  useEffect(() => {
    if (list) {
      Array.from(list).map((e) => {
        if ((e === id) && (isCheck === false)) setIsCheck(true)
      })
    }
  }, [list]);

  const defaultImage = items
    ? familypageImageUrl
      ? familypageImageUrl
      : items[availableIndex].images[0].imageUrl
    : "";

  return (
    <div className="moto-product-summary moto-product-summary-family">
      <div className="card-image">
        <Link
          className="blue-shelf-cta"
          page="store.product"
          params={{ slug: linkText }}
        >
          <img src={defaultImage} alt={productName} />
        </Link>
        {badgeText && (
          <div className="moto-product-summary-tag">{badgeText}</div>
        )}
      </div>
      <div className="card-details">
        <div className="card-title">
          <h1 dangerouslySetInnerHTML={{ __html: productName }} />
        </div>
        {items && items[availableIndex].sellers[0].commertialOffer.Price > 0 &&
          !buyButton && (
            <div className="card-price">
              <ProductPrice
                sellingPrice={
                  items[availableIndex].sellers[0].commertialOffer.Price
                }
                listPrice={
                  items[availableIndex].sellers[0].commertialOffer.ListPrice
                }
                installments={
                  items[availableIndex].sellers[0].commertialOffer.Installments
                }
                showLabels={false}
                {...items[availableIndex]}
              />
            {
              (availableForTradeIn) &&
              <div className="trade-in-section">
                <p>
                  <FormattedMessage id="store/moto-product-summary-from"></FormattedMessage>
                  &nbsp;
                  {
                    tradeInValue ?
                    <span className="trade-in-price-value">${Number(items[availableIndex].sellers[0].commertialOffer.Price - tradeInValue).toFixed(2)}</span>
                    :
                    <span className="trade-in-price-value">${'1.00'}</span>
                  }
                  &nbsp;
                  <FormattedMessage id="store/moto-product-summary-with"></FormattedMessage>
                  <img src={tradeInLogo} className="trade-in-logo" alt="trade-in-logo"></img></p>
              </div>
            }
            </div>
          )}
        <div className="card-description">
          <div
            className="card-description-content"
            dangerouslySetInnerHTML={{ __html: description }}
          />
        </div>
      </div>
      <div className="card-actions">
        {showBuyNowButton && (
          <Link
            className="blue-shelf-cta"
            page="store.product"
            params={{ slug: linkText }}
          >
            <FormattedMessage id="store/moto-product-summary.buy-now" />
          </Link>
        )}
        {!showBuyNowButton && (
          <Link
            className="blue-shelf-cta"
            page="store.product"
            params={{ slug: linkText }}
          >
            <FormattedMessage id="store/moto-product-summary.learn-more" />
          </Link>
        )}
        <div className="moto-compare-section">
          <label className='moto-compare-button' htmlFor={cacheId}>
            <input
              type='checkbox'
              key={'checkbox' + cacheId}
              id={cacheId}
              value={cacheId}
              onClick={getCompare}
              defaultChecked={isCheck}
            />
            <span className='checkmark'></span>
            <span className='compare-title'><FormattedMessage id="store/moto-product-summary.compare" /></span>
          </label>
        </div>
      </div>
    </div>
  );
};

export default withRuntimeContext(MotoProductSummary);
