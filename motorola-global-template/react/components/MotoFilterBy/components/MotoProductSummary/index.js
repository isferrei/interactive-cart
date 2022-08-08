import { useState, useEffect, Fragment } from 'react';
import { path } from 'ramda';
import { ProductPrice } from 'vtex.store-components';
import { Link, withRuntimeContext } from 'vtex.render-runtime';
import './MotoProductSummary.global.css';
import { FormattedMessage } from 'react-intl';

const MotoProductSummary = props => {
  const [badgeText, setBadgeText] = useState(null);
  const [buyButton, setBuyButton] = useState(false);
  const [loading, setLoading] = useState(true);
  const [availableIndex, setAvailableIndex] = useState(0);
  const [loadedItem, setLoadedItem] = useState(false);
  const [isCheck, setIsCheck] = useState(false);
  const {
    id,
    items,
    list,
    layout,
    linkText,
    getCompare,
    productName,
    description,
    compareTitle,
    specificationGroups
  } = props;

  useEffect(() => {
    if (loading && specificationGroups) {
      setLoading(false);
      const buyButtonGroup = specificationGroups.find(
        item => item.name === 'Buy Button'
      );
      if (buyButtonGroup) {
        setBuyButton(true);
      }
      const blocksGroup = specificationGroups.find(
        item => item.name === 'Blocks'
      );
      const blocks = path(['specifications'], blocksGroup);
      if (!blocks) return;
      const badgeSpec = blocks.find(item => item.name === 'dynamicbadge');
      const badgeValue = path(['values', '0'], badgeSpec);
      if (badgeValue) {
        setBadgeText(badgeValue);
      }
    }
  }, []);

  useEffect(() => {
    if (!loadedItem && items) {
      let item = items.find((i) => i.sellers[0].commertialOffer.Price > 0);
      let index = (item != undefined) ? items.indexOf(item) : 0;
      setAvailableIndex(index);
      setLoadedItem(true);
    }
  }, []);

  useEffect(() => {
    if (list) {
      Array.from(list).map((e) => {
        if ((e === id) && (isCheck === false)) setIsCheck(true)
      })
    }
  }, [list]);


  return (
    <Fragment>
      {(loadedItem === true) && items && (
        <div className={layout === 1 ? 'moto-product-summary moto-layout' : 'moto-product-summary'}>
          <div className="moto-product-summary-container">
            <div className='card-image'>
              <Link
                className='blue-shelf-cta'
                page='store.product'
                params={{ slug: linkText }}
              >
                <img alt={linkText} src={(items[availableIndex] != undefined) ? items[availableIndex].images[0].imageUrl : items[0].images[0].imageUrl} />
              </Link>
            </div>
            <div className='card-details'>
              <div className = "card-title-price-container">
              <div className='card-title'>
                <h1 dangerouslySetInnerHTML={{ __html: productName }} />
              </div>
              {items[availableIndex] && items[availableIndex].sellers[0].commertialOffer.Price > 0 && !buyButton && (
                <div className='card-price'>
                  <ProductPrice
                    sellingPrice={items[availableIndex].sellers[0].commertialOffer.Price}
                    listPrice={items[availableIndex].sellers[0].commertialOffer.ListPrice}
                    installments={items[availableIndex].sellers[0].commertialOffer.Installments}
                    showLabels={false}
                    {...items[availableIndex]}
                  />
                </div>
              )}
              </div>
              <div className='card-description'>
                <div className='card-actions'>
                  <Link
                    className='blue-shelf-cta'
                    page='store.product'
                    params={{ slug: linkText }}
                  >
                    <FormattedMessage id='store/moto-product-summary.buy-now' />
                  </Link>
                  <div className="moto-compare-section">
                    <label className='moto-compare-button' htmlFor={id}>
                      <input
                        type='checkbox'
                        key={'checkbox' + id}
                        id={id}
                        value={id}
                        onClick={getCompare}
                        defaultChecked={isCheck}
                      />
                      <span className='checkmark'></span>
                      <span className='compare-title'>{compareTitle || ''}</span>
                    </label>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </Fragment>
  );
};

export default withRuntimeContext(MotoProductSummary);
