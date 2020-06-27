import React, {Component} from 'react';
import Dot from './Dot.js';
import Dropdown from './Dropdown.js';

class Colors extends Component {
	
	constructor(props) {
		super(props);
		this.updateNumBins = this.updateNumBins.bind(this);
		this.updatePrimarySort = this.updatePrimarySort.bind(this);
		this.updateSecondarySort = this.updateSecondarySort.bind(this);
		
		this.state = ({
			numBins: 15,
			primarySort: 2,
			secondarySort: 1
		})
	}
	
	sortColors = (colors, hsl, reverse) => {
		if (reverse) {
			colors.sort((a,b) => a.hsl()[hsl] - b.hsl()[hsl]);
		} else {
			colors.sort((a,b) => b.hsl()[hsl] - a.hsl()[hsl]);
		}
	}

	makeBins = (colors, numBins, primarySort, secondarySort) => {
		this.sortColors(colors, primarySort, false);
		let bins = [[]];
		let currentBin = bins[0];
		
		if (primarySort === 0) { // if sorting by hue, need extra bin for hueless/pure gray
			currentBin = [];
			bins.push(currentBin);
			numBins -= 1;
		}
		
		let max = colors[0].hsl()[primarySort];
		let min = colors[colors.length-1].hsl()[primarySort];
		
		let increment = (max-min) / numBins;
		let threshold = max - increment;
		
		colors.forEach(color => {
			if (primarySort === 0 && Number.isNaN(color.hsl()[0])) {
				console.log(color.hsl());
				bins[0].push(color);
			} else if (color.hsl()[primarySort] > threshold) {
				currentBin.push(color);
			} else {
				threshold -= increment;
				currentBin = [color];
				bins.push(currentBin);
			}
		})
		
		return bins;
	}
	
	updatePrimarySort(hsl) {
		this.setState({
			primarySort: hsl
		})
	}
	
	updateSecondarySort(hsl) {
		this.setState({
			secondarySort: hsl
		})
	}
	
	updateNumBins(num) {
		this.setState({
			numBins: num
		})
	}
	
	render() {
		let {colors} = this.props;
		let{numBins, primarySort, secondarySort} = this.state;
		const numBinsOptions = [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14];
		const numBinsLabels = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15];
		const hsl = ["Hue", "Saturation", "Lightness"];

		if (colors === null) {
			return (
				<section className="Colors">
					<h2>Colors</h2>
					<p>...</p>
				</section>
			)
		} else {
			let bins = this.makeBins(colors, numBins, primarySort); 

			bins.forEach(bin => {
				this.sortColors(bin, secondarySort, false);
			})
			
			return (
				<section className="Colors">
					<h2>Colors</h2>
					<Dropdown className="p-button" title="Number of Bins" labels={numBinsLabels} params={numBinsOptions} funct={this.updateNumBins} selected={numBins} alwaysOpen={true} /><br/>
					<Dropdown className="p-button" title="Primary Sort" labels={hsl} params={[0,1,2]} funct={this.updatePrimarySort} selected={primarySort} alwaysOpen={true}/><br/>
					<Dropdown className="p-button" title="Secondary Sort" labels={hsl} params={[0,1,2]} funct={this.updateSecondarySort} selected={secondarySort} alwaysOpen={true}/><br/>
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