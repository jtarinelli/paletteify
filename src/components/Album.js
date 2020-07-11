import React, {Component} from 'react';
import Image from './Image.js';

class Album extends Component {
	
	grabColors = (imageColors) => {
		var passUpColors = this.props.grabColors;
		passUpColors(imageColors);
	}
	
	render() {
		const {name, image, url, numColors, display, onHover} = this.props;
		
		return (
			<div>
				<Image src={image} alt={name} grabColors={this.grabColors} numColors={numColors} display={display} onHover={onHover}/>
				<p><a href = {url}>{name}</a></p>
			</div>
		)
	}
}

export default Album;