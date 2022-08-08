import React, { Fragment, Component } from 'react';

class FooterCustom extends Component {
  static schema = {
    title: 'Footer Custom',
    description: 'Footer Custom',
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


export default FooterCustom;