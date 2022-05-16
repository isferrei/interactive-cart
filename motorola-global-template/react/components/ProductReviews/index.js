import React from 'react';
import { ExtensionPoint } from 'vtex.render-runtime';
import { path } from 'ramda';

class ProductReviews extends React.Component {
  state = {
    showReviews: false,
    specificationsLoaded: false,
  }

  componentDidMount() {
    if (!this.props.productQuery.loading && !this.state.specificationsLoaded) {
      this.setState({specificationsLoaded: true})
      const specificationGroups = path(['product', 'specificationGroups'], this.props.productQuery)
      if (!specificationGroups) return
      const blocks = specificationGroups.find((specificationGroup) => (
        specificationGroup.name === "Blocks"
      ))
      if (!blocks) return
      const showReviews = blocks.specifications.find((spec) => (
        spec.name === "Show Reviews"
      ))
      if (!showReviews) return
      if (showReviews.values[0].toLowerCase() != "true") return
      this.setState({showReviews: true})

    }
  }

  render() {
    return (
      this.state.showReviews && (
        <div className="bazaarvoice-reviews">
          <div className="container">
            <ExtensionPoint id="bazaarvoice" />
          </div>
        </div>
      )
    )
  }
}

export default ProductReviews;
