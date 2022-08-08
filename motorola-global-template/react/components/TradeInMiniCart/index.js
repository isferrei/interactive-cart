import React from 'react';
import tradeInLogo from './assets/moto-trade-in-TM.svg';
import { Spinner } from 'vtex.styleguide';
import * as _ from 'lodash';
import axios from 'axios';
import { withRuntimeContext } from 'vtex.render-runtime';
import { setApiHeaders } from '../../utils/config';
import { subscriber } from '../../utils/messageService';
import './TradeInMiniCart.global.css';

const _allOrderFormSections = {
    expectedOrderFormSections: ['items', 'totalizers', 'clientProfileData', 'shippingData', 'paymentData', 'sellers', 'messages', 'marketingData', 'clientPreferencesData', 'storePreferencesData', 'giftRegistryData', 'ratesAndBenefitsData', 'openTextField', 'commercialConditionData', 'customData']
};

class TradeInMiniCart extends React.Component {

    state = {
        loading: true,
        title: '',
        tradeInPrice: 0,
        tradeInProductAvailable: false,
        orderForm: {},
        orderFormId: '',
        accountName: this.props.runtime.account,
        appHeaders: setApiHeaders(this.props.runtime.account),
    }

    componentDidMount() {
        this.setState({
            loading: true
        })
        this.setOrderFormData();
        window.addEventListener('message', this.eventListenersMsg)
        this.subscription = subscriber.subscribe(data => {
            if (data === "CUSTOM_DATA_UPDATED") {
                console.log('UPDATE TRADE IN DATA IN MINICART - EVENT RECEIVED')
                console.log('UPDATE TRADE IN DATA IN MINICART - GET LATEST ORDER DATA')
                this.setOrderFormData();
            }
        });
    }

    componentWillUnmount() {
        window.removeEventListener('message', this.eventListenersMsg)
        this.subscription.unsubscribe();
    }

    getOrderForm = () => {
        return new Promise(function (resolve, reject) {
            axios.post(
                `${window.location.origin + (("undefined" != typeof __RUNTIME__ && null !== __RUNTIME__ ? __RUNTIME__.rootPath : void 0) || "")}/api/checkout/pub/orderForm?refreshOutdatedData=true`,
                _allOrderFormSections
            ).then(
                (response) => {
                    let orderData = response.data;
                    console.log('UPDATE TRADE IN DATA IN MINICART - RECEIVED LATEST ORDER DATA', orderData)
                    resolve(orderData);
                },
                (error) => {
                    reject(error);
                }
            );
        });
    }

    setOrderFormData = async () => {
        await this.getOrderForm().then(response => {
            let orderData = response;
            if (orderData && orderData.orderFormId) {
                this.setState({
                    orderFormId: orderData.orderFormId,
                    orderForm: orderData
                }, () => {
                    this.handleStateUpdates();
                })
            }
        }).catch(error => {
            this.setState({
                loading: false,
                tradeInProductAvailable: false
            })
        })
    }

    handleStateUpdates = () => {
        let tradeInProductAvailable = false;
        let orderFormState = this.state.orderForm;
        console.log('UPDATE TRADE IN DATA IN MINICART - CHECK STARTED')
        try {
            if (orderFormState.items && orderFormState.items.length > 0) {
                orderFormState.items.map(item => {
                    if (item.id == orderFormState.customData.customApps[0].fields.productIdApplied && orderFormState.customData.customApps[0].fields.isTradeIn == "Yes") {
                        console.log('UPDATE TRADE IN DATA IN MINICART - PRODUCT IN MINICART HAS CUSTOM DATA')
                        tradeInProductAvailable = true;
                    }
                })
            }
            if (tradeInProductAvailable) {
                console.log('UPDATE TRADE IN DATA IN MINICART - CUSTOM DATA IN MINICART UPDATE START')
                this.setState({
                    title: orderFormState.customData.customApps[0].fields.title,
                    tradeInPrice: orderFormState.customData.customApps[0].fields.tradeInPrice,
                    tradeInProductAvailable: tradeInProductAvailable
                }, () => {
                    console.log('UPDATE TRADE IN DATA IN MINICART - CUSTOM DATA IN MINICART UPDATED')
                    this.setState({
                        loading: false
                    })
                })
            } else {
                console.log('UPDATE TRADE IN DATA IN MINICART - NO CUSTOM DATA')
                this.setState({
                    loading: false,
                    tradeInProductAvailable: tradeInProductAvailable
                })
            }
        } catch {
            this.setState({
                loading: false,
                tradeInProductAvailable: tradeInProductAvailable
            })
        }

    }

    eventListenersMsg = async (message) => {
        if (message.data.event == "cartChanged") {
        }
    }


    render() {
        return (
            <>
                {
                    this.state.loading ?
                        <>
                            <Spinner></Spinner>
                        </>
                        :
                        <>
                            {
                                this.state.tradeInProductAvailable ?
                                    <div className="trade-in-minicart">
                                        <div><img className="tim-logo" src={tradeInLogo} /><span className="tim-discount-text">discount</span></div>
                                        <div className="tim-device-selected">
                                            {this.state.title}
                                        </div>
                                        <div className="tim-trade-in-value">
                                            <span className="tim-value">$</span>
                                            <span className="tim-value">{this.state.tradeInPrice}</span>
                                            {/*<span className="tim-value-disclaimer">(Discount applied at checkout)</span>*/}
                                        </div>
                                    </div>
                                    :
                                    <div></div>
                            }
                        </>


                }
            </>
        )
    }
}

export default withRuntimeContext(TradeInMiniCart);