import React, { Component, Fragment} from 'react';
import axios from 'axios';

class DrupalIntegration extends Component {
  state = {
    html: null
  }

  static schema = {
    title: 'Drupal Integration',
    description: 'Drupal Integration',
    type: 'object',
    properties: {
      url: {
        type: 'string',
        title: 'URL',
      },
    },
  }

  componentDidMount() {
    const context = this;
    axios.get(this.props.url)
    .then((response) => {
      context.setState({html: response.data})
    })
  }

  render () {
    return (
      <Fragment>
        <div dangerouslySetInnerHTML={{ __html: this.state.html }}></div>
      </Fragment>
    )
  }
}

export default DrupalIntegration;
