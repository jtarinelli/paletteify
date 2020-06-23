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
		this.fetchColors(this.props.src);
	}
	
	componentDidUpdate(prevProps) {
		if(this.props.options !== prevProps.options) {
			this.fetchColors(this.props.src);
		}
	}

	fetchColors(imageURL) {
		let currentObject = this;
		let passUpColors = this.props.grabColors;
		let {options} = this.props;

		var promise = getColors(imageURL, options);
		promise.then(function(result) {
			//result.reverse(); //optional 
			
			// build string that goes into backgroundImage to make diagonal stripes
			let gradientString = "linear-gradient(to top left, ";
			let stripeWidth = 424 / result.length;
			
			// vertical stripes version
			gradientString = "linear-gradient(to right, ";
			stripeWidth = 300 / result.length;
			
			// radial gradient version
			/*
			result.push("white");
			gradientString = "radial-gradient(circle, ";
			stripeWidth = 170 / result.length;
			*/
			
			for (var i = 0; i < result.length; i++) {
				gradientString += result[i] + " " + stripeWidth*i + "px," + result[i] + " " + stripeWidth*(i+1) + "px";
				if (i < result.length - 1) {
					gradientString += ",";
				}
			}
			
			gradientString += ")";
			
			//result.pop(); // for radial version only!

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
		const {src, alt} = this.props;
		console.log(this.props.options);
		
		return (
			<div className="Background" style = {this.state.bgStyle}>
				<img src={src} alt={alt} />
			</div>
		)
	}
}

export default Image;