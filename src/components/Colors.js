import React, {Component} from 'react';
import Dot from './Dot.js';

class Colors extends Component {
	
	render() {
		let {colors} = this.props

		if (colors === null) {
			return (
				<section className="Colors">
					<h2>Colors</h2>
					<p>...</p>
				</section>
			)
		} else {
			// sort by hue
			//colors.sort((a,b) => a.hsl()[0] - b.hsl()[0]);
			// sort by lightness
			colors.sort((a,b) => b.hsl()[2] - a.hsl()[2]);
			
			return (
				<section className="Colors">
					<h2>Colors</h2>
					{colors.map(
						(color, i) => (<Dot 
							key = {i}
							bgColor = {color}
							/>
						)
					)}
				</section>
			)
		}
		
	}	
	
}

export default Colors;