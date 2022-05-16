import React, { Component, Fragment } from 'react';
import './MotoStoreWrapperCustom.global.css';

class MotoStoreWrapperCustom extends Component {
  render () {
    const { children } = this.props;
    return (
      <Fragment>
        {children}
      </Fragment>
    )
  }
}

export default MotoStoreWrapperCustom;