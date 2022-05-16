import './Disclaimers.global.css';
import { path } from 'ramda';
import React from 'react';

class Disclaimers extends React.Component {
  state = {
    disclaimers: null,
    loadedDisclaimers: false
  }

  componentDidUpdate() {
    if (this.props.productQuery) {
      if (!this.state.loadedDisclaimers && !this.props.productQuery.loading && !this.props.disclaimers) {
        this.setState({ loadedDisclaimers: true })
        const specificationGroups = path(['product', 'specificationGroups'], this.props.productQuery)
        if (!specificationGroups) return this.setState({ disclaimers: null })

        const blocks = specificationGroups.find((specificationGroup) => {
          return specificationGroup.name === "Blocks"
        })
        if (!blocks) return this.setState({ disclaimers: null })

        const overviewCard = path(['specifications'], blocks);
        if (!overviewCard) return this.setState({ disclaimers: null })

        const disclaimers = overviewCard.find((block) => (block.name === "Disclaimers"))
        return this.setState({ disclaimers: (disclaimers ? disclaimers.values[0] : null) })
      }
    }
  }

  render() {
    const { disclaimerText } = this.props;

    if (disclaimerText) {
      return (
        <div className="disclaimer-block-wrapper">
          <div className="disclaimer-block-container">
            <div className="container">
              {<div className="disclaimer-block" dangerouslySetInnerHTML={{ __html: disclaimerText }}></div>}
            </div>
          </div>
        </div>
      )
    }

    if (this.state.disclaimers) {
      return (
        <div className="disclaimer-block-wrapper">
          <div className="disclaimer-block-container">
            <div className="container">
              <div className="disclaimer-block" dangerouslySetInnerHTML={{ __html: this.state.disclaimers }}></div>
            </div>
          </div>
        </div>
      )
    }

    return (
      <div></div>
    )
  }
}

Disclaimers.schema = {
  title: 'Disclaimer block',
  description: 'Disclaimer block',
  type: 'object',
  properties: {
    disclaimerText: {
      type: 'string',
      title: 'Disclaimer text',
      widget: {
        'ui:widget': 'textarea',
      },
    },
  },
}

export default Disclaimers;