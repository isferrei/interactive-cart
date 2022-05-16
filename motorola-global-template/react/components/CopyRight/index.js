import { Component } from 'react'
import Logo from './logo.svg'

class CopyRight extends Component {
  static schema = {
    title: 'Copy Right',
    description: 'Copy Right',
    type: 'object',
    properties: {
      copyRightText: {
        type: 'string',
        title: 'Copyright text 1',
        widget: {
          "ui:widget": "textarea"
        }
      },
      copyRightViews: {
        type: 'string',
        title: 'Copyright text 2',
        widget: {
          "ui:widget": "textarea"
        }
      },
    },
  }

  render() {
    const { copyRightText, copyRightViews } = this.props;
    return (
      <div className="checkout-footer-copy-row">
        <div className="checkout-footer-copy-col logo-col">
          <img src="https://motorolaimgrepo.vteximg.com.br/arquivos/logo.svg" alt="Motorola Logo" />
          <div dangerouslySetInnerHTML={{ __html: copyRightText }}></div>
        </div>
        <div className="checkout-footer-copy-col">
          <div dangerouslySetInnerHTML={{ __html: copyRightViews }}></div>
        </div>
      </div>
    )
  }
}

export default CopyRight;