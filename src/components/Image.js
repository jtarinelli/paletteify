import React, {Component} from 'react';
const getColors = require('get-image-colors');

class Image extends Component {
	
// an image which generates its color palette then displays it on hover 
constructor(props) {
		super(props);
		
		this.state = {
			colorsLoaded: false,
			bgStyle: {backgroundImage: 'white'},
			imageColors: []
		}

	}

	componentDidMount() {
		this.fetchColors(this.props.src);
	}
	
	componentDidUpdate(prevProps) {
		if (this.props.numColors !== prevProps.numColors) {
			this.fetchColors(this.props.src);
		}
		
		if (this.props.display !== prevProps.display) {
			this.displayMode(this.state.imageColors, this.props.display);
		}
	}
	
	// changes how the color palette is displayed: as diagonal stripes, vertical stripes, or a target
	displayMode(colors, option) {
		//result.reverse(); //optional 
		
		let gradientString = '';
		let stripeWidth = 0;
		
		if (option === 0) {
			// diagonal stripes
			gradientString = 'linear-gradient(to bottom left, ';
			stripeWidth = 424 / colors.length;
		
		} else if (option === 1) {
			// vertical stripes
			gradientString = 'linear-gradient(to right, ';
			stripeWidth = 300 / colors.length;
			
		} else if (option === 2) {
			// target/ radial gradient
			colors.push('white');
			gradientString = 'radial-gradient(circle, ';
			stripeWidth = 170 / colors.length;
		}
		
		for (var i = 0; i < colors.length; i++) {
			gradientString += colors[i] + ' ' + stripeWidth*i + 'px,' + colors[i] + ' ' + stripeWidth*(i+1) + 'px';
			
			if (i < colors.length - 1) {
				gradientString += ',';
			}
		}
		
		gradientString += ')';
		
		if (option === 2) {
			colors.pop(); // for radial version only!
		}
		
		this.setState({bgStyle: {backgroundImage: gradientString}})
	}

	fetchColors(imageURL) {
		let currentObject = this;
		let passUpColors = this.props.grabColors;
		let {numColors, display} = this.props;
		let options = {count: numColors}

		let promise = getColors(imageURL, options);
		promise.then(function(result) {
			currentObject.displayMode(result, display);

			currentObject.setState({
				colorsLoaded: true,
				imageColors: result
			})

			// callback to pass colors to parent (album) if it exists
			if (passUpColors != null) {
				passUpColors(result);
			}
		})
	}
	
	render() {
		const {src, alt, onHover} = this.props;

		return (
			<div className='Background' style = {this.state.bgStyle}>
				<img className={onHover} src={src} alt={alt} />
			</div>
		)
	}
}

export default Image;