import React, { useEffect, useState } from "react";
import { graphql, compose, withApollo } from "react-apollo";
import axios from "axios";
import Loading from "../Loading";
import { orderForm } from "vtex.store-resources/Queries";
import { updateItems, addToCart } from "vtex.store-resources/Mutations";
import { withRuntimeContext } from "vtex.render-runtime";
import { getRootPath } from "../../utils/helpers";
const Esp = props => {
  // Workflow component:
  // Access /esp route passing params
  // useEffect function when loading orderForm, call function to get skuId by refId
  // useEffect in state skuId, call updateOrderForm function to clear old orderForm and set new sku
  // in updateOrderForm function, call updateCustomData function to set fields app in orderForm
  // redirect to checkout with navigate method in the render-runtime
  const [skuId, setSkuId] = useState(null);
  const [sellerId, setSellerId] = useState(1);

  const addPromoCode = async () => {
    const orderForm = props.data.orderForm;
    const orderFormId = orderForm.orderFormId;
    const coupon = props.query.promoCode;
    const url = `${getRootPath}/api/checkout/pub/orderForm/${orderFormId}/attachments/marketingData`;
    const headers = {
      "Content-Type": "application/json",
      Accept: "application/json"
    };
    const data = {
      coupon
    };
    try {
      const response = (
        await axios({
          url,
          method: "POST",
          data,
          headers
        })
      ).data;
    } catch (error) {
      console.error(error);
    }
  };

  const getSkuId = async () => {
    let refId = props.query.pid;
    let url = `${getRootPath}/api/catalog_system/pub/sku/stockkeepingunitidbyrefid/${refId}`;
    let headers = {
      "Content-Type": "application/json",
      Accept: "application/json"
    };
    const skuId = (
      await axios({
        url: url,
        method: "GET",
        headers: headers
      })
    ).data;
    await setSkuId(skuId);
  };

  const updateOrderForm = async () => {
    const orderForm = props.data.orderForm;
    const orderFormId = orderForm.orderFormId;

    let items = [];
    let addedItems = [];
    if (orderForm.items.length) {
      items = orderForm.items.map((item, index) => {
        return {
          id: parseInt(item.id),
          index: item.cartIndex,
          quantity: 0,
          seller: item.seller
        };
      });
      await props.updateItems({
        variables: {
          orderFormId,
          items
        }
      });
    }

    addedItems.push({
      id: parseInt(skuId),
      quantity: 1,
      seller: 1
    });
    const response = await props.addItems({
      variables: {
        orderFormId,
        items: addedItems
      }
    });

    updateCustomData();
  };

  const updateCustomData = async () => {
    const orderForm = props.data.orderForm;
    const orderFormId = orderForm.orderFormId;
    const appName = "esp";
    const body = {
      pid: props.query.pid,
      deviceSerialNumber: props.query.deviceSerialNumber,
      SN: props.query.SN,
      warrantyStartDate: props.query.warrantyStartDate,
      warrantyEndDate: props.query.warrantyEndDate,
      orderSource: props.query.orderSource,
      qty: props.query.qty
    };
    let headers = {
      "Content-Type": "application/json",
      Accept: "application/json"
    };
    const url = `${getRootPath}/api/checkout/pub/orderForm/${orderFormId}/customData/${appName}`;
    const response = (
      await axios({
        url: url,
        method: "PUT",
        header: headers,
        data: body
      })
    ).data;
    goToCheckout();
  };

  const goToCheckout = () => {
    window.location.href = `${getRootPath}/checkout/#/orderform`;
  };

  useEffect(() => {
    if (skuId == null && !props.data.loading) {
      getSkuId();
    }
  });

  useEffect(() => {
    if (skuId) {
      updateOrderForm();
    }
  }, [skuId]);

  useEffect(() => {
    if (props.query.promoCode && !props.data.loading) {
      addPromoCode();
    }
  });

  return <Loading type="banner" />;
};

const withOrderForm = graphql(orderForm, {
  options: () => ({
    ssr: false
  })
});
const withUpdateOrderFormItems = graphql(updateItems, { name: "updateItems" });
const withAddToCart = graphql(addToCart, { name: "addItems" });

export default compose(
  withOrderForm,
  withUpdateOrderFormItems,
  withAddToCart,
  withRuntimeContext,
  withApollo
)(Esp);
