import React from "react";
import { useProduct } from "vtex.product-context";
import InPageNav from "./InPageNav";
import LazyLoad from 'react-lazyload';

const inPageNavData = props => {
  const context = useProduct().product.properties;
  let Navdata;
  if (context) {
    Navdata = context.filter(value => {
      return value.name == "InPageNav";
    });
  } else {
    return null;
  }

  if (Navdata.length === 0) {
    return null;
  } else {
    Navdata = JSON.parse(Navdata[0].values[0]);
    return (
    <LazyLoad
      offset={-30}
      once
      throttle={300}
    >
      <InPageNav
        data={Navdata}
        productId={props.productId}
        reduceTopPadding={props.reduceTopPadding}
      />
      </LazyLoad>
    );
  }
};

export default inPageNavData;
