import React from "react";
import "./ContactEntepriseForm.global.css";
import InputField from "./components/InputField/index";
import SelectField from "./components/SelectField/index";
import TextareaField from "./components/TextareaField/index";
import OptionField from "./components/OptionField/index";
import { ReCaptcha } from "react-recaptcha-google";
import axios from "axios";
import { getRootPath } from "../../utils/helpers";
import { setApiHeaders } from "../../utils/config";
import { withRuntimeContext } from "vtex.render-runtime";
import { orderFormConsumer } from "vtex.store-resources/OrderFormContext";

class ContactEnterpriseForm extends React.Component {
  static schema = {
    title: "Contact Enterprise",
    description: "Contact Enterprise",
    type: "object",
    properties: {
      useProductList: {
        type: "boolean",
        title: "Use Contact Enterprise Product List",
        default: false
      },
      productList: {
        items: {
          title: "Product List items",
          type: "object",
          properties: {
            productName: {
              default: "",
              title: "Name",
              type: "string"
            },
            productValue: {
              default: "",
              title: "Value",
              type: "string"
            }
          }
        },
        minItems: 1,
        title: "ProductList",
        type: "array"
      }
    }
  }


  state = {
    captchaValidated: true,
    retURL: "",
    industries: [
      { value: "", name: "--None--" },
      { value: "Agriculture", name: "Agriculture" },
      { value: "Apparel", name: "Apparel" },
      { value: "Banking", name: "Banking" },
      { value: "Biotechnology", name: "Biotechnology" },
      { value: "Chemicals", name: "Chemicals" },
      { value: "Communications", name: "Communications" },
      { value: "Construction", name: "Construction" },
      { value: "Consulting", name: "Consulting" },
      { value: "Education K-12", name: "Education K-12" },
      { value: "Electronics", name: "Electronics" },
      { value: "Energy", name: "Energy" },
      { value: "Engineering", name: "Engineering" },
      { value: "Entertainment", name: "Entertainment" },
      { value: "Environmental", name: "Environmental" },
      { value: "Finance", name: "Finance" },
      { value: "Food &amp; Beverage", name: "Food &amp; Beverage" },
      { value: "Government Federal", name: "Government Federal" },
      { value: "Healthcare", name: "Healthcare" },
      { value: "Hospitality", name: "Hospitality" },
      { value: "Insurance", name: "Insurance" },
      { value: "Machinery", name: "Machinery" },
      { value: "Manufacturing", name: "Manufacturing" },
      { value: "Media", name: "Media" },
      { value: "Not For Profit", name: "Not For Profit" },
      { value: "Recreation", name: "Recreation" },
      { value: "Retail", name: "Retail" },
      { value: "Shipping", name: "Shipping" },
      { value: "Technology", name: "Technology" },
      { value: "Telecommunications", name: "Telecommunications" },
      { value: "Transportation", name: "Transportation" },
      { value: "Utilities", name: "Utilities" },
      {
        value: "Professional/Technical Services",
        name: "Professional/Technical Services"
      },
      { value: "Government State/Local", name: "Government State/Local" },
      { value: "Other", name: "Other" },
      { value: "Education - Higher", name: "Education - Higher" },
      { value: "Education", name: "Education" },
      { value: "Government", name: "Government" },
      { value: "State/Local Govt", name: "State/Local Govt" }
    ],
    areasOfInterests: [
      { value: "", name: "--None--" },
      { value: "Quote", name: "Quote" },
      { value: "Purchase Question", name: "Purchase Question" },
      { value: "Re-sell Opportunity", name: "Re-sell Opportunity" },
      { value: "Other", name: "Other" }
    ],
    leadSources: [
      {
        value: "Web",
        name: "Web"
      }
    ],
    productList: [{
      name: "", value: ""
    }],
    isCorporateCustomer: false,
    grecaptchaLoaded: false
  };

  componentDidMount() {
    // if (this.captcha) {
    //   console.log("started, just a second...");
    //   this.captcha.reset();
    // }
    this.setState({
      retURL:
        window.location.origin +
        getRootPath +
        "/products/android-enterprise-recommended-smartphones/thank_you"
    });
    this.getConfigProductListsForAllUsers();
    this.grecaptchaFn = setInterval(
      () => this.checkGreptchaValue(),
      1000
    );
  }

  componentDidUpdate(prevProps) {
    if (prevProps.orderFormContext.orderForm !== this.props.orderFormContext.orderForm) {
      this.getConfigProductListsForAllUsers();
    }
  }

  setProductLists = () => {
    if (this.props.orderFormContext.orderForm && this.props.orderFormContext.orderForm.userProfileId && this.props.orderFormContext.orderForm.userProfileId != null && this.props.orderFormContext.orderForm.userProfileId != '') {
      let userId = this.props.orderFormContext.orderForm.userProfileId;
      this.getCustomerType(userId)
    } else {
      this.getProductList();
    }
  }

  componentWillUnmount() {
    clearInterval(this.grecaptchaFn);
  }

  checkGreptchaValue = () => {
    if (window.grecaptcha && window.grecaptcha.render) {
      this.setState({
        grecaptchaLoaded: true
      }, () => {
        clearInterval(this.grecaptchaFn);
      })
    }
  }

  getCustomerType = (userId) => {
    const serviceURL = `${getRootPath}/api/dataentities/CL/search/?userId=${userId}&_fields=isCorporate`
    axios.get(serviceURL, {
      //headers: setApiHeaders(this.props.runtime.account)
    })
      .then(response => {
        if (response && response.data) {

          this.setState({
            isCorporateCustomer: response.data[0].isCorporate
          }, () => {
            this.getProductList();
          })

        }
      })
  }

  getProductList = () => {
    if (this.state.isCorporateCustomer && this.props.useProductList) {
      let productList = [];
      if (this.props.productList) {
        this.props.productList.map(product => {
          productList.push({
            name: product.productName,
            value: product.productValue
          })
        })
      }
      this.setState({
        productList: productList
      })
    } else {
      this.setState({
        productList: [
          {
            name: "moto g⁷",
            value: "moto g⁷"
          },
          {
            name: "moto g⁷ play",
            value: "moto g⁷ play"
          },
          {
            name: "moto g⁷ power",
            value: "moto g⁷ power"
          },
          {
            name: "moto z⁴",
            value: "moto z⁴"
          },
          {
            name: "moto z³ play",
            value: "moto z³ play"
          }
        ]
      })
    }
  }

  getConfigProductListsForAllUsers = () => {
    if (this.props.useProductList) {
      let productList = [];
      if (this.props.productList) {
        productList.push(
          {
            name: "--None--",
            value: ""
          }
        )
        this.props.productList.map(product => {
          productList.push({
            name: product.productName,
            value: product.productValue
          })
        })
      }
      this.setState({
        productList: productList
      })
    } else {
      this.setState({
        productList: [
          {
            name: "--None--",
            value: ""
          },
          {
            name: "moto g stylus",
            value: "moto g stylus"
          },
          {
            name: "moto g power",
            value: "moto g power"
          },
          {
            name: "moto g fast",
            value: "moto g fast"
          },
          {
            name: "motorola edge",
            value: "motorola edge"
          },
          {
            name: "motorola one fusion+",
            value: "motorola one fusion+"
          },
          {
            name: "motorola one 5G",
            value: "motorola one 5G"
          },
          {
            name: "motorola one zoom",
            value: "motorola one zoom"
          },
          {
            name: "razr (2019)",
            value: "razr (2019)"
          },
          {
            name: "razr (2020)",
            value: "razr (2020)"
          },{
            name: "moto e (2020)",
            value: "moto e (2020)"
          }
        ]
      })
    }
  }

  verifyCallback = async recaptchaToken => {
    try {
      const response = (
        await axios({
          method: "get",
          url: `${getRootPath}/_v/captcha?token=${recaptchaToken}`
        })
      ).data;
      if (response.success) {
        this.setState({ captchaValidated: true });
      }
    } catch (error) {

    }
    // Here you will get the final recaptchaToken!!!
    // secret	Required. The shared key between your site and reCAPTCHA.
    // response	Required. The user response token provided by the reCAPTCHA client-side integration on your site.
    // remoteip	Optional. The user's IP address.
    // console.log(recaptchaToken, "<= your recaptcha token")
  };

  onLoadRecaptcha = async () => {
    if (this.captcha) {
      this.captcha.reset();
    }
  };

  render() {
    return (
      <>
        <div className="contact-enterprise-form-container">
          <div className="contact-enterprise-header">
            contact our business sales team
          </div>
          <div className="contact-enterprise-sub-header">
            For help with large volume purchases, provide your contact info and
            a member of our sales team will reach out to you shortly.
          </div>
          <form
            action="https://webto.salesforce.com/servlet/servlet.WebToLead?encoding=UTF-8"
            method="POST"
            className="contact-enterprise-form-content"
          >
            <input type="hidden" name="oid" value="00D400000008Lso" />
            <input
              type="hidden"
              name="lead_source"
              id="lead_source"
              value="AER Web"
            />
            <input type="hidden" name="retURL" value={this.state.retURL} />

            <div className="contact-enteprise-inline-container">
              <InputField
                label="First name"
                inputId="first_name"
                inputName="first_name"
                maxLength="60"
                size="20"
                isRequired
              />
              <InputField
                label="Last name"
                inputId="last_name"
                inputName="last_name"
                maxLength="80"
                size="20"
                isRequired
              />
            </div>
            <div className="contact-enteprise-inline-container">
              <InputField
                label="Email"
                inputId="email"
                inputName="email"
                maxLength="80"
                type="email"
                size="20"
                isRequired
              />
              <InputField
                label="Phone"
                inputId="phone"
                inputName="phone"
                maxLength="40"
                size="20"
                pattern="[0-9]{3}[0-9]{3}[0-9]{4}"
                isRequired
              />
            </div>
            <div className="contact-enteprise-inline-container">
              <InputField
                label="Title"
                inputId="title"
                inputName="title"
                maxLength="40"
                size="20"
                isRequired
              />
              <InputField
                label="Company"
                inputId="company"
                inputName="company"
                maxLength="40"
                size="20"
                isRequired
              />
            </div>
            <div className="contact-enteprise-inline-container">
              <SelectField
                label="Industry"
                inputId="industry"
                inputName="industry"
                options={this.state.industries}
                isRequired
              />

              <InputField
                label="Employees"
                inputId="employees"
                inputName="employees"
                size="20"
                isRequired
              />
            </div>

            <div className="contact-enteprise-full-width-container">
              <SelectField
                label="Area of Interest"
                inputId="00N33000002ryFO"
                inputName="00N33000002ryFO"
                options={this.state.areasOfInterests}
                isRequired
              />
            </div>
            <div className="contact-enteprise-full-width-container">
              <SelectField
                label="Product Family"
                inputId="00N33000002s0Hg"
                inputName="00N33000002s0Hg"
                options={this.state.productList}
                isRequired
              />
            </div>
            <div className="contact-enteprise-full-width-container">
              <TextareaField
                label="Description"
                inputId="description"
                inputName="description"
                maxLength="80"
                isRequired
              />
            </div>

            <div className="contact-enteprise-full-width-container">
              <OptionField
                label="Email Opt In"
                inputId="emailOptOut"
                inputName="emailOptOut"
                options={[
                  { value: "0", name: "Yes" },
                  { value: "1", name: "No" }
                ]}
                isRequired
              />
            </div>
            <div
              className="contact-enteprise-full-width-container contact-enterprise-captcha"
              style={{ padding: "0 20px" }}
            >
              {
                this.state.grecaptchaLoaded ? <ReCaptcha
                  ref={el => {
                    this.captcha = el;
                  }}
                  onloadCallback={this.onLoadRecaptcha}
                  verifyCallback={this.verifyCallback}
                  render="explicit"
                  size="normal"
                  sitekey="6LeZV8AUAAAAABuNIA13n-wem-zsxSYGg2ch66zI"
                /> : null
              }

            </div>
            <div className="contact-enterprise-actions">
              <input
                className="contact-enterprise-submit-button"
                type="submit"
                name="submit"
                disabled={!this.state.captchaValidated}
              />
            </div>
          </form>
        </div>
      </>
    );
  }
}

export default orderFormConsumer(withRuntimeContext(ContactEnterpriseForm));
