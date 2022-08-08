import { Component, Fragment } from 'react';

class SpecificationGroup extends Component {
  state = {
    specificationGroupOpen: false
  }

  toggleSpecificationGroup = () => {
    this.setState({specificationGroupOpen: !this.state.specificationGroupOpen})
  }

  render() {
    const { specificationGroup } = this.props;
    return (
      <Fragment>
        <div onClick={this.toggleSpecificationGroup} className="specification-group-name">
          {specificationGroup.name}
        </div>
        <div className={ this.state.specificationGroupOpen ? "specification-group-values open-specification-group-values" : "specification-group-values"}>
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
}

export default SpecificationGroup;