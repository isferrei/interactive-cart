import React, { useRef, useState, useEffect } from "react";
import Tooltip from "react-tooltip-lite";
import $ from "jquery";
import { path } from "ramda";
import { Link } from "vtex.render-runtime";
import { FormattedMessage } from "react-intl";
import MotoCareItem from "./components/MotoCareItem";
import motoCareImage from "../../images/moto-care-logo.svg";

const Product = props => {
  const {
    servicePlanRecommendedItem,
    servicePlanItemRecommendedText,
    toolTipCTATitle,
    toolTipCTAContent,
    servicePlanItems,
    index,
    orderForm,
    item,
    itemMetadata,
    addToSelectedAssemblies,
    removeFromSelectedAssemblies,
    clearSelectedMotoCareAssemblies,
    storePreferencesData: { countryCode, currencyCode }
  } = props;
  const ref = useRef();
  const [selectedAssembly, setSelectedAssembly] = useState({});
  const [assemblyAlreadySelected, setAssemblyAlreadySelected] = useState(null);
  const [assembliesLoaded, setAssembliesLoaded] = useState(false);
  const [open, setState] = useState(false);
  const [checked, setChecked] = useState(true);
  const [selected, setSelected] = useState(false);
  const [warrantyType, setwarrantyType] = useState(null);
  const [isMobile, setIsMobile] = useState(
    window.innerWidth < 768 ? true : false
  );
  const noCoverageRef = React.useRef();

  useEffect(() => {
    if (open) {
      document.addEventListener("click", handleClickOutside);
    } else {
      document.removeEventListener("click", handleClickOutside);
    }
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [open]);
  const handleClickOutside = e => {
    if (ref.current.contains(e.target)) {
      return;
    }
    // outside click
    setState(false);
  };

  useEffect(() => {
    if (!assembliesLoaded) {
      const optionItems = findAssemblyOptionsItems();
      let metadataIds = orderForm.items.map(item => item.id);
      let metaDataMatchFound = false;
      if (optionItems.length) {
        optionItems.map(option => {
          if (metadataIds.includes(option.id)) {
            metaDataMatchFound = true;
            selectAssembly(option, true);
            setAssemblyAlreadySelected(option.id);
          }
        });
      } else {
        if(item.accessories){
          item.accessories.map(option => {
            if (metadataIds.includes(option.itemId)) {
              selectAssembly(option, true, "accessory");
              setAssemblyAlreadySelected(option.itemId);
            }
          });

        }

      }
      setAssembliesLoaded(true);
    }
  });

  useEffect(() => {
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  const selectAssembly = (
    assembly,
    alreadySelected = false,
    selectionType = "assembly",
    selectedwarrantytype = ""
  ) => {
    if(selectedAssembly.id === assembly.id) {
      clearSelectedAssembly();
      return false;
    }
    setChecked(false);
    setSelected(!selected);
    setSelectedAssembly(assembly);
    if (selectedwarrantytype) {
      if(selectedwarrantytype.toLowerCase() == servicePlanRecommendedItem.toLowerCase()) {
        selectedwarrantytype = servicePlanItemRecommendedText.toUpperCase();
      }
      setwarrantyType(selectedwarrantytype);
      localStorage.setItem(item.id, selectedwarrantytype);
    } else {
      setwarrantyType(localStorage.getItem(item.id));
    }
    if (selectionType === "assembly") {
      if (assemblyAlreadySelected && assemblyAlreadySelected != assembly.id) {
        removeFromSelectedAssemblies(item.id, assemblyAlreadySelected);
      }
      if (!alreadySelected) addToSelectedAssemblies(item.id, assembly.id);
    } else {
      if (
        assemblyAlreadySelected &&
        assemblyAlreadySelected != assembly.itemId
      ) {
        removeFromSelectedAssemblies(item.id, assemblyAlreadySelected);
      }
      if (!alreadySelected) addToSelectedAssemblies(item.id, assembly.itemId);
    }
  };

  const clearSelectedAssembly = () => {
    setSelectedAssembly({});
    if (assemblyAlreadySelected) {
      removeFromSelectedAssemblies(item.id, assemblyAlreadySelected);
    }
    clearSelectedMotoCareAssemblies(props.item);
    setChecked(true);
    localStorage.setItem(item.id, "");
    setSelected(!selected);
    noCoverageRef.current.focus();
  };
  const toggleTip = () => {
    setState(!open);
  };
  const toggleEditPlan = () => {
    setSelected(!selected);
  };
  const handleResize = event => {
    setIsMobile(window.innerWidth < 768 ? true : false);
  };

  const fixImageUrl = imageUrl => {
    return imageUrl.includes("https")
      ? imageUrl
      : imageUrl.replace("http", "https");
  };

  const sellingPrice = () => {
    return parseFloat(props.item.sellingPrice).toLocaleString(countryCode, {
      style: "currency",
      currency: currencyCode
    });
  };

  const listPrice = () => {
    return parseFloat(props.item.listPrice).toLocaleString(countryCode, {
      style: "currency",
      currency: currencyCode
    });
  };
  let warrantyStyle = "";
  if (selected) {
    warrantyStyle = "warranty-plan-selected";
  } else {
    warrantyStyle = "warranty-plan-not-selected";
  }

  const findAssemblyOptionsItems = () => {
    const foundItem = itemMetadata.items.find(im => item.id === im.id) || {};
    const assemblyItems = path(
      ["assemblyOptions", "0", "composition", "items"],
      foundItem
    );
    if (!assemblyItems) return [];
    const itemsIds = assemblyItems.map(option => option.id);
    const itemsDetails = props.itemMetadata.items.filter(item =>
      itemsIds.includes(item.id)
    );
    return itemsDetails;
  };
  const formatPrice = price => {
    return parseFloat(price).toLocaleString(countryCode, {
      style: "currency",
      currency: currencyCode
    });
  };

  const findItemPrice = option => {
    const priceTable = path(["priceTable", "0", "values"], itemMetadata);
    if (priceTable) {
      const foundPrice = priceTable.find(item => item.id === option.id);
      return formatPrice(path(["price"], foundPrice) / 100);
    }
    return [];
  };
  return (
    <div className="moto-care-item flex">
      <div className="warranty-page-product">
        <div className="warrant-page-product-image">
          <img
            src={fixImageUrl(props.item.imageUrl.replace("85-85", "255-255"))}
            alt={props.item.name}
          />
        </div>
        <div className="warranty-page-product-block">
          <div className="warranty-page-product-info">
            <div className="warranty-page-mobile-product-image">
              <img
                src={fixImageUrl(
                  props.item.imageUrl.replace("85-85", "255-255")
                )}
                alt={props.item.name}
              />
            </div>
            <div className="warranty-page-product-name">
              <h3>{props.item.name}</h3>
            </div>
            <div className="warranty-page-product-quantity warranty-page-desktop-content">
              <span className="warranty-page-text">Quantity </span>
              <h3>{props.item.quantity}</h3>
            </div>
            {listPrice() !== sellingPrice() ? (
              <div className="warranty-page-product-price warranty-page-desktop-content">
                <span
                  className="warranty-page-text"
                  style={{
                    textDecoration: "line-through",
                    fontWeight: "700"
                  }}
                >
                  {listPrice()}
                </span>
                <h3>{sellingPrice()}</h3>
              </div>
            ) : (
              <div className="warranty-page-product-price warranty-page-desktop-content">
                <h3>{listPrice()}</h3>
              </div>
            )}
            <div className="warranty-page-mobile-quantity-price-section">
              <div className="warranty-page-product-quantity">
                <span className="warranty-page-text">Quantity: </span>
                <h3>{props.item.quantity}</h3>
              </div>
              {listPrice() !== sellingPrice() ? (
                <div className="warranty-page-product-price">
                  <span
                    className="warranty-page-text"
                    style={{
                      textDecoration: "line-through",
                      fontWeight: "700"
                    }}
                  >
                    {listPrice()}
                  </span>
                  <h3>{sellingPrice()}</h3>
                </div>
              ) : (
                <div className="warranty-page-product-price">
                  <h3>{listPrice()}</h3>
                </div>
              )}
            </div>
          </div>

          <div className="warranty-page-moto-care-options">
            <img
              className="moto-care-plan-image moto-care-plan-desktop-image"
              src={motoCareImage}
              alt={props.infoText}
            />
            <div className="moto-care-plan-text">
              <p dangerouslySetInnerHTML={{ __html: props.infoText }} />
            </div>
            <div className="moto-care-learn-more">
              <Tooltip
                content={
                  <div ref={ref} className="learn-more-tooltip-container">
                    <div className="learn-more-tooltip-content-section">
                      <div className="learn-more-tooltip-content">
                        <div
                          className="learn-more-tooltip-inner-content"
                          dangerouslySetInnerHTML={{
                            __html: toolTipCTAContent
                          }}
                        />
                      </div>
                      <span
                        onClick={toggleTip}
                        className="learn-more-tooltip-close-button"
                      >
                        &times;
                      </span>
                    </div>
                  </div>
                }
                arrowContent={
                  <svg
                    style={{ display: "block" }}
                    viewBox="0 0 21 11"
                    width="20px"
                    height="10px"
                  >
                    <path
                      d="M0,11 L9.43630703,1.0733987 L9.43630703,1.0733987 C10.1266203,0.3284971 11.2459708,0 11.936284,1.0733987 L20,11"
                      style={{ stroke: "D7D7D7", fill: "white" }}
                    />
                  </svg>
                }
                background="#FFFFFF"
                color="#000000"
                tipContentClassName=""
                tagName="span"
                direction="down-start"
                forceDirection
                eventToggle="onClick"
                distance={20}
                isOpen={open}
              >
                <a onClick={toggleTip}>
                  <span className="moto-care-learn-more-icon">i</span>
                  {toolTipCTATitle}
                </a>
              </Tooltip>
            </div>

            <div
              onClick={clearSelectedAssembly}
              className={`no-coverage ${warrantyStyle}`}
            >
              <div
                className={
                  checked
                    ? "no-coverage-moto-care-radio-input radio-checked"
                    : "no-coverage-moto-care-radio-input"
                }
                ref={noCoverageRef}
                tabindex={"-1"}
              ></div>
              <div className="moto-care-option-details">
                <div className="moto-care-option-price">
                  <FormattedMessage id="store/warranty.no-coverage" />
                </div>
              </div>
            </div>

            <div className={`moto-care-item ${warrantyStyle}`}>
              {findAssemblyOptionsItems().length
                ? findAssemblyOptionsItems().map((option, key) => {
                    return (
                      <MotoCareItem
                        selectAssembly={() =>
                          selectAssembly(
                            option,
                            false,
                            "assembly",
                            servicePlanItems[key].servicePlanItemHeading
                          )
                        }
                        productId={option.id}
                        checked={selectedAssembly.id === option.id}
                        optionkey={key}
                        key={key}
                        name={option.name}
                        price={findItemPrice(option)}
                        isMobile={isMobile}
                        items={servicePlanItems[key]}
                        servicePlanRecommendedItem={servicePlanRecommendedItem}
                        recommendedItemText={servicePlanItemRecommendedText}
                      />
                    );
                  })
                :(item.accessories ? item.accessories.map((option, key) => {
                  return (
                    <MotoCareItem
                      selectAssembly={() =>
                        selectAssembly(
                          option,
                          false,
                          "accessory",
                          servicePlanItems[key].servicePlanItemHeading
                        )
                      }
                      checked={selectedAssembly.itemId === option.itemId}
                      key={key}
                      name={option.nameComplete}
                      price={formatPrice(
                        path(
                          ["sellers", "0", "commertialOffer", "Price"],
                          option
                        )
                      )}
                      isMobile={isMobile}
                      items={servicePlanItems[key]}
                      servicePlanRecommendedItem={servicePlanRecommendedItem}
                      recommendedItemText={servicePlanItemRecommendedText}
                    />
                  );
                }): "") }
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Product;
