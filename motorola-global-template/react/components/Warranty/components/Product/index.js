import React, { useState, useEffect } from "react";
import MotoCareItem from "./components/MotoCareItem";
import { path } from "ramda";
import motoCareImage from "../../images/moto-care-image.png";
import { Link } from "vtex.render-runtime";
import { FormattedMessage } from 'react-intl';
const Product = props => {
  const {
    index,
    orderForm,
    item,
    itemMetadata,
    addToSelectedAssemblies,
    removeFromSelectedAssemblies,
    storePreferencesData: { countryCode, currencyCode }
  } = props;
  const [selectedAssembly, setSelectedAssembly] = useState({});
  const [assemblyAlreadySelected, setAssemblyAlreadySelected] = useState(null);
  const [assembliesLoaded, setAssembliesLoaded] = useState(false);

  useEffect(() => {
    if (!assembliesLoaded) {
      const optionItems = findAssemblyOptionsItems();
      let metadataIds = orderForm.items.map(item => item.id);
      if (optionItems.length) {
        optionItems.map(option => {
          if (metadataIds.includes(option.id)) {
            selectAssembly(option, true);
            setAssemblyAlreadySelected(option.id);
          }
        });
      } else {
        item.accessories.map(option => {
          if (metadataIds.includes(option.itemId)) {
            selectAssembly(option, true, 'accessory');
            setAssemblyAlreadySelected(option.itemId);
          }
        })
      }
      setAssembliesLoaded(true);
    }
  });

  const selectAssembly = (assembly, alreadySelected = false, selectionType = 'assembly') => {
    setSelectedAssembly(assembly);
    if (selectionType === 'assembly') {
      if (assemblyAlreadySelected && assemblyAlreadySelected != assembly.id) {
        removeFromSelectedAssemblies(item.id, assemblyAlreadySelected);
      }
      if (!alreadySelected) addToSelectedAssemblies(item.id, assembly.id);
    } else {
      if (assemblyAlreadySelected && assemblyAlreadySelected != assembly.itemId) {
        removeFromSelectedAssemblies(item.id, assemblyAlreadySelected);
      }
      if (!alreadySelected) addToSelectedAssemblies(item.id, assembly.itemId);
    }
  };

  const clearSelectedAssembly = () => {
    setSelectedAssembly({});
    if (assemblyAlreadySelected)
      removeFromSelectedAssemblies(item.id, assemblyAlreadySelected);
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
          <img src={fixImageUrl(props.item.imageUrl)} />
          <img className="moto-care-plan-image" src={motoCareImage} />
        </div>
        <div className="warranty-page-product-block">
          <div className="warranty-page-product-info">
            <div className="warranty-page-product-name">
              <h3>{props.item.name}</h3>
            </div>
            <div className="warranty-page-product-quantity">
              <h4>Quantity: {props.item.quantity}</h4>
            </div>
            {listPrice() !== sellingPrice() ? (
              <div className="warranty-page-product-price">
                <h4
                  style={{
                    textDecoration: "line-through",
                    fontWeight: "normal"
                  }}
                >
                  {listPrice()}
                </h4>
                <h3>{sellingPrice()}</h3>
              </div>
            ) : (
              <div className="warranty-page-product-price">
                <h3>{listPrice()}</h3>
              </div>
            )}
          </div>
          <div className="warranty-page-mobile-product-image">
            <img src={fixImageUrl(props.item.imageUrl)} />
          </div>
          <div className="warranty-page-moto-care-options">
            <div className="moto-care-plan-text">
              <p dangerouslySetInnerHTML={{__html: props.infoText}}/>
            </div>
            <div className="moto-care-plan-image-mobile">
              <img className="moto-care-plan-image" src={motoCareImage} />
            </div>
            <div className="moto-care-item">
              <div onClick={clearSelectedAssembly} className="moto-care-option">
                <div
                  className={
                    !Object.keys(selectedAssembly).length
                      ? "moto-care-radio-input radio-checked"
                      : "moto-care-radio-input"
                  }
                ></div>
                <div className="moto-care-option-details">
                  <div className="moto-care-option-price">
                    <strong><FormattedMessage id="store/warranty.no-coverage" /></strong>
                  </div>
                </div>
              </div>
              {
                findAssemblyOptionsItems().length ? 
                findAssemblyOptionsItems().map((option, key) => {
                  return (
                    <MotoCareItem
                      selectAssembly={() => selectAssembly(option)}
                      checked={selectedAssembly.id === option.id}
                      key={key}
                      name={option.name}
                      price={findItemPrice(option)}
                    />
                  );
                }) :
                  item.accessories.map((option, key) => {
                    return (
                      <MotoCareItem
                        selectAssembly={() => selectAssembly(option, false, 'accessory')}
                        checked={selectedAssembly.itemId === option.itemId}
                        key={key}
                        name={option.nameComplete}
                        price={formatPrice(path(['sellers', '0', 'commertialOffer', 'Price'], option))}
                      />
                    );
                  }
                )
              }
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Product;
