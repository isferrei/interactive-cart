import React from 'react';
import { ExtensionPoint } from 'vtex.render-runtime';
import { FormattedMessage } from "react-intl";
import './SearchBarBottom.global.css';

class SearchBarBottom extends React.Component {
  render() {
    return (
      <div className="search-bar-bottom-container">
        <div className="container">
          <div className="sbbc-box">
            <div className="sbbc-title"><FormattedMessage id="store/search-bar-bottom.search-text" /></div>
            <ExtensionPoint id="search-bar" />
          </div>
        </div>
      </div>
    )
  }
}

export default SearchBarBottom;
