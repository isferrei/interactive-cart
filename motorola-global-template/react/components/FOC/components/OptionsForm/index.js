import React, { Component } from 'react'
import { RadioGroup } from 'vtex.styleguide'

import './index.global.css'

class OptionsForm extends Component {

  state = {
    options: [
      { value: 'lost-packages|Lost packages', label: 'Lost packages' },
      { value: 'npr-doa-replacement|NPR/DOA Replacement', label: 'NPR/DOA Replacement' },
      { value: 'npi|NPI', label: 'NPI' },
      { value: 'slt-escalation|SLT escalation', label: 'SLT escalation' },
      { value: 'slt-avoidance|SLT avoidance', label: 'SLT avoidance' },
      { value: 'aging-case-closure|Aging case closure', label: 'Aging case closure' },
      { value: 'social-media-escalation|Social Media Escalation', label: 'Social Media Escalation' },
      { value: 'wrong-ship|Wrong Ship', label: 'Wrong Ship' }
    ],
    selectedOption: null,
    error: false,
    errorMessage: 'This field is mandatory. Please select the reason to proceed.'
  }

  componentDidMount() {
    this.setState({
      error: this.props.requiredOptionSelectedError
    })
  }

  componentDidUpdate(prevProps) {
    if(this.props.requiredOptionSelectedError !== prevProps.requiredOptionSelectedError) {
      this.setState({
        error: this.props.requiredOptionSelectedError
      })
    }
  }

  onOptionSelected = (e) => {
    const [option, optionText] = e.target.value.split("|")
    this.props.onReasonSelected(option, optionText)
    if(option !== null && option !== "" && optionText !== null && optionText !== "") {
      this.setState({
        error: false
      })
    }
  }

  render () {
    return (
      <div className='foc-form-container'>
        <p>Please select the reason: </p>
        <RadioGroup
          options={this.state.options}
          value={this.props.selectedOption}
          onChange={this.onOptionSelected}
          error={this.state.error}
          errorMessage={this.state.error && this.state.errorMessage} />
        <div className='mb5'></div>
      </div>
    )
  }

}

export default OptionsForm
