import React, { FC, useCallback, useEffect } from 'react'
import { useOrderForm } from 'vtex.order-manager/OrderForm'
import { useOrderItems } from 'vtex.order-items/OrderItems'
import { ExtensionPoint } from 'vtex.render-runtime'
import { usePixel } from 'vtex.pixel-manager'
import { CssHandlesTypes, useCssHandles } from 'vtex.css-handles'
import { useQuery, useMutation } from 'react-apollo'
import OrderFormQuery from 'vtex.checkout-resources/QueryOrderForm'

import { mapCartItemToPixel } from './modules/pixelHelper'

const CSS_HANDLES = ['minicartProductListContainer']

const options = {
    allowedOutdatedData: ['paymentData'],
}

const ProductList = ({ renderAsChildren, classes }) => {
    /*const {
        orderForm: { items },
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

    const items = (data && data.orderForm && data.orderForm.items) ? data.orderForm.items : [];

    const { updateQuantity, removeItem } = useOrderItems()
    const { push } = usePixel()
    const { handles } = useCssHandles(CSS_HANDLES, { classes })

    const handleQuantityChange = useCallback(
        (uniqueId, quantity, item) => {
            if (quantity === item.quantity) {
                return
            }

            const quantityIncreased = quantity > item.quantity

            if (quantityIncreased) {
                const adjustedItem = {
                    ...mapCartItemToPixel(item),
                    quantity: quantity - item.quantity,
                }

                push({
                    event: 'addToCart',
                    items: [adjustedItem],
                })
            } else {
                const adjustedItem = {
                    ...mapCartItemToPixel(item),
                    quantity: item.quantity - quantity,
                }

                push({
                    event: 'removeFromCart',
                    items: [adjustedItem],
                })
            }

            updateQuantity({ uniqueId, quantity }, options)
        },
        [push, updateQuantity]
    )

    const handleRemove = useCallback(
        (uniqueId, item) => {
            const adjustedItem = mapCartItemToPixel(item)
            push({
                event: 'removeFromCart',
                items: [adjustedItem],
            })
            removeItem({ uniqueId }, options)
        },
        [push, removeItem]
    )

    return (
        <div
            /* 
              This prevents an interaction with the quantity selector
              inside of a product in the ProductList to bubble up a
              mouseleave event to the Popup component, which would result
              in the minicart being closed (when openOnHover = true). 
            */
            onMouseLeave={e => e.stopPropagation()}
            className={`${handles.minicartProductListContainer} ${renderAsChildren ? 'w-100 h-100' : ''
                } overflow-y-auto ph4 ph6-l`}
        >
            <ExtensionPoint
                id="product-list"
                items={items}
                onQuantityChange={handleQuantityChange}
                onRemove={handleRemove}
            />
            <ExtensionPoint id="minicart-trade-in"></ExtensionPoint>
        </div>
    )
}

export default ProductList
