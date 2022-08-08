import React, { Component, Fragment } from "react";
import axios from "axios";
import Product from "./components/Product/index";
import { Spinner } from "vtex.styleguide";
import { Link, withRuntimeContext } from "vtex.render-runtime";
import Loading from "../Loading";
import { path } from "ramda";
import { getRootPath } from "../../utils/helpers";
import { setApiHeaders } from "../../utils/config";
import { orderFormConsumer } from "vtex.store-resources/OrderFormContext";
import "./WarrantyRedesign.global.css";
import errorIcon from "./images/Moto-x-mark.svg";
import * as _ from 'lodash';
import { FormattedMessage } from "react-intl";

class WarrantyRedesign extends Component {
  static schema = {
    title: "Warranty Redesign",
    description: "Warranty Redesign",
    type: "object",
    properties: {
      useWarrantyRedesign: {
        type: "boolean",
        title: "Use Warranty Redesign",
        default: false
      },
      warrantyErrorText: {
        type: "string",
        title: "Warranty Error message",
        default:
          "Customer is not a an enterprise customer or an authorized reseller. Please contact motorola account manager."
      },
      warrantyAssemblyErrorText: {
        type: "string",
        title: "Warranty Assembly Error message",
        default:
          "An error occurred. We could not process the request. Please refresh the page and try again."
      },
      infoText: {
        type: "string",
        title: "Warranty Info text",
        default:
          "Extend your standard limited warranty coverage, or additional coverage for accidental damage . You can cancel it anytime."
      },
      toolTipCTATitle: {
        type: "string",
        title: "Tool tip CTA title",
        description: "Enter the tool tip CTA title"
      },
      toolTipCTAContent: {
        type: "string",
        title: "Tool tip body content",
        description: "Enter the tool tip body content",
        widget: {
          "ui:widget": "textarea"
        }
      },
      servicePlanRecommendedItem: {
        enum: ["best", "better", "good"],
        enumNames: ["BEST", "BETTER", "GOOD"],
        default: "best",
        type: "string",
        title: "Recommended service plan item",
        description: "Select recommended service plan item",
        widget: {
          "ui:widget": "select"
        }
      },
      servicePlanItemRecommendedText: {
        type: "string",
        title: "Recommended text",
        description: "Enter the Recommended text"
      },
      servicePlanItems: {
        items: {
          title: "Service Plan items",
          type: "object",
          properties: {
            servicePlanItemHeading: {
              type: "string",
              title: "Service Plan item heading",
              description: "Enter the Service Plan item heading"
            },
            servicePlanChildItems: {
              items: {
                title: "Service Plan Child items",
                type: "object",
                properties: {
                  enableIfRedIcon: {
                    type: "boolean",
                    title: "Enable if it is having red icon",
                    default: false
                  },
                  servicePlanChildItemsText: {
                    type: "string",
                    title: "Service Plan Child items text",
                    description: "Service Plan Child items text"
                  }
                }
              },
              minItems: 1,
              title: "Service Plan Child items",
              type: "array"
            }
          }
        },
        minItems: 1,
        title: "Service Plan items",
        type: "array"
      }
    }
  };
  constructor(props) {
    super(props);
    this.state = {
      accountName: this.props.runtime.account,
      isAssemblyOptions: false,
      orderFormItems: [],
      selectedAssemblies: {},
      removedAssemblies: {},
      loading: false,
      itemsLoaded: false,
      itemsInCart: false,
      isCorporateUser: false,
      ifSmbUser: false,
      displayError: false,
      clickedOutside: false,
      warrantyError: false
    };
  }
  componentDidUpdate() {
    console.log("loaded");
    if (!this.state.itemsLoaded && this.props.orderFormContext.orderForm) {
      this.listItemsWithoutAssemblyOptions();
    }
  }
  componentDidMount() {
    document.addEventListener("mousedown", this.handleClickOutside);
  }

  componentWillUnmount() {
    document.removeEventListener("mousedown", this.handleClickOutside);
  }

  myRef = React.createRef();

  handleClickOutside = e => {
    if (!this.myRef.current.contains(e.target)) {
      this.setState({ displayError: false });
    }
  };

  asyncForEach = async (array, callback) => {
    for (let index = 0; index < array.length; index++) {
      try {
        this.setState({
          loading: true
        });
        await callback(array[index], index, array);
        await this.props.orderFormContext.refetch();
      } catch (error) {
        this.setState({
          warrantyError: true
        });
      }
    }
  };

  listItemsWithoutAssemblyOptions = async () => {
    let allAssemblyOptions = [];
    if (this.props.orderFormContext.orderForm.itemMetadata) {
      this.props.orderFormContext.orderForm.itemMetadata.items.map(
        (itemMetadata, key) => {
          let items = path(
            ["assemblyOptions", "0", "composition", "items"],
            itemMetadata
          );
          if (items) {
            items.map((assemblyOption, key) => {
              allAssemblyOptions.push(assemblyOption.id);
            });
          }
        }
      );
    }

    let listItems = [];
    this.props.orderFormContext.orderForm.items.map(item => {
      if (!allAssemblyOptions.includes(item.id)) {
        if (this.findAssemblyOption(item).assemblyOptions.length) {
          listItems.push(item);
        }
      }
    });

    if (this.props.orderFormContext.orderForm.items.length) {
      this.setState({ itemsInCart: true });
    }

    if (
      !listItems.length &&
      this.props.orderFormContext.orderForm.items.length
    ) {
      const items = this.props.orderFormContext.orderForm.items;
      for (let i = 0; i < items.length; i++) {
        let item = items[i];
        if (!item.productId) continue;
        const accessories = await this.getAccessoriesForProduct(item.productId);
        if (!accessories.length) continue;
        item.accessories = [];
        for (let y = 0; y < accessories.length; y++) {
          var accessory = accessories[y];
          item.accessories.push(accessory.items.map(i => i));
        }

        item.accessories = item.accessories.flat();
        console.log("item.accessories.map(i => i.itemId)", item.accessories);
        console.log(".includes(item.id)", item.id);
        if (item.accessories.map(i => i.itemId).includes(item.id)) {
          item.accessories = [];
          continue;
        }
        listItems.push(item);
      }
      if (!listItems.length) {
        window.location.href = `${getRootPath}/checkout/#/cart`;
      }
    } else {
      this.setState({
        isAssemblyOptions: true
      });
    }
    this.setState({
      orderFormItems: listItems,
      itemsLoaded: true
    });
  };

  addToSelectedAssemblies = (key, id) => {
    this.state.selectedAssemblies[key] = id;
    this.setState({ selectedAssemblies: this.state.selectedAssemblies });
  };

  removeFromSelectedAssemblies = (key, id) => {
    let removedAssembliesObj = _.cloneDeep(this.state.removedAssemblies);
    removedAssembliesObj[key] = id;
    let selectedAssembliesObj = _.cloneDeep(this.state.selectedAssemblies);
    var keys = Object.keys(selectedAssembliesObj);
    if (keys.includes(id)) {
      let matchingIndex = keys.indexOf(item.id);
      delete selectedAssembliesObj[keys[matchingIndex]];
    }
    this.setState({
      removedAssemblies: removedAssembliesObj,
      selectedAssemblies: selectedAssembliesObj
    });
  };

  clearSelectedMotoCareAssemblies = item => {
    let selectedAssembliesObj = _.cloneDeep(this.state.selectedAssemblies);
    var keys = Object.keys(selectedAssembliesObj);
    if (keys.includes(item.id)) {
      let matchingIndex = keys.indexOf(item.id);
      delete selectedAssembliesObj[keys[matchingIndex]];
    }
    this.setState({ selectedAssemblies: selectedAssembliesObj });
  };

  findAssemblyOption = item => {
    let option = this.props.orderFormContext.orderForm.itemMetadata.items.filter(
      itemMetadata => item.id == itemMetadata.id
    )[0];
    return option;
  };

  getSeller = (option, itemId) => {
    return option.assemblyOptions[0].composition.items.filter(
      item => item.id == itemId
    )[0].seller;
  };

  fixImageUrl = imageUrl => {
    return imageUrl.includes("https")
      ? imageUrl
      : imageUrl.replace("http", "https");
  };
  sendToAssemblies = async () => {
    if (this.state.isAssemblyOptions) {
      await this.asyncForEach(
        this.props.orderFormContext.orderForm.items,
        async item => {
          if (
            Object.keys(this.state.selectedAssemblies).includes(
              item.id.toString()
            )
          ) {
            let option = this.findAssemblyOption(item);
            let seller = this.getSeller(
              option,
              this.state.selectedAssemblies[item.id]
            );
            let url = `${getRootPath}/api/checkout/pub/orderForm/${this.props.orderFormContext.orderForm.orderFormId}/items/${item.cartIndex}/assemblyOptions/${option.assemblyOptions[0].id}`;
            let body = {
              noSplitItem: true,
              composition: {
                items: [
                  {
                    id: this.state.selectedAssemblies[item.id],
                    quantity: 1,
                    seller: seller
                  }
                ]
              }
            };

            this.setState({
              loading: true
            });

            const response = (
              await axios({
                url: url,
                method: "POST",
                data: body
              })
            ).data;
          }
        }
      );
    } else {
      let body = {
        orderItems: []
      };
      let url = `${getRootPath}/api/checkout/pub/orderForm/${this.props.orderFormContext.orderForm.orderFormId}/items`;

      await this.asyncForEach(
        this.props.orderFormContext.orderForm.items,
        async item => {
          const selectedAcessory = this.state.selectedAssemblies[item.id];
          if (selectedAcessory === undefined) return;
          body.orderItems.push({
            seller: this.props.orderFormContext.orderForm.sellers[0].id,
            quantity: 1,
            id: selectedAcessory
          });
        }
      );

      const response = (
        await axios({
          url: url,
          method: "PATCH",
          data: body
        })
      ).data;
      console.log(response);
    }
  };

  removeFromAssemblies = async () => {
    if (this.state.isAssemblyOptions) {
      await this.asyncForEach(
        this.props.orderFormContext.orderForm.items,
        async item => {
          if (
            Object.values(this.state.removedAssemblies).includes(
              item.id.toString()
            )
          ) {
            let productIdToBeUpdated = Object.keys(
              this.state.removedAssemblies
            ).find(key => this.state.removedAssemblies[key] === item.id);
            let productItem = _.find(
              this.props.orderFormContext.orderForm.items,
              { id: productIdToBeUpdated }
            );
            let option = this.findAssemblyOption(productItem);
            let seller = this.getSeller(option, item.id);
            let url = `${getRootPath}/api/checkout/pub/orderForm/${this.props.orderFormContext.orderForm.orderFormId}/items/${productItem.cartIndex}/assemblyOptions/${option.assemblyOptions[0].id}`;
            let body = {
              noSplitItem: false,
              composition: {
                items: [
                  {
                    id: item.id,
                    quantity: 1,
                    seller: seller
                  }
                ]
              }
            };
            this.setState({
              loading: true
            });

            const response = (
              await axios({
                url: url,
                method: "DELETE",
                data: body
              })
            ).data;
          }
        }
      );
    } else {
      let body = {
        orderItems: []
      };
      let url = `${getRootPath}/api/checkout/pub/orderForm/${this.props.orderFormContext.orderForm.orderFormId}/items`;

      await this.asyncForEach(
        this.props.orderFormContext.orderForm.items,
        async item => {
          const removedAccessory = this.state.removedAssemblies[item.id];
          if (removedAccessory === undefined) return;
          const itemInCart = this.props.orderFormContext.orderForm.items.find(
            i => i.id == removedAccessory
          );
          console.log("itemInCart", itemInCart);
          console.log("selectedAcessory", removedAccessory);
          const index = this.props.orderFormContext.orderForm.items.indexOf(
            itemInCart
          );
          if (index === -1) return;
          body.orderItems.push({
            quantity: 0,
            index: index
          });
        }
      );

      const response = (
        await axios({
          url: url,
          method: "PATCH",
          data: body
        })
      ).data;
      console.log(response);
    }
  };

  checkIfSmbUser = async userId => {
    if (userId) {
      let url = `${getRootPath}/api/dataentities/CL/search?_where=userId=${userId}&_fields=isCorporate,isAuthorizedSeller,isEnterprise`;
      this.setState({
        loading: true
      });
      const response = (
        await axios({
          url: url,
          method: "GET"
        })
      ).data;
      if (response && response[0] && response[0].isCorporate) {
        this.setState({ isCorporateUser: true });
        if (
          (response && response[0] && response[0].isAuthorizedSeller) ||
          (response && response[0] && response[0].isEnterprise)
        ) {
          this.setState({ ifSmbUser: true });
        }
      }
    }
  };
  createSmbUserOrderFormEntry = () => {
    let fieldsReq = {
      paymentConfiguration: {
        requiresAuthenticationForPreAuthorizedPaymentOption: false
      },
      minimumQuantityAccumulatedForItems: 1,
      decimalDigitsPrecision: 2,
      minimumValueAccumulated: 0,
      apps: [
        {
          id: "SMBUser",
          fields: ["isSmbUser"]
        }
      ]
    };
    let appHeaders = setApiHeaders(this.state.accountName);
    axios
      .post(
        `${getRootPath}/api/checkout/pvt/configuration/orderForm`,
        fieldsReq
      )
      .then(response => {
        this.setSmbUserOrderFormEntry("isSmbUser", this.state.ifSmbUser);
      })
      .catch(error => { });
  };

  setSmbUserOrderFormEntry = (appFieldNameValue, appFieldValue) => {
    let orderFormId = this.props.orderFormContext.orderForm.orderFormId;
    let appName = "SMBUser";
    let appFieldName = appFieldNameValue;
    let fieldsReq = {
      value: appFieldValue
    };
    let appHeaders = setApiHeaders(this.state.accountName);
    axios
      .put(
        `${getRootPath}/api/checkout/pub/orderForm/${orderFormId}/customData/${appName}/${appFieldName}`,
        fieldsReq
      )
      .then(response => { })
      .catch(error => { });
  };

  goToCheckout = async () => {
    let userId =
      this.props.orderFormContext.orderForm &&
        this.props.orderFormContext.orderForm.userProfileId &&
        this.props.orderFormContext.orderForm.userProfileId != null
        ? this.props.orderFormContext.orderForm.userProfileId
        : "";
    this.setState({
      loading: true,
      displayError: false,
      warrantyError: false
    });
    await this.checkIfSmbUser(userId);
    await this.props.orderFormContext.refetch();
    if (userId && this.state.isCorporateUser) {
      if (
        Object.keys(this.state.selectedAssemblies).length ||
        this.state.displayError
      ) {

        if (this.state.ifSmbUser) {
          this.setSmbUserOrderFormEntry("isSmbUser", this.state.ifSmbUser);
          if (Object.keys(this.state.removedAssemblies).length) {
            await this.removeFromAssemblies();
          }
          await this.sendToAssemblies();
          if (!this.state.warrantyError) {
            window.location.href = `${getRootPath}/checkout/#/cart`;
          } else {
            this.setState({
              loading: false
            })
          }
        } else {
          this.setState({ displayError: true });
          this.setState({ selectedAssemblies: {} });
          this.setState({
            loading: false
          })
        }
      } else {
        if (Object.keys(this.state.removedAssemblies).length) {
          await this.removeFromAssemblies();
        }
        if (!this.state.warrantyError) {
          window.location.href = `${getRootPath}/checkout/#/cart`;
        } else {
          this.setState({
            loading: false
          });
        }
      }
    } else {
      if (Object.keys(this.state.removedAssemblies).length) {
        await this.removeFromAssemblies();
      }
      if (Object.keys(this.state.selectedAssemblies).length) {
        await this.sendToAssemblies();
      }
      if (!this.state.warrantyError) {
        window.location.href = `${getRootPath}/checkout/#/cart`;
      } else {
        this.setState({
          loading: false
        });
      }
    }
  };

  getAccessoriesForProduct = async productId => {
    let accessories;
    try {
      accessories = (
        await axios({
          url: `${getRootPath}/api/catalog_system/pub/products/crossselling/accessories/${productId}`
          // url: `/api/catalog_system/pub/products/crossselling/accessories/126`
        })
      ).data;
      console.log("accessories", accessories);
    } catch (error) {
      console.error(error);
    }
    return accessories;
  };

  render() {
    if (!this.props.useWarrantyRedesign) {
      return null;
    }
    console.log("this.props.orderFormContext", this.props.orderFormContext);
    if (this.props.orderFormContext.loading) {
      return <Loading type="banner" />;
    }
    if (
      !this.state.orderFormItems.length &&
      this.props.orderFormContext.orderForm.items.length
    ) {
      return <Loading type="banner" />;
    }

    if (
      !this.state.orderFormItems.length &&
      !this.props.orderFormContext.orderForm.items.length
    ) {
      return (
        <div className="warranty-page-cart-empty">
          <div className="container">
            <h1>Your cart is empty</h1>
            <p>
              To continue shopping, browse the categories on the site or search
              for your products.
            </p>
            <Link page="store.home">Choose product</Link>
          </div>
        </div>
      );
    }

    return (
      <div className="warranty-page">
        <div className="container">
          {
            <Fragment>
              {this.props.orderFormContext.orderForm &&
                this.props.orderFormContext.orderForm.itemMetadata &&
                this.state.orderFormItems &&
                this.state.orderFormItems.map((item, key) => {
                  return (
                    <Product
                      orderForm={this.props.orderFormContext.orderForm}
                      addToSelectedAssemblies={this.addToSelectedAssemblies}
                      removeFromSelectedAssemblies={
                        this.removeFromSelectedAssemblies
                      }
                      storePreferencesData={
                        this.props.orderFormContext.orderForm
                          .storePreferencesData
                      }
                      index={key}
                      itemMetadata={
                        this.props.orderFormContext.orderForm.itemMetadata
                      }
                      item={item}
                      infoText={this.props.infoText}
                      warrantyErrorText={this.props.warrantyErrorText}
                      key={key}
                      servicePlanItems={this.props.servicePlanItems}
                      servicePlanRecommendedItem={
                        this.props.servicePlanRecommendedItem
                      }
                      servicePlanItemRecommendedText={
                        this.props.servicePlanItemRecommendedText
                      }
                      toolTipCTATitle={this.props.toolTipCTATitle}
                      toolTipCTAContent={this.props.toolTipCTAContent}
                      clearSelectedMotoCareAssemblies={
                        this.clearSelectedMotoCareAssemblies
                      }
                    />
                  );
                })}
              {this.state.displayError ? (
                <div className="warranty-page-error-container">
                  <div className="warranty-page-error">
                    <img src={this.fixImageUrl(errorIcon)} alt="Error Icon" />
                    <span
                      dangerouslySetInnerHTML={{
                        __html: this.props.warrantyErrorText
                      }}
                    />
                  </div>
                </div>
              ) : null}
              {this.state.warrantyError && (
                <div className="warranty-page-error-container">
                  <div className="warranty-page-error">
                    <img src={this.fixImageUrl(errorIcon)} alt="Error Icon" />
                    <span
                      dangerouslySetInnerHTML={{
                        __html: this.props.warrantyAssemblyErrorText
                      }}
                    />
                  </div>
                </div>
              )}
              <div
                ref={this.myRef}
                onClick={this.handleClickOutside}
                className="warranty-page-footer"
              >
                {this.state.loading && <Spinner />}
                <button
                  onClick={this.goToCheckout}
                  disabled={this.state.loading ? "disabled" : ""}
                  className="warranty-checkout-button"
                >
                  <FormattedMessage id="store/warranty-redesign.Continue" />
                </button>
              </div>
            </Fragment>
          }
        </div>
      </div>
    );
  }
}

// const withOrderForm = graphql(orderForm, {
//   options: () => ({
//     ssr: false
//   })
// });

// export default compose(
//   withOrderForm
// )(Warranty);
export default orderFormConsumer(withRuntimeContext(WarrantyRedesign));
