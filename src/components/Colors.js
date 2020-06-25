import React, {Component} from 'react';
import Dot from './Dot.js';

// make bins depending on length of colors array (and maybe also screen width?? idk)

class Colors extends Component {
	
	sortColors = (colors, hsl, reverse) => {
		if (reverse) {
			colors.sort((a,b) => a.hsl()[hsl] - b.hsl()[hsl]);
		} else {
			colors.sort((a,b) => b.hsl()[hsl] - a.hsl()[hsl]);
		}
	}

	makeBins = (colors, hsl) => {
		this.sortColors(colors, hsl, false);
		const numBins = 15; // make this an option?
		let bins = [[]];
		let currentBin = bins[0];
		
		let max = colors[0].hsl()[hsl];
		let min = colors[colors.length-1].hsl()[hsl];
		
		let increment = (max-min) / numBins;
		let threshold = max - increment;
		
		colors.forEach(color => {
			if (color.hsl()[hsl] > threshold) {
				currentBin.push(color);
			} else {
				threshold -= increment;
				currentBin = [color];
				bins.push(currentBin);
			}
		})
		
		return bins;
	}
	
	render() {
		let {colors} = this.props;

		if (colors === null) {
			return (
				<section className="Colors">
					<h2>Colors</h2>
					<p>...</p>
				</section>
			)
		} else {
			let bins = this.makeBins(colors, 2);

			bins.forEach(bin => {
				this.sortColors(bin, 1, false);
			})
			
			return (
				<section className="Colors">
					<h2>Colors</h2>
						<div className="Gradient"></div>
						<div className="Dots">
							{bins.map((bin, i) => (
								<div className="Bin" key={i}>
										{bin.map((color, j) => (<Dot key = {j} bgColor = {color}/>))}
								</div>
							))}
						</div>
				</section>
			)
		}
	}
		
}	


export default Colors;