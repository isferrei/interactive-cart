import React from "react";
import { path } from "ramda";
import { scroller as scroll } from "react-scroll";
import "./ProductSpecifications.global.css";
import SpecificationGroup from "./components/SpecificationGroup/index";
import SpecificationArrow from "../../utils/SpecificationArrow";
import Collapsible from "react-collapsible";
import FilledArrow from "../../utils/FilledArrow";
import UpFastArrow from "../../utils/UpFastArrow";
import IconMinus from "../../utils/IconMinus";
import IconPlus from "../../utils/IconPlus";
import { FormattedMessage } from "react-intl";

class ProductSpecifications extends React.Component {
  state = {
    specificationsLoaded: false,
    specificationOpen: false,
    mobileSpecificationOpen: false,
    specificationGroups: [],
    specificationGroupsOpen: {},
    supportSpecs: [],
    supportSpecsOpen: {},
    specShowFlag: true
  };

  colorNames = {
    Colour: "Colours",
    Color: "Colors",
    Colores: "Colores",
    Farben: "Farbe",
    Couleurs: "Couleurs",
    Kleuren: "Kleuren",
    Colori: "Colori",
    Kolory: "Kolory",
    Farver: "Farver",
    Boje: "Boje",
    Culori: "Culori",
    Farby: "Farby",
    カラー: "カラー",
    顏色: "顏色",
    Цвета: "Цвета",
    Цветове: "Цветове",
    สี: "สี",
    Färger: "Färger"
  };

  componentDidMount() {
    this.loadSpecsBlock();
  }

  componentWillUnmount() {
    this.loadSpecsBlock();
  }

  loadSpecsBlock = () => {
    if (!this.props.productQuery.loading && !this.state.specificationsLoaded) {
      this.setState({ specificationsLoaded: true });
      const specificationGroups = path(
        ["product", "specificationGroups"],
        this.props.productQuery
      );
      if (!specificationGroups) return;

      let blocksObject = specificationGroups.filter(
        item => item.name == "Blocks"
      );
      const phoneSpecs = specificationGroups.filter(specificationGroup => {
        let excludableSpecs = [
          "Hero",
          "Buy Button",
          "HTML Specification",
          "allSpecifications",
          "Key Specifications",
          "Blocks",
          "Slider",
          "Support"
        ];
        return !excludableSpecs.includes(specificationGroup.name);
      });
      if (!phoneSpecs.length) return;
      let groupSpecs = {};
      phoneSpecs.map((groupSpec, key) => (groupSpecs[key] = true));
      this.setState({
        specificationGroupsOpen: groupSpecs,
        specificationGroups: phoneSpecs
      });
      const supportSpecs = specificationGroups.find(specificationGroup => {
        return specificationGroup.name.toLowerCase() === "support";
      });
      if (!supportSpecs) return;
      let supportSpecsList = {};
      if (!supportSpecs.specifications) return;
      supportSpecs.specifications.map(
        (supportSpec, key) => (supportSpecsList[key] = false)
      );
      this.setState({
        supportSpecs: supportSpecs.specifications,
        supportSpecsOpen: supportSpecsList
      });
    }
  };

  toggleSpecificationGroup = specKey => {
    let groupSpecs = this.state.specificationGroupsOpen;
    groupSpecs[specKey] = !this.state.specificationGroupsOpen[specKey];
    this.setState({ specificationGroupsOpen: groupSpecs });
  };

  toggleSpecifications = () => {
    this.setState(state => ({ specificationOpen: !state.specificationOpen }));
    scroll.scrollTo("specification-groups", {
      smooth: true,
      offset: -100,
      duration: 300
    });
  };

  toggleSpecificationsMobile = () => {
    this.setState(state => ({
      mobileSpecificationOpen: !state.mobileSpecificationOpen
    }));
    scroll.scrollTo("specification-groups", {
      smooth: true,
      offset: -100,
      duration: 300
    });
  };

  toggleSupportSpec = supportSpecKey => {
    let supportSpecsList = {};
    this.state.supportSpecs.map((supportSpec, key) => {
      if (key !== supportSpecKey) {
        supportSpecsList[key] = false;
      }
    });
    supportSpecsList[supportSpecKey] = !this.state.supportSpecsOpen[
      supportSpecKey
    ];
    this.setState({ supportSpecsOpen: supportSpecsList });
  };

  extractColor = color => {
    var regExp = /\[([^)]+)\]/;
    var matches = regExp.exec(color);
    return matches[1];
  };

  extractColorName = color => {
    return color.replace(/ *\[[^)]*\] */g, "");
  };

  render() {
    if (!this.state.specificationGroups.length) {
      return <div />;
    }

    return (
      <React.Fragment>
        <div className="specification-groups">
          <div className="container">
            <Collapsible
              handleTriggerClick={this.toggleSpecifications}
              open={this.state.specificationOpen}
              onOpen={this.scrollToTop}
              onClose={this.scrollToTop}
              transitionTime={300}
              trigger={
                <div
                  className={
                    this.state.specificationOpen
                      ? "all-specifications-header specification-header-active"
                      : "all-specifications-header"
                  }
                >
                  <SpecificationArrow
                    type="first"
                    className="specification-arrow"
                  />{" "}
                  <FormattedMessage id="store/product-specifications.view-all-specifications" />
                </div>
              }
            >
              <div className="all-specifications specifications-open all-specifications-desktop">
                {this.state.specificationGroups.map(
                  (specificationGroup, key) => (
                    <div key={key} className="specification-group">
                      <SpecificationGroup
                        colorNames={this.colorNames}
                        key={key}
                        specificationGroup={specificationGroup}
                      />
                    </div>
                  )
                )}
              </div>

              <div
                onClick={this.toggleSpecifications}
                className={
                  this.state.specificationOpen
                    ? "all-specifications-header specification-header-active"
                    : "all-specifications-header"
                }
              >
                <SpecificationArrow className="specification-arrow" />
                <FormattedMessage id="store/product-specifications.view-all-specifications" />
              </div>
            </Collapsible>
            <div className="all-specifications all-specifications-mobile">
              <Collapsible
                handleTriggerClick={this.toggleSpecificationsMobile}
                open={this.state.mobileSpecificationOpen}
                onOpen={this.scrollToTop}
                onClose={this.scrollToTop}
                transitionTime={300}
                trigger={
                  <div
                    className={
                      this.state.mobileSpecificationOpen
                        ? "all-specifications-header specification-header-active all-specifications-header-mobile"
                        : "all-specifications-header all-specifications-header-mobile"
                    }
                  >
                    <FormattedMessage id="store/product-specifications.view-all-specifications" />
                    <FilledArrow
                      type="first"
                      className={
                        this.state.mobileSpecificationOpen
                          ? "specification-group-name-arrow arrow-up"
                          : "specification-group-name-arrow arrow-down"
                      }
                    />{" "}
                  </div>
                }
              >
                {this.state.specificationGroups.map(
                  (specificationGroup, key) => {
                    if (!this.colorNames[specificationGroup.name]) {
                      return (
                        <div key={key} className="specification-group">
                          <Collapsible
                            handleTriggerClick={() =>
                              this.toggleSpecificationGroup(key)
                            }
                            open={this.state.specificationGroupsOpen[key]}
                            tabIndex={key}
                            transitionTime={300}
                            trigger={
                              <div className="specification-group-name">
                                <span className="specification-group-name-text">
                                  {specificationGroup.name}
                                </span>
                                <div
                                  className={
                                    this.state.specificationGroupsOpen[key]
                                      ? "inner-specification-icon active"
                                      : "inner-specification-icon"
                                  }
                                >
                                  <span></span>
                                  <span></span>
                                </div>
                              </div>
                            }
                          >
                            <div className="specification-group-values open-specification-group-values">
                              {specificationGroup.specifications.map(
                                (specification, groupKey) => (
                                  <div
                                    className="specification-group-value"
                                    key={groupKey}
                                  >
                                    <div className="specification-value-name">
                                      {specification.name}
                                    </div>
                                    <ul>
                                      {specification.values.map(
                                        (value, specKey) => (
                                          <li
                                            dangerouslySetInnerHTML={{
                                              __html: value.replace(
                                                /\|\|\s*[0|1]$/,
                                                ""
                                              )
                                            }}
                                            key={specKey}
                                          />
                                        )
                                      )}
                                    </ul>
                                  </div>
                                )
                              )}
                            </div>
                          </Collapsible>
                        </div>
                      );
                    }
                    return (
                      <div key={key} className="specification-group">
                        <Collapsible
                          handleTriggerClick={() =>
                            this.toggleSpecificationGroup(key)
                          }
                          open={this.state.specificationGroupsOpen[key]}
                          tabIndex={key}
                          transitionTime={300}
                          trigger={
                            <div className="specification-group-name">
                              <span className="specification-group-name-text">
                                {this.colorNames[specificationGroup.name]}
                              </span>
                              <div
                                className={
                                  this.state.specificationGroupsOpen[key]
                                    ? "inner-specification-icon active"
                                    : "inner-specification-icon"
                                }
                              >
                                <span></span>
                                <span></span>
                              </div>
                            </div>
                          }
                        >
                          <div className="specification-group-values open-specification-group-values">
                            {specificationGroup.specifications.map(
                              (colorSpecification, groupKey) => {
                                return colorSpecification.values.map(
                                  (color, colorKey) => {
                                    return (
                                      <div
                                        className="specification-group-value"
                                        key={colorKey}
                                      >
                                        <div className="specification-value-name">
                                          {color.includes("[")
                                            ? this.extractColorName(color)
                                            : color}
                                        </div>
                                        <ul>
                                          <li>
                                            <div
                                              style={{
                                                backgroundColor: color.includes(
                                                  "["
                                                )
                                                  ? this.extractColor(color)
                                                  : color
                                              }}
                                              className="specification-color-swatcher"
                                            />
                                          </li>
                                        </ul>
                                      </div>
                                    );
                                  }
                                );
                              }
                            )}
                          </div>
                        </Collapsible>
                      </div>
                    );
                  }
                )}
                <div
                  onClick={this.toggleSpecificationsMobile}
                  className={
                    this.state.mobileSpecificationOpen
                      ? "all-specifications-header specification-header-active all-specifications-header-mobile"
                      : "all-specifications-header all-specifications-header-mobile"
                  }
                >
                  <UpFastArrow className="specification-arrow close" />
                  <span className="close-icon-text">
                    <FormattedMessage id="store/product-specifications.view-all-specifications" />
                  </span>
                </div>
              </Collapsible>
            </div>
          </div>
        </div>
        {this.state.supportSpecs.length ? (
          <div className="container">
            <div className="pdp-faq-title">
              <h1>
                <FormattedMessage id="store/product-specifications.support-label" />
              </h1>
            </div>
            <div className="pdp-faq">
              {this.state.supportSpecs.map((supportSpec, key) => (
                <div key={key} className="pdp-faq-question-container">
                  <Collapsible
                    handleTriggerClick={() => this.toggleSupportSpec(key)}
                    open={this.state.supportSpecsOpen[key]}
                    transitionTime={300}
                    trigger={
                      <div className="pdp-faq-question-title">
                        <div
                          className="pdp-faq-question"
                          dangerouslySetInnerHTML={{ __html: supportSpec.name }}
                        />
                        <div className="pdp-faq-question-icon">
                          {!this.state.supportSpecsOpen[key] ? (
                            <IconPlus
                              className="pdp-faq-question-icon-svg"
                              type={2}
                            />
                          ) : (
                            <IconMinus
                              className="pdp-faq-question-icon-svg"
                              type={2}
                            />
                          )}
                        </div>
                      </div>
                    }
                  >
                    <div
                      className="pdp-faq-answer"
                      dangerouslySetInnerHTML={{
                        __html: supportSpec.values[0]
                      }}
                    />
                  </Collapsible>
                </div>
              ))}
            </div>
          </div>
        ) : null}
      </React.Fragment>
    );
  }
}

export default ProductSpecifications;
