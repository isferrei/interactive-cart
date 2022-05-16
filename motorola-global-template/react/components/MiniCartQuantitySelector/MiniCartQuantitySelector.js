import React from 'react';
import { ExtensionPoint } from "vtex.render-runtime";
import { orderFormConsumer } from "vtex.store-resources/OrderFormContext";

class MiniCartQuantitySelector extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <React.Fragment>
                <ExtensionPoint id="quantity-selector"></ExtensionPoint>
            </React.Fragment>
        )
    }
}

export default orderFormConsumer(MiniCartQuantitySelector);