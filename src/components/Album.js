import React, {Component} from 'react';
import Image from './Image.js';

// album that passes the color palette of the album art up to the parent component
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
				<p><b><a href = {url}>{name}</a></b></p>
			</div>
		)
	}
}

export default Album;