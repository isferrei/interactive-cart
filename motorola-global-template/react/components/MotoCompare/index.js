import React, { Component, Fragment } from "react";
import { Query, graphql, compose } from "react-apollo";
import { ExtensionPoint } from "vtex.render-runtime";
import { Spinner } from "vtex.styleguide";
import Dropdown from "./components/Dropdown";
import TdProduct from "./components/TdProduct";
import BuyProduct from "./components/BuyProduct";
import Disclaimers from "../Disclaimers/index";
import productsQuery from "./queries/productsQuery.gql";
import api from "./assets/getData";
import { getRootPath } from "../../utils/helpers";
import "./MotoCompare.global.css";

const cleanShelfVariable = shelfVariables => {
  if (!shelfVariables) {
    return shelfVariables;
  }
  const { collection, from, to } = shelfVariables;
  return {
    ...(collection != null
      ? {
          collection: collection.toString()
        }
      : {}),
    ...(from != null
      ? {
          from: parseInt(from)
        }
      : {}),
    ...(to != null
      ? {
          to: parseInt(to)
        }
      : {})
  };
};

class MotoCompare extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      sku: { 0: 0, 1: 0, 2: 0 },
      boxes: { 0: 0, 1: 0, 2: 0 },
      empty: { 0: 0, 1: 0, 2: 0 }
    };
  }

  static schema = {
    title: "Compare block",
    description: "Compare block content",
    type: "object",
    properties: {
      mainTitle: {
        type: "string",
        title: "Page title",
        description: "Max 100 characters."
      },
      urlLogo: {
        type: "string",
        title: "URL logo image",
        description: "ex: https://this.is.a.url/"
      },
      subtitle: {
        type: "string",
        title: "Right column text",
        description: "Max 110 characters."
      },
      btn: {
        type: "string",
        title: "Go to All Smartphones Button text",
        description: "ex: < see all smartphones"
      },
      btnLink: {
        type: "string",
        title: "Go to All Smarthphones Button link",
        description: "ex: https://this.is.a.url/"
      },
      propertiesList: {
        type: "string",
        title: "List of Product Specifications Ids, separates by commas",
        description: "ex: 123, 234, 345, 456"
      },
      buy: {
        type: "string",
        title: "Buy Smartphone Button text",
        description: "ex: Learn more"
      },
      addbtn: {
        type: "string",
        title: "Add Smartphone Button text",
        description: "ex: Add smartphone"
      },
      na: {
        type: "string",
        title: "Not available text",
        description: "ex: N/A"
      },
      disclaimer: {
        type: "string",
        title: "Disclaimer",
        description: "Fill with the properly disclaimers",
        widget: {
          "ui:widget": "textarea"
        }
      },
      textOfLinkToCarrierCompatibilityPage: {
        type: "string",
        title: "Text of link to carrier compatibility page"
      },
      linkToCarrierCompatibilityPage: {
        type: "string",
        title: "Path of carrier compatibility page"
      },
      shelfVariables: {
        type: "object",
        title: "Shelf variables",
        properties: {
          collection: {
            type: "string",
            title: "Collection Id",
            description: "e.g.: 156"
          },
          from: {
            type: "number",
            default: 0,
            title: "From",
            description: "e.g.: 0"
          },
          to: {
            type: "number",
            title: "To",
            default: 45,
            description: "e.g.: 9"
          }
        }
      }
    }
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
      .catch(console.log("details"));
  };

  selected = e => {
    e.persist();
    let origin = e.target.name;
    let value = e.target.value;

    let newState = Object.assign({}, this.state);
    newState.sku[origin] = value;
    newState.boxes[origin] = value;
    this.setState(newState);
  };

  clear = e => {
    e.persist();
    let origin = e.target.name;
    let value = 0;

    let newState = Object.assign({}, this.state);
    newState.boxes[origin] = value;
    this.setState(newState);
  };

  add = e => {
    e.persist();
    let origin = e.target.name;

    let newState = Object.assign({}, this.state);
    if (this.state.sku[origin].length > 0) {
      newState.boxes[origin] = this.state.sku[origin];
    } else {
      newState.boxes[origin] = document.getElementsByName(origin)[0].value;
      newState.sku[origin] = document.getElementsByName(origin)[0].value;
    }

    this.setState(newState);
  };

  heightBoxes() {
    if (this.state.details != undefined) {
      this.state.details.map(e => {
        const screenW = document.documentElement.clientWidth;
        let div = document.querySelectorAll(`[specification-name="${e.Name}"]`);
        const tbody = document.querySelector(".tbody");
        if (div.length >= 2 && !tbody.classList.contains("hidden")) {
          let divData = Object.entries(div).map(e => e[1].clientHeight);
          let height = Math.max(...divData);
          div.forEach(e =>
            e.setAttribute("style", `height:${height}px; padding: 10px 15px;`)
          );
          if (screenW < 805) {
            div[0].setAttribute(
              "style",
              `margin-bottom:${height}px; margin-top: 0;`
            );
          }
        } else if (div.length <= 1) {
          div.forEach(e => e.setAttribute("style", `height:0; padding:0;`));
        }
      });
    }
  }

  scrolled() {
    const screenH = window.scrollY;
    const screenW = document.documentElement.clientWidth;
    const divSelects = document.getElementById("select-scroll");
    const header = document
      .getElementsByClassName("main-header")[0]
      .getBoundingClientRect();
    const tbody = document.querySelector(".tbody");
    if (tbody && !tbody.classList.contains("hidden")) {
      const tbodyTop = tbody.offsetTop;
      const tbodyHeight = tbody.offsetHeight;
      const height = header.bottom;
      const bottom = tbodyTop + tbodyHeight;

      if (divSelects && tbody) {
        if (
          screenH > height &&
          screenH < bottom &&
          (screenW > 805 || screenW === 805)
        ) {
          divSelects.classList.add("scrolled");
          divSelects.style.top = height + "px";
        } else if (screenH > height && screenH < bottom && screenW < 805) {
          divSelects.classList.add("scrolled");
          divSelects.style.top = height + "px";
        } else {
          divSelects.classList.remove("scrolled");
          divSelects.style.top = "";
        }
      }
    }
  }

  componentDidMount() {
    this.setState({
      loading: true
    })
    this.getDetailList();
    this.heightBoxes();
    let queryParams = window.location.search;
    if(queryParams != null && queryParams != "") {
      if(queryParams.includes("__")) queryParams = queryParams.split("__")[0];
      queryParams = queryParams.split("?")[1];
      queryParams = queryParams.split("fq=Id:");
      let p = queryParams.map((p) => p.replace("&", ""));
      const query = { ...p.slice(1) };
      let clearQuery = { 0: 0, 1: 0, 2: 0 };
      let newState = Object.assign({}, this.state);
      newState.sku = query ? { ...clearQuery, ...query } : clearQuery;
      newState.boxes = query ? { ...clearQuery, ...query } : clearQuery;
      if (query) this.setState(newState);
    } else {
      const queryParams = window.location.search.split("fq=Id:");
      const p = queryParams.map(p => p.replace("&", ""));
      const query = { ...p.slice(1) };
      let clearQuery = { 0: 0, 1: 0, 2: 0 };
      let newState = Object.assign({}, this.state);
      newState.sku = query ? { ...clearQuery, ...query } : clearQuery;
      newState.boxes = query ? { ...clearQuery, ...query } : clearQuery;
      if (query) this.setState(newState);  
    }

    window.addEventListener("scroll", () => {
      this.scrolled();
    });

    ["onclick", "resize"].forEach(e => {
      window.addEventListener(e, () => {
        this.heightBoxes();
      });
    });
  }

  componentDidUpdate(prevState) {
    if (prevState.boxes != this.state.boxes) this.heightBoxes();
  }

  componentWillUnmount() {
    ["click", "resize"].forEach(e => {
      window.removeEventListener(e, () => {});
    });
  }

  render() {
    const { details, isLoading, sku, boxes, empty } = this.state;
    const {
      mainTitle,
      subtitle,
      btn,
      buy,
      addbtn,
      na,
      disclaimer,
      urlLogo,
      btnLink,
      textOfLinkToCarrierCompatibilityPage,
      linkToCarrierCompatibilityPage,
      shelfVariables
    } = this.props;
    return (
      <div>
        <main className="compare-page">
          <div className="compare-content">
            {isLoading && (
              <center>
                <Spinner />
              </center>
            )}
            {details && !isLoading && boxes && empty && (
              <Fragment>
                <Query
                  query={productsQuery}
                  variables={cleanShelfVariable(shelfVariables)}
                >
                  {({ loading, error, data }) => {
                    if (loading) {
                      return (
                        <center>
                          <Spinner />
                        </center>
                      );
                    }

                    if (error) {
                      console.log(error);
                      return <ExtensionPoint id="not-found" type="error" />;
                    }

                    return (
                      <div className="table-responsive">
                        <div className="main-title-box">
                          <h1
                            className="main-title"
                            dangerouslySetInnerHTML={{
                              __html: mainTitle.slice(0, 100)
                            }}
                          ></h1>
                        </div>
                        {textOfLinkToCarrierCompatibilityPage &&
                        linkToCarrierCompatibilityPage ? (
                          <div className="cp-link-carrier-compatibility-wrapper">
                            <a
                              className="cp-link-carrier-compatibility"
                              href={linkToCarrierCompatibilityPage}
                              target="_self"
                            >
                              {textOfLinkToCarrierCompatibilityPage}
                            </a>
                          </div>
                        ) : null}
                        <div id="select-scroll" className="float-products">
                          <Dropdown
                            devices={data.products}
                            query={sku[0]}
                            sku={sku}
                            index="0"
                            selected={this.selected.bind(this)}
                          />
                          <Dropdown
                            devices={data.products}
                            query={sku[1]}
                            sku={sku}
                            index="1"
                            selected={this.selected.bind(this)}
                          />
                          <Dropdown
                            devices={data.products}
                            query={sku[2]}
                            sku={sku}
                            index="2"
                            selected={this.selected.bind(this)}
                          />
                        </div>
                        <div className="main-table">
                          <div className="thead">
                            <div className="tr-flex">
                              <div className="modelos column box">
                                <p>
                                  <img src={"" || urlLogo} alt="Logo" />
                                </p>
                                {subtitle ? (
                                  <p
                                    dangerouslySetInnerHTML={{
                                      __html: subtitle.slice(0, 110)
                                    }}
                                  ></p>
                                ) : (
                                  ""
                                )}
                                {btn ? (
                                  <a
                                    className="versmartphones"
                                    href={btnLink}
                                    target="_self"
                                  >
                                    <p
                                      dangerouslySetInnerHTML={{ __html: btn }}
                                    ></p>
                                  </a>
                                ) : (
                                  ""
                                )}
                                {textOfLinkToCarrierCompatibilityPage &&
                                linkToCarrierCompatibilityPage ? (
                                  <a
                                    className="cp-link-to-carrier-compatibility"
                                    href={linkToCarrierCompatibilityPage}
                                    target="_self"
                                  >
                                    {textOfLinkToCarrierCompatibilityPage}
                                  </a>
                                ) : (
                                  ""
                                )}
                              </div>
                              <BuyProduct
                                devices={data.products}
                                sku={boxes[0]}
                                box={sku[0]}
                                id="0"
                                na={na}
                                buy={buy}
                                addbtn={addbtn}
                                clear={this.clear.bind(this)}
                                add={this.add.bind(this)}
                              />
                              <BuyProduct
                                devices={data.products}
                                sku={boxes[1]}
                                box={sku[1]}
                                id="1"
                                na={na}
                                buy={buy}
                                addbtn={addbtn}
                                clear={this.clear.bind(this)}
                                add={this.add.bind(this)}
                              />
                              <BuyProduct
                                devices={data.products}
                                sku={boxes[2]}
                                box={sku[2]}
                                id="2"
                                na={na}
                                buy={buy}
                                addbtn={addbtn}
                                clear={this.clear.bind(this)}
                                add={this.add.bind(this)}
                              />
                            </div>
                          </div>
                          <div
                            className={
                              boxes[0] === 0 && boxes[1] === 0 && boxes[2] === 0
                                ? "hidden tbody"
                                : "tbody"
                            }
                          >
                            <div className="column especificacaoTable">
                              {details.map((e, i) => {
                                return (
                                  <div
                                    className="description column"
                                    key={i}
                                    specification-name={e.Name || ""}
                                  >
                                    <p>{e.Name || ""}</p>
                                  </div>
                                );
                              })}
                            </div>
                            <TdProduct
                              devices={data.products}
                              details={details}
                              sku={boxes[0]}
                              na={na}
                              id="0"
                            />
                            <TdProduct
                              devices={data.products}
                              details={details}
                              sku={boxes[1]}
                              na={na}
                              id="1"
                            />
                            <TdProduct
                              devices={data.products}
                              details={details}
                              sku={boxes[2]}
                              na={na}
                              id="2"
                            />
                          </div>
                        </div>
                      </div>
                    );
                  }}
                </Query>
              </Fragment>
            )}
          </div>
          <Disclaimers disclaimerText={disclaimer} />
        </main>
      </div>
    );
  }
}

export default MotoCompare;
