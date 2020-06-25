import React, {Component} from 'react';
import Image from './Image.js';

class Album extends Component {
	
	grabColors = (imageColors) => {
		let passUpColors = this.props.grabColors;
		passUpColors(imageColors);
	}
	
	render() {
		const {name, image, url, numColors, display} = this.props;
		
		return (
			<a href = {url}>
			<Image src={image} alt={name} grabColors={this.grabColors} numColors={numColors} display={display}/>
				<p>{name}</p>
			</a>
		)
	}
}

export default Album;