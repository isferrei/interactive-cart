import { ExtensionPoint } from 'vtex.render-runtime';
import './NotFound.global.css';
import { FormattedMessage } from "react-intl";

const NotFound = ({ type }) => {
	switch (type) {
		case ("search"):
			return (
				<div className="not-found-section">
					<div className="container">
						<div className="not-found-container">
							<div className="not-found-content">
								<h1><FormattedMessage id="store/not-found.search-title" /></h1>
								<h2><FormattedMessage id="store/not-found.search-sub-title" /></h2>
								<p><FormattedMessage id="store/not-found.search-text" /></p>
								<ExtensionPoint id="search-bar" />
							</div>
						</div>
					</div>
				</div>
			)
		case ("product"):
			return (
				<div className="not-found-section">
					<div className="container">
						<div className="not-found-container">
							<div className="not-found-content">
								<h1><FormattedMessage id="store/not-found.product-title" /></h1>
								<h2><FormattedMessage id="store/not-found.product-sub-title" /></h2>
								<p><FormattedMessage id="store/not-found.product-text" /></p>
								<ExtensionPoint id="search-bar" />
							</div>
						</div>
					</div>
				</div>
			)
		case ("error"):
			return (
				<div className="not-found-section">
					<div className="container">
						<div className="not-found-container">
							<div className="not-found-content">
								<h1><FormattedMessage id="store/not-found.error-title" /></h1>
								<h2><FormattedMessage id="store/not-found.error-sub-title" /></h2>
								<p><FormattedMessage id="store/not-found.error-text" /></p>
								<ExtensionPoint id="search-bar" />
							</div>
						</div>
					</div>
				</div>
			)
		default:
			return (
				<div className="not-found-section">
					<div className="container">
						<div className="not-found-container">
							<div className="not-found-content">
								<h1><FormattedMessage id="store/not-found.404-not-found-title" /></h1>
								<h2><FormattedMessage id="store/not-found.404-not-found-sub-title" /></h2>
								<p><FormattedMessage id="store/not-found.404-not-found-text" /></p>
								<ExtensionPoint id="search-bar" />
							</div>
						</div>
					</div>
				</div>
			)
	}
}

export default NotFound;