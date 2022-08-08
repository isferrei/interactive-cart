import React from "react";
import { Table, Divider, Input, Button } from "vtex.styleguide";
import { search } from "vtex.store-resources/Queries";
import { withApollo } from "react-apollo";
import useRuntime from "../useRuntime";
import { Link } from "vtex.render-runtime";
import { addToCart } from "vtex.store-resources/Mutations";
import { orderFormConsumer } from "vtex.store-resources/OrderFormContext";

class CustomerSupport extends React.Component {
  state = {
    skus: [],
    search: "",
    products: [],
    loading: false,
    from: 0,
    to: 9,
    limit: null
  };

  handleSubmit = async e => {
    e.preventDefault();
    this.setState({ products: [], skus: [], limit: null, from: 0, to: 9 });
    await this.getSkus(0, 9);
  };

  getSkus = async (from, to) => {
    const { client } = this.props;
    try {
      let skus = [];
      this.setState({ loading: true });
      const response = (
        await client.query({
          query: search,
          variables: {
            query: this.state.search,
            from,
            to
          }
        })
      ).data;
      console.log("response", response);

      response.search.products.map(product => skus.push(...product.items));
      console.log("skus", skus);
      this.setState({
        skus: [...this.state.skus, ...skus],
        products: [...this.state.products, ...response.search.products],
        loading: false,
        limit: response.search.recordsFiltered
      });
    } catch (error) {
      console.error(error);
    }
  };

  loadMore = async () => {
    const { from, to } = this.state;
    this.setState({ from: from + 10, to: to + 10 });
    await this.getSkus(from + 10, to + 10);
  };

  addToCart = async id => {
    const { client } = this.props;
    const {
      orderFormContext: {
        orderForm: { orderFormId }
      }
    } = this.props;

    this.setState({ loading: true });
    try {
      const response = (
        await client.mutate({
          mutation: addToCart,
          variables: {
            orderFormId,
            items: [
              {
                id,
                quantity: 1,
                seller: 1
              }
            ]
          }
        })
      ).data;
      console.log(response);
      this.props.runtime.navigate({
        page: "store.warranty"
      });
      this.setState({ loading: false });
    } catch (error) {
      console.error(error);
    }
  };

  formatPrice = price => {
    const { culture } = this.props.runtime;
    return price.toLocaleString(culture.locale, {
      style: "currency",
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
      currency: culture.currency
    });
  };

  render() {
    console.log("produtos", this.state.products);
    console.log("runtime", this.props.runtime);

    const { culture } = this.props.runtime;
    const schema = {
      properties: {
        nameComplete: {
          title: "SKU Name",
          width: 500
        },
        referenceId: {
          title: "Reference Code",
          cellRenderer: ({ cellData }) =>
            cellData ? cellData[0].Value : "No Reference Code"
        },
        price: {
          title: "Price",
          cellRenderer: ({ rowData }) =>
            rowData.sellers[0].commertialOffer.Price ===
            rowData.sellers[0].commertialOffer.ListPrice ? (
              <span>
                {this.formatPrice(rowData.sellers[0].commertialOffer.Price)}
              </span>
            ) : (
              <React.Fragment>
                <div className="flex flex-column">
                  <div>
                    <small>From: </small>
                    <small>
                      <s>
                        {this.formatPrice(
                          rowData.sellers[0].commertialOffer.ListPrice
                        )}
                      </s>
                    </small>
                  </div>
                  <div>
                    <small>To: </small>
                    <span>
                      {this.formatPrice(
                        rowData.sellers[0].commertialOffer.Price
                      )}
                    </span>
                  </div>
                </div>
              </React.Fragment>
            )
        },
        actions: {
          title: "Link text",
          cellRenderer: ({ rowData }) =>
            rowData.sellers[0].commertialOffer.Price === 0 ? (
              <Button disabled>Product unavailable</Button>
            ) : (
              <Button
                isLoading={this.state.loading}
                onClick={() => this.addToCart(rowData.itemId)}
              >
                Add to cart
              </Button>
            )
        }
      }
    };

    return (
      <div className="ma5">
        <React.Fragment>
          <form method="post" onSubmit={this.handleSubmit}>
            <div className="mb5">
              <Input
                placeholder="Type the name of the product that you are working for"
                size="small"
                label="Search"
                onChange={e => this.setState({ search: e.target.value })}
              />
            </div>
            <div className="pt2">
              <Button
                size="small"
                onClick={this.handleSubmit}
                isLoading={this.state.loading}
              >
                Search
              </Button>
            </div>
          </form>
          <div className="mv5">
            <Divider />
          </div>
          <Table fullWidth schema={schema} items={this.state.skus} />
          <div className="mv5">
            <Divider />
          </div>
          {this.state.limit &&
            this.state.limit > this.state.products.length && (
              <Button onClick={this.loadMore}>Load more</Button>
            )}
        </React.Fragment>
      </div>
    );
  }
}

export default orderFormConsumer(useRuntime(withApollo(CustomerSupport)));
