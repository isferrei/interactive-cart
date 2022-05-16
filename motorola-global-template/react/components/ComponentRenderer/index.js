import React, { useState, Suspense, useLayoutEffect } from "react";
import { path } from "ramda";
import { Spinner } from "vtex.styleguide";
import { stringToCardMapper } from "./components/ComponentMap.js";
import { useProduct } from "vtex.product-context";
import { commonProductLogic } from "./components/CommonProductLogic/index";

import "./common/css/slick.global.css";
import "./common/css/slick-theme.global.css";

const ComponentRenderer = () => {
  const context = useProduct();
  const [productData, setProductData] = useState({});
  useLayoutEffect(() => {
    var pdpContentText;
    const pdpContentData = path(["product", "properties"], context);

    commonProductLogic(context);
    if (pdpContentData) {
      pdpContentText = pdpContentData.find(pdpContentItem => {
        var urlParams = new URLSearchParams(window.location.search);
        if (
          !localStorage.getItem("usLocaleInfo") ||
          localStorage.getItem("usLocaleInfo") == "NA"
        ) {
          if (urlParams.has("locale")) {
            if (urlParams.get("locale") == "es-US") {
              localStorage.setItem("usLocaleInfo", "es-US");
            } else {
              localStorage.setItem("usLocaleInfo", "NA");
            }
          } else {
            localStorage.setItem("usLocaleInfo", "NA");
          }
        } else if (
          localStorage.getItem("usLocaleInfo") !== "NA" &&
          urlParams.has("locale") &&
          localStorage.getItem("usLocaleInfo") == "es-US" &&
          urlParams.get("locale") !== "es-US"
        ) {
          localStorage.setItem("usLocaleInfo", "NA");
        }
        let pdpContentReturn =
          localStorage.getItem("usLocaleInfo") == "NA"
            ? "PdpContent"
            : "PdpContent-Spanish";

        return pdpContentItem.name === pdpContentReturn;
      });
    }

    if (pdpContentText) {
      if (pdpContentText.values) {
        setProductData(JSON.parse(pdpContentText.values));
      }
    }
  }, [context]);

  if (Object.keys(productData).length > 0) {
    return (
      <div className="basic-cards">
        {productData.map((output, i) => {
          const cardToBePicked =
            output && output.card_name && stringToCardMapper[output.card_name];
          if (cardToBePicked) {
            return (
              <CallComponent
                key={`${output.card_name}-${i}`}
                renderComponent={cardToBePicked}
                i={i}
                componentData={output.contents}
              ></CallComponent>
            );
          }
          return <></>;
        })}
      </div>
    );
  } else {
    return <></>;
  }
};

function CallComponent({ renderComponent, i, componentData }) {
  const ComponentName = renderComponent;
  return (
    <Suspense
      key={i}
      fallback={
        <center>
          <Spinner />
        </center>
      }
    >
    {/* Using prop destruction here as a new way to pass props to the new components */}
      <ComponentName key={i} data={componentData} {...componentData} indexProp={i} />
    </Suspense>
  );
}
export default ComponentRenderer;
