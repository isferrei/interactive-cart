import React, { FC, useEffect } from 'react'
import { ExtensionPoint } from 'vtex.render-runtime'
import { useOrderForm } from 'vtex.order-manager/OrderForm'
import { useCssHandles, CssHandlesTypes } from 'vtex.css-handles'
import { useQuery, useMutation } from 'react-apollo'
import OrderFormQuery from 'vtex.checkout-resources/QueryOrderForm'

const CSS_HANDLES = ['minicartSummary']

const Summary = ({ classes }) => {
  /*const {
    orderForm: { totalizers, value, paymentData },
  } = useOrderForm()*/

  const { data, loading, error, refetch, stopPolling, startPolling } = useQuery(OrderFormQuery, {
    ssr: false,
    fetchPolicy: 'no-cache'
  })

  useEffect(() => {
    startPolling(1000)

    const timeout = setTimeout(() => {
      stopPolling()
    }, 6000);
    return () => {
      clearTimeout(timeout);
      stopPolling() // Works
    }
  })

  const { handles } = useCssHandles(CSS_HANDLES, { classes })

  const totalizers = (data && data.orderForm && data.orderForm.totalizers) ? data.orderForm.totalizers : [];
  const paymentData = (data && data.orderForm && data.orderForm.paymentData) ? data.orderForm.paymentData : {};
  const value = (data && data.orderForm && data.orderForm.value) ? data.orderForm.value : 0;

  return (
    <div className={`${handles.minicartSummary} ph4 ph6-l pt5`}>
      <ExtensionPoint
        id="checkout-summary"
        totalizers={totalizers}
        paymentData={paymentData}
        total={value}
      />
    </div>
  )
}

export default Summary
