import React from 'react';

class ArrowComponent extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {

    return (
      <div className = {this.props.customClassNames}
      onClick={this.props.onClick}></div>
    );
  }
}

export default ArrowComponent;