import React, {Component} from 'react';
const getColors = require('get-image-colors');

class Image extends Component {
	
	constructor(props) {
		super(props);
		
		this.state = {
			colorsLoaded: false,
			bgStyle: {
				backgroundColor: "white"
			},
			imageColors: []
		}

	}
	
	componentDidMount() {
		this.fetchColors(this.props.src)
	}

	fetchColors(imageURL) {
		let currentObject = this;
		let passUpColors = this.props.grabColors;
		let {options} = this.props;

		var promise = getColors(imageURL, options);
		promise.then(function(result) {
			// sort by saturation 
			result.sort((a,b) => b.hsl()[1] - a.hsl()[1]);
			let colors = result.map(color => color.hex());

			currentObject.setState({
				colorsLoaded: true,
				bgStyle: {
					backgroundColor: colors[0]
				},
				imageColors: colors
			})

			// callback to pass colors to parent (album) if it exists
			if (passUpColors != null) {
				passUpColors(colors);
			}
		})
	}
	
	render() {
		const {src, alt} = this.props
		
		return (
			<div className="Background" style = {this.state.bgStyle}>
				<img src={src} alt={alt} />
			</div>
		)
	}
}

export default Image;