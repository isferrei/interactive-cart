import React from 'react';
import axios from 'axios';
import { withRuntimeContext,ExtensionPoint } from 'vtex.render-runtime';
import { setApiHeaders } from '../../utils/config'
import { getRootPath } from '../../utils/helpers'
const _allOrderFormSections = {
    expectedOrderFormSections: ['items', 'totalizers', 'clientProfileData', 'shippingData', 'paymentData', 'sellers', 'messages', 'marketingData', 'clientPreferencesData', 'storePreferencesData', 'giftRegistryData', 'ratesAndBenefitsData', 'openTextField', 'commercialConditionData', 'customData']
};

class EmployeeDiscount extends React.Component {

    state = {
        orderFormId: '',
        orderForm: {},
        accountName: this.props.runtime.account,
        appHeaders: setApiHeaders(this.props.runtime.account),
        userProfile: {}
    }

    componentDidMount() {
        this.checkUserSession();
    }

    checkUserSession = () => {
        axios({
            url: `${getRootPath}/api/sessions?items=*`
        }).then(response => {
            const session = response.data;
            if (session.namespaces.profile.isAuthenticated.value == "true") {
                this.setState({
                    userProfile: session.namespaces.profile
                }, () => {
                    this.applyDiscountForEmployees();
                })
            } else {
                //remove employee tag from marketing data
            }
        })
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

    applyDiscountForEmployees = async () => {
        await this.getOrderForm().then(response => {
            let orderData = response;
            if (orderData && orderData.orderFormId) {
                this.setState({
                    orderFormId: orderData.orderFormId,
                    orderForm: orderData
                }, () => {
                    if (orderData.clientProfileData && orderData.clientProfileData.email) {
                        let email = orderData.clientProfileData.email.split("@")[1];
                        let authorizedEmails = [
                            "motorola.com",
                            "lenovo.com"
                        ];

                        if (authorizedEmails.indexOf(email) >= 0) {
                            let marketingData = orderData.marketingData
                                ? orderData.marketingData
                                : { marketingTags: [] };

                            if (!marketingData.marketingTags.includes("employee")) {
                                marketingData.marketingTags.push("employee");
                                this.sendEmployeeAttachment(marketingData);
                            }
                        }
                    }
                })
            }
        }).catch(error => {

        })
    }

    sendEmployeeAttachment = (marketingData) => {
        let attachmentURL = `${window.location.origin + (("undefined" != typeof __RUNTIME__ && null !== __RUNTIME__ ? __RUNTIME__.rootPath : void 0) || "")}/api/checkout/pub/orderForm/${this.state.orderFormId}/attachments/marketingData`;
        axios.post(attachmentURL, marketingData, {
            //headers: this.state.appHeaders
        }).then(response => {
       }).catch(error => {

        })
    }

    render() {
        return (
            <React.Fragment></React.Fragment>
        )
    }
}

export default withRuntimeContext(EmployeeDiscount);