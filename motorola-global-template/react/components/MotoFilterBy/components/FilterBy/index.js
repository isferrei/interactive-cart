import React, { useState, useEffect, Fragment } from 'react';
import filterMobIcon from "../../assets/filter_mobile_arrow.svg";
import filterIcon from '../../assets/filter-icon-mobile.svg';
import { Slider } from 'vtex.styleguide';
import { useIntl } from 'react-intl';
import { formatCurrency } from 'vtex.format-currency';
import { useRuntime } from 'vtex.render-runtime';
import '../../../MotoProductDetails/Colors.global.css';

const FilterBy = props => {
  const {
    details,
    filterTitle,
    resetTitle,
    categoryTitle,
    priceTitle,
    onChange,
    pdpVariations,
    getPriceRange
  } = props;
  
  const [loading, setLoading] = useState(false);
  const [all, setAll] = useState([]);
  const [query, setQuery] = useState([]);
  const [categories, setCategories] = useState([]);
  const [filters, setFilters] = useState([]);
  const [pdp, setPdp] = useState([]);
  const [slider, setSlider] = useState(1);
  const [priceR, setPriceR] = useState({});
  const { culture } = useRuntime();
  const intl = useIntl();
  let items, families, prices, pdpDiv;
  const [showBackdrop, setshowBackdrop] = useState(false);

  const getFilters = () => {
    const products = props.data;
    const list = props.details.map(e => e.Name);
    let specs, data, specsFilters, findColor;
    let all = [];
    const regEx = /^#([0-9a-f]{3}){1,2}$/i;
    list.map((l, i) => {
      let filtered = [];
      let result = [];
      products.map(e => {
        specs = e.specificationGroups.find(g => g.name === 'allSpecifications').specifications;
        data = specs.find(h => h.name === list[i]);
        specsFilters =
          data != undefined
            ? data.values[0]
                .split(',')[0]
                .replace('<p>', '')
                .replace('</p>', '')
            : null;
        if (data != undefined) {
          const element = specsFilters
            .split('[')
            .pop()
            .split(']')[0]
            .match(regEx);
          if (specsFilters.search(regEx) && element != null) {
            findColor = Object.values(element)[0];
            specsFilters = specsFilters.replace(
              findColor,
              `<div class='specification-color-swatcher' style='background-color:${findColor}'></div>`
            );
            specsFilters = specsFilters.replace('[', ' ').replace(']', '');
          }
        }

        if (specsFilters != null) filtered.push(specsFilters);
      });
      filtered = [...new Set(filtered)];
      result = [list[i], filtered.sort()];
      all.push(result);
    });
    setAll(all);
    createFilters(all);
  };

  const createFilters = all => {
    let filters = [];
    let filter;
    const names = props.details.map(e => e.Name);
    const ids = props.details.map(e => e.FieldId);
    names.map((e, i) => {
      const filterList = all.find(f => e === f[0]);
      if (filterList != undefined && filterList.length > 0) {
        filter = all.find(f => e === f[0]);
        filters.push(filter.concat(ids[i]));
      }
    });
    setFilters(filters);
    getFamily();
  };

  const getFamily = () => {
    const products = props.data;
    let categories = [];
    let deviceCat;
    products.map(e => {
      deviceCat = e.categories[0].split('/');
      if (deviceCat[deviceCat.length - 2])
        categories.push(deviceCat[deviceCat.length - 2]);
    });
    categories = [...new Set(categories)];
    setCategories(categories.sort());
    getPdp();
  };

  const getPdp = () => {
    if (pdpVariations) {
      const varList = [pdpVariations.split(',')];
      let item, availableItem, variation;
      let variations = [];
      let result = [];
      props.data.map(e => {
        item = e.items.find(i => i.sellers[0].commertialOffer.Price > 0);
        availableItem = item ? e.items.indexOf(item) : 0;
        variation = e.items[availableItem].variations;
        if (variation.length > 0) variations = [...variations, ...variation];
      });
      variations.forEach(e => {
        result[e.name];
        if (varList[0].includes(e.name) && e.name === e.name) {
          result[e.name] != undefined
            ? result[e.name].push(e.values[0])
            : (result[e.name] = e.values);
          result[e.name] = [...new Set(result[e.name])];
        }
      });
      setPdp(result);
    }
    definePriceRange();
  };

  const definePriceRange = () => {
      let item, price, availableIndex;
      let result = [];
      props.data.map(e => {
        item = e.items.find(i => i.sellers[0].commertialOffer.Price > 0);
        availableIndex = item ? e.items.indexOf(item) : 0;
        price = e.items[availableIndex].sellers[0].commertialOffer.Price ;
        result.push(price)
      });
      const values = {
        minValue: Math.min.apply(null, result),
        maxValue: Math.max.apply(null, result)
      }
      setPriceR(values);
  };

  const handleChoice = e => {
    let divs, allDivs;
    divs = e.target.parentNode.children;
    let siblings = n => [...n.parentElement.children].filter(c => c != n);
    allDivs = siblings(e.target.parentNode);
    Array.from(allDivs).map(d => {
      Array.from(d.children).map((e) => {
        if(e.classList.value.includes('c-active')) e.classList.remove('c-active');
        if(e.classList.value.includes('show')) e.classList.remove('show');
      });
    })

    Array.from(divs).map(d => {
      if (d.classList.value.includes('specsTitle')) {
        d.classList.value.includes('c-active')? d.classList.remove('c-active'): d.classList.add('c-active');
      }

      if (d.classList.value.includes('specs-content')) {
        d.classList.value.includes('show')? d.classList.remove('show'): d.classList.add('show');
      }
    });
  };

  const handleCheck = e => {
    const divs = e.target.parentNode.children;
    Array.from(divs).map(d => {
      if (d.classList.value.includes("multi-search-checkbox")) {
        if (d.checked) {
          d.removeAttribute("checked");
          query.splice(query.indexOf(d.id), 1);
        } else {
          d.setAttribute("checked", "checked");
          query.push(d.id);
        }
      }
    });
    if (onChange) onChange(query);
  };

  const handleCloseSidebar = () => {
    document.getElementsByClassName("sidebar")[0].classList.remove("show");
    document.getElementsByClassName("sidebar")[0].classList.add("hide");
    setshowBackdrop(false);
  };

  const handleOpenSidebar = () => {
    document.getElementsByClassName("sidebar")[0].classList.remove("hide");
    document.getElementsByClassName("sidebar")[0].classList.add("show");
    setshowBackdrop(true);
  };

  const resetFilters = () => {
    while (query.length > 0) query.pop();
    if (onChange) onChange(query);

    const cleanRange = [priceR.minValue, priceR.maxValue];
    getPriceRange(cleanRange);
    setSlider(Date.now());

    const checkboxes = document.querySelectorAll(".multi-search-checkbox");
    checkboxes.forEach(e => {
      if (e.checked) e.removeAttribute("checked");
    });
    setshowBackdrop(false);
  };
  if (showBackdrop) {
    document.getElementsByTagName("body")[0].style.overflow = "hidden";
  } else {
    document.getElementsByTagName("body")[0].style.overflow = "auto";
  }
    if (filters) {
      items = filters.map((element, i) => {
        return (
          <fieldset key={i}>
            <h5
              className={"specsTitle specs-" + i}
              onClick={() => {
                handleChoice(event);
              }}
            >
              {element[0]}
            </h5>
            {element[1].map((k, j) => (
              <div key={j} className={"specs-content-" + i}>
                <label
                  className="moto-specsOption"
                  htmlFor={k}
                  onClick={() => {
                    handleCheck(event);
                  }}
                >
                  <div
                    className="moto-specsOption-title"
                    dangerouslySetInnerHTML={{ __html: k }}
                  ></div>
                  <input
                    className="multi-search-checkbox"
                    id={
                      "customSpecs+" +
                      details.find(
                        detail => detail.FieldId === parseInt(element[2])
                      ).Name +
                      ":" +
                      (k && k.includes("div")
                        ? k.split("<")[0].replace(" ", "")
                        : k)
                    }
                    type="checkbox"
                    value={k}
                  />
                  <span className="checkmark"></span>
                </label>
              </div>
            ))}
          </fieldset>
        );
      });
    }

  if (categories) {
    families = (
      <fieldset key="category">
        <h5
          className="specsTitle specs-category"
          onClick={() => {
            handleChoice(event);
          }}
        >
          {categoryTitle}
        </h5>
        {categories.map((k, j) => (
          <div key={j} className={"specs-content-" + j}>
            <label
              className="moto-specsOption"
              htmlFor={k}
              onClick={() => {
                handleCheck(event);
              }}
            >
              <div
                className="moto-specsOption-title"
                dangerouslySetInnerHTML={{ __html: k }}
              ></div>
              <input
                className="multi-search-checkbox"
                id={"category:" + k}
                type="checkbox"
                value={k}
              />
              <span className="checkmark"></span>
            </label>
          </div>
        ))}
      </fieldset>
    );
  }

  if (pdp) {
    pdpDiv = Object.entries(pdp).map((element, i) => {
      return (
        <fieldset key={i}>
          <h5
            className={"specsTitle specs-pdp-" + i}
            onClick={() => {
              handleChoice(event);
            }}
          >
            {element[0]}
          </h5>
          {element[1].map((k, j) => (
            <div key={j} className={"specs-content-" + i}>
              <label
                className="moto-specsOption"
                htmlFor={k}
                onClick={() => {
                  handleCheck(event);
                }}
              >
                <div className="moto-specsOption-title">
                  {k}
                  {element[0] === "Color" ? (
                    <span
                      className={
                        "specification-color-swatcher vtex-store-components-3-x-skuSelectorItem--" +
                        k
                          .replace(" ", "-")
                          .toLowerCase()
                          .replace(" ", "-")
                      }
                    ></span>
                  ) : (
                    ""
                  )}
                </div>
                <input
                  id={"customVariations+" + element[0] + ":" + k}
                  className="multi-search-checkbox"
                  type="checkbox"
                  value={k}
                />
                <span className="checkmark"></span>
              </label>
            </div>
          ))}
        </fieldset>
      );
    });
  }

  if (priceR) {
    prices = (
      <fieldset key='pricerange'>
        <h5
          className='specsTitle specs-price'
          onClick={() => {
            handleChoice(event);
          }}
        >
          {priceTitle}
        </h5>
        <div key='prices' className='specs-content-prices'>
          <Slider
            key={slider}
            min={priceR.minValue}
            max={priceR.maxValue}
            onChange={getPriceRange}
            formatValue={value => formatCurrency({ intl, culture, value })}
            range
          />
        </div>
      </fieldset>
    );
  }

  useEffect(() => {
    if (props) {
      getFilters();
    }
  }, []);

  return (
    <Fragment>
      {loading && <center></center>}
      {!loading && (
        <div className="sidebar-wrap">
          <div className="mobile-filter-btn" onClick={handleOpenSidebar}>
            <p>
              <img className="filterIcon" src={filterIcon} alt="Filter Icon" /> {filterTitle}
            </p>
          </div>
          {showBackdrop ? (
            <div
              className="filterBy-backdrop"
              onClick={handleCloseSidebar}
            ></div>
          ) : null}
          <div className="sidebar desktop">
            <div className="header-sidebar row">
              <div onClick={handleCloseSidebar} className="mobile-close-btn">
                <div className="col-6 filterMobTitle filter">
                  <img className="filterMObIcon" src={filterMobIcon} alt="Filter Icon" />
                  <p>{filterTitle}</p>
                </div>
                <div className="col-6 filterMobTitle reset">
                  <p className="resetText" onClick={resetFilters}>
                    <span className="text">{resetTitle}</span>
                  </p>
                </div>
              </div>
              <div className="col-6 filterTitle filterIconTitle">
                <img className="filterIcon" src={filterIcon} alt="Filter Icon" />
                <p>{filterTitle}</p>
              </div>
              <div className="col-6 filterTitle filterResetTitle">
                <p className="resetText" onClick={resetFilters}>
                  <span className="text">{resetTitle}</span>
                </p>
              </div>
            </div>
            {details && all && (
              <div className="sidebar-content search-multiple-navigator">
                {items ? items : ""}
                {families ? families : ""}
                {prices ? prices : ""}
                {pdpDiv ? pdpDiv : ""}
              </div>
            )}
          </div>
        </div>
      )}
    </Fragment>
  );
};

export default FilterBy;
