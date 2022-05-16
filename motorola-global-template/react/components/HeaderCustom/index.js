import React, { Fragment, Component } from 'react';

class HeaderCustom extends Component {
  static schema = {
    title: 'Header custom',
    description: 'Header custom',
    type: 'object',
    properties: {
      htmlContent: {
        type: 'string',
        title: 'HTML Content',
        description: 'Content of the HTML to be rendered in the current page',
        widget: {
          'ui:widget': 'textarea',
        },
      },
    },
  }

  render () {
    const { htmlContent } = this.props;

    return (
      <Fragment>
        <div dangerouslySetInnerHTML={{ __html: htmlContent }}></div>
      </Fragment>
    )
  }
}


export default HeaderCustom;