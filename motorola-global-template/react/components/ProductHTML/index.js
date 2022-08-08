import { useEffect, useState, useLayoutEffect } from "react";
import { path } from "ramda";
import description from "./assets/description.js";
import "./assets/description.global.css";
import "./assets/slick.global.css";
import { useProduct } from "vtex.product-context";
import { Spinner } from "vtex.styleguide";

const ProductHTML = props => {
  const [loading, setLoading] = useState(true);
  const [product, setProduct] = useState({});
  const [htmlBlock, setHtmlBlock] = useState({});
  const [loadedHtml, setLoadedHtml] = useState(false);
  const context = useProduct();

  useLayoutEffect(() => {
    setProduct(context.product);

    setLoading(context.loading);
  }, [context]);

  useLayoutEffect(() => {
    setHtmlBlock({});
    setTimeout(() => {
      const specificationGroups = path(
        ["product", "specificationGroups"],
        context
      );

      const pdpContentBlock = path(["product", "properties"], context);

      if (pdpContentBlock) {
        var pdpContentText = pdpContentBlock.find(pdpContentItem => {
          return pdpContentItem.name === "PdpContent";
        });
      }

      if (pdpContentText) {
        if (pdpContentText.values) {
          return;
        }
      }
      description.exec();
      if (!specificationGroups) return;
      const blocks = specificationGroups.find(specificationGroup => {
        return specificationGroup.name === "Blocks";
      });
      if (!blocks) return;

      const overviewCard = path(["specifications"], blocks);
      if (!overviewCard) return;

      const foundHtmlBlock = overviewCard.find(
        block => block.name === "Overview Card"
      );
      // setLoadedHtml(true);
      if (!foundHtmlBlock) return;
      setHtmlBlock(foundHtmlBlock ? foundHtmlBlock.values[0] : {});
    }, 800);
  }, [product]);

  return (
    <React.Fragment>
      {Object.keys(htmlBlock).length ? (
        <div dangerouslySetInnerHTML={{ __html: htmlBlock }} />
      ) : null}
    </React.Fragment>
  );
};

export default ProductHTML;
