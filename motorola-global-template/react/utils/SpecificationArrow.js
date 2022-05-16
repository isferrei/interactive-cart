import React from 'react';

const styleSt0 = {
	// fill: "#139AAD"
	fill: "#ffffff"
}
const styleSt1 = {
	fill:"none",
	// stroke: "#139AAD",
	stroke: "#ffffff",
	strokeLinecap: "round",
	strokeMiterlimit: 10
}

class SpecificationArrow extends React.Component {
  render() {
		const { type, className } = this.props;
		if (type === "first") {
			return (
			<svg className={className} version="1.1" xmlns="http://www.w3.org/2000/svg" xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
				viewBox="0 0 30 30" space="preserve">
				<g>
					<path style={styleSt0} d="M15,1c7.7,0,14,6.3,14,14s-6.3,14-14,14S1,22.7,1,15S7.3,1,15,1 M15,0C6.7,0,0,6.7,0,15s6.7,15,15,15
						s15-6.7,15-15S23.3,0,15,0L15,0z"/>
				</g>
				<polyline style={styleSt1} points="21.8,12.6 15,19.4 8.2,12.6 "/>
			</svg>
			)
		} else {
			return (
				<svg className={className} version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
					viewBox="0 0 30 30" space="preserve">
				<g>
					<path style={styleSt0} d="M15,1c7.7,0,14,6.3,14,14s-6.3,14-14,14S1,22.7,1,15S7.3,1,15,1 M15,0C6.7,0,0,6.7,0,15s6.7,15,15,15
						s15-6.7,15-15S23.3,0,15,0L15,0z"/>
				</g>
				<g>
					<polyline style={styleSt1} points="8.2,13.9 15,7 21.8,13.9 	"/>
					<line style={styleSt1} x1="15" y1="8" x2="15" y2="23"/>
				</g>
				</svg>
			)
		}
  }
}

export default SpecificationArrow;