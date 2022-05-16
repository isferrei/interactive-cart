import React, { Component, Fragment } from "react";
import { Query, graphql, compose } from "react-apollo";
import { withApollo } from "react-apollo";
import productsQuery from "./queries/productsQuery.gql";
import Shelf from "./components/Shelf/index";
import { Block } from "vtex.render-runtime";
import "./CollectionShelf.global.css";
import { Spinner } from "vtex.styleguide";
import BottomSheet from '../BottomSheet/index';

const cleanShelfVariable = shelfVariables => {
  if (!shelfVariables) {
    return shelfVariables
  }
  const { collection, category, from, to } = shelfVariables
  return {
    ...shelfVariables,
    ...(category != null ? {
      category: category.toString(),
    } : {}),
    ...(collection != null ? {
      collection: collection.toString(),
    } : {}),
    ...(from != null ? {
      from: parseInt(from),
    } : {}),
    ...(to != null ? {
      to: parseInt(to),
    } : {}),
  }
}

class CollectionShelf extends Component {
  constructor(props) {
    super(props);
    this.state = {
      compareList: [],
      productList: []
    };
  }

  componentDidMount() {
    this.getProductList();
  }

  static schema = {
    title: "Shelf",
    description: "Shelf",
    type: "object",
    properties: {
      collectiontitle: {
        type: "string",
        title: "Collection title",
        description: "Enter Collection title"
      },
      showBuyNowButton: {
        type: "boolean",
        title: "Show Buy now button",
        default: false
      },
      compareVariables: {
        type: "object",
        title: "Compare Modal Configuration",
        properties: {
          textDesktop: {
            type: "string",
            title: "Compare Modal Text Desktop"
          },
          textMobile: {
            type: "string",
            title: "Compare Modal Text Mobile"
          },
          btn: {
            type: "string",
            title: "Compare Modal Button Text",
            description: "ex: Compare Phones"
          },
          link: {
            type: "string",
            title: "Compare Modal link to Compare Page (only the slug)",
            description: "ex: compare"
          }
        }
      },
      bottomSheetIcon: {
        type: "string",
        title: "Bottom Sheet Icon",
        widget: {
          "ui:widget": "image-uploader"
        },
        description: "Enter Bottom Sheet Icon"
      },
      shelfs: {
        type: "array",
        title: "Shelf items",
        items: {
          type: "object",
          title: "Shelf item",
          properties: {
            shelfTitle: {
              type: "string",
              title: "Shelf title"
            },
            shelfVariables: {
              type: "object",
              title: "Shelf variables",
              properties: {
                specificationFilters: {
                  type: "string",
                  title: "Specification filters",
                  description: "e.g.: C:/1000041/1000049/"
                },
                orderBy: {
                  type: "string",
                  title: "Order by",
                  default: "",
                  description: "e.g.: OrderByReleaseDateDESC"
                },
                from: {
                  type: "number",
                  default: 0,
                  title: "From",
                  description: "e.g.: 0"
                },
                to: {
                  type: "number",
                  default: 9,
                  title: "To",
                  description: "e.g.: 9"
                }
              }
            }
          }
        }
      }
    }
  };

  getCompare = e => {
    const inputList = document.getElementsByClassName('collection-shelf-container')[0].getElementsByTagName("input");
    const screenW = document.documentElement.clientWidth;
    let total = 0;
    let max;
    screenW >= 805 ? (max = 3) : (max = 2);

    for (let i = 0; i < inputList.length; i++) {
      if (inputList[i].checked) total = total + 1;
      if (total > max) {
        if (inputList[e.target.id]) inputList[e.target.id].checked = false;
        return false;
      }
    }

    let list = this.state.compareList;
    if (list.length <= max) {
      if (list.indexOf(e.target.id) > -1) {
        list.splice(list.indexOf(e.target.id), 1);
      } else {
        list.push(e.target.id);
      }
    }

    const div = document.querySelector(".bottom-sheet");
    if (list.length >= 1 && !div.classList.value.includes("display"))
      div.classList.add("display");
    if (list.length === 0) div.classList.remove("display");

    let newState = Object.assign({}, this.state);
    newState.compareList = list;
    this.setState(newState);
  };

  clearCompare = e => {
    const inputList = document.getElementsByClassName('collection-shelf-container')[0].getElementsByTagName("input");
    if (inputList[e.target.id]) inputList[e.target.id].checked = false;

    let list = this.state.compareList;
    if (list.indexOf(e.target.id) > -1)
      list.splice(list.indexOf(e.target.id), 1);

    const div = document.querySelector(".bottom-sheet");
    if (list.length === 0) div.classList.remove("display");

    let newState = Object.assign({}, this.state);
    newState.compareList = list;
    this.setState(newState);
  };

  display = () => {
    const div = document.querySelector(".bottom-sheet");
    if (div) {
      if (div.classList.value.includes("display")) {
        div.classList.remove("display");
      } else {
        div.classList.add("display");
      }
    }
  };

  getProductList = async () => {
    const { client } = this.props;
    let productLists = [];
    const promises = this.props.shelfs.map(async (shelfItem) => {
      return {
        productList: await client.query({
          query: productsQuery,
          variables: cleanShelfVariable(shelfItem.shelfVariables)
        })
      }
    });
    Promise.all(promises).then(response => {
      response.map(dataItem => {
        productLists = [...dataItem.productList.data.products, ...productLists]
      })
      this.setState({
        productList: productLists
      })
    });
  }

  render() {
    const { collectiontitle, shelfs, showBuyNowButton, compareVariables, list,bottomSheetIcon } = this.props;
    const { compareList } = this.state;
    if (!shelfs.length) {
      return <ExtensionPoint id="not-found" />;
    }

    return (
      <Fragment>
        <div className="collection-shelf-container">
          <div className="collection-title" id="collection-title">{collectiontitle}</div>
          {shelfs.map((shelf, key) => (
            <div key={key} className="container">
              <div className="collection-shelf">
                <div className="shelf-title">
                  <h1>{shelf.shelfTitle}</h1>
                  <Block id="unsubscribe-link" />
                </div>
                <Query query={productsQuery} variables={cleanShelfVariable(shelf.shelfVariables)}>
                  {({ loading, error, data }) => {
                    if (loading)
                      return (
                        <center>
                          <Spinner />
                        </center>
                      );
                    if (error)
                      return <ExtensionPoint id="not-found" type="error" />;
                    return (
                      <Fragment>
                        <Shelf showBuyNowButton={showBuyNowButton} {...data} getCompare={this.getCompare} />
                      </Fragment>
                    )
                  }
                  }
                </Query>
              </div>
            </div>
          ))}


          <Fragment>
            {compareList && compareVariables && this.state.productList.length > 0 && (
              <BottomSheet
                display={this.display}
                getCompare={this.clearCompare}
                list={compareList}
                data={this.state.productList}
                compareVariables={compareVariables}
                bottomSheetIcon={bottomSheetIcon}
              />
            )}
          </Fragment>
        </div>

      </Fragment>
    );
  }
}

export default withApollo(CollectionShelf);
