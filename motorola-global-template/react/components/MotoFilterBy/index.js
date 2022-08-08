import React, { Component, Fragment } from "react";
import { Query } from "react-apollo";
import { ExtensionPoint } from "vtex.render-runtime";
import { Spinner } from "vtex.styleguide";
import OrderBy from "./components/OrderBy";
import FilterBy from "./components/FilterBy";
import BottomSheet from "./components/BottomSheet";
import productsQuery from "./queries/productsQuery.gql";
import Shelf from "./components/Shelf/index";
import { getRootPath } from "../../utils/helpers";
import api from "./assets/getData";
import "./MotoFilterBy.global.css";
import sortByIcon from "./assets/sort_by_mobile.svg";
import { formatIOMessage } from "vtex.native-types";


const cleanShelfVariable = shelfVariables => {
  if (!shelfVariables) {
    return shelfVariables;
  }
  const { orderBy, collection, to } = shelfVariables;
  return {
    ...shelfVariables,
    ...(orderBy != null ? { orderBy: orderBy.toString() } : {}),
    ...(collection != null ? { collection: collection.toString() } : {}),
    ...(to != null ? { to: parseInt(to) } : {})
  };
};

class MotoFilterBy extends Component {
  constructor(props) {
    super(props);
    this.state = {
      queryData: this.props.shelfVariables,
      filterQuery: [],
      compareList: [],
      layout: 0,
      spinner: false
    };
  }

  static schema = {
    title: "Shelf",
    description: "Shelf",
    type: "object",
    properties: {
      shelfTitle: {
        type: "string",
        title: "Page title"
      },
      shelfVariables: {
        type: "object",
        title: "Shelf variables",
        properties: {
          collection: {
            type: "string",
            title: "Collection",
            default: 150,
            description: "e.g.: 156"
          },
          to: {
            type: "number",
            default: 9,
            title: "Amount of devices to show",
            description: "Due to Vtex restrictions, the maximum amount is 49."
          },
          orderBy: {
            type: "string",
            title: "orderBy",
            default: "OrderByScoreDESC"
          }
        }
      },
      hiddenOptions: {
        type: "string",
        title: "Hidden Options Sort By",
        description:
          "Indicates which sorting options will be hidden. (e.g. OrderByNameASC, OrderByNameDESC, OrderByScoreDESC)"
      },
      sortTitle: {
        type: "string",
        title: "Sidebar Filter Label",
        default: "Sort By",
        description: "ex: Sort By"
      },
      filterTitle: {
        type: "string",
        title: "Sidebar Filter Label",
        description: "ex: Filters"
      },
      resetTitle: {
        type: "string",
        title: "Sidebar Reset Filter Label",
        description: "ex: Reset"
      },
      familyTitle: {
        type: "string",
        title: "Sidebar Category Filter Label",
        description: "ex: Phones"
      },
      priceTitle: {
        type: "string",
        title: "Sidebar Price Filter Label",
        description: "ex: Price Filter"
      },
      compareTitle: {
        type: "string",
        title: "Compare Checkbox Label",
        description: "ex: Compare"
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
      propertiesList: {
        type: "string",
        title: "List of Product Specifications Ids, separates by commas",
        description: "ex: 123,234,345,456"
      },
      pdpVariations: {
        type: "string",
        title:
          "List of Product Properties names (PDP card reference), separates by commas",
        description: "ex: Color,Carriers,Internal Storage"
      }
    }
  };

  changeLayout = value => {
    let newState = Object.assign({}, this.state);
    newState.layout = value;
    this.setState(newState);
  };

  getOrder = value => {
    let newState = Object.assign({}, this.state);
    newState.queryData["orderBy"] = value;
    this.setState(newState);
  };

  getDetailList = async () => {
    const customProperties = this.props.propertiesList
      .split(",")
      .map(Number) || [249, 246, 191];
    let promiseArray = customProperties.map(id =>
      api.get(
        `${getRootPath}/api/catalog_system/pub/specification/fieldGet/${id}`,
        {
          headers: {
            "Content-Type": "application/json",
            "Cache-Control": "no-cache",
            "X-Vtex-Use-Https": true
          }
        }
      )
    );

    Promise.all(promiseArray)
      .then(results => {
        const data = results.map(detail => detail.data);
        this.setState({ details: data });
        this.setState({ isLoading: false });
      })
      .catch(console.log(""));
  };

  filterQuery = data => {
    let newState = Object.assign({}, this.state);
    newState["filterQuery"] = data;
    this.setState(newState);
    this.setState({ spinner: true });
    setTimeout(() => this.setState({ spinner: false }), 1000);
  };

  getPriceRange = e => {
    let newState = Object.assign({}, this.state);
    newState.queryData["priceRange"] =
      e[0].toString() + " TO " + e[1].toString();
    this.setState(newState);
  };

  getCompare = e => {
    const inputList = document
      .getElementsByClassName("collection-cards")[0]
      .getElementsByTagName("input");
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
    const inputList = document
      .getElementsByClassName("collection-cards")[0]
      .getElementsByTagName("input");
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

  ascCompare = (a, b) => {
    // Use toUpperCase() to ignore character casing
    const bandA = a.productName.toUpperCase();
    const bandB = b.productName.toUpperCase();

    let comparison = 0;
    if (bandA > bandB) {
      comparison = 1;
    } else if (bandA < bandB) {
      comparison = -1;
    }
    return comparison;
  };

  descCompare = (a, b) => {
    // Use toUpperCase() to ignore character casing
    const bandA = a.productName.toUpperCase();
    const bandB = b.productName.toUpperCase();

    let comparison = 0;
    if (bandA > bandB) {
      comparison = 1;
    } else if (bandA < bandB) {
      comparison = -1;
    }
    return comparison * -1;
  };

  componentDidMount() {
    this.getDetailList();
  }

  render() {
    const {
      shelfTitle,
      hiddenOptions,
      shelfVariables,
      familyTitle,
      priceTitle,
      sortTitle,
      filterTitle,
      resetTitle,
      pdpVariations,
      compareVariables,
      compareTitle
    } = this.props;
    const {
      queryData,
      details,
      filterQuery,
      compareList,
      layout,
      spinner
    } = this.state;
    const options =
      hiddenOptions != undefined ? hiddenOptions.trim().split(",") : [];
    return (
      <Fragment>
        <div className="moto-filter-by">
          <div className="collection-shelf">
            <div className="shelf-title mobile-only-title">
              <h1>{shelfTitle}</h1>
            </div>
            {details && (
              <div className="row">
                <div className="col-12">
                  <div
                    id="fixed-filter-sort-by-mobile"
                    className="fixed-filter-sort-by-mobile"
                  >
                    <Query query={productsQuery} variables={shelfVariables}>
                      {({ loading, error, data }) => {
                        if (error)
                          return <ExtensionPoint id="not-found" type="error" />;
                        if (loading)
                          return <div className="sidebar-wrap"></div>;
                        return (
                          <FilterBy
                            filterTitle={filterTitle}
                            resetTitle={resetTitle}
                            categoryTitle={familyTitle}
                            priceTitle={priceTitle}
                            pdpVariations={pdpVariations}
                            details={details}
                            getPriceRange={this.getPriceRange}
                            data={data.products}
                            onChange={this.filterQuery}
                          />
                        );
                      }}
                    </Query>
                    <div className="sort-by">
                      <div className="sort-by-desktop">
                        <img className="sortByIcon" src={sortByIcon} alt="Sort Icon" />
                        <span className="sortByTitle">{sortTitle}</span>
                      </div>
                      <OrderBy
                        hiddenOptions={options}
                        getOrder={this.getOrder}
                        orderBy={
                          queryData.orderBy
                            ? queryData.orderBy
                            : shelfVariables.orderBy
                        }
                      />
                    </div>
                  </div>
                  <Query
                    query={productsQuery}
                    variables={cleanShelfVariable(queryData)}
                  >
                    {({ loading, error, data }) => {
                      if (loading)
                        return (
                          <div className="loading">
                            <center>
                              <Spinner />
                            </center>
                          </div>
                        );
                      if (error)
                        return <ExtensionPoint id="not-found" type="error" />;
                      if (queryData.orderBy) {
                        if (queryData.orderBy === "OrderByNameASC") {
                          data.products.sort(this.ascCompare);
                        } else if (queryData.orderBy === "OrderByNameDESC") {
                          data.products.sort(this.descCompare);
                        }
                      } else {
                        if (hiddenOptions === "OrderByNameASC") {
                          data.products.sort(this.ascCompare);
                        } else if (hiddenOptions === "OrderByNameDESC") {
                          data.products.sort(this.descCompare);
                        }
                      }
                      return (
                        <Fragment>
                          <Shelf
                            {...data}
                            filterQuery={filterQuery}
                            details={details}
                            getCompare={this.getCompare}
                            compareList={compareList}
                            compareTitle={compareTitle}
                            layout={layout}
                            spinner={spinner}
                            shelfTitle={shelfTitle}
                          />
                          {compareList && compareVariables && (
                            <BottomSheet
                              display={this.display}
                              getCompare={this.clearCompare}
                              list={compareList}
                              data={data.products}
                              compareVariables={compareVariables}
                            />
                          )}
                        </Fragment>
                      );
                    }}
                  </Query>
                </div>
              </div>
            )}
            <div style={{ clear: "both" }}></div>
          </div>
        </div>
      </Fragment>
    );
  }
}

export default MotoFilterBy;
