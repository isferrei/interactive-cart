import React, { Component } from "react";

class FamilyDropdown extends Component {
  render() {
    const { families, selectTextFamily } = this.props;
    let categoryList = [];
    let uniqueFamilies = [];
    categoryList = families
      .map(e => e)
      .map(d => {
        if (d.categories.length > 0) {
          let getCategory = d.categories[0].split("/");
          if (getCategory.length > 0) {
            return getCategory[getCategory.length - 2];
          }
        }
      });
    categoryList.map(familyname => {
      if (
        typeof familyname !== "undefined" &&
        uniqueFamilies.indexOf(familyname) === -1
      ) {
        uniqueFamilies.push(familyname);
      }
    });

    const categoryOptions = uniqueFamilies.map(eachFamily => {
      return (
        <option key={eachFamily} label={eachFamily} value={eachFamily}>
          {eachFamily}
        </option>
      );
    });

    return (
      <select className="cc-select-family" onChange={this.props.selectedFamily}>
        <option value="cc-select-a-family">
          {selectTextFamily
            ? selectTextFamily
            : "Select a Motorola device family"}
        </option>
        {categoryOptions}
      </select>
    );
  }
}

export default FamilyDropdown;
