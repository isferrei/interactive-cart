import React from 'react';
import axios from 'axios';
import { withRuntimeContext } from 'vtex.render-runtime';
import { setApiHeaders } from '../../../../utils/config';
import { subscriber } from '../../../../utils/messageService';

const _allOrderFormSections = {
    expectedOrderFormSections: ['items', 'totalizers', 'clientProfileData', 'shippingData', 'paymentData', 'sellers', 'messages', 'marketingData', 'clientPreferencesData', 'storePreferencesData', 'giftRegistryData', 'ratesAndBenefitsData', 'openTextField', 'commercialConditionData', 'customData']
};

class MiniCartEventComponent extends React.Component {

    state = {
        orderFormId: '',
        orderForm: {},
        accountName: this.props.runtime.account,
        appHeaders: setApiHeaders(this.props.runtime.account)
    }

    componentDidMount() {
        console.log('minicartvent mounting')
        window.addEventListener("message", this.eventCartListenersMsg);
    }

    componentWillUnmount() {
        console.log('minicartvent unmounting')
        window.removeEventListener("message", this.eventCartListenersMsg);
    }

    getOrderForm = () => {
        return new Promise(function (resolve, reject) {
            axios.post(
                `${window.location.origin + (("undefined" != typeof __RUNTIME__ && null !== __RUNTIME__ ? __RUNTIME__.rootPath : void 0) || "")}/api/checkout/pub/orderForm?refreshOutdatedData=true`,
                _allOrderFormSections
            ).then(
                (response) => {
                    let orderData = response.data;
                    resolve(orderData);
                },
                (error) => {
                    reject(error);
                }
            );
        });
    }

    checkIfDeleteItemExists = async (skuId) => {
        console.log('START CHECK TO SEE DELETE ITEM IN CUSTOM DATA - GET LATEST ORDER FORM')
        await this.getOrderForm().then(response => {
            let orderData = response;
            console.log('START CHECK TO SEE DELETE ITEM IN CUSTOM DATA - RECEIVED LATEST ORDER FORM', orderData)
            if (orderData && orderData.orderFormId) {
                this.setState({
                    orderFormId: orderData.orderFormId,
                    orderForm: orderData
                })
            }
            let tradeInAppCustomData = {};
            let tradeInAppAvailable = false;
            if (orderData && orderData.customData && orderData.customData.customApps && orderData.customData.customApps.length > 0) {
                console.log('DELETE CHECK - CUSTOM APPS PRESENT')
                orderData.customData.customApps.map((appItem) => {
                    if (appItem.id === "tradeincart") {
                        console.log('DELETE CHECK - TRADE IN CUSTOM APP PRESENT', appItem)
                        tradeInAppAvailable = true;
                        tradeInAppCustomData = appItem;
                    }
                })
            }
            if (tradeInAppAvailable) {
                if (skuId === tradeInAppCustomData.fields.productIdApplied) {
                    console.log('DELETE CHECK - PRODUCT FOUND IN CUSTOM APP, TO BE DELETED')
                    this.deleteTradeInOrderFormValuesData();
                    return true;
                } else {
                    console.log('DELETE CHECK - PRODUCT NOT FOUND IN CUSTOM APP, NO DELETE')
                    return false;
                }
            } else {
                return false;
            }
        }).catch(error => {

        })
    }

    deleteTradeInOrderFormValuesData = () => {
        console.log('DELETE CHECK - STARTING TO RESET CUSTOM APP')
        this.setState({
            loading: true
        })
        let orderFormId = this.state.orderFormId;
        let appName = "tradeInCart";

        let fieldsReq = {
            "isTradeIn": "No",
            "productuid": "null",
            "quoteuid": "null",
            "condition": "null",
            "tradeInPrice": "null",
            "title": "null",
            "productIdApplied": "null",
            "uid": "null",
            "taxBase": 0
        };

        axios.put(`${window.location.origin + (("undefined" != typeof __RUNTIME__ && null !== __RUNTIME__ ? __RUNTIME__.rootPath : void 0) || "")}/api/checkout/pub/orderForm/${orderFormId}/customData/${appName}`, fieldsReq, {
            //headers: this.state.appHeaders
        }).then(response => {
            console.log('DELETE CHECK - COMPLETED RESET CUSTOM APP', response.data)
            console.log('DELETE CHECK - COMPLETED RESET CUSTOM APP - LATEST ORDER DATA', response.data)
            console.log('UPDATE TRADE IN DATA IN MINICART - EVENT TRIGGERED')
            subscriber.next('CUSTOM_DATA_UPDATED');
        }).catch(error => {

        })
    }

    eventCartListenersMsg = async (message) => {
        if (message.data.event == "removeFromCart" && message.data.eventName == "vtex:removeFromCart") {
            console.log('DELETE ITEM IN MINICART')
            console.log('START CHECK TO SEE DELETE ITEM IN CUSTOM DATA')
            this.checkIfDeleteItemExists(message.data.items[0].skuId)
        }
    }

    render() {
        return (
            <React.Fragment></React.Fragment>
        )
    }
}

export default withRuntimeContext(MiniCartEventComponent);