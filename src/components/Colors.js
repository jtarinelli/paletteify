import React, {Component} from 'react';
import Dot from './Dot.js';

class Colors extends Component {
	
	render() {
		let {colors} = this.props

		if (colors === null) {
			return (
				<section className="Colors">
					<h2>Colors</h2>
					<p>Collecting colors...</p>
				</section>
			)
		} else {
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