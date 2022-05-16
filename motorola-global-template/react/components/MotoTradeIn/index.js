import React from 'react';
import { Checkbox, Dropdown, Button } from 'vtex.styleguide';
import { Modal, IconExternalLink } from 'vtex.styleguide';
import { Spinner } from 'vtex.styleguide'
import './MotoTradeIn.global.css';
import tradeInLogo from './assets/moto-trade-in-TM-White.svg';
import tradeInLogoModal from './assets/moto-trade-in-TM.svg';
import axios from 'axios';
import * as _ from 'lodash';
import { path } from "ramda";
import { withRuntimeContext } from 'vtex.render-runtime';
import { setApiHeaders } from '../../utils/config';
import { subscriber } from '../../utils/messageService';
import { orderFormConsumer } from "vtex.store-resources/OrderFormContext";
import { updateItems } from "vtex.store-resources/Mutations";
import { graphql, compose, withApollo } from "react-apollo";
import { Alert } from 'vtex.styleguide';
import { addToCart } from "vtex.checkout-resources/Mutations";
import { setManualPrice } from 'vtex.checkout-resources/Mutations';
import { withPixel } from 'vtex.pixel-manager/PixelContext';
import { Helmet } from 'react-helmet';
import { ButtonGroup } from 'vtex.styleguide'
import { ThemeProvider } from 'styled-components';
//import { withToast } from 'vtex.styleguide';

const _allOrderFormSections = {
    expectedOrderFormSections: ['items', 'totalizers', 'clientProfileData', 'shippingData', 'paymentData', 'sellers', 'messages', 'marketingData', 'clientPreferencesData', 'storePreferencesData', 'giftRegistryData', 'ratesAndBenefitsData', 'openTextField', 'commercialConditionData', 'customData']
};

class MotoTradeIn extends React.Component {

    state = {
        availableForTradeIn: false,
        tradeInValue: 0,
        estimatedTradeInValueExists: false,
        loading: false,
        loadingSpinner: true,
        tradeInOpted: false,
        isModalOpen: false,
        agreeTnC: false,
        isMobile: false,
        accountName: this.props.runtime.account,
        phobiaHeaders: {
            'Authorization': `Bearer ${btoa(`${this.props.phobiaUserName}:${this.props.phobiaToken}`)}`
        },
        phobiaAPI: this.props.phobiaAPI,
        appHeaders: setApiHeaders(this.props.runtime.account),
        manufacturersList: [{
            label: "Select", value: ""
        }],
        manufacturersList: [
            { label: "Select", value: "" },
            { label: "Apple", value: "apple" },
            { label: "Asus", value: "asus" },
            { label: "Blackberry", value: "blackberry" },
            { label: "Blu", value: "blu" },
            { label: "Caterpillar", value: "caterpillar" },
            { label: "Elephone", value: "elephone" },
            { label: "Essential", value: "essential" },
            { label: "Google", value: "google" },
            { label: "HTC", value: "htc" },
            { label: "Huawei", value: "huawei" },
            { label: "Lenovo", value: "lenovo" },
            { label: "LG", value: "lg" },
            { label: "Motorola", value: "motorola" },
            { label: "Nokia", value: "nokia" },
            { label: "OnePlus", value: "oneplus" },
            { label: "Oppo", value: "oppo" },
            { label: "Razer", value: "razer" },
            { label: "Red", value: "red" },
            { label: "Samsung", value: "samsung" },
            { label: "Sonim", value: "sonim" },
            { label: "Sony", value: "sony" },
            { label: "Vivo", value: "vivo" },
            { label: "Xiaomi", value: "xiaomi" },
            { label: "ZTE", value: "zte" },
        ],
        selectedManufacturer: "",
        productFamiliesList: [{
            label: "Select", value: ""
        }],
        selectedSeries: "",
        productsList: [{
            label: "Select", value: ""
        }],
        selectedProduct: "",
        tradeInPrice: 0,
        displayTradeInPrice: "",
        disableAddToCart: true,
        selectedTradeProduct: {},
        orderForm: {},
        orderFormId: '',
        quoteUID: "",
        deviceEligible: "working",
        serviceError: false,
        errorText: "The server could not complete your request. Please try again later",
        customData: {},
        skuSelector: this.props.skuSelector,
        tradeInAppAvailable: false,
        tradeInAvailablePrice: 0,
        selectedProdIndex: "",
        eligibilityAnswers: {},
        tradeInEligible: false
    }


    componentDidMount() {
        this.handleResize();
        this.setTradeInSection();
        this.setOrderFormData();
        window.addEventListener("resize", this.handleResize);
        window.addEventListener("message", this.handleCartEvents);
        this.subscription = subscriber.subscribe(data => {
            console.log('DELETE')
            if (data === "CUSTOM_DATA_UPDATED") {
                this.setOrderFormData();
            }
        });
        console.log(this.props)
        if (this.props.eligibilityQuestions) {
            this.props.eligibilityQuestions.map((item, index) => {
                this.state.eligibilityAnswers["active" + index] = "";
            })
        }
        console.log('STATE', this.state);
        console.log('PROPS', this.props)
    }

    componentWillUnmount() {
        window.removeEventListener("resize", this.handleResize);
        window.removeEventListener("message", this.handleCartEvents);
        this.subscription.unsubscribe();
    }

    componentDidUpdate(prevProps) {
        if (prevProps.skuSelected && this.props.skuSelected && prevProps.skuSelected.itemId !== this.props.skuSelected.itemId) {
            console.log('prevProps.skuSelected', prevProps.skuSelected)
            console.log('this.props.skuSelected', this.props.skuSelected)
            this.setTradeInSection();
        }
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

    setOrderFormData = async () => {
        await this.getOrderForm().then(response => {
            let orderData = response;
            if (orderData && orderData.orderFormId) {
                this.setState({
                    orderFormId: orderData.orderFormId,
                    orderForm: orderData
                }, () => {
                    this.checkCustomData()
                })
            }
        }).catch(error => {

        })
    }

    checkCustomData = () => {
        let orderData = this.state.orderForm;
        let tradeInAppAvailable = false;
        let productIdApplied = "";
        let selectedProdIndex = '';
        let tradeInAvailablePrice = 0;
        if (orderData && orderData.customData && orderData.customData.customApps && orderData.customData.customApps.length > 0) {
            orderData.customData.customApps.map((appItem) => {
                if (appItem.id === "tradeincart") {
                    if (appItem.fields && appItem.fields.isTradeIn === "Yes") {
                        tradeInAppAvailable = true;
                        productIdApplied = appItem.fields.productIdApplied;
                        tradeInAvailablePrice = appItem.fields.tradeInPrice;
                        selectedProdIndex = _.findIndex(orderData.items, { id: productIdApplied })
                    }
                }
            })
        }
        this.setState({
            tradeInAppAvailable: tradeInAppAvailable,
            tradeInAvailablePrice: tradeInAvailablePrice
        }, () => {
            console.log('selectedProdIndex', selectedProdIndex)
            this.props.setTradeInSelection(this.state.tradeInAppAvailable, productIdApplied);
            this.props.addToCartBtnCallBack(this.state.tradeInAppAvailable, productIdApplied);
            // if (tradeInAppAvailable) {
            //     const observer = new MutationObserver(mutation => {
            //         if (document.getElementsByClassName('vtex-product-list-0-x-quantitySelectorContainer--minicart-quantity-selector')) {
            //             if (document.getElementsByClassName('vtex-product-list-0-x-quantitySelectorContainer--minicart-quantity-selector').length > 0) {
            //                 let elementsMatched = document.getElementsByClassName('vtex-product-list-0-x-quantitySelectorContainer--minicart-quantity-selector');
            //                 let i;
            //                 observer.disconnect();
            //                 for (i = 0; i < elementsMatched.length; i++) {
            //                     /* TODO: making quantity selector hidden for all products in minicart until permanent fix is done */
            //                     elementsMatched[i].style.visibility = "hidden"
            //                 }
            //                 if (document.getElementsByClassName('vtex-product-list-0-x-quantitySelectorContainer--minicart-quantity-selector')[selectedProdIndex]) {
            //                     if (this.state.tradeInAppAvailable) {
            //                         document.getElementsByClassName('vtex-product-list-0-x-quantitySelectorContainer--minicart-quantity-selector')[selectedProdIndex].style.visibility = "hidden"
            //                     }
            //                 }
            //                 observe();
            //             }
            //         }
            //     });

            //     const observe = () => {
            //         observer.observe(document.body, {
            //             childList: true,
            //             subtree: true,
            //             characterData: true
            //         });
            //     };
            //     observe();
            // }
            /*if(tradeInAppAvailable) {
                document.getElementsByClassName('vtex-product-list-0-x-quantitySelectorContainer--minicart-quantity-selector')[this.state.selectedProdIndex].style.visibility = "hidden"
            } else {
                document.getElementsByClassName('vtex-product-list-0-x-quantitySelectorContainer--minicart-quantity-selector')[this.state.selectedProdIndex].style.visibility = ""
            }*/
        })
    }

    setTradeInSection = () => {
        this.setState({
            availableForTradeIn: false
        })
        const blocksGroup = this.props.specificationGroups.find(
            item => item.name === "Blocks"
        );
        const blocks = path(["specifications"], blocksGroup);
        if (blocks) {
            const availableTradeIn = blocks.find(item => item.name === "Available for trade in");
            if (availableTradeIn) {
                const availableForTradeInFlag = path(["values", "0"], availableTradeIn);
                if (availableForTradeInFlag && availableForTradeInFlag == "Yes") {
                    this.setState({
                        availableForTradeIn: true
                    }, () => {
                        //this.createTradeInOrderFormEntry();
                        this.getOrderFormConfiguration();
                    })
                    const estimatedTradeInValue = blocks.find(item => item.name === "Estimated trade-in value");
                    if (estimatedTradeInValue) {
                        const tradeInValue = path(["values", "0"], estimatedTradeInValue);
                        if (tradeInValue && !isNaN(Number(tradeInValue))) {
                            this.setState({
                                tradeInValue: Number(tradeInValue),
                                estimatedTradeInValueExists: true
                            })
                        }
                    }
                }
            }
        }
    }

    handleResize = () => {
        this.setState({
            isMobile: window.screen.width <= 768 ? true : false
        })
    }

    tradeInOptChange = (e) => {
        this.setState({
            tradeInOpted: !this.state.tradeInOpted
        }, () => {
            this.setState({
                isModalOpen: this.state.tradeInOpted
            })
        })
    }

    handleModalClose = (e) => {
        this.setState({
            isModalOpen: false,
            tradeInOpted: false
        }, () => {
            this.setState({
                agreeTnC: false,
                isMobile: false,
                selectedManufacturer: "",
                selectedSeries: "",
                selectedProduct: "",
                tradeInPrice: 0,
                displayTradeInPrice: "",
                disableAddToCart: true,
                serviceError: false,
                tradeInEligible: false,
                productFamiliesList: [{
                    label: "Select", value: ""
                }],
                productsList: [{
                    label: "Select", value: ""
                }]
            })
            if (this.props.eligibilityQuestions) {
                this.props.eligibilityQuestions.map((item, index) => {
                    this.state.eligibilityAnswers["active" + index] = "";
                })
            }
        })
    }

    handleAgreeTnC = (e) => {
        this.setState({
            agreeTnC: !this.state.agreeTnC
        }, () => {
            this.validateTradeInSelection();
        })
    }

    handleManufacturerSelect = (e, value) => {
        this.setState({
            selectedManufacturer: value,
            selectedSeries: "",
            selectedProduct: "",
            tradeInPrice: 0,
            displayTradeInPrice: "",
            serviceError: false,
            productFamiliesList: [{
                label: "Select", value: ""
            }],
            productsList: [{
                label: "Select", value: ""
            }]
        }, () => {
            this.getProductSeries();
            this.validateTradeInSelection();
        })
    }

    getProductSeries = () => {
        this.setState({
            loading: true,
            serviceError: false,
            productFamiliesList: [{
                label: "Select", value: ""
            }]
        })
        const serviceAPI = `${window.location.origin + (("undefined" != typeof __RUNTIME__ && null !== __RUNTIME__ ? __RUNTIME__.rootPath : void 0) || "")}/phobio/getProductsSeries/${this.state.selectedManufacturer}`;
        axios.get(serviceAPI, {
            headers: this.state.phobiaHeaders
        }).then((response) => {
            if (response && response.data && response.data.count > 0 && response.data.results && response.data.results.length > 0) {
                let productFamilies = [];
                response.data.results.map(data => {
                    if (data && data.prices) {
                        let workingModelPrice = data.prices.find(item => item.condition === "working");
                        if (workingModelPrice &&
                            workingModelPrice.local_customer_price_in_cents &&
                            workingModelPrice.local_customer_price_in_cents > 0 &&
                            (workingModelPrice.local_customer_price_in_cents <= (this.props.sellingPrice * 100)) &&
                            data.attributes &&
                            data.attributes.family &&
                            data.attributes.family[0]) {
                            productFamilies.push(data.attributes.family[0])
                        }
                    }
                })
                productFamilies = _.uniqBy(productFamilies, function (e) {
                    return e.slug;
                });
                let productFamiliesList = [];
                productFamilies.map(data => {
                    productFamiliesList.push({
                        label: data.title, value: data.slug
                    })
                })
                productFamiliesList = [...this.state.productFamiliesList, ...productFamiliesList];
                this.setState({
                    productFamiliesList: productFamiliesList
                })
            }
            this.setState({
                loading: false,
                serviceError: false
            })
        }).catch((error) => {
            this.setState({
                loading: false,
                serviceError: true
            })
        });
    }

    handleSeriesSelect = (e, value) => {
        this.setState({
            selectedSeries: value,
            selectedProduct: "",
            tradeInPrice: 0,
            displayTradeInPrice: "",
            serviceError: false
        }, () => {
            this.getProductList();
            this.validateTradeInSelection();
        })
    }

    getProductList = () => {
        this.setState({
            loading: true,
            serviceError: false,
            productsList: [{
                label: "Select", value: ""
            }]
        })
        const serviceAPI = `${window.location.origin + (("undefined" != typeof __RUNTIME__ && null !== __RUNTIME__ ? __RUNTIME__.rootPath : void 0) || "")}/phobio/getProductsList/${this.state.selectedManufacturer}/${this.state.selectedSeries}`;
        axios.get(serviceAPI, {
            headers: this.state.phobiaHeaders
        }).then((response) => {
            if (response && response.data && response.data.count > 0 && response.data.results && response.data.results.length > 0) {
                let productsList = [];
                response.data.results.map(data => {
                    if (data && data.prices) {
                        let workingModelPrice = data.prices.find(item => item.condition === "working");
                        if (workingModelPrice &&
                            workingModelPrice.local_customer_price_in_cents &&
                            workingModelPrice.local_customer_price_in_cents > 0 &&
                            (workingModelPrice.local_customer_price_in_cents <= (this.props.sellingPrice * 100))
                        ) {
                            productsList.push({
                                label: data.title, value: data.uid
                            })
                        }
                    }
                })
                productsList = [...this.state.productsList, ...productsList]
                this.setState({
                    productsList: productsList
                })
            }
            this.setState({
                loading: false,
                serviceError: false
            })
        }).catch((error) => {
            this.setState({
                loading: false,
                serviceError: true
            })
        });
    }

    handleSelectedProduct = (e, value) => {
        this.setState({
            selectedProduct: value,
            tradeInPrice: 0,
            displayTradeInPrice: "",
            serviceError: false
        }, () => {
            this.getTradeInPrice();
            this.validateTradeInSelection();
        });
    }

    getTradeInPrice = () => {
        this.setState({
            loading: true,
            serviceError: false
        })
        const serviceAPI = `${window.location.origin + (("undefined" != typeof __RUNTIME__ && null !== __RUNTIME__ ? __RUNTIME__.rootPath : void 0) || "")}/phobio/getProductPrice/${this.state.selectedProduct}`;
        axios.get(serviceAPI, {
            headers: this.state.phobiaHeaders
        }).then((response) => {
            if (response && response.data) {
                this.setState({
                    selectedTradeProduct: response.data
                })
                let tradeInPriceObj = response.data.prices.find(obj => {
                    return obj.condition === "working"
                })
                console.log('Price', Number(tradeInPriceObj.local_customer_price_in_cents / 100).toFixed(2))
                this.setState({
                    displayTradeInPrice: tradeInPriceObj.local_customer_display_price,
                    tradeInPrice: Number(tradeInPriceObj.local_customer_price_in_cents / 100).toFixed(2)
                })
            }
            this.setState({
                loading: false,
                serviceError: false
            })
        }).catch((error) => {
            this.setState({
                loading: false,
                serviceError: true
            })
        });
    }

    validateTradeInSelection = () => {
        if (this.state.selectedManufacturer != "" && this.state.selectedSeries != "" && this.state.selectedProduct != "" && this.state.agreeTnC !== false && this.allEligibilityQnsCheck()) {
            this.setState({
                disableAddToCart: false
            })
        } else {
            this.setState({
                disableAddToCart: true
            })
        }
    }

    allEligibilityQnsCheck = () => {
        for (const property in this.state.eligibilityAnswers) {
            if (this.state.eligibilityAnswers[property] !== "yes") {
                return false
            }
        }
        return true
    }

    checkTradeInEligibility = () => {
        let noCount = 0;
        for (const property in this.state.eligibilityAnswers) {
            if (this.state.eligibilityAnswers[property] === "no") {
                noCount++;
            }
        }
        if (noCount > 0) {
            this.setState({
                tradeInEligible: true
            })
        } else {
            this.setState({
                tradeInEligible: false
            })
        }
    }

    createTradeInOrderFormEntry = (event) => {
        let fieldsReq = {
            "paymentConfiguration":
            {
                "requiresAuthenticationForPreAuthorizedPaymentOption": false
            },
            "minimumQuantityAccumulatedForItems": 1,
            "decimalDigitsPrecision": 2,
            "minimumValueAccumulated": 0,
            "apps":
                [
                    {
                        "id": "tradeInCart",
                        "fields":
                            [
                                "isTradeIn",
                                "productuid",
                                "quoteuid",
                                "condition",
                                "tradeInPrice",
                                "title",
                                "productIdApplied",
                                "uid",
                                "taxBase"
                            ]
                    }
                ]
        };

        axios.post(`${window.location.origin + (("undefined" != typeof __RUNTIME__ && null !== __RUNTIME__ ? __RUNTIME__.rootPath : void 0) || "")}/api/checkout/pvt/configuration/orderForm`, fieldsReq, {
            //headers: this.state.appHeaders
        }).then(response => {

        }).catch(error => {
            this.setState({
                loading: false,
                serviceError: true
            })
        })
    }

    getOrderFormConfiguration = () => {
        axios.get(`${window.location.origin + (("undefined" != typeof __RUNTIME__ && null !== __RUNTIME__ ? __RUNTIME__.rootPath : void 0) || "")}/api/checkout/pvt/configuration/orderForm`, {
            //headers: this.state.appHeaders
        }).then(response => {
            console.log('ORDER CONFIGURATION', response.data)
            if (response.data && !response.data.allowManualPrice) {
                this.setAllowManualPriceConfig(response.data);
            }
        }).catch(error => {
            this.setState({
                loading: false,
                serviceError: true
            })
        })
    }

    setAllowManualPriceConfig = (orderConfig) => {
        let fieldsReq = orderConfig;
        orderConfig.allowManualPrice = true;
        axios.post(`${window.location.origin + (("undefined" != typeof __RUNTIME__ && null !== __RUNTIME__ ? __RUNTIME__.rootPath : void 0) || "")}/api/checkout/pvt/configuration/orderForm`, fieldsReq, {
           // headers: this.state.appHeaders
        }).then(response => {
            console.log('ORDER CONFIGURATION', response.data)
        }).catch(error => {
            this.setState({
                loading: false,
                serviceError: true
            })
        })
    }

    createTradeInQuote = () => {
        console.log('CREATING TRADE IN QUOTE');
        this.setState({
            loading: true,
            serviceError: false
        })
        const serviceAPI = `${window.location.origin + (("undefined" != typeof __RUNTIME__ && null !== __RUNTIME__ ? __RUNTIME__.rootPath : void 0) || "")}/phobio/getQuotes/`;
        const requestData = {
            "products": [
                {
                    "uid": this.state.selectedTradeProduct.uid,
                    "condition": this.state.deviceEligible
                }
            ]
        }
        axios.post(serviceAPI, requestData, {
            //headers: this.state.phobiaHeaders
        })
            .then(response => {
                console.log('COMPLETED TRADE IN QUOTE');
                //this.props.showToast("Trade in quote created successfully!")
                this.setState({
                    quoteUID: response.data.uid
                }, () => {
                    this.setTradeInOrderFormValues();
                })
            })
            .catch(error => {
                this.setState({
                    loading: false,
                    serviceError: true
                })
                //this.props.showToast("Error creating Trade in quote")
            });

    }

    setTradeInOrderFormValues = async () => {
        console.log('CREATING TRADE IN CUSTOM DATA - YES');
        this.setState({
            loading: true,
            serviceError: false
        })
        await this.getOrderForm().then(response => {
            let orderData = response;
            if (orderData && orderData.orderFormId) {
                let orderFormId = orderData.orderFormId;
                let appName = "tradeInCart";
    
                let fieldsReq = {
                    "isTradeIn": "Yes",
                    "productuid": this.state.selectedTradeProduct.uid,
                    "quoteuid": this.state.quoteUID,
                    "condition": "working",
                    "tradeInPrice": this.state.tradeInPrice,
                    "title": this.state.selectedTradeProduct.title,
                    "productIdApplied": this.props.skuSelected.itemId,
                    "uid": this.state.quoteUID,
                    "taxBase": 0
                };
        
                axios.put(`${window.location.origin + (("undefined" != typeof __RUNTIME__ && null !== __RUNTIME__ ? __RUNTIME__.rootPath : void 0) || "")}/api/checkout/pub/orderForm/${orderFormId}/customData/${appName}`, fieldsReq, {
                    //headers: this.state.appHeaders
                }).then(response => {
                    console.log('COMPLETED TRADE IN CUSTOM DATA - YES');
                    console.log('COMPLETED TRADE IN CUSTOM DATA UPDATE', response)
                    //this.props.showToast("Trade in custom data added successfully!")
                    const orderData = response.data;
                    let tradeInAppAvailable = false;
                    let productIdApplied = '';
                    if (orderData && orderData.customData && orderData.customData.customApps && orderData.customData.customApps.length > 0) {
                        orderData.customData.customApps.map((appItem) => {
                            if (appItem.id === "tradeincart") {
                                if (appItem.fields && appItem.fields.isTradeIn === "Yes") {
                                    tradeInAppAvailable = true;
                                    productIdApplied = appItem.fields.productIdApplied;
                                }
                            }
                        })
                    }
                    if(tradeInAppAvailable && productIdApplied === this.props.skuSelected.itemId) {
                        this.calculateTradeInDiscountPrice();
                    } else {
                        this.setState({
                            loading: false,
                            serviceError: true
                        })
                    }
                }).catch(error => {
                    this.setState({
                        loading: false,
                        serviceError: true
                    })
                    //this.props.showToast("Error adding Trade in custom data")
                })
            }
        }).catch(error => {
            this.setState({
                loading: false,
                serviceError: true
            })
        })
    }

    calculateTradeInDiscountPrice = async () => {
        console.log('SETTING TRADE IN DISCOUNT PRICE');
        this.setState({
            loading: true,
            serviceError: false
        })
        await this.getOrderForm().then(response => {
            let orderData = response;
            if (orderData && orderData.orderFormId) {
                let orderFormId = orderData.orderFormId;
                let selectedProdIndex = _.findIndex(orderData.items, { id: this.props.skuSelected.itemId })
                this.setState({
                    selectedProdIndex: selectedProdIndex
                })
                let currentSelectedItem = orderData.items[selectedProdIndex];
                let currentSellingPrice = orderData.items[selectedProdIndex].sellingPrice;
                let discountedSellingPrice = Number(Number(currentSellingPrice / 100).toFixed(2) - Number(this.state.tradeInPrice)).toFixed(2) * 100;
                discountedSellingPrice = Math.round(discountedSellingPrice)
                //let discountedSellingPrice = Number(Number(currentSellingPrice) - Number(this.state.tradeInPrice)).toFixed(2) * 100;
                let fieldsReq = {};
                if (discountedSellingPrice > 0) {
                    fieldsReq = {
                        "price": discountedSellingPrice
                    }
                } else {
                    fieldsReq = {
                        "price": 0
                    }
                }

                let priceServiceAPI = `${window.location.origin + (("undefined" != typeof __RUNTIME__ && null !== __RUNTIME__ ? __RUNTIME__.rootPath : void 0) || "")}/api/checkout/pub/orderForm/${orderFormId}/items/${selectedProdIndex}/price`;
                if (currentSelectedItem && !currentSelectedItem.manualPrice && !currentSelectedItem.manualPriceAppliedBy) {
                    this.updateDiscountPrice(fieldsReq, priceServiceAPI)
                } else {
                    this.setState({
                        isModalOpen: false,
                        loading: false,
                        serviceError: false
                    });
                    this.handleModalClose();
                }
            } else {
                this.setState({
                    loading: false,
                    serviceError: true
                })
            }
        }).catch(error => {
            this.setState({
                loading: false,
                serviceError: true
            })
        })
    }

    updateDiscountPrice = async (fieldsReq, priceServiceAPI) => {
        await this.setDiscountPrice(fieldsReq, priceServiceAPI).then(response => {
            console.log('UPDATE TRADE IN DATA IN MINICART - EVENT TRIGGERED')
            subscriber.next('CUSTOM_DATA_UPDATED');
            this.setState({
                isModalOpen: false,
                loading: false,
                serviceError: false
            });
            console.log('FINAL response', response)
            this.handleModalClose();
        }).catch(error => {
            this.setState({
                loading: false,
                serviceError: true
            });
            //this.props.showToast("Error applying Trade in discount")
        })
    }

    setDiscountPrice = (fieldsReq, priceServiceAPI) => {
        return new Promise((resolve, reject) => {
            axios.put(
                priceServiceAPI,
                fieldsReq
            ).then(
                (response) => {
                    let orderData = response.data;
                    console.log('COMPLETED TRADE IN DISCOUNT PRICE');
                    console.log('AFTER DISCOUNT PRICE SET - orderData', orderData)
                    //this.props.showToast("Trade in discount applied successfully")
                    resolve(orderData);
                },
                (error) => {
                    reject(error);
                }
            );
        });
    }

    handleAddTradeInToCart = async () => {
        console.log('ADD TO CART STARTED')
        this.setState({
            loading: true,
            serviceError: false
        });
        await this.getOrderForm().then(response => {
            let orderData = response;
            if (orderData && orderData.items && orderData.items.length > 0) {
                console.log(_.findIndex(orderData.items, { id: this.props.skuSelected.itemId }));
                if (_.findIndex(orderData.items, { id: this.props.skuSelected.itemId }) === -1) {
                    if (this.props.skuSelector && !this.props.skuSelector.areAllVariationsSelected) {
                        this.setState({
                            isModalOpen: false,
                            loading: false,
                            serviceError: false
                        });
                        this.handleModalClose();
                    } else {
                        document.getElementsByClassName('vtex-add-to-cart-button-0-x-buttonDataContainer')[0].click();
                    }
                } else {
                    /* to show product cannot be added again */
                    alert('Product already in cart. Cannot be added with Trade-in')
                    this.setState({
                        isModalOpen: false,
                        loading: false,
                        serviceError: false
                    });
                    this.handleModalClose();
                }
            } else {
                if (this.props.skuSelector && !this.props.skuSelector.areAllVariationsSelected) {
                    this.setState({
                        isModalOpen: false,
                        loading: false,
                        serviceError: false
                    });
                    this.handleModalClose();
                } else {
                    document.getElementsByClassName('vtex-add-to-cart-button-0-x-buttonDataContainer')[0].click();
                }
            }
        }).catch(error => {
            this.setState({
                loading: false,
                serviceError: true
            })
        })
    }

    handleCartEvents = async (message) => {
        if (message.data.event == "addToCart" && message.data.eventName == "vtex:addToCart") {
            if (message.data.items[0].skuId == this.props.skuSelected.itemId) {
                if (this.state.agreeTnC) {
                    console.log('ADD TO CART')
                    console.log('TRADE IN OPTED')
                    this.createTradeInQuote();
                } else {
                    console.log('ADD TO CART')
                    console.log('TRADE IN NOT OPTED')
                }
            }
        }
    }

    handleAnswerSelection = (index, value) => {
        let answerObj = { ...this.state.eligibilityAnswers };
        answerObj[`active` + index] = value;
        this.setState({
            eligibilityAnswers: answerObj
        }, () => {
            this.validateTradeInSelection();
            this.checkTradeInEligibility();
        })
    }

    render() {
        const {
            learnTradeIn,
            eligibilityLink,
            tncLink,
            eligibilityRequirement,
            selectYourDevice,
            manufacturerLabel,
            seriesLabel,
            variantLabel,
            eligibilityReqTitle,
            readEligibilityLinkTitle,
            tradeInValueTitle,
            newDevicePriceTitle,
            estimatedDiscountedPriceTitle,
            effectivePriceTitle,
            agreeTnCTitle,
            cancelBtnText,
            addToCartBtnText
        } = this.props;
        return (
            <>
                {
                    this.state.availableForTradeIn ?
                        <div className={`moto-trade-in-wrapper ${this.state.tradeInAppAvailable || this.state.tradeInOpted ? "selected" : ""}`}>
                            <div className="mti-checkbox">
                                {
                                    this.state.tradeInAppAvailable ?
                                        <Checkbox
                                            checked={this.state.tradeInAppAvailable}
                                            id="option-1"
                                            name="default-checkbox-group"
                                            onChange={this.tradeInOptChange}
                                            value="option-1"
                                            disabled={this.state.tradeInAppAvailable}
                                        />
                                        :
                                        <Checkbox
                                            checked={this.state.tradeInOpted}
                                            id="option-1"
                                            name="default-checkbox-group"
                                            onChange={this.tradeInOptChange}
                                            value="option-1"
                                        />
                                }

                            </div>
                            {
                                this.state.tradeInAppAvailable ?
                                    <div className="mti-label">
                                        <label htmlFor="option-1" className="mti-label-content">
                                            <img className="mti-logo" src={tradeInLogo} /> discount of <span className="mti-off-value">${this.state.tradeInAvailablePrice} </span> applied on your purchase
                                        </label>
                                    </div>
                                    :
                                    <div className="mti-label">
                                        <label htmlFor="option-1" className="mti-label-content">
                                            <div style={{display: 'inline'}} dangerouslySetInnerHTML={{ __html: this.props.pdpTradeInText.replace(/{tradeInValue}/g, this.state.estimatedTradeInValueExists ? Number(Number(this.props.sellingPrice) - Number(this.state.tradeInValue)) > 0 ? (Number(Number(this.props.sellingPrice) - Number(this.state.tradeInValue)).toFixed(2)) : '1.00' : '1.00') }}></div> <img className="mti-logo" style={{display: 'inline'}} src={tradeInLogo} />
                                        </label>
                                    </div>
                            }
                            <Modal
                                centered
                                isOpen={this.state.isModalOpen}
                                onClose={this.handleModalClose}
                                closeOnOverlayClick={false}
                                showCloseIcon={true}
                                className="trade-in-modal">
                                <div className="tim-content">
                                    {
                                        this.state.loading &&
                                        <div id="tim-cover-spin">
                                            <Spinner block={true} />
                                        </div>

                                    }
                                    <div className="tim-left-section tim-mrt-25">
                                        <div className="tim-modal-logo">
                                            <img src={tradeInLogoModal} />
                                        </div>
                                        <div className="tim-link-section">
                                            {
                                                learnTradeIn &&
                                                <a className="tim-learn-more" href={learnTradeIn.learnLinkURL} target={learnTradeIn.openLearnMoreInNewTab ? "_blank" : ""}>{learnTradeIn.learnLinkText} <IconExternalLink size={12} /></a>
                                            }

                                        </div>
                                        <div className="tim-device-selection">
                                            <h5 className="tim-title">{selectYourDevice}</h5>
                                            <div className="mb5">
                                                <Dropdown
                                                    label={manufacturerLabel}
                                                    options={this.state.manufacturersList}
                                                    value={this.state.selectedManufacturer}
                                                    onChange={this.handleManufacturerSelect}
                                                />
                                            </div>
                                            <div className="mb5">
                                                <Dropdown
                                                    label={seriesLabel}
                                                    options={this.state.productFamiliesList}
                                                    value={this.state.selectedSeries}
                                                    onChange={this.handleSeriesSelect}
                                                />
                                            </div>
                                            <div className="mb5">
                                                <Dropdown
                                                    label={variantLabel}
                                                    options={this.state.productsList}
                                                    value={this.state.selectedProduct}
                                                    onChange={this.handleSelectedProduct}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="tim-divider"></div>
                                    <div className="tim-right-section vtex-styleguide-9-x-scrollBar tim-mlt-25">
                                        <div className="tim-requirement-section">
                                            {/*<h5 class="tim-requirement-title">{eligibilityReqTitle}</h5>
                                            <ul className="tim-eligibility-req" dangerouslySetInnerHTML={{ __html: eligibilityRequirement }}>
                                        </ul>*/}
                                            {
                                                this.props.eligibilityQuestions && this.props.eligibilityQuestions.map((item, index) => {
                                                    return (
                                                        <div>
                                                            <h5 className="tim-title">{item.question}</h5>
                                                            <div className="tim-ques-ans-set">
                                                                <div className="tim-ques">
                                                                    <p>{eligibilityRequirement}</p>
                                                                    <ul className="tim-eligibility-req" dangerouslySetInnerHTML={{ __html: item.eligibilityCondition }}>
                                                                    </ul>
                                                                </div>
                                                                <div className="tim-ans">
                                                                    <ButtonGroup
                                                                        buttons={[
                                                                            <Button
                                                                                isActiveOfGroup={this.state.eligibilityAnswers[`active` + index] === "yes"}
                                                                                onClick={() => this.handleAnswerSelection(index, "yes")}>
                                                                                Yes
                                                                            </Button>,
                                                                            <Button
                                                                                isActiveOfGroup={this.state.eligibilityAnswers[`active` + index] === "no"}
                                                                                onClick={() => this.handleAnswerSelection(index, "no")}>
                                                                                No
                                                                            </Button>
                                                                        ]}
                                                                    />
                                                                </div>
                                                            </div>
                                                        </div>
                                                    )
                                                })
                                            }
                                        </div>
                                        <div className="tim-link-section">
                                            <span>{readEligibilityLinkTitle} &nbsp;
                                                {
                                                    eligibilityLink &&
                                                    <a className="tim-eligibility-link" href={eligibilityLink.learnLinkURL} target={eligibilityLink.openLearnMoreInNewTab ? "_blank" : ""}>{eligibilityLink.learnLinkText}.<IconExternalLink size={12} /></a>
                                                }
                                            </span>
                                        </div>
                                        <div className="tim-trade-in-value-section">
                                            <h4 className="tim-trade-in-title">{tradeInValueTitle}</h4>
                                            <div className="tim-trade-in-estimated-section">
                                                <div className="tim-left">
                                                    {newDevicePriceTitle}
                                                </div>
                                                <div className="tim-right">
                                                    ${this.props.sellingPrice}
                                                </div>
                                            </div>
                                            <div className="tim-trade-in-estimated-section tim-pb24">
                                                <div className="tim-left">
                                                    {estimatedDiscountedPriceTitle}
                                                </div>
                                                <div className="tim-right">
                                                    {this.state.displayTradeInPrice == "" ? '$0' : this.state.displayTradeInPrice}
                                                </div>
                                            </div>
                                            <div className="tim-trade-in-estimated-section tim-effective-price tim-pb24">
                                                <div className="tim-left">
                                                    {effectivePriceTitle}
                                                </div>
                                                <div className="tim-right">
                                                    ${Number(this.props.sellingPrice - this.state.tradeInPrice).toFixed(2) > 0 ? Number(this.props.sellingPrice - this.state.tradeInPrice).toFixed(2) : "0.00"}
                                                </div>
                                            </div>
                                        </div>
                                        <div className="tim-checkbox tim-pt12">
                                            <Checkbox
                                                checked={this.state.agreeTnC}
                                                id="option-2"
                                                name="default-checkbox-group"
                                                onChange={this.handleAgreeTnC}
                                                value="option-2"
                                            />
                                        </div>
                                        <div className="tim-label tim-pt12">
                                            <label htmlFor="option-2" className="tim-label-content">
                                                {agreeTnCTitle} &nbsp;
                                                {
                                                    tncLink &&
                                                    <a className="tim-eligibility-link" href={tncLink.learnLinkURL} target={tncLink.openLearnMoreInNewTab ? "_blank" : ""}>{tncLink.learnLinkText}.<IconExternalLink size={12} /></a>
                                                }
                                            </label>
                                        </div>
                                        {
                                            this.state.serviceError &&
                                            <div className="tim-error-text">
                                                <div className="flex mv3 items-center">
                                                    <div className="pa3 br2 bg-danger--faded hover-bg-danger-faded active-bg-danger-faded c-danger hover-c-danger active-c-danger dib mr5 mv0 hover-b-danger active-b-danger ba ba--danger">{this.state.errorText}</div>
                                                </div>
                                            </div>
                                        }
                                        {
                                            this.state.tradeInEligible &&
                                            <div className="tim-error-text">
                                                <div className="flex mv3 items-center">
                                                    <div className="pa3 br2 hover-bg-danger-faded active-bg-danger-faded c-danger hover-c-danger active-c-danger dib mr5 mv0 hover-b-danger active-b-danger tim-error-text-style">Your device is not eligible for trade-in</div>
                                                </div>
                                            </div>
                                        }
                                        <div className="tim-button-group">
                                            <Button onClick={this.handleModalClose} variation="primary" id="tim-cancel-tradein">{cancelBtnText}</Button>
                                            <Button onClick={this.handleAddTradeInToCart} disabled={this.state.disableAddToCart} variation="primary" id="tim-confirm-tradein">{addToCartBtnText}</Button>
                                        </div>
                                    </div>
                                </div>
                            </Modal>
                        </div>
                        :
                        <></>
                }
            </>


        );
    }
}

MotoTradeIn.schema = {
    title: "Motorola Trade In",
    description: "Motorola Trade In",
    type: "object",
    properties: {
        pdpTradeInText: {
            type: "string",
            title: "PDP Trade-in text",
            description: "Click here to get this device as low as <span class='mti-off-value'>${tradeInValue}</span> with",
            default: "Click here to get this device as low as <span class='mti-off-value'>${tradeInValue}</span> with"
        },
        phobiaAPI: {
            type: "string",
            title: "Phobia API URL",
            default: 'https://staging.phob.io/api/v2'
        },
        phobiaUserName: {
            type: "string",
            title: "Phobia Username",
            default: "motorola_buyflow_api"
        },
        phobiaToken: {
            type: "string",
            title: "Phobia Password",
            default: "b191dced7bee4a40945cbc5c7f03aee5"
        },
        learnTradeIn: {
            type: "object",
            title: "Learn how trade in works link",
            properties: {
                learnLinkText: {
                    type: "string",
                    title: "Learn how trade in works Link text"
                },
                learnLinkURL: {
                    type: "string",
                    title: "Learn how trade in works Target URL"
                },
                openLearnMoreInNewTab: {
                    type: "boolean",
                    title: "Learn how trade in works - Open Link in New Tab",
                    default: true
                }
            }
        },
        eligibilityLink: {
            type: "object",
            description: "Read the full list of eligibility requirements link",
            properties: {
                learnLinkText: {
                    type: "string",
                    title: "Read the full list of eligibility requirements Link text"
                },
                learnLinkURL: {
                    type: "string",
                    title: "Read the full list of eligibility requirements link - Target URL"
                },
                openLearnMoreInNewTab: {
                    type: "boolean",
                    title: "Read the full list of eligibility requirements link - Open Link in New Tab",
                    default: true
                }
            }
        },
        tncLink: {
            type: "object",
            title: "Terms and Conditions link",
            properties: {
                learnLinkText: {
                    type: "string",
                    title: "Terms and Conditions Link text"
                },
                learnLinkURL: {
                    type: "string",
                    title: "Terms and Conditions Target URL"
                },
                openLearnMoreInNewTab: {
                    type: "boolean",
                    title: "Terms and Conditions - Open Link in New Tab",
                    default: true
                }
            }
        },
        eligibilityRequirement: {
            type: "string",
            title: "Eligibility Requirement Condition",
            description: "Select'Yes' if:"
        },
        "eligibilityQuestions": {
            "type": "array",
            "title": "Eligibility Questions",
            "items": {
                "type": "object",
                "properties": {
                    "question": {
                        "type": "string",
                        "title": "Question"
                    },
                    "eligibilityCondition": {
                        type: "string",
                        title: "Eligibility Conditions",
                        widget: {
                            "ui:widget": "textarea"
                        },
                        description: "Give the content as <li> tags"
                    }
                }
            }
        },
        selectYourDevice: {
            type: "string",
            title: "Select your device text",
            default: "Select your device"
        },
        manufacturerLabel: {
            type: "string",
            title: "Manufacturer Label",
            default: "Manufacturer"
        },
        seriesLabel: {
            type: "string",
            title: "Series Label",
            default: "Series"
        },
        variantLabel: {
            type: "string",
            title: "Variant Label",
            default: "Variant"
        },
        eligibilityReqTitle: {
            type: "string",
            title: "Eligibility Requirement Title",
            default: "Eligibility requirements"
        },
        readEligibilityLinkTitle: {
            type: "string",
            title: "Eligibility Link Title",
            default: "Read the full list of eligibility requirements"
        },
        tradeInValueTitle: {
            type: "string",
            title: "Trade In Value Title",
            default: "Trade in value"
        },
        newDevicePriceTitle: {
            type: "string",
            title: "New device price Title",
            default: "New device price"
        },
        estimatedDiscountedPriceTitle: {
            type: "string",
            title: "Estimated discount value Title",
            default: "Estimated discount value"
        },
        effectivePriceTitle: {
            type: "string",
            title: "Effective price after trade-in Title",
            default: "Effective price after trade-in"
        },
        agreeTnCTitle: {
            type: "string",
            title: "Agree TnC Title",
            default: "I agree to the moto trade-in"
        },
        cancelBtnText: {
            type: "string",
            title: "Cancel button text",
            default: "Cancel"
        },
        addToCartBtnText: {
            type: "string",
            title: "Add to cart button text",
            default: "Add to cart"
        }
    }
}

const withAddToCart = graphql(addToCart, { name: "addItems" });

export default compose(
    orderFormConsumer,
    withAddToCart,
    withRuntimeContext,
    withApollo,
    withPixel,
    //withToast
)(MotoTradeIn);