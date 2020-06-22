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
			// build string that goes into backgroundImage to make diagonal stripes
			let gradientString = "linear-gradient(to top right, ";
			let stripeWidth = 424 / result.length;
			
			// vertical stripes version
			/*
			gradientString = "linear-gradient(to right, ";
			stripeWidth = 300 / result.length;
			*/
			
			for (var i = 0; i < result.length; i++) {
				gradientString += result[i].hex() + " " + stripeWidth*i + "px," + result[i].hex() + " " + stripeWidth*(i+1) + "px";
				if (i < result.length - 1) {
					gradientString += ",";
				}
			}
			
			gradientString += ")";

			currentObject.setState({
				colorsLoaded: true,
				bgStyle: {
					backgroundImage: gradientString
				},
				imageColors: result
			})

			// callback to pass colors to parent (album) if it exists
			if (passUpColors != null) {
				passUpColors(result);
			}
		})
	}
	
	render() {
		const {src, alt} = this.props
		
		return (
			<div className="Background" style = {this.state.bgStyle}>
				<img src={src} alt={alt} />
				<span style={{backgroundColor: "black", width:"50%", height: "100px"}}></span>
			</div>
		)
	}
}

export default Image;