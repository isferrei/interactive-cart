import React from 'react';

class IconPlus extends React.Component {
  render() {
    const { className, type } = this.props;
    if (type === 2) {
      return (
        <svg className={className} version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
          viewBox="0 0 20 20" style={{enableBackground: 'new 0 0 20 20'}} space="preserve">
        <path style={{ opacity: '0.6', fillRule: 'evenodd', clipRule: 'evenodd' }} d="M10.7,19.5v-8.7h8.7V9.3h-8.7V0.5H9.3v8.7H0.5v1.5h8.7v8.7H10.7z M10.7,19.5"/>
        <path style={{ fillRule: 'evenodd', clipRule: 'evenodd' }} d="M-6.8,10"/>
        </svg>
      )
    }
    return (
      <svg className={className} version="1.1" xmlns="http://www.w3.org/2000/svg" xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 22.6 22.5" space="preserve">
        <circle cx="11.3" cy="11.3" r="10" stroke="#149aad" fill="none" strokeWidth="2px"></circle>
        <line x1="11.3" y1="5.8" x2="11.3" y2="16.8" stroke="#149aad" fill="none" strokeWidth="2px"></line>
        <line x1="16.8" y1="11.3" x2="5.8" y2="11.3" stroke="#149aad" fill="none" strokeWidth="2px"></line>
      </svg>
    );
  }
}

export default IconPlus;