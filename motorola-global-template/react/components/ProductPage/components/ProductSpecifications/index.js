import React, { Fragment, Component } from 'react';
import { path } from 'ramda';
import specificationArrow from './specification-arrow.svg';
import './ProductSpecifications.global.css';
import SpecificationGroup from './components/SpecificationGroup/index';

class ProductSpecifications extends Component {
  state = {
    specificationOpen: false
  }

  toggleSpecifications = () => {
    this.setState((state) => ({
      specificationOpen: !state.specificationOpen
    }))
  }

  specificationGroups() {
    const specificationGroups = path(['specificationGroups'], this.props)
    if (!specificationGroups) return []
    return specificationGroups.filter((specificationGroup) => {
      let excludableSpecs = ["Hero", "Buy Button", "HTML Specification", "allSpecifications", "Key Specifications", "Blocks", "Slider"]
      return !excludableSpecs.includes(specificationGroup.name)
    })
  }
  
  render() {
    return (
      <div className="specification-groups">
        <div className="container">
          <div onClick={this.toggleSpecifications} className={ this.state.specificationOpen ? "all-specifications-header specification-header-active" : "all-specifications-header"}>
            <span style={{ backgroundImage: 'url(' + specificationArrow + ')'}} className="specification-arrow"></span>View all specifications
          </div>
          <div className={ this.state.specificationOpen ? "all-specifications specifications-open" : "all-specifications"}>
            {this.specificationGroups().map((specificationGroup, key) => (
              <div key={key} className="specification-group">
                <SpecificationGroup key={key} specificationGroup={specificationGroup} />
              </div>
            ))}
            <div onClick={this.toggleSpecifications} className={ this.state.specificationOpen ? "all-specifications-header specification-header-active" : "all-specifications-header"}>
              <span style={{ backgroundImage: 'url(' + specificationArrow + ')'}} className="specification-arrow"></span>View all specifications
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default ProductSpecifications;