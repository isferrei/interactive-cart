import { Component, Fragment } from 'react';
import FilledArrow from '../../../../utils/FilledArrow';

class SpecificationGroup extends Component {
  state = {
    specificationGroupOpen: false
  }

  toggleSpecificationGroup = () => {
    this.setState({ specificationGroupOpen: !this.state.specificationGroupOpen })
  }

  extractColor = (color) => {
    var regExp = /\[([^)]+)\]/;
    var matches = regExp.exec(color);
    return matches[1]
  }

  extractColorName = (color) => {
    return color.replace(/ *\[[^)]*\] */g, "")
    
  }

  render() {
    const { colorNames, specificationGroup } = this.props;
    // const { specificationColors, specificationGroup } = this.props;
    if (!colorNames[specificationGroup.name]) {
      return (
        <Fragment>
          <div onClick={this.toggleSpecificationGroup} className="specification-group-name">
            <span className="specification-group-name-text">{specificationGroup.name}</span>
            <FilledArrow className={this.state.specificationGroupOpen ? "specification-group-name-arrow arrow-up" : "specification-group-name-arrow arrow-down"} />
          </div>
          <div className={this.state.specificationGroupOpen ? "specification-group-values open-specification-group-values" : "specification-group-values"}>
            {specificationGroup.specifications.map((specification, groupKey) => (
              <div className="specification-group-value" key={groupKey}>
                <div className="specification-value-name">
                  {specification.name}
                </div>
                <ul>
                  {specification.values.map((value, specKey) => (
                    <li dangerouslySetInnerHTML={{ __html: value.replace(/\|\|\s*[0|1]$/, "") }} key={specKey}></li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </Fragment>
      )
    }

    return (
      <Fragment>
        <div onClick={this.toggleSpecificationGroup} className="specification-group-name">
          <span className="specification-group-name-text">{colorNames[specificationGroup.name]}</span>
          <FilledArrow className={this.state.specificationGroupOpen ? "specification-group-name-arrow arrow-up" : "specification-group-name-arrow arrow-down"} />
        </div>
        <div className="specification-group-values open-specification-group-values">
          {specificationGroup.specifications.map((colorSpecification, groupKey) => {
            return (
              colorSpecification.values.map((color, colorKey) => (
                <div className="specification-group-value" key={colorKey}>
                  <div className="specification-value-name">
                    {color.includes("[") ? this.extractColorName(color) : color}
                  </div>
                  <ul>
                    <li><div style={{ backgroundColor: (color.includes("[") ? this.extractColor(color) : color) }} className="specification-color-swatcher"></div></li>
                  </ul>
                </div>
              ))
            )
          })}
        </div>
      </Fragment>
    )
  }
}

export default SpecificationGroup;