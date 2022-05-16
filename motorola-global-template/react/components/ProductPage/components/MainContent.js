import React from 'react';
import { path } from 'ramda'

class MainContent extends React.Component {
  state = {
    htmlBlock: {},
    loadedHtml: false
  }

  componentDidUpdate() {
    if (!this.state.loadedHtml) {
      this.setState({ loadedHtml: true })
			const specificationGroups = path(['specificationGroups'], this.props)
			if (!specificationGroups) return this.setState({ htmlBlock: null })
			
			const blocks = specificationGroups.find((specificationGroup) => {
				return specificationGroup.name === "Blocks"
			})
			if (!blocks) return this.setState({ htmlBlock: null })

			const overviewCard = path(['specifications'], blocks);
			if (!overviewCard) return this.setState({ htmlBlock: null })

			const htmlBlock = overviewCard.find((block) => (block.name === "Overview Card"))
      return this.setState({ htmlBlock: (htmlBlock ? htmlBlock.values[0] : {}) })
    }
  }

  render() {
    return (
      <React.Fragment>
        { Object.keys(this.state.htmlBlock).length ?
          <div dangerouslySetInnerHTML={{ __html: this.state.htmlBlock }}></div>
          : null
        }
      </React.Fragment>
    )
  }
}

export default MainContent;