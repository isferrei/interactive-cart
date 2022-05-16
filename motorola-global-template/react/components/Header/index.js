import React, {
  Fragment,
  Component,
  useContext,
  useRef,
  useState,
  useEffect
} from "react";
import { ExtensionPoint, withRuntimeContext } from "vtex.render-runtime";
import { Link } from "vtex.render-runtime";
import MenuToggle from "./components/MenuToggle/index";
import InPageNav from "../InPageNav/index";
import { any, path } from "ramda";
import "./Header.global.css";
import { useProduct } from "vtex.product-context";
import { IconSearch } from "vtex.store-icons";
import { Button } from "vtex.styleguide";
import { scroller as scroll } from "react-scroll";
import SocialIcons from "./components/SocialIcons/index";
import { FormattedMessage } from "react-intl";
import LocaleSwitcher from "./components/LocaleSwitcher/index";
import searchArrow from './images/polygon.svg';
import './components/MiniCart/MiniCart.global.css';
import MiniCartEventComponent from './components/MiniCart/MiniCartEventComponent';
import EmployeeDiscount from '../EmployeeDiscount/index'
let linksLoaded = false;

const Header = props => {
  const [sideDrawerOpen, setSideDrawerOpen] = useState(false);
  const [windowWidth, setWindowWith] = useState(window.innerWidth);
  const [isMobile, setIsMobile] = useState(
    window.innerWidth <= 1120 ? true : false
  );
  const [openSearchBar, setOpenSearchBar] = useState(false);
  const [isPageHeader, setIsPageHeader] = useState(false);
  const [showVideoLink, setShowVideoLink] = useState(false);
  const [showSpecLink, setShowSpecLink] = useState(false);

  const [product, setProduct] = useState({});
  const [loading, setLoading] = useState(true);
  const [lastProduct, setLastProduct] = useState({});
  const [minicartComponent, setMinicartComponent] = useState(
    <ExtensionPoint id="minicart.v2" />
  );
  const header = useRef("header");
  const context = useProduct();

  const wrapperRef = useRef(null);

  const [techSpecsFontSize, setTechSpecsFontSize] = useState(
    window.innerWidth <= 991
      ? props.techSpecsMobTabletFontSize
      : props.techSpecsDesktopFontSize
  );
  const [isHover, setIsHover] = useState(false);

  useEffect(() => {
    setProduct(context.product);

    setLoading(context.loading);
  }, [context]);

  useEffect(() => {
    window.addEventListener("resize", handleResize);
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("scroll", handleScroll);
    };
  }, [openSearchBar]);

  useEffect(() => {
    if (product) {
      setLastProduct(product.productId);
      if (lastProduct != product.productId && linksLoaded) {
        linksLoaded = false;
      }

      if (!linksLoaded) {
        const mdBlockMovie =
          document.querySelector("#video") ||
          document.querySelector(".md-block-movie");
        const mdSpecification =
          document.querySelector("#specs") ||
          document.querySelector(".md-specification");
        if (mdBlockMovie) {
          linksLoaded = true;
          setShowVideoLink(true);
        }

        if (mdSpecification) {
          linksLoaded = true;
          setShowSpecLink(true);
        }
      }
    }
  });

  useEffect(() => {
    if (window.location.pathname === "/warranty") {
      setMinicartComponent(
        <ExtensionPoint
          id="minicart.v2"
          linkButtonFinishShopping="/checkout/#/cart"
        />
      );
    } else {
      setMinicartComponent(
        <ExtensionPoint id="minicart.v2" linkButtonFinishShopping="/warranty" />
      );
    }
  }, []);

  useEffect(() => {
    /**
     * Close search bar if it is clicked outside of the search bar
     */
    function handleClickOutside(event) {
      if (
        wrapperRef.current &&
        !wrapperRef.current.contains(event.target) &&
        openSearchBar
      ) {
        setOpenSearchBar(false);
      }
    }

    // Bind the event listener
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      // Unbind the event listener on clean up
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [wrapperRef, openSearchBar]);

  const buyButton = () => {
    if (product.specificationGroups) {
      const buyButtonGroup = product.specificationGroups.find(
        group => group.name === "BuyButton"
      );
      if (!path(["specifications"], buyButtonGroup))
        return {
          buyButtonGroupLength: 0
        };
      const storeName = buyButtonGroup.specifications.find(
        spec => spec.name === "Buy button store name"
      );
      const storeUrl = buyButtonGroup.specifications.find(
        spec => spec.name === "Buy button store URL"
      );
      const hideBuyNowButton = buyButtonGroup.specifications.find(
        spec => spec.name === "hideBuyNowButton"
      );
      const buyNowButtonTitle = buyButtonGroup.specifications.find(
        spec => spec.name === "buyNowButtonTitle"
      );
      const buyNowButtonBackgroundColor = buyButtonGroup.specifications.find(
        spec => spec.name === "buyNowButtonBackgroundColor"
      );
      const buyNowButtonHoverColor = buyButtonGroup.specifications.find(
        spec => spec.name === "buyNowButtonHoverColor"
      );
      const buyNowButtonTextColor = buyButtonGroup.specifications.find(
        spec => spec.name === "buyNowButtonTextColor"
      );
      return {
        buyButtonGroupLength: 1,
        storeName: path(["values", "0"], storeName),
        storeUrl: path(["values", "0"], storeUrl),
        hideBuyNowButton: path(["values", "0"], hideBuyNowButton) || false,
        buyNowButtonTitle: path(["values", "0"], buyNowButtonTitle),
        buyNowButtonBackgroundColor: path(
          ["values", "0"],
          buyNowButtonBackgroundColor
        ),
        buyNowButtonHoverColor: path(["values", "0"], buyNowButtonHoverColor),
        buyNowButtonTextColor: path(["values", "0"], buyNowButtonTextColor)
      };
    }
    return {};
  };

  const handleResize = event => {
    setWindowWith(window.innerWidth);
    setIsMobile(window.innerWidth <= 991 ? true : false);
    setTechSpecsFontSize(
      window.innerWidth <= 991
        ? props.techSpecsMobTabletFontSize
        : props.techSpecsDesktopFontSize
    );
  };

  const handleScroll = event => {
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
    if (openSearchBar) {
      setOpenSearchBar(false);
    }
  };

  const toggleSideDrawer = () => {
    setSideDrawerOpen(!sideDrawerOpen);
  };

  const toggleSearchBar = () => {
    setOpenSearchBar(!openSearchBar);
  };

  const specificationGroups = () => {
    const groups = path(["specificationGroups"], product) || [];
    return groups;
  };

  const heroBlock = () => {
    if (specificationGroups()) {
      const hero = specificationGroups().find(item => item.name === "Blocks");
      return path(["specifications"], hero);
    }
  };

  const pdpLayout = () => {
    if (heroBlock()) {
      const item = heroBlock().find(
        item => item.name === "PDP Layout"
      );

      return path(["values", "0"], item);
    }
  };

  const logoImage = () => {
    if (heroBlock()) {
      const logo = heroBlock().find(item => item.name === "Logo PDP");
      return path(["values", "0"], logo);
    }
  };

  const watchVideoTitle = () => {
    if (heroBlock()) {
      const data = heroBlock().find(item => item.name === "watchVideoTitle");
      return (
        path(["values", "0"], data) || (
          <FormattedMessage id="store/header.watch-video-link" />
        )
      );
    }
  };

  const watchVideoFontColor = () => {
    if (heroBlock()) {
      const data = heroBlock().find(
        item => item.name === "watchVideoFontColor"
      );
      return path(["values", "0"], data);
    }
  };

  const watchVideoFontLinkId = () => {
    if (heroBlock()) {
      const data = heroBlock().find(
        item => item.name === "watchVideoFontLinkId"
      );
      return path(["values", "0"], data) || "video";
    }
  };

  const targetWindow = () => {
    if (heroBlock()) {
      const targetWindow = heroBlock().find(
        item => item.name === "Target_window"
      );
      return path(["values", "0"], targetWindow) || "_blank";
    }
  };

  const goToVideo = e => {
    e.preventDefault();
    let top = -60;
    if (isMobile) {
      top = -110;
    }
    if (document.querySelector("#" + watchVideoFontLinkId())) {
      scroll.scrollTo(watchVideoFontLinkId(), {
        smooth: true,
        offset: top,
        duration: 300
      });
    } else {
      scroll.scrollTo("md-block-movie", {
        smooth: true,
        offset: top,
        duration: 300
      });
    }
  };

  const goToSpecs = e => {
    e.preventDefault();
    let top = -60;
    if (isMobile) {
      top = -110;
    }
    let techSpecsId = props.techSpecsLinkId ? props.techSpecsLinkId : "specs";
    if (document.querySelector("#" + techSpecsId)) {
      scroll.scrollTo(techSpecsId, {
        smooth: true,
        offset: top,
        duration: 300
      });
    } else {
      scroll.scrollTo("md-specification", {
        smooth: true,
        offset: top,
        duration: 300
      });
    }
  };

  const goToHeroBlock = e => {
    e.preventDefault();
    let top = -60;
    if (isMobile) {
      top = -110;
    }
    scroll.scrollTo("product-details", {
      smooth: true,
      offset: top,
      duration: 300
    });
    setIsHover(false);
  };

  useEffect(() => {
    let pattern = "/checkout/orderPlaced/*";
    let result = window.location.pathname.match(pattern);
    if (!result) {
      var meta = document.createElement("meta");
      meta.name = "google-site-verification";
      meta.content = "6efewY65m1asqEDWKACzapPekqaHkUYOLwBkozsRvDs";
      document.getElementsByTagName("head")[0].appendChild(meta);
    }
  }, []);

  const toggleHover = () => {
    if (!isHover) setIsHover(true);
    else setIsHover(false);
  };

  const linkStyle = () => {
    if (isHover) {
      return {
        backgroundColor: buyButton().buyNowButtonHoverColor
          ? buyButton().buyNowButtonHoverColor
          : "#BA1C15",
        borderColor:
          "1px solid " + buyButton().buyNowButtonHoverColor
            ? buyButton().buyNowButtonHoverColor
            : "#BA1C15",
        color: buyButton().buyNowButtonTextColor
          ? buyButton().buyNowButtonTextColor
          : "#FFFFFF"
      };
    } else {
      return {
        backgroundColor: buyButton().buyNowButtonBackgroundColor
          ? buyButton().buyNowButtonBackgroundColor
          : "#CF4039",
        borderColor:
          "1px solid " + buyButton().buyNowButtonBackgroundColor
            ? buyButton().buyNowButtonBackgroundColor
            : "#CF4039",
        color: buyButton().buyNowButtonTextColor
          ? buyButton().buyNowButtonTextColor
          : "#FFFFFF"
      };
    }
  };

  const hasSellerWithAvailableItems = item => {
    return (
      item.sellers &&
      any(
        s => s.commertialOffer && s.commertialOffer.AvailableQuantity > 0,
        item.sellers
      )
    );
  };

  const selectedItem = () => {
    const items = path(["items"], product) || [];
    if (!props.query || !props.query.skuId) {
      return items.find(hasSellerWithAvailableItems) || items[0];
    }
    return items.find(sku => sku.itemId === props.query.skuId);
  };

  return (
    <Fragment>
      <ExtensionPoint isPageHeader={isPageHeader} id="notification-bar" />
      {!isPageHeader ? (
        <div
          className={
            isPageHeader
              ? "main-header-container hide"
              : "main-header-container"
          }
        >
          <ExtensionPoint id="telemarketing" />
          <ExtensionPoint id="subnav" />
          <header ref={header} className="main-header">
            <div className="container">
              <div className="header-inner">
                <MenuToggle click={toggleSideDrawer} active={sideDrawerOpen} />
                <div className="logo-container">
                  <Link page="store.home">
                    <div className="logo" />
                  </Link>
                </div>
                <nav className="main-nav">
                  <div className="nav-inner">
                    <ExtensionPoint
                      id="navbar"
                      showSocialIcons={props.showSocialIcons}
                    />
                  </div>
                </nav>
                {props.showLogin && (
                  <div className="header-icon">
                    <ExtensionPoint id="login" />
                    <EmployeeDiscount></EmployeeDiscount>
                  </div>
                )}
                {props.showLocale && (
                  <div className="header-icon">
                    <LocaleSwitcher />
                  </div>
                )}

                <div className="header-icon">
                  <div className="relative fr flex items-center">
                    <button tabIndex="0" className="vtex-button vtex-button-search-moto bw1 ba fw5 v-mid relative pa0 lh-solid br2 min-h-regular t-action icon-button dib bg-transparent b--transparent c-action-primary hover-b--transparent hover-bg-action-secondary hover-b--action-secondary pointer " type="button" onClick={toggleSearchBar} aria-label={props.searchButtonAriaLabel && props.searchButtonAriaLabel != '' ? props.searchButtonAriaLabel : 'Search'}>
                      <div className="vtex-button__label vtex-button-search-moto-label flex items-center justify-center h-100 ph4 ">
                        <span className="flex items-center">
                          <span className="relative gray">
                            <IconSearch />
                          </span>
                          {
                            openSearchBar &&
                            <img alt="Search Arrow" src={searchArrow} className="search-container-arrow"></img>
                          }
                        </span>
                      </div>
                    </button>
                  </div>
                </div>
                {props.showCart && (
                  <div className="header-icon">{minicartComponent}</div>
                )}

                <ExtensionPoint id="foc" />
              </div>
              {openSearchBar && (
                <div ref={wrapperRef} className="search-container">
                  <div className="search-bar open-search-bar">
                    <ExtensionPoint id="search-bar" />
                  </div>
                </div>
              )}
            </div>
          </header>
          <aside
            className={
              sideDrawerOpen ? "sidedrawer open-sidedrawer" : "sidedrawer"
            }
          >
            <ExtensionPoint
              id="navbar"
              isMobile={true}
              showSocialIcons={props.showSocialIcons}
              setSideDrawerOpen={() => setSideDrawerOpen(false)}
            />
            <ExtensionPoint id="subnav" isMobile={true} />
            <SocialIcons />
          </aside>
        </div>
      ) : (
        product && !(pdpLayout() === 'Rogue') && (
          <header
            className={isPageHeader ? "product-page show" : "product-page"}
          >
            <div className="container product-page-container">
              <div onClick={goToHeroBlock} className="product-name-container">
                {logoImage() ? (
                  <img src={logoImage()} alt="Logo" />
                ) : (
                  <ExtensionPoint id="product-name" />
                )}
              </div>
              <div className="product-price-container">
                {!buyButton().storeName && !buyButton().storeUrl ? (
                  <ExtensionPoint id="product-price" />
                ) : null}
              </div>
              <div className="product-links-container desktop-links-container">
                {showVideoLink && (
                  <a
                    onClick={e => goToVideo(e)}
                    href="#"
                    style={{
                      fontSize: techSpecsFontSize
                        ? techSpecsFontSize + "px"
                        : "14px",
                      color: watchVideoFontColor()
                        ? watchVideoFontColor()
                        : "#000000"
                    }}
                  >
                    {watchVideoTitle()}
                  </a>
                )}
                {showSpecLink && (
                  <a
                    onClick={e => goToSpecs(e)}
                    href="#"
                    style={{
                      fontSize: techSpecsFontSize
                        ? techSpecsFontSize + "px"
                        : "14px",
                      color: props.techSpecsFontColor
                        ? props.techSpecsFontColor
                        : "#000000"
                    }}
                  >
                    {props.techSpecsTitle ? (
                      props.techSpecsTitle
                    ) : (
                      <FormattedMessage id="store/header.view-tech-specs-link" />
                    )}
                  </a>
                )}
              </div>
              <div
                className={`buy-button-container ${selectedItem() &&
                  selectedItem().sellers[0].commertialOffer.Price > 0 && selectedItem().sellers[0].commertialOffer.AvailableQuantity > 0
                  ? ""
                  : "hide-button"
                  }`}
              >
                {buyButton().buyButtonGroupLength == 0 ? (
                  <a onClick={e => goToHeroBlock(e)} href="#">
                    <div className="flex items-center justify-center h-100 pv2 ph6 w-100 border-box">
                      <FormattedMessage id="store/sticky-nav.buy-now" />
                    </div>
                  </a>
                ) : (!buyButton().hideBuyNowButton &&
                  buyButton().buyNowButtonTitle) ||
                  (!buyButton().hideBuyNowButton &&
                    buyButton().buyNowButtonTitle &&
                    buyButton().storeUrl) ? (
                  <a
                    href={buyButton().storeUrl ? buyButton().storeUrl : "#"}
                    target={targetWindow()}
                    style={linkStyle()}
                    onMouseEnter={toggleHover}
                    onMouseLeave={toggleHover}
                    onClick={
                      buyButton().storeUrl ? null : e => goToHeroBlock(e)
                    }
                  >
                    {buyButton().buyNowButtonTitle}
                  </a>
                ) : (
                  <a onClick={e => goToHeroBlock(e)} href="#">
                    <div className="flex items-center justify-center h-100 pv2 ph6 w-100 border-box ">
                      <FormattedMessage id="store/sticky-nav.buy-now" />
                    </div>
                  </a>
                )}
              </div>
              <div className="product-links-container mobile-links-container">
                {showVideoLink && (
                  <a
                    onClick={e => goToVideo(e)}
                    href="#"
                    style={{
                      fontSize: techSpecsFontSize
                        ? techSpecsFontSize + "px"
                        : "14px",
                      color: watchVideoFontColor()
                        ? watchVideoFontColor()
                        : "#000000"
                    }}
                  >
                    {watchVideoTitle()}
                  </a>
                )}
                {showSpecLink && (
                  <a
                    onClick={e => goToSpecs(e)}
                    href="#"
                    style={{
                      fontSize: techSpecsFontSize
                        ? techSpecsFontSize + "px"
                        : "14px",
                      color: props.techSpecsFontColor
                        ? props.techSpecsFontColor
                        : "#000000"
                    }}
                  >
                    {props.techSpecsTitle ? (
                      props.techSpecsTitle
                    ) : (
                      <FormattedMessage id="store/header.view-tech-specs-link" />
                    )}
                  </a>
                )}
              </div>
            </div>
          </header>
        )
      )}
      {context.product ? (
        <InPageNav
          productId={context.product.productId}
          reduceTopPadding={isPageHeader}
        />
      ) : null}
      <MiniCartEventComponent></MiniCartEventComponent>
    </Fragment>
  );
};

Header.schema = {
  title: "Header",
  description: "Main header",
  type: "object",
  properties: {
    showLogin: {
      default: true,
      type: "boolean",
      title: "Show Login Box?"
    },
    showCart: {
      default: true,
      type: "boolean",
      title: "Show Cart Box?"
    },
    showSocialIcons: {
      default: true,
      type: "boolean",
      title: "Show social icons?"
    },
    showLocale: {
      default: false,
      type: "boolean",
      title: "Show Locale Selector?"
    },
    techSpecsTitle: {
      default: "View tech specs",
      title: "Tech specs title",
      type: "string"
    },
    techSpecsMobTabletFontSize: {
      default: 13,
      title: "Tech specs mobile tablet font size",
      type: "string",
      description: "Ex: 13, 14"
    },
    techSpecsDesktopFontSize: {
      default: 14,
      title: "Tech specs desktop font size",
      type: "string",
      description: "Ex: 14, 16"
    },
    techSpecsFontColor: {
      default: "#000000",
      title: "Tech specs font color",
      type: "string",
      description: "Ex: #000000"
    },
    techSpecsLinkId: {
      default: "specs",
      title: "Tech specs link id",
      type: "string",
      description: "Ex: specs"
    },
    searchButtonAriaLabel: {
      default: "search",
      title: "ARIA Label for Search Button icon",
      type: "string"
    }
  }
};

export default Header;
