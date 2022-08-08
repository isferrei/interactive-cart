import React, { Fragment, useState, useEffect, useRef } from "react";
import MotoProductSummary from "../MotoProductSummary";
import { Spinner } from "vtex.styleguide";
import { useIsVisible } from "./useIsVisible";

const Shelf = props => {
  const {
    filterQuery,
    getCompare,
    compareList,
    compareTitle,
    products,
    layout,
    spinner,
    shelfTitle
  } = props;

  const [result, setResult] = useState(products);

  useEffect(() => {
    if (props.filterQuery.length === 0) {
      setResult(products);
    } else {
      filterData();
    }
  }, [props]);

  const multiFilter = (products, filters) => {
    let newProducts = [];
    let data;
    products.forEach(p => {
      filters.map(f => {
        let value = f.split(":").pop();
        let name = f
          .split("+")
          .pop()
          .split(":")[0];
        switch (true) {
          case f.includes("category"):
            data = p.categoryTree.find(y => y.name === value);
            if (data != undefined && !newProducts.includes(p))
              newProducts.push(p);
            break;
          case f.includes("customVariations"):
            data = p.customVariations.find(
              y => y.name === name && y.values.includes(value)
            );
            if (data != undefined && !newProducts.includes(p))
              newProducts.push(p);
            break;
          case f.includes("customSpecs"):
            data = p.customSpecs.find(
              y => y.name === name && y.values[0].split(",")[0] === value
            );
            if (data != undefined && !newProducts.includes(p))
              newProducts.push(p);
            break;
          default:
            console.log("default filter switch");
        }
      });
    });
    setResult(newProducts);
  };

  const filterData = () => {
    products.map(e => {
      let item = e.items.find(i => i.sellers[0].commertialOffer.Price > 0);
      let availableItem = item ? e.items.indexOf(item) : 0;
      e["customVariations"] = e.items[availableItem].variations;
      e["customSpecs"] = e.specificationGroups.find(
        g => g.name === "allSpecifications"
      ).specifications;
    });
    setResult("");
    multiFilter(products, filterQuery);
  };
  const newref = useRef();
  const visible = useIsVisible({ element: newref });
  if (document.getElementById("fixed-filter-sort-by-mobile")) {
    if (visible) {
      document.getElementById("fixed-filter-sort-by-mobile").style.display =
        "block";
    } else {
      document.getElementById("fixed-filter-sort-by-mobile").style.display =
        "none";
    }
   }
  
  return (
    <Fragment>
      <div id="collection-card" className="collection-cards" ref={newref}>
        <div className="shelf-title">
          <h1>{shelfTitle}</h1>
        </div>
        {spinner && (
          <div className="loading">
            <center>
              <Spinner />
            </center>
          </div>
        )}
        {!spinner &&
          result &&
          result.map((product, key) => (
            <Fragment key={key}>
              <MotoProductSummary
                productName={product.productName || ""}
                description={product.description || ""}
                linkText={product.linkText || ""}
                items={product.items || {}}
                specificationGroups={product.specificationGroups || {}}
                key={key + "-0"}
                id={product.cacheId || ""}
                getCompare={getCompare}
                list={compareList}
                compareTitle={compareTitle}
                layout={layout}
              />
            </Fragment>
          ))}
      </div>
    </Fragment>
  );
};

export default Shelf;
