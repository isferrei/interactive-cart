import React, { Component, Fragment } from 'react';
import axios from 'axios';
import Product from './components/Product/index';
import { Spinner } from 'vtex.styleguide';
import { Link } from 'vtex.render-runtime';
import Loading from '../Loading';
import { path } from 'ramda';
import { getRootPath } from '../../utils/helpers';
import { orderFormConsumer } from "vtex.store-resources/OrderFormContext";
import './Warranty.global.css';

async function asyncForEach(array, callback) {
  for (let index = 0; index < array.length; index++) {
    await callback(array[index], index, array)
  }
}

class Warranty extends Component {
  static schema = {
    title: 'Warranty',
    description: 'Warranty',
    type: 'object',
    properties: {
      infoText: {
        type: 'string',
        title: 'Info text',
        default: '<strong>MotoCare Plan(s)</strong> Extend your standard limited warranty coverage, or add additional coverage for accidental damage. Cancel anytime. <a href="/moto-care" class="warranty-page-link-text">Learn more</a> | <a href="/legal/terms-of-sale" class="warranty-page-link-text">Terms and conditions</a>'
      },
    },
  }

  state = {
    isAssemblyOptions: false,
    orderFormItems: [],
    selectedAssemblies: {},
    removedAssemblies: {},
    loading: false,
    itemsLoaded: false,
    itemsInCart: false
  }

  componentDidUpdate() {
    console.log("loaded");
    if (!this.state.itemsLoaded && this.props.orderFormContext.orderForm) {
      this.listItemsWithoutAssemblyOptions()
    }
  } 

  listItemsWithoutAssemblyOptions = async () => {
    let allAssemblyOptions = []
    if (this.props.orderFormContext.orderForm.itemMetadata) {
      this.props.orderFormContext.orderForm.itemMetadata.items.map((itemMetadata, key) => {
        let items = path(['assemblyOptions', '0', 'composition', 'items'], itemMetadata)
        if (items) {
          items.map((assemblyOption, key) => {
            allAssemblyOptions.push(assemblyOption.id)
          })
        }
      })
    }

    let listItems = []
    this.props.orderFormContext.orderForm.items.map((item) => {
      if (!allAssemblyOptions.includes(item.id)) {
        if (this.findAssemblyOption(item).assemblyOptions.length) {
          listItems.push(item);
        }
      }
    })

    if (this.props.orderFormContext.orderForm.items.length) {
      this.setState({ itemsInCart: true })
    }

    if (!listItems.length && this.props.orderFormContext.orderForm.items.length) {
      const items = this.props.orderFormContext.orderForm.items;
      for (let i = 0; i<items.length;i++) {
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
        console.log('item.accessories.map(i => i.itemId)', item.accessories);
        console.log('.includes(item.id)', item.id)
        if (item.accessories.map(i => i.itemId).includes(item.id)) {
          item.accessories = [];
          continue;
        }
        listItems.push(item);
      }
      if (!listItems.length) {
        window.location.href = `${getRootPath}/checkout/#/cart`
      }
    } else {
      this.setState({
        isAssemblyOptions: true,
      })
    }
    this.setState({
      orderFormItems: listItems,
      itemsLoaded: true
    })
  }

  addToSelectedAssemblies = (key, id) => {
    this.state.selectedAssemblies[key] = id
    this.setState({ selectedAssemblies: this.state.selectedAssemblies })
  }

  removeFromSelectedAssemblies = (key, id) => {
    this.state.removedAssemblies[key] = id
    if (id in Object.keys(this.state.selectedAssemblies)) delete this.state.selectedAssemblies[key];
    this.setState({ removedAssemblies: this.state.removedAssemblies })
  }

  findAssemblyOption = (item) => {
    let option = this.props.orderFormContext.orderForm.itemMetadata.items.filter(itemMetadata => item.id == itemMetadata.id)[0]
    return option
  }

  getSeller = (option, itemId) => {
    return option.assemblyOptions[0].composition.items.filter(item => item.id == itemId)[0].seller
  }

  sendToAssemblies = async () => {
    if (this.state.isAssemblyOptions) {
      await asyncForEach(this.props.orderFormContext.orderForm.items, async item => {
        if (item.id.toString() in this.state.selectedAssemblies) {
          let option = this.findAssemblyOption(item)
          let seller = this.getSeller(option, this.state.selectedAssemblies[item.id])
          let url = `${getRootPath}/api/checkout/pub/orderForm/${this.props.orderFormContext.orderForm.orderFormId}/items/${item.cartIndex}/assemblyOptions/${option.assemblyOptions[0].id}`
          let body = {
            "noSplitItem": true,
            "composition":
            {
              "items": [
                {
                  "id": this.state.selectedAssemblies[item.id],
                  "quantity": 1,
                  "seller": seller
                }
              ]
            }
          }
  
          this.setState({
            loading: true
          })
  
          const response = (await axios({
            url: url,
            method: 'POST',
            data: body
          })).data
  
          this.setState({
            loading: false
          })
        }
      })
    } else {
      let body = {
        orderItems: []
      }
      let url = `${getRootPath}/api/checkout/pub/orderForm/${this.props.orderFormContext.orderForm.orderFormId}/items`;

      await asyncForEach(this.props.orderFormContext.orderForm.items, async item => {
        const selectedAcessory = this.state.selectedAssemblies[item.id]; 
        if (selectedAcessory === undefined) return;
        body.orderItems.push({
          "seller": this.props.orderFormContext.orderForm.sellers[0].id,
          "quantity": 1,
          "id": selectedAcessory
        })
      })

      const response = (await axios({
        url: url,
        method: 'PATCH',
        data: body
      })).data
      console.log(response);
    }
  }

  removeFromAssemblies = async () => {
    if (this.state.isAssemblyOptions) {
      await asyncForEach(this.props.orderFormContext.orderForm.items, async item => {
        if (item.id.toString() in this.state.removedAssemblies) {
          let option = this.findAssemblyOption(item)
          let seller = this.getSeller(option, this.state.removedAssemblies[item.id])
          let url = `${getRootPath}/api/checkout/pub/orderForm/${this.props.orderFormContext.orderForm.orderFormId}/items/${item.cartIndex}/assemblyOptions/${option.assemblyOptions[0].id}`
          let body = {
            "noSplitItem": false,
            "composition":
            {
              "items": [
                {
                  "id": this.state.removedAssemblies[item.id],
                  "quantity": 1,
                  "seller": seller
                }
              ]
            }
          }
          this.setState({
            loading: true
          })

          const response = (await axios({
            url: url,
            method: 'DELETE',
            data: body
          })).data

          this.setState({
            loading: false
          })
        }
      })
    } else {
      let body = {
        orderItems: []
      }
      let url = `${getRootPath}/api/checkout/pub/orderForm/${this.props.orderFormContext.orderForm.orderFormId}/items`;

      await asyncForEach(this.props.orderFormContext.orderForm.items, async item => {
        const removedAccessory = this.state.removedAssemblies[item.id]; 
        if (removedAccessory === undefined) return;
        const itemInCart = this.props.orderFormContext.orderForm.items.find(i => i.id == removedAccessory);
        console.log('itemInCart', itemInCart);
        console.log('selectedAcessory', removedAccessory);
        const index = this.props.orderFormContext.orderForm.items.indexOf(itemInCart);
        if (index === -1) return;
        body.orderItems.push({
          "quantity": 0,
          "index": index
        })
      })

      const response = (await axios({
        url: url,
        method: 'PATCH',
        data: body
      })).data
      console.log(response);
    }
  }

  goToCheckout = async () => {
    if (Object.keys(this.state.removedAssemblies).length) {
      await this.removeFromAssemblies();
    }
    if (Object.keys(this.state.selectedAssemblies).length) {
      await this.sendToAssemblies();
    }
    window.location.href = `${getRootPath}/checkout/#/cart`;
  }

  getAccessoriesForProduct = async (productId) => {
    let accessories;
    try {
      accessories = (await(axios({
        url: `${getRootPath}/api/catalog_system/pub/products/crossselling/accessories/${productId}`
        // url: `/api/catalog_system/pub/products/crossselling/accessories/126`
      }))).data
      console.log("accessories", accessories);
    } catch (error) {
      console.error(error);
    }
    return accessories;
  }

  render() {
    console.log("this.props.orderFormContext", this.props.orderFormContext)
    if (this.props.orderFormContext.loading) {
      return (
        <Loading type="banner" />
      )
    }
    if (!this.state.orderFormItems.length && this.props.orderFormContext.orderForm.items.length) {
      return (
        <Loading type="banner" />
      )
    }

    if (!this.state.orderFormItems.length && !this.props.orderFormContext.orderForm.items.length) {
      return (
        <div className="warranty-page-cart-empty">
          <div className="container">
            <h1>Your cart is empty</h1>
            <p>To continue shopping, browse the categories on the site or search for your products.</p>
            <Link page="store.home">Choose product</Link>
          </div>
        </div>
      )
    }

    return (
      <div className="warranty-page">
        <div className="container">
          {
            <Fragment>
              {
                this.props.orderFormContext.orderForm &&
                this.props.orderFormContext.orderForm.itemMetadata &&
                this.state.orderFormItems &&
                this.state.orderFormItems.map((item, key) => {
                  return (
                    <Product
                      orderForm={this.props.orderFormContext.orderForm}
                      addToSelectedAssemblies={this.addToSelectedAssemblies}
                      removeFromSelectedAssemblies={this.removeFromSelectedAssemblies}
                      storePreferencesData={this.props.orderFormContext.orderForm.storePreferencesData}
                      index={key}
                      itemMetadata={this.props.orderFormContext.orderForm.itemMetadata}
                      item={item}
                      infoText={this.props.infoText}
                      key={key}
                    />
                  )
                })
              }
              <div className="warranty-page-footer">
                {this.state.loading && <Spinner />}
                <button onClick={this.goToCheckout} disabled={this.state.loading ? 'disabled' : ''} className="warranty-checkout-button">Continue</button>
              </div>
            </Fragment>
          }
        </div>
      </div>
    )
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
export default orderFormConsumer(Warranty);