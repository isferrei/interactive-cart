import React, { Component } from "react";
import { subscriber, subscriber1 } from "../../utils/messageService";
import CustomSelect from "./components/CustomSelect";
import "./BlogFilter.global.css";

class BlogFilter extends Component {
  constructor() {
    super();
    this.state = {
      filterTypeOptions: [
        { id: 1, name: "Filter by topic" },
        { id: 2, name: "Filter by year" }
      ],
      filterData: [],
      categoryNames: [],
      yearOfBlog: [],
      filterType: "Filter by topic",
      filterValue: "All",
      showBottomSheet: false
    };
  }

  changeData = () => {
    let tempData = { ...this.state.filterData };
    this.setState({ filterData: tempData[0] }, () => {
      subscriber.next(this.state.filterData);
    });
  };

  createCategory = () => {
    let categoryNames = [];
    this.state.filterData && this.state.filterData.map(item => {
      item.category && item.category.map(category => {
        categoryNames = categoryNames.concat(category.categoryName);
      });
    });
    categoryNames = [...new Set(categoryNames)];
    let temp = [{ id: 1, name: "All" }];
    categoryNames.map((category, id) => {
      temp.push({
        id: id + 2,
        name: category
      });
    });
    this.setState({ categoryNames: temp });
  };

  filterTypeChange = selectedFilterType => {
    this.setState({ filterType: selectedFilterType });
    this.refs.filterValue.resetDropDown();
  };

  filterValueChange = selectedFilterValue => {
    let filteredData;
    if (selectedFilterValue === "All") {
      filteredData = this.state.filterData;
    } else {
      if (this.state.filterType === "Filter by year") {
        filteredData = this.state.filterData.filter(item => {
          return item.datePublished && item.datePublished.includes(selectedFilterValue);
        });
      } else {
        filteredData = this.state.filterData.filter(item =>
          item.category && item.category.some(cat => cat.categoryName === selectedFilterValue)
        );
      }
    }
    this.setState({ filterValue: selectedFilterValue });
    subscriber1.next(filteredData);
    this.toggleBottomSheet();
  };

  createYears = () => {
    let years = [];
    this.state.filterData && this.state.filterData.map(item => {
      years = years.concat(
        item.datePublished && item.datePublished.substr(item.datePublished.length - 4)
      );
    });
    years = [...new Set(years)];
    let temp = [{ id: 1, name: "All" }];
    years.map((year, id) => {
      temp.push({
        id: id + 2,
        name: year
      });
    });
    this.setState({ yearOfBlog: temp });
  };

  toggleBottomSheet = () => {
    this.setState({ showBottomSheet: !this.state.showBottomSheet });
    if(!this.state.showBottomSheet) {
      document.getElementsByTagName('body')[0].style.overflow = 'hidden';
    } else {
      document.getElementsByTagName('body')[0].style.overflow = 'auto';
    }
  };

  componentDidMount() {
    subscriber.subscribe(data => {
      this.setState({ filterData: data }, () => {
        this.createCategory();
        this.createYears();
        subscriber1.next(this.state.filterData);
      });
    });
  }

  componentWillUnmount() {
    subscriber.unsubscribe();
    subscriber1.unsubscribe();
  }

  render() {
    let filterValues =
      this.state.filterType === "Filter by year"
        ? this.state.yearOfBlog
        : this.state.categoryNames;
    return (
      <>
        {this.state.filterData.length > 0 ? (
          <div className="blog-filter">
            <div className="bf-desktop">
              <div className="bf-filter-type">
                <CustomSelect
                  defaultText="Filter by topic"
                  optionsList={this.state.filterTypeOptions}
                  click={this.filterTypeChange}
                />
              </div>
              <div className="bf-filter-value">
                <CustomSelect
                  defaultText="All"
                  optionsList={
                    this.state.filterType === "Filter by year"
                      ? this.state.yearOfBlog
                      : this.state.categoryNames
                  }
                  click={this.filterValueChange}
                  ref="filterValue"
                />
              </div>
            </div>
            <div className="bf-mobile">
              <div
                className="bf-filter-button"
                onClick={this.toggleBottomSheet}
              >
                <span>Filter</span>
                <i className="fa fa-filter"></i>
              </div>
              {this.state.showBottomSheet ? (
                <div className="bf-backdrop" onClick={this.toggleBottomSheet}></div>
              ) : null}
              <div
                className={`bf-filter-container ${
                  this.state.showBottomSheet ? "bf-show" : "bf-hide"
                }`}
              >
                <div className="bf-heading">
                  <i className="fa fa-filter"></i>
                  <span>Filter by</span>
                  <div
                    className="bf-clear"
                    onClick={() => {
                      this.filterTypeChange("Filter by topic");
                      this.filterValueChange("All");
                    }}
                  >
                    clear
                  </div>
                </div>
                <div className="bf-filter-type">
                  {this.state.filterTypeOptions.map(
                    (filterTypeOption, index) => {
                      return (
                        <div
                          className={`bf-filter-type-item ${
                            this.state.filterType === filterTypeOption.name
                              ? "bf-active-type"
                              : ""
                          }`}
                          onClick={e => {
                            this.filterTypeChange(e.target.innerText);
                          }}
                          key={index}
                        >
                          {filterTypeOption.name}
                        </div>
                      );
                    }
                  )}
                </div>
                <div className="bf-filter-value">
                  {filterValues.map((filterValue, index) => {
                    return (
                      <div
                        className={`bf-filter-value-item ${
                          filterValue.name === this.state.filterValue
                            ? "bf-active-value"
                            : ""
                        }`}
                        onClick={e => {
                          this.filterValueChange(e.target.innerText);
                        }}
                        key={index}
                      >
                        {filterValue.name}
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        ) : null}
      </>
    );
  }
}

export default BlogFilter;
