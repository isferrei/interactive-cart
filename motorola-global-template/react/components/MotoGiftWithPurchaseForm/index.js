import React, { useState, useEffect } from "react";
import "./MotogiftWithPurchaseForm.global.css"
import { Link } from "vtex.render-runtime";
import { Input, Button, DatePicker} from 'vtex.styleguide';
import MotoGiftWithPurchaseThankYou from "../MotoGiftWithPurchaseThankYou/index"
import axios from 'axios';
import Cookies from "universal-cookie";
import { getRootPath } from "../../utils/helpers";
import { setApiHeaders } from "../../utils/config";
import { withRuntimeContext } from "vtex.render-runtime";
import { prepareAccountUrl } from "../MotoRegistration/Common/Handlers";

class MotoGiftWithPurchaseForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            fields: {
                firstName: '',
                lastName: '',
                address: '',
                city: '',
                postalCode: '',
                email: '',
                phone: '',
                serialNumber: '',
                purchaseDate:'',
                purchaseDateField:'',
            },
            optincheck: false,
            termsCheck: false,
            errors: {},
            formSubmitted: false,
            
        }
        
        this.handleChange = this.handleChange.bind(this);
        this.setPurchaseDate=this.setPurchaseDate.bind(this);
    }
    static schema = {
        title: "Gift with Purchase Form",
        description: "Gift with Purchase Form",
        type: "object",
        properties: {
            giftwithPurchaseDesc: {
                title: "Gift with Purchase description title",
                type: "string",
                description: "Gift with Purchase description title desc",
                widget: {
                    "ui:widget": "textarea"
                }
            },
            firstNameLabel: {
                title: "First Name field",
                type: "string",
                default: "First Name"
            },
            lastNameLabel: {
                title: "last Name field",
                type: "string",
                default: "Last Name"
            },
            address: {
                title: "Address field",
                type: "string",
                default: "Address"
            },
            city: {
                title: "City field",
                type: "string",
                default: "City"
            },
            province: {
                title: "Province field",
                type: "string",
                default: "Province"
            },
            postalCode: {
                title: "Postal Code field",
                type: "string",
                default: "Postal code"
            },
            email: {
                title: "Email field",
                type: "string",
                default: "Email"
            },
            phone: {
                title: "Phone field",
                type: "string",
                default: "Phone"
            },
            placeOfPurchase: {
                title: "Place of Purchase field",
                type: "string",
                default: "Place of Purchase"
            },
            dateOfPurchase: {
                title: "Date of Purchase field",
                type: "string",
                default: "Date of Purchase"
            },
            channel: {
                title: "Channel field",
                type: "string",
                default: "Channel"
            },
            serialNumber: {
                title: "Serial Number field",
                type: "string",
                default: "Serial Number (IMEI)"
            },
            imeiDesc: {
                title: "IMEI Description",
                type: "string",
                default: "The IMEI can be found by dialing *#06# on your phone."
            },
            condition: {
                title: "Condition",
                type: "string",
                default: "Only new motorola one 5G ace devices purchased between November 18,2021 and Januaury 4,2022 are valid will be accepted as part of promotion."
            },
            privacypolicy: {
                title: "Privacy Description",
                type: "string",
                default: "I agree to receive the product information and special promtional offers by email from Motorola, and I confirm that I am 16 years of age or older.Privacy Policy."
            },
            terms: {
                title: "Terms and conditions Description",
                type: "string",
                default: "I have read and agree to the terms of use"
            },
            submitBtnText: {
                title: "Submit Button Text",
                type: "string",
                default: "Submit"
            },
            resetLink: {
                title: "Reset Link Text",
                type: "string",
                default: "Reset"
            },
            provinceList: {
                title: 'Province List',
                type: "array",
                items: {
                    title: "Category item",
                    type: "object",
                    properties: {
                        provincelist: {
                            type: "string",
                            title: "Province List Names",
                        }
                    }
                }
            },
            placepurchaseList: {
                title: 'Place Of purchase List',
                type: "array",
                items: {
                    title: "Category item",
                    type: "object",
                    properties: {
                        purchaseList: {
                            type: "string",
                            title: "Place Of purchase Names",
                        }
                    }
                }
            },
            channelList: {
                title: 'Channel List',
                type: "array",
                items: {
                    title: "Category item",
                    type: "object",
                    properties: {
                        chnlList: {
                            type: "string",
                            title: "Channel List items",
                        }
                    }
                }
            },
            monthList: {
                title: 'Month List',
                type: "array",
                items: {
                    title: "Category item",
                    type: "object",
                    properties: {
                        mnthList: {
                            type: "string",
                            title: "Date List items",
                        }
                    }
                }
            },
            dateList: {
                title: 'Date List',
                type: "array",
                items: {
                    title: "Category item",
                    type: "object",
                    properties: {
                        dateValList: {
                            type: "string",
                            title: "Date List items",
                        }
                    }
                }
            },
            yearList: {
                title: 'Year List',
                type: "array",
                items: {
                    title: "Category item",
                    type: "object",
                    properties: {
                        yearValList: {
                            type: "string",
                            title: "Year List items",
                        }
                    }
                }
            },
            prefLanguage: {
                title: "Enter the Preferred Language value (en/fr)",
                type: "string",
                default: "en"
            },
            webCampaign: {
                title: "Enter the Web Campaign value",
                type: "string",
                default: "ECOMM_NA_CA_EN_REGISTRATION_GIFTWITHPURCHASE"
            },
            fieldEmptyErrorText: {
                type: 'string',
                title: 'Field Empty Error Message Text'
            },
            postalCodeErrorText: {
                type: 'string',
                title: 'Postal Code Error message text'
            },
            serialNumInvalidText: {
                type: 'string',
                title: 'IMEI invalid text'
            },
            optinErrortext: {
                type: 'string',
                title: 'Error text if privacy policy is not checked'
            },
            termsErrortext: {
                type: 'string',
                title: 'Error text if terms and conditions is not checked'
            },
            gwpthankyouheader: {
                type: "string",
                title: "Header",
                default: "THANK YOU!"
            },
            gwpthankyouLogo: {
                title: "Motorola Logo Image",
                type: "string",
                description: "Motorola Logo Image",
                widget: {
                    'ui:widget': 'image-uploader',
                }
            },
            gwpthankyouLogoAltText: {
                default: "Logo",
                title: "Motorola Logo Image alt text",
                type: "string"
            },
            gwpthankyousectionHeading: {
                type: "string",
                title: "Sub header",
                default: "You have successfully registered with the following information:"
            },
            gwpthankyouvalidate: {
                type: "string",
                title: "Order information content",
                default: "We will validate your information and release your Lenovo Chromebook 330e."
            },
            gwpthankyounotifymail: {
                type: "string",
                title: "Application Status content",
                default: "You will receive an email to notify you of application status change and with tracking information when your order has shipped."
            },
            gwpthankyouregards: {
                type: "string",
                title: "Regards content",
                default: "Thank You"
            },
            gwpthankyouSignature: {
                type: "string",
                title: "Signature content",
                default: "Motorola Canada"
            }
        }
    };

    handleValidation = () => {
        let errors = {};
        debugger
        if (this.state.fields.firstName.length === 0) {
            errors["firstNameemptyField"] = `${this.props.fieldEmptyErrorText}`;
        }
        if (this.state.fields.lastName.length === 0) {
            errors["lastNameemptyField"] = `${this.props.fieldEmptyErrorText}`;
        }
        if (this.state.fields.address.length === 0) {
            errors["addressemptyField"] = `${this.props.fieldEmptyErrorText}`;
        }
        if (this.state.fields.city.length === 0) {
            errors["cityemptyField"] = `${this.props.fieldEmptyErrorText}`;
        }
        if (this.state.fields.email.length === 0) {
            errors["emailemptyField"] = `${this.props.fieldEmptyErrorText}`;
        }
        if (this.state.fields.phone.length === 0) {
            errors["phoneemptyField"] = `${this.props.fieldEmptyErrorText}`;
        }
        if (this.state.fields.purchaseDate.length === 0) {
            errors["purchaseDateemptyFiels"] = `${this.props.fieldEmptyErrorText}`;
        }
        if (this.state.fields.serialNumber.length === 0) {
            errors["serialNum"] = `${this.props.fieldEmptyErrorText}`;
        }

        if (!this.state.optincheck) {
            errors["optInCheck"] = `${this.props.optinErrortext}`;
        }

        if (!this.state.termsCheck) {
            errors["termsCheck"] = `${this.props.termsErrortext}`;
        }

        if (this.state.fields.serialNumber.length !== 15) {
            errors["serialNumIvalid"] = `${this.props.serialNumInvalidText}`;
        }
        if (this.state.fields.postalCode.length === 0) {
            errors["postalCodeemptyField"] = `${this.props.fieldEmptyErrorText}`;
        }
        else {
            const validPcRegex = RegExp(/^[ABCEGHJ-NPRSTVXY]\d[ABCEGHJ-NPRSTV-Z][ -]?\d[ABCEGHJ-NPRSTV-Z]\d$/i);
            if (!(validPcRegex.test(this.state.fields.postalCode))) {
                errors["postalCodeerrorField"] = `${this.props.postalCodeErrorText}`;
            }
        }

        if (Object.keys(errors).length === 0) {
            return true
        } else {
            this.setState({
                errors: errors
            }, () => {
                return false;
            });
        }
    }

    componentDidMount() {
        this.setState({
            fields: {
                province: this.props.provinceList?.map(item => item.provincelist)[0],
                placeOfPurchase: this.props.placepurchaseList?.map(item => item.purchaseList)[0],
                channel: this.props.channelList?.map(item => item.chnlList)[0],
                month: this.props.monthList?.map(item => item.mnthList)[0],
                date: this.props.dateList?.map(item => item.dateValList)[0],
                year: this.props.yearList?.map(item => item.yearValList)[0],
                purchaseDate:'',
                firstName: '',
                lastName: '',
                address: '',
                city: '',
                postalCode: '',
                email: '',
                phone: '',
                serialNumber: '',
                purchaseDateField:''
            },
        });
    }

    handleChange(field, e) {
        let fields = this.state.fields;
        fields[field] = e.target.value;
        this.setState({ fields });
    }
setPurchaseDate(date){
    var datestr = new Date(date);
    let fields = this.state.fields;
    fields["purchaseDate"] = datestr.getMonth()+1 + '/' + datestr.getDate() + '/' + datestr.getFullYear();
    
    fields["purchaseDateField"]=date
        this.setState({ fields });
}
    resetAll = () => {
        this.setState({
            fields: {
                province: this.props.provinceList?.map(item => item.provincelist)[0],
                placeOfPurchase: this.props.placepurchaseList?.map(item => item.purchaseList)[0],
                channel: this.props.channelList?.map(item => item.chnlList)[0],
                month: this.props.monthList?.map(item => item.mnthList)[0],
                date: this.props.dateList?.map(item => item.dateValList)[0],
                year: this.props.yearList?.map(item => item.yearValList)[0],
                purchaseDate:'',
                firstName: '',
                lastName: '',
                address: '',
                city: '',
                postalCode: '',
                email: '',
                phone: '',
                serialNumber: '',
                purchaseDateField:''
            },
            optincheck: false,
            termsCheck: false
            
        });
    }

    contactSubmit = () => {
        if (this.handleValidation()) {
            const cookies = new Cookies();
            const accountUrl = prepareAccountUrl(cookies.get("vtex_binding_address"));
            const serviceURL = `${getRootPath}/api/dataentities/GP/documents`

            let data = {
                ...this.state.fields,
                webCampaign: this.props.webCampaign,
                optIn: this.state.optincheck,
                terms: this.state.termsCheck,
                id: `${this.state.fields.serialNumber}`,
            };
            //passing form data to master data
            axios.put(serviceURL, data, {
                //headers: setApiHeaders(this.props.runtime.account)
            }).then(res => {
                if (res) {
                    console.log("sucess");
                }
            });

            // passing form data to cloud
            axios.post(
                `${accountUrl}` + '/motosubscriber',
                {
                    "email": this.state.fields.email,
                    "firstName": this.state.fields.firstName,
                    "lastName": this.state.fields.lastName,
                    "optIn": this.state.optincheck ? "Y" : "N",
                    "ageConfirm": "Y",
                    "prefLanguage": this.props.prefLanguage,
                    "webCampaign": this.props.webCampaign,
                    "billToCountry": "CA"
                }
            ).then(res => {
                if (res.status === 200) {
                    console.log("sucess")
                }
            })
            this.setState({ formSubmitted: !this.state.formSubmitted });
        }
    }

    render() {
        const { giftwithPurchaseDesc, firstNameLabel, lastNameLabel, address, city, province, postalCode, email, phone, placeOfPurchase, dateOfPurchase, channel, serialNumber, imeiDesc, condition, terms, privacypolicy, submitBtnText, resetLink, fieldEmptyErrorText, postalCodeErrorText, serialNumInvalidText, provinceList, placepurchaseList, channelList, monthList, dateList, yearList, optinErrortext, termsErrortext } = this.props;
        return (
            <>
                {this.state.formSubmitted ?
                    (<MotoGiftWithPurchaseThankYou formProps={this.props} formFields={this.state.fields} />)
                    :
                    (<div className="gift-with-purchase">
                        <div className="form-container">
                            <p className="gwp-desc" dangerouslySetInnerHTML={{ __html: giftwithPurchaseDesc }}></p>
                            <form className="form-content" onSubmit={this.contactSubmit.bind(this)}>
                                <div className="form-field">
                                    <div className="field-labels">
                                        <label dangerouslySetInnerHTML={{ __html: firstNameLabel }} ></label>
                                        <span class="red-star">*</span>
                                    </div>
                                    <Input
                                        type="text"
                                        name="firstName"
                                        value={this.state.fields.firstName}
                                        onChange={this.handleChange.bind(this, "firstName")}
                                    />
                                </div>
                                {this.state.errors.firstNameemptyField && (this.state.fields.firstName === "") ? <div className="error-text-input">{this.state.errors.firstNameemptyField}</div> : null}
                                <div className="form-field">
                                    <div className="field-labels">
                                        <label dangerouslySetInnerHTML={{ __html: lastNameLabel }} ></label>
                                        <span class="red-star">*</span>
                                    </div>
                                    <Input
                                        type="text"
                                        name="lastName"
                                        value={this.state.fields.lastName}
                                        onChange={this.handleChange.bind(this, "lastName")}
                                    />
                                </div>
                                {this.state.errors.lastNameemptyField && (this.state.fields.lastName === "") ? <div className="error-text-input">{this.state.errors.lastNameemptyField}</div> : null}
                                <div className="form-field">
                                    <div className="field-labels">
                                        <label dangerouslySetInnerHTML={{ __html: address }} ></label>
                                        <span class="red-star">*</span>
                                    </div>
                                    <Input
                                        type="text"
                                        name="addressval"
                                        value={this.state.fields.address}
                                        onChange={this.handleChange.bind(this, "address")}
                                    />
                                </div>
                                {this.state.errors.addressemptyField && (this.state.fields.address === "") ? <div className="error-text-input">{this.state.errors.addressemptyField}</div> : null}
                                <div className="form-field">
                                    <div className="field-labels">
                                        <label dangerouslySetInnerHTML={{ __html: city }} ></label>
                                        <span class="red-star">*</span>
                                    </div>
                                    <Input
                                        type="text"
                                        name="cityval"
                                        value={this.state.fields.city}
                                        onChange={this.handleChange.bind(this, "city")}
                                    />
                                </div>
                                {this.state.errors.cityemptyField && (this.state.fields.city === "") ? <div className="error-text-input">{this.state.errors.cityemptyField}</div> : null}
                                <div className="form-field-select">
                                    <div className="field-labels-select">
                                        <label dangerouslySetInnerHTML={{ __html: province }} ></label>
                                        <span class="red-star">*</span>
                                    </div>
                                    <select
                                        className="multi-select-province"
                                        onChange={this.handleChange.bind(this, "province")}
                                    >
                                        {provinceList?.map(val => (
                                            <option key={val.provincelist} value={val.provincelist}>{val.provincelist}</option>
                                        ))}
                                    </select>
                                </div>
                                {this.state.errors.provinceemptyField && (this.state.fields.province === "") ? <div className="error-text-input">{this.state.errors.provinceemptyField}</div> : null}
                                <div className="form-field">
                                    <div className="field-labels">
                                        <label dangerouslySetInnerHTML={{ __html: postalCode }} ></label>
                                        <span class="red-star">*</span>
                                    </div>
                                    <Input
                                        type="text"
                                        name="postalCodeval"
                                        value={this.state.fields.postalCode}
                                        onChange={this.handleChange.bind(this, "postalCode")}
                                    />
                                </div>
                                {this.state.errors.postalCodeemptyField && (this.state.fields.postalCode === "") ? <div className="error-text-input">{this.state.errors.postalCodeemptyField}</div>
                                    :
                                    this.state.errors.postalCodeerrorField ? <div className="error-text-input">{this.state.errors.postalCodeerrorField}</div> : null
                                }
                                <div className="form-field">
                                    <div className="field-labels">
                                        <label dangerouslySetInnerHTML={{ __html: email }} ></label>
                                        <span class="red-star">*</span>
                                    </div>
                                    <Input
                                        name="emailval"
                                        value={this.state.fields.email}
                                        onChange={this.handleChange.bind(this, "email")}
                                    />
                                </div>
                                {this.state.errors.emailemptyField && (this.state.fields.email === "") ? <div className="error-text-input">{this.state.errors.emailemptyField}</div> : null}
                                <div className="form-field">
                                    <div className="field-labels">
                                        <label dangerouslySetInnerHTML={{ __html: phone }} ></label>
                                        <span class="red-star">*</span>
                                    </div>
                                    <Input
                                        type="text"
                                        name="phoneval"
                                        value={this.state.fields.phone}
                                        onChange={this.handleChange.bind(this, "phone")}
                                    />
                                </div>
                                {this.state.errors.phoneemptyField && (this.state.fields.phone === "") ? <div className="error-text-input">{this.state.errors.phoneemptyField}</div> : null}
                                <div className="form-field-select">
                                    <div className="field-labels-select">
                                        <label dangerouslySetInnerHTML={{ __html: placeOfPurchase }} ></label>
                                        <span class="red-star">*</span>
                                    </div>
                                    <select
                                        className="multi-select"
                                        onChange={this.handleChange.bind(this, "placeOfPurchase")}
                                        errorMessage={this.state.errors.emptyField}
                                    >
                                        {placepurchaseList?.map(val => (
                                            <option key={val.purchaseList} value={val.purchaseList}>{val.purchaseList}</option>
                                        ))}
                                    </select>
                                </div>
                                {this.state.errors.placeOfPurchaseemptyField && (this.state.fields.placeOfPurchase === "") ? <div className="error-text-input">{this.state.errors.placeOfPurchaseemptyField}</div> : null}
                                <div className="form-field-select">
                                    <div className="field-labels-select">
                                        <label dangerouslySetInnerHTML={{ __html: channel }} ></label>
                                    </div>
                                    <select
                                        className="multi-select"
                                        onChange={this.handleChange.bind(this, "channel")}
                                        errorMessage={this.state.errors.emptyField}
                                    >
                                        {channelList?.map(val => (
                                            <option key={val.chnlList} value={val.chnlList}>{val.chnlList}</option>
                                        ))}
                                    </select>
                                </div>
                                {this.state.errors.channeleemptyField && (this.state.fields.channel === "") ? <div className="error-text-input">{this.state.errors.channeleemptyField}</div> : null}
                                <div className="form-field">
                                    <div className="field-labels">
                                        <label dangerouslySetInnerHTML={{ __html: dateOfPurchase }} ></label>
                                        <span class="red-star">*</span>
                                    </div>
                                    <DatePicker
      label=""
      size="regular"
      dateFormat="MM/DD/YYYY"
      value={this.state.fields.purchaseDateField}
      onChange={date=>this.setPurchaseDate(date)}
      maxDate={new Date()}
      align="left"
      useTime={false}
      errorMessage={this.state.errors.emptyField}
      locale="en-US"
    />
    
    
                                </div>
                                {this.state.errors.purchaseDateemptyFiels && (this.state.fields.purchaseDate === "") 
                                    ?
                                    <div className="error-text-input">{this.state.errors.purchaseDateemptyFiels}</div> : null}

                                <div className="form-field">
                                    <div className="field-labels">
                                        <label dangerouslySetInnerHTML={{ __html: serialNumber }} ></label>
                                        <span class="red-star">*</span>
                                    </div>
                                    <Input
                                        type="text"
                                        name="serialNumberval"
                                        value={this.state.fields.serialNumber}
                                        onChange={this.handleChange.bind(this, "serialNumber")}
                                    />
                                </div>
                                {this.state.errors.serialNum && (this.state.fields.serialNumber === "") ? <div className="error-text-input">{this.state.errors.serialNum}</div>
                                    :
                                    this.state.errors.serialNumIvalid && (this.state.fields.serialNumber !== "") ? <div className="error-text-input">{this.state.errors.serialNumIvalid}</div> : null}
                            </form>
                            <p className="imeiDesc-text">{imeiDesc}</p>
                            <p className="condition-desc">{condition}</p>
                            <div className="privacy-policy-section">
                                <input
                                    checked={this.state.optincheck}
                                    type="checkbox"
                                    id="privacy-policy"
                                    name="privacy-policy"
                                    onChange={
                                        e => this.setState({ optincheck: !this.state.optincheck })}
                                /> <div className="privacypolicy">{privacypolicy}</div>
                            </div>
                            {this.state.errors.optInCheck && (!this.state.optincheck) ? <div className="error-text">{optinErrortext}</div> : null}
                            <div className="terms-conditions">
                                <input
                                    type="checkbox"
                                    id="terms-check"
                                    name="terms-check"
                                    onChange={e => this.setState({ termsCheck: !this.state.termsCheck })}
                                />  <div className="terms">{terms}</div>
                            </div>
                            {this.state.errors.termsCheck && (!this.state.termsCheck) ? <div className="error-text">{termsErrortext}</div> : null}
                            <div className="cta-section">
                                {submitBtnText ? (
                                    <input
                                        type="button"
                                        className="submit-cta"
                                        onClick={this.contactSubmit.bind(this)}
                                        value={submitBtnText}
                                    />

                                ) : null}
                                <div
                                    className="reset-link"
                                    onClick={this.resetAll}
                                >
                                    {resetLink}
                                </div>
                            </div>
                        </div>
                    </div>)
                }
            </>
        )
    }
}


export default withRuntimeContext(MotoGiftWithPurchaseForm);