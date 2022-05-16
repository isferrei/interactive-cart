import React from "react";
import "./index.global.css";

const Loading = props => {
  const { type, items } = props;
  switch (type) {
    case "search":
      return (
        <div className="loading-container">
          <div className="loading-filters loading" />
          <div className="loading-products">
            <div className="product-loading loading">&nbsp;</div>
            <div className="product-loading loading">&nbsp;</div>
            <div className="product-loading loading">&nbsp;</div>
            <div className="product-loading loading">&nbsp;</div>
            <div className="product-loading loading">&nbsp;</div>

            <div className="product-loading loading">&nbsp;</div>
            <div className="product-loading loading">&nbsp;</div>
            <div className="product-loading loading">&nbsp;</div>
            <div className="product-loading loading">&nbsp;</div>
            <div className="product-loading loading">&nbsp;</div>
          </div>
        </div>
      );
      break;
    case "banner":
      return (
        <div className="loading-container">
          <div className="loading-products">
            <div className="banner-loading loading">&nbsp;</div>
            <div className="banner-loading loading">&nbsp;</div>
          </div>
        </div>
      );
      break;
    case "category":
      return (
        <div className="loading-container">
          <div className="loading-filters loading" />
          <div className="loading-products">
            <div className="product-loading loading">&nbsp;</div>
            <div className="product-loading loading">&nbsp;</div>
            <div className="product-loading loading">&nbsp;</div>
            <div className="product-loading loading">&nbsp;</div>
            <div className="product-loading loading">&nbsp;</div>

            <div className="product-loading loading">&nbsp;</div>
            <div className="product-loading loading">&nbsp;</div>
            <div className="product-loading loading">&nbsp;</div>
            <div className="product-loading loading">&nbsp;</div>
            <div className="product-loading loading">&nbsp;</div>
          </div>
        </div>
      );
      break;
    case "single-item":
      return (
        <div className="loading-container">
          <div className="single-item-loading loading">&nbsp;</div>
        </div>
      );
      break;
    default:
      return (
        <div className="loading-container">
          <div className="loading-filters loading" />
          <div className="loading-products">
            <div className="product-loading loading">&nbsp;</div>
            <div className="product-loading loading">&nbsp;</div>
            <div className="product-loading loading">&nbsp;</div>
            <div className="product-loading loading">&nbsp;</div>
            <div className="product-loading loading">&nbsp;</div>

            <div className="product-loading loading">&nbsp;</div>
            <div className="product-loading loading">&nbsp;</div>
            <div className="product-loading loading">&nbsp;</div>
            <div className="product-loading loading">&nbsp;</div>
            <div className="product-loading loading">&nbsp;</div>
          </div>
        </div>
      );
  }
};

export default Loading;
