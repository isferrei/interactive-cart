import React, { Fragment, Component } from 'react';
import './OptionSelector.global.css';

class OptionSelector extends Component {
  state = {
    selectedOption: () => {
      if (!this.props.defaultOption) return {};
      let foundOption = this.props.selectOptions.find((selectOption) => (
        selectOption.toLowerCase() === this.props.defaultOption.toLowerCase()
      ))
      if (foundOption) return foundOption;
    },
    listOptions: false
  }

  selectOption = (option) => {
    this.setState({listOptions: false});
    this.setState({selectedOption: option});
    this.props.onSelectedProp({name: this.props.selectorTitle, value: option})
  }

  setListOptions = (value) => (
    this.setState({listOptions: value})
  )

  setSelectedOption = (value) => {
    this.setState({selectedOption: value});
  }

  render () {
    const { defaultOption, selectorTitle, selectOptions, variationName } = this.props;
    return (
      <Fragment>
        { variationName && variationName.toLowerCase() === "color" ? 
          <div className="specification-selector color-selector">
            <div className="color-selector-container">
              <div className="color-selector-title">
                <label>Color: <span className="color-name">{this.state.selectedOption}</span></label>
              </div>
              <div className="color-selector">
                {selectOptions.map((option, key) => (
                  <div key={key} title={option} onClick={() => this.selectOption(option)} style={{backgroundColor: option.toLowerCase()}} className={this.state.selectedOption === option ? "color-option selected" : "color-option"}></div>
                ))}
              </div>
            </div>
          </div>
        : 
        <div className="specification-selector">
          <div className="option-selector-container">
            <div title={selectorTitle} className="option-selector-title">
              <label>{selectorTitle}</label>
            </div>
            <div title={selectorTitle} className="option-selector" onClick={() => this.setListOptions(!this.state.listOptions)}>
              <div className={this.state.listOptions ? "selected-option active" : "selected-option"}>
                <span>{Object.keys(this.state.selectedOption).length ? this.state.selectedOption : selectorTitle}</span>
                <div className="select-arrow"></div>
              </div>
              <div className={this.state.listOptions ? "select-options show" : "select-options"}>
                <ul>
                  {selectOptions.map((option, key) => (
                    <li key={key} title={option} className={option === this.state.selectedOption ? "selected" : null} onClick={() => this.selectOption(option)}>{option}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
        }
      </Fragment>
    )
  }
}

export default OptionSelector;