import Collapsible from "react-collapsible";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { FormattedCurrency } from 'vtex.format-currency';
import { useRuntime } from 'vtex.render-runtime';
import { setApiHeaders } from '../../../../../../utils/config';
import redbulleticon from "../../../../images/Moto-x-mark.svg";
import bluebulleticon from "../../../../images/Moto-Check-mark.svg";
import { Icon } from 'vtex.store-icons';

const MotoCareItem = props => {
  const [questionsOpen, setquestionsOpen] = useState(false);
  const [pricingData, setPricingData] = useState({});
  const [strikeThroughPrice, setStrikeThroughPrice] = useState(false);
  const [listPrice, setListPrice] = useState(0);
  const { account } = useRuntime()
  const toggleQuestion = key => {
    setquestionsOpen(!questionsOpen);
  };
  let recommended = "";
  let selectItemClass = "";
  if (
    props.servicePlanRecommendedItem ==
    props.items.servicePlanItemHeading.toLowerCase()
  ) {
    recommended = "recommended";
  }
  if (props.checked) {
    selectItemClass = "moto-care-option-selected";
  }
  const fixImageUrl = imageUrl => {
    return imageUrl.includes("https")
      ? imageUrl
      : imageUrl.replace("http", "https");
  };
  useEffect(()=>{
    getStrikeThroughPrice(props.productId);
  },[])

  const getStrikeThroughPrice = (itemId) => {
    const pricingURL = `${window.location.origin + (("undefined" != typeof __RUNTIME__ && null !== __RUNTIME__ ? __RUNTIME__.rootPath : void 0) || "")}/getItemPrices?itemId=${itemId}&account=${account}`;
    axios
      .get(
        `${pricingURL}`,
        {
          //headers: setApiHeaders(account),
          Accept: 'application/vnd.vtex.pricing.v3+json',
          'Content-Type': 'application/json'
        }
      ).then(response => {
        if (response?.data?.fixedPrices && response?.data?.fixedPrices.length === 1) {
          setPricingData(response?.data);
          const {
            listPrice,
            value
          } = response.data.fixedPrices[0];
          if (listPrice !== value) {
            setStrikeThroughPrice(true);
            setListPrice(listPrice);
          }
        }
      }).catch(error => {
        setStrikeThroughPrice(false);
        setListPrice(0);
      });
  }

  return (
    <div className={`moto-care-option ${recommended} ${selectItemClass}`}>
      <div className="moto-care-option-details">
        {props.servicePlanRecommendedItem ==
          props.items.servicePlanItemHeading.toLowerCase() ? (
            <div className="moto-care-recommended">
              {props.recommendedItemText}
            </div>
          ) : null}
        <div className="moto-care-service-plane-name">
          {props.items.servicePlanItemHeading}
        </div>
        <div className="moto-care-option-name">{props.name}</div>
        <div>
          {
            strikeThroughPrice &&
            <div className="strike f5-m t-small-ns pt6 c-muted-2 mr3">
              <FormattedCurrency value={listPrice} />
            </div>
          }
          <div className={`moto-care-option-price ${!strikeThroughPrice ? 'pt6' : ''}`}>{props.price}</div>
        </div>
        <div
          onClick={props.selectAssembly}
          className={
            props.checked
              ? "moto-care-radio-input radio-checked"
              : "moto-care-radio-input"
          }
        >
          {
            props.checked &&
            <Icon id="sti-check--line" />
          }
          <label>
            <span>{props.checked ? "Selected" : "Select"}</span>
          </label>
        </div>
        {props.isMobile ? (
          <ul className="warranty-bullet-points mobile-collapsible-bullet-points">
            <Collapsible
              transitionTime={300}
              trigger={
                <div className="mobile-collapsible-bullet-title-section">
                  <span className="mobile-collapsible-bullet-text">
                    {"view more details"}
                  </span>
                  <span className="mobile-collapsible-bullet-icon"> {"+"}</span>
                </div>
              }
              triggerWhenOpen={
                <div className="mobile-collapsible-bullet-title-section">
                  <span className="mobile-collapsible-bullet-text">
                    {"view more details"}
                  </span>
                  <span className="mobile-collapsible-bullet-icon"> {"-"}</span>
                </div>
              }
            >
              {props.items.servicePlanChildItems &&
                props.items.servicePlanChildItems.length > 0 &&
                props.items.servicePlanChildItems.map((itemList, key) => (
                  <li key={key}>
                    <img
                      src={
                        itemList.enableIfRedIcon
                          ? fixImageUrl(redbulleticon)
                          : fixImageUrl(bluebulleticon)
                      }
                      alt="Bullet Icon"
                    />
                    <span
                      dangerouslySetInnerHTML={{
                        __html: itemList.servicePlanChildItemsText
                      }}
                    />
                  </li>
                ))}
            </Collapsible>
          </ul>
        ) : (
            <ul className="warranty-bullet-points desktop-collapsible-bullet-points">
              {props.items.servicePlanChildItems &&
                props.items.servicePlanChildItems.length > 0 &&
                props.items.servicePlanChildItems.map((itemList, key) => (
                  <li key={key}>
                    <img
                      src={
                        itemList.enableIfRedIcon
                          ? fixImageUrl(redbulleticon)
                          : fixImageUrl(bluebulleticon)
                      }
                      alt="Bullet Icon"
                    />
                    <span
                      dangerouslySetInnerHTML={{
                        __html: itemList.servicePlanChildItemsText
                      }}
                    />
                  </li>
                ))}
            </ul>
          )}
      </div>
    </div>
  );
};

export default MotoCareItem;
