import React, { FC, useCallback, useEffect, useState, useMemo } from "react";
import { useProduct } from "vtex.product-context";
import { Wrapper as AddToCartButton } from "vtex.add-to-cart-button";
import { Item } from "vtex.product-context/react/ProductTypes";
import { handleResize } from "../ComponentRenderer/common/js/deviceDetection";
import classNames from "classnames";
import styles from "./RogueHeader.css";
import Menu from "./components/Menu";

interface RogueHeaderProps {
  data: {
    menu: [
      {
        text: string;
        link: string;
      }
    ];
  };
}

const RogueHeader: FC<RogueHeaderProps> = ({ data }) => {
  const [showMenu, setShowMenu] = useState(false);
  const [showCartButton, setShowCartButton] = useState(false);
  const [showBuyButton, setShowBuyButton] = useState(false);
  const [isPageHeader, setIsPageHeader] = useState(false);

  const product = useProduct();
  const deviceDetected = handleResize();

  const { menu } = data;

  const handleScrollPosition = () => {
    let productDetails;
    if (document.getElementById("product-details")) {
      productDetails = document.getElementById("product-details");
    } else {
      productDetails = document.getElementsByClassName("pdp-hero-banner")[0];
    }
    if (productDetails) {
      const productDetailsOffset =
        productDetails.offsetTop + productDetails.offsetHeight;
      window.pageYOffset >= productDetailsOffset && product
        ? setIsPageHeader(true)
        : setIsPageHeader(false);
    }
  };

  const specificationGroups = useMemo(
    () => product.product?.specificationGroups || [],
    [product.product]
  );

  const buyButton = useMemo(() => {
    if (specificationGroups && specificationGroups.length > 0) {
      const button = specificationGroups.find(
        item => item.name === "Buy Button"
      );

      if (button?.specifications) {
        const storeName = button.specifications.find(
          spec => spec.name === "Buy button store name"
        );
        const storeUrl = button.specifications.find(
          spec => spec.name === "Buy button store URL"
        );

        return {
          name: (storeName?.values || [null])[0],
          url: (storeUrl?.values || [null])[0]
        };
      }
      return null;
    }
  }, [specificationGroups]);

  const logoImage = useMemo(() => {
    if (specificationGroups && specificationGroups.length > 0) {
      const hero = specificationGroups.find(item => item.name === "Blocks");

      if (hero?.specifications) {
        let logo;

        if (deviceDetected.isMobile) {
          logo = hero.specifications.find(
            item => item.name === "Logo PDP Mobile"
          );
        } else if (deviceDetected.isTablet) {
          logo = hero.specifications.find(
            item => item.name === "Logo PDP Tablet"
          );
        }
        if (!logo) {
          logo = hero.specifications.find(item => item.name === "Logo PDP");
        }

        return (logo?.values || [null])[0];
      }
    }
    return null;
  }, [deviceDetected, specificationGroups]);

  const getButton = useCallback(
    (selectedItem: Item) => {
      const sellers = selectedItem.sellers || [];
      const hasQuantity = sellers?.find(
        s => s.commertialOffer?.AvailableQuantity > 0
      );
      if (hasQuantity) {
        setShowCartButton(true);
      } else if (buyButton) {
        setShowBuyButton(true);
      }
    },
    [buyButton]
  );

  useEffect(() => {
    window.addEventListener("scroll", handleScrollPosition);

    if (product.selectedItem) {
      getButton(product.selectedItem);
    }

    return () => window.removeEventListener("scroll", handleScrollPosition);
  }, [getButton, product]);

  return (
    <>
      {isPageHeader && (
        <header
          className={classNames(
            styles["rogue-header--container"],
            "fixed left-0 top-0 w-100 flex justify-center items-center"
          )}
        >
          <div
            className={classNames(
              styles["rogue-header--content"],
              "w-100 pv4 ph5 pa5-l flex-wrap flex justify-between items-center"
            )}
          >
            <div
              className={classNames(
                styles["rogue-header__logo"],
                "flex items-center"
              )}
            >
              {logoImage ? (
                <img src={logoImage} alt={product.product?.productName} />
              ) : (
                <h2>{product.product?.productName}</h2>
              )}
            </div>

            <div className="flex flex-wrap">
              <div
                className="dn-l self-center mr6"
                onClick={() => setShowMenu(prevState => !prevState)}
              >
                <img
                  className={classNames(
                    styles["rogue-header--icon"],
                    showMenu
                      ? styles["rogue-header--iconShow"]
                      : styles["rogue-header--iconHide"]
                  )}
                  src="https://motorolaimgrepo.myvtex.com/arquivos/icon-ionic-ios-arrow-down.png"
                  alt="Down caret icon"
                />
              </div>
              <Menu
                showMenu={showMenu}
                setShowMenu={setShowMenu}
                className="flex-l dn"
                menu={menu}
              />
              {showCartButton ? (
                <div
                  className={styles["rogue-header__menu-section--buy-button"]}
                >
                  <AddToCartButton />
                </div>
              ) : showBuyButton ? (
                <div
                  className={styles["rogue-header__menu-section--buy-button"]}
                >
                  <a target={"_blank"} href={buyButton?.url} rel="noopener noreferrer">
                    {buyButton?.name}
                  </a>
                </div>
              ) : null}
            </div>
            <Menu
              showMenu={showMenu}
              setShowMenu={setShowMenu}
              className="flex dn-l"
              menu={menu}
            />
          </div>
        </header>
      )}
    </>
  );
};

export default RogueHeader;
