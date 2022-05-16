import React from 'react';

class IconMinus extends React.Component {
  render() {
    const { className, type } = this.props;
    if (type === 2) {
      return (
        <svg className={className} version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
          viewBox="0 0 20 20" style={{enableBackground: 'new 0 0 20 20'}} space="preserve">
        <polygon className="st0" points="9.5,9.3 8.5,9.3 0.5,9.3 0.5,10.7 8.5,10.7 9.5,10.7 19.5,10.7 19.5,9.3 "/>
        <path style={{ opacity: '0.6', fillRule: 'evenodd', clipRule: 'evenodd' }} d="M10.7,19.5"/>
        <path style={{ fillRule: 'evenodd', clipRule: 'evenodd' }} d="M-6.8,10"/>
        </svg>
      )
    }
    return (
      <svg className={className} version="1.1" xmlns="http://www.w3.org/2000/svg" xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 22.6 22.5" space="preserve">
        <circle cx="11.3" cy="11.3" r="10" stroke="#149aad" fill="none" strokeWidth="2px"></circle>
        <line x1="16.8" y1="11.3" x2="5.8" y2="11.3" stroke="#149aad" fill="none" strokeWidth="2px"></line>
      </svg>
    );
  }
}

export default IconMinus;