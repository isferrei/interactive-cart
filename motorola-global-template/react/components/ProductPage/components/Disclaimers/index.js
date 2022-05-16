import { Component, Fragment, useState, useEffect } from 'react';
import { path } from 'ramda';
import './Disclaimers.global.css';

class Disclaimers extends Component {
	state = {
		disclaimers: null,
		loadedDisclaimers: false
	}

	componentDidUpdate() {
		if (!this.state.loadedDisclaimers) {
			this.setState({ loadedDisclaimers: true })
			const specificationGroups = path(['specificationGroups'], this.props)
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

	render() {
		return (
			<Fragment>
				{this.state.disclaimers &&
					<div className="pdp-disclaimers-container">
						<div className="container">
							<div className="product-page-disclaimers" dangerouslySetInnerHTML={{ __html: this.state.disclaimers }}></div>
						</div>
					</div>
				}
			</Fragment>
		)
	}
}

export default Disclaimers;