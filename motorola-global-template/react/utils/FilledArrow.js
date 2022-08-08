import React from 'react';

class FilledArrow extends React.Component {
  render() {
    const { className } = this.props;
    return (
      <svg className={className} version="1.1" xmlns="http://www.w3.org/2000/svg" xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 5.6 10" space="preserve">
        <polyline points="0,0 5,5 0,10 " />
      </svg>
    )
  }
}

export default FilledArrow;