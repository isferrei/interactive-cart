import React, { Component, Fragment } from "react";
import { Query } from "react-apollo";
import { ExtensionPoint } from "vtex.render-runtime";
import { Spinner } from "vtex.styleguide";
import FamilyDropdown from "./components/FamilyDropdown";
import CarrierDropdown from "./components/CarrierDropdown";
import ProductTiles from "./components/ProductTiles";
import productsQuery from "./queries/productsQuery.gql";
import api from "../../utils/getData";
import { getRootPath } from "../../utils/helpers";
import "./MotoCarrierCompatibility.global.css";

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

class MotoCarrierCompatibility extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      familySelected: "",
      carrierSelected: ""
    };
  }

  static schema = {
    title: "Carrier Compatibility block",
    description: "Carrier Compatibility block content",
    type: "object",
    properties: {
      mainTitle: {
        type: "string",
        title: "Page title",
        description: "Max 100 characters."
      },
      subTitle: {
        type: "string",
        title: "Sub title text",
        description: "Max 110 characters."
      },
      seeAllSmartphonesBtn: {
        type: "string",
        title: "Go to All Smartphones Button text",
        description: "ex: see all smartphones"
      },
      seeAllSmartphonesBtnLink: {
        type: "string",
        title: "Go to All Smarthphones Button link",
        description: "ex: https://this.is.a.url/"
      },
      carrierIdList: {
        type: "string",
        title:
          "List of Carrier field Ids (from product specifications), separates by commas",
        description: "ex: 123, 234, 345, 456"
      },
      learnMoreText: {
        type: "string",
        title: "Learn more text",
        description: "ex: Learn more"
      },
      notAvailableText: {
        type: "string",
        title: "Not available text",
        description: "ex: N/A"
      },
      toTopText: {
        type: "string",
        title: "Go back to the top text",
        description: "ex: Go back to the top"
      },
      compatibleTextColor: {
        type: "string",
        title: "Compatible text color",
        description: "ex: #001428"
      },
      compatibleBorderColor: {
        type: "string",
        title: "Compatible border color",
        description: "ex: #001428"
      },
      notCompatibleTextColor: {
        type: "string",
        title: "Not Compatible text color",
        description: "ex: #001428"
      },
      notCompatibleBorderColor: {
        type: "string",
        title: "Not Compatible border color",
        description: "ex: #001428"
      },
      selectFamilyText: {
        type: "string",
        title: "Select a family text",
        description: "ex: Select a Motorola device family"
      },
      selectCarrierText: {
        type: "string",
        title: "Select a carrier text",
        description: "ex: Select a network carrier"
      },
      shelfVariables: {
        type: "object",
        title: "Shelf variables",
        properties: {
          collection: {
            type: "string",
            title: "Collection Id",
            description: "e.g.: 199"
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
            default: 46,
            description: "e.g.: 46"
          }
        }
      }
    }
  };

  getProductDetailList = async () => {
    const customProperties =
      this.props.carrierIdList.split(",").map(Number) || [];
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
      .catch(error => {
        console.error(error.message)
      });
  };

  selectedFamily = e => {
    e.persist();
    let value = e.target.value;
    this.setState({ familySelected: value });
  };

  selectedCarrier = e => {
    e.persist();
    let value = e.target.value;
    this.setState({ carrierSelected: value });
  };

  componentDidMount() {
    this.getProductDetailList();
  }

  render() {
    const { details, isLoading } = this.state;
    const {
      mainTitle,
      subTitle,
      seeAllSmartphonesBtn,
      seeAllSmartphonesBtnLink,
      learnMoreText,
      notAvailableText,
      toTopText,
      compatibleTextColor,
      compatibleBorderColor,
      notCompatibleTextColor,
      notCompatibleBorderColor,
      selectFamilyText,
      selectCarrierText,
      shelfVariables
    } = this.props;
    return (
      <div>
        <main className="carrier-compatibility-page">
          <div className="cc-content">
            {isLoading && (
              <center>
                <Spinner />
              </center>
            )}
            {details && !isLoading && (
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
                      console.error(error.message);
                      return <ExtensionPoint id="not-found" type="error" />;
                    }
                    return (
                      <div className="cc-filter-section">
                        <div className="cc-filter-section-header">
                          {mainTitle ? (
                            <div
                              className="cc-main-title"
                              dangerouslySetInnerHTML={{
                                __html: mainTitle.slice(0, 100)
                              }}
                            ></div>
                          ) : (
                            ""
                          )}

                          {subTitle ? (
                            <div
                              className="cc-sub-title"
                              dangerouslySetInnerHTML={{
                                __html: subTitle.slice(0, 110)
                              }}
                            ></div>
                          ) : (
                            ""
                          )}

                          {seeAllSmartphonesBtn ? (
                            <a
                              className="cc-smartphones"
                              href={seeAllSmartphonesBtnLink}
                              target="_self"
                            >
                              <span
                                dangerouslySetInnerHTML={{
                                  __html: seeAllSmartphonesBtn
                                }}
                              ></span>
                            </a>
                          ) : (
                            ""
                          )}
                        </div>

                        <div
                          id="cc-family-carrier-select-section"
                          className="cc-family-carrier-selection"
                        >
                          <FamilyDropdown
                            families={data.products}
                            selectTextFamily={selectFamilyText}
                            selectedFamily={this.selectedFamily.bind(this)}
                          />
                          <CarrierDropdown
                            carriers={details}
                            selectCarrierText={selectCarrierText}
                            selectedCarrier={this.selectedCarrier.bind(this)}
                          />
                        </div>

                        <div className="cc-filtered-product-tiles">
                          <ProductTiles
                            devices={data.products}
                            details={details}
                            leanMore={learnMoreText}
                            na={notAvailableText}
                            compatibleColorText={compatibleTextColor}
                            compatibleColorBorder={compatibleBorderColor}
                            notCompatibleColorText={notCompatibleTextColor}
                            notCompatibleColorBorder={notCompatibleBorderColor}
                            familySelect={this.state.familySelected}
                            carrierSelect={this.state.carrierSelected}
                            toTopText={toTopText}
                          />
                        </div>
                      </div>
                    );
                  }}
                </Query>
              </Fragment>
            )}
          </div>
        </main>
      </div>
    );
  }
}

export default MotoCarrierCompatibility;
