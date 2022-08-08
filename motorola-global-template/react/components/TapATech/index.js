import React, { useState, useEffect, useRef } from "react";
import { useProduct } from "vtex.product-context";
import { path } from "ramda";
import { getRootPath } from "../../utils/helpers";
import "./TapATech.global.css";

const TapATech = props => {
  const [product, setProduct] = useState({});
  const context = useProduct();
  const [queryParams, setQueryParams] = useState("");
  const queryRef = useRef(queryParams);
  const [showTapATech, setShowTapATech] = useState("FALSE");
  const showTapATechRef = useRef(showTapATech);

  const specificationGroups = () => {
    const groups = path(["specificationGroups"], product) || [];
    return groups;
  };

  const tapATechBlock = () => {
    if (specificationGroups()) {
      const tapATech = specificationGroups().find(
        item => item.name === "Blocks"
      );
      return path(["specifications"], tapATech);
    }
  };

  useEffect(() => {
    setProduct(context.product);

    if (typeof tapATechBlock() !== "undefined") {
      const showTapATechWidget = tapATechBlock().find(
        item => item.name === "Load Tap a Tech Widget"
      );

      let showTapATechWidgetFlag =
        path(["values", "0"], showTapATechWidget) || "FALSE";

      setShowTapATech(showTapATechWidgetFlag);

      setTimeout(() => {
        if (showTapATechRef.current === "TRUE") {
          tapATechWidget(props.query.skuId, context.product);
        } else {
          let tapATechobj = document.getElementById("MVSWD_widget");
          if (tapATechobj) {
            tapATechobj.remove();
          }

          let tapATechScript = document.querySelector(
            `script[src="${props.tapATechSrcUrl}"]`
          );
          if (tapATechScript) {
            tapATechScript.remove();
          }
        }
      }, 1000);

      // Listen to tap-a-tech events.
      // Events ADD_TO_CART, ADD_TO_CART_AND_REDIRECT.
      // Events FEEDBACK_SUBMITTED,FEEDBACK_CLOSED.
      if (window.addEventListener) {
        window.addEventListener("message", handleEvent, false);
      } else if (window.attachEvent) {
        window.attachEvent("onmessage", handleEvent, false);
      }

      return () => {
        // Anything in here is fired on component unmount.
        if (window.removeEventListener) {
          window.removeEventListener("message", handleEvent);
        } else if (window.detachEvent) {
          window.detachEvent("onmessage", handleEvent);
        }
      };
    } else {
      let tapATechobj = document.getElementById("MVSWD_widget");
      if (tapATechobj) {
        tapATechobj.remove();
      }

      let tapATechScript = document.querySelector(
        `script[src="${props.tapATechSrcUrl}"]`
      );
      if (tapATechScript) {
        tapATechScript.remove();
      }
    }
  }, [context]);

  useEffect(() => {
    queryRef.current = queryParams;
  }, [queryParams]);

  useEffect(() => {
    showTapATechRef.current = showTapATech;
  }, [showTapATech]);

  const detectLocation = location => {
    let regex = /\/p$/i;
    let text = location.pathname;
    let matches = text.toString().match(regex);

    // Not a pdp.
    if (matches == null) {
      let tapATechobj = document.getElementById("MVSWD_widget");
      if (tapATechobj) {
        tapATechobj.remove();
      }

      let tapATechScript = document.querySelector(
        `script[src="${props.tapATechSrcUrl}"]`
      );
      if (tapATechScript) {
        tapATechScript.remove();
      }
    }
  };

  useEffect(() => {
    detectLocation(window.location);
    return () => {
      detectLocation(window.location);
    };
  }, [window.location]);

  const handleEvent = event => {
    if (
      typeof event.data !== "undefined" &&
      typeof event.data.action !== "undefined" &&
      (event.data.action === "ADD_TO_CART" ||
        event.data.action === "ADD_TO_CART_AND_REDIRECT" ||
        event.data.action === "FEEDBACK_SUBMITTED" ||
        event.data.action === "FEEDBACK_CLOSED")
    ) {
      event.stopImmediatePropagation();
      let redirectURL;

      let queryParamsFromAllSessions = localStorage.getItem(
        "queryParamsFromAllSessions"
      );
      let tmpStore = queryParamsFromAllSessions;

      let queryParamsFromAllSessionsForGtm = localStorage.getItem(
        "queryParamsFromAllSessionsForGtm"
      );
      let tmpStoreGtm = queryParamsFromAllSessionsForGtm;

      switch (event.data.action) {
        case "ADD_TO_CART":
          formQueryParams(event.data);
          if (typeof addToCartTapATech == "function") {
            addToCartTapATech(event.data.sku);
          }
          break;
        case "ADD_TO_CART_AND_REDIRECT":
          // If to retain data only for a pdp and not for all sessions.
          // use queryRef.current instead of tmpStore with timeout 500.
          if (tmpStoreGtm == null && typeof feedBackClosed == "function") {
            feedBackClosed("No-product-to-add-to-cart");
          }

          if (
            tmpStoreGtm !== null &&
            typeof addTocartAndRedirect == "function"
          ) {
            localStorage.removeItem("queryParamsFromAllSessionsForGtm");
            addTocartAndRedirect(tmpStoreGtm);
          }
          if (tmpStore !== null) {
            localStorage.removeItem("queryParamsFromAllSessions");
            redirectURL = `${getRootPath}/checkout/cart/add/?${tmpStore}`;
            window.location.replace(redirectURL);
          }
          break;
        case "FEEDBACK_SUBMITTED":
          // If to retain data only for a pdp and not for all sessions.
          // use queryRef.current instead of tmpStore with timeout 500.
          if (tmpStoreGtm == null && typeof feedBackClosed == "function") {
            feedBackClosed("With-feedback|no-product-to-add-to-cart");
          }

          if (
            tmpStoreGtm !== null &&
            typeof addTocartAndRedirect == "function"
          ) {
            localStorage.removeItem("queryParamsFromAllSessionsForGtm");
            addTocartAndRedirect(tmpStoreGtm);
          }
          if (tmpStore !== null) {
            localStorage.removeItem("queryParamsFromAllSessions");
            redirectURL = `${getRootPath}/checkout/cart/add/?${tmpStore}`;
            window.location.replace(redirectURL);
          }
          break;
        case "FEEDBACK_CLOSED":
          if (tmpStoreGtm == null && typeof feedBackClosed == "function") {
            feedBackClosed("Without-feedback|no-product-to-add-to-cart");
          }

          if (
            tmpStoreGtm !== null &&
            typeof addTocartAndRedirect == "function"
          ) {
            localStorage.removeItem("queryParamsFromAllSessionsForGtm");
            addTocartAndRedirect(tmpStoreGtm);
          }
          if (tmpStore !== null) {
            localStorage.removeItem("queryParamsFromAllSessions");
            redirectURL = `${getRootPath}/checkout/cart/add/?${tmpStore}`;
            window.location.replace(redirectURL);
          }
          break;
        default:
          return;
      }
    }
  };

  const formQueryParams = productSelectedData => {
    if (typeof productSelectedData.sku !== "undefined") {
      let sku = productSelectedData.sku;
      let seller = 1;
      let qty = 1;
      let sc = 1;

      // Useful if we want to retain data only for a PDP.
      // and not for all the sessions.
      let queryParameters =
        queryRef.current === ""
          ? `sku=${sku}&qty=${qty}&seller=${seller}&sc=${sc}`
          : `${queryRef.current}&sku=${sku}&qty=${qty}&seller=${seller}&sc=${sc}`;

      // Set localstorage here.
      let queryParamsFromAllSessions = localStorage.getItem(
        "queryParamsFromAllSessions"
      );
      if (queryParamsFromAllSessions == null) {
        localStorage.setItem("queryParamsFromAllSessions", queryParameters);
      } else {
        localStorage.setItem(
          "queryParamsFromAllSessions",
          queryParamsFromAllSessions +
            `&sku=${sku}&qty=${qty}&seller=${seller}&sc=${sc}`
        );
      }

      // Set localstorage for gtm tracking.
      let queryParamsFromAllSessionsForGtm = localStorage.getItem(
        "queryParamsFromAllSessionsForGtm"
      );
      if (queryParamsFromAllSessionsForGtm == null) {
        localStorage.setItem("queryParamsFromAllSessionsForGtm", sku);
      } else {
        localStorage.setItem(
          "queryParamsFromAllSessionsForGtm",
          queryParamsFromAllSessionsForGtm + `|${sku}`
        );
      }

      // Useful if we want to retain data only for a PDP.
      // and not for all the sessions.
      setQueryParams(queryParameters);
    }
  };

  const tapATechWidget = (skuId, product) => {
    let elementExists = document.getElementById("MVSWD_widget");
    if (typeof elementExists !== "undefined" && elementExists !== null) {
      // Exists.
      let tapATechScript = document.querySelector(
        `script[src="${props.tapATechSrcUrl}"]`
      );
      tapATechScript.setAttribute(
        "sku",
        skuId !== undefined
          ? skuId
          : product.items[0].itemId
          ? product.items[0].itemId
          : null
      );
    } else {
      // Doesn't exist.
      let div = document.createElement("div");
      div.id = "MVSWD_widget";
      document.body.appendChild(div);

      let el = document.createElement("script");
      el.type = "text/javascript";
      el.src = props.tapATechSrcUrl
        ? props.tapATechSrcUrl
        : "https://www.tap-a-tech.com/motorola-widget/public/scripts/bundle.js";

      el.setAttribute(
        "sku",
        skuId !== undefined
          ? skuId
          : product.items[0].itemId
          ? product.items[0].itemId
          : null
      );
      el.setAttribute("retailerId", props.tapATechRetailerId);
      document.body.appendChild(el);
    }
  };

  return <></>;
};

TapATech.schema = {
  title: "Tap a Tech",
  description: "Tap a Tech account level settings",
  type: "object",
  properties: {
    tapATechRetailerId: {
      default: "",
      title: "Tap a Tech Retailer Id",
      type: "string",
      description: "For testing use: 49c01128-9f6b-4f6c-9bb5-3be2384dd10c"
    },
    tapATechSrcUrl: {
      default:
        "https://www.tap-a-tech.com/motorola-widget/public/scripts/bundle.js",
      title: "Tap a Tech Src Url",
      type: "string",
      description:
        "For testing use: https://web-staging.tap-a-tech.com/moto_widget/public/scripts/bundle.js?version=v1"
    }
  }
};

export default TapATech;
