import React, {Component} from 'react';
import Dot from './Dot.js';
import Dropdown from './Dropdown.js';
import Slider from './Slider.js';

class Colors extends Component {
	
	constructor(props) {
		super(props);
		this.updateNumBins = this.updateNumBins.bind(this);
		this.updatePrimarySort = this.updatePrimarySort.bind(this);
		this.updateSecondarySort = this.updateSecondarySort.bind(this);
		
		this.state = ({
			numBins: 14,
			primarySort: 0,
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

	makeBins = (colors, numBins, primarySort) => {
		let bins = [[]];
		let currentBin = bins[0];
		
		if (primarySort === 0) {
			bins[0] = colors.filter(color => {
				return Number.isNaN(color.hsl()[0]); // new bin for hueless colors
			})
			
			currentBin = [];
			bins.push(currentBin);
			numBins -= 1;
			
			colors = colors.filter(color => {
				return !Number.isNaN(color.hsl()[0]);
			})
		}
		
		this.sortColors(colors, primarySort, false);
		
		const max = colors[0].hsl()[primarySort];
		const min = colors[colors.length-1].hsl()[primarySort];
		
		const increment = (max-min) / numBins;
		let threshold = max - increment;
		
		colors.forEach(color => {
			if (color.hsl()[primarySort] > threshold) {
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
		this.setState({primarySort: hsl})
	}
	
	updateSecondarySort(hsl) {
		this.setState({secondarySort: hsl})
	}
	
	updateNumBins(num) {
		this.setState({numBins: num})
	}
	
	render() {
		var {colors} = this.props;
		var {numBins, primarySort, secondarySort} = this.state;
		const hsl = ['Hue', 'Saturation', 'Lightness'];
		const gradientStyles = [
			{backgroundImage: 'linear-gradient(to right, white, magenta, purple, blue, green, yellow, orange, red)'},
			{backgroundImage: 'linear-gradient(to right, #47d8ff, gray)'},
			{backgroundImage: 'linear-gradient(to right, white, #47d8ff, black)'}
		]

		if (colors !== null) {
			let bins = this.makeBins(colors, numBins, primarySort); 

			bins.forEach(bin => {
				this.sortColors(bin, secondarySort, false);
			})
			
			return (
				<section className='Colors'>
					<h2>Colors</h2>
					
					<div className='Sorting-options'>
						<Slider title='Max Number of Bins: ' funct={this.updateNumBins} selected={numBins} min='1' max='20'/>
						
						<Dropdown className='p-button' title='Primary Sort:' labels={hsl} params={[0,1,2]} funct={this.updatePrimarySort} selected={primarySort} alwaysOpen={true}/><br/>
						
						<Dropdown className='p-button' title='Secondary Sort:' labels={hsl} params={[0,1,2]} funct={this.updateSecondarySort} selected={secondarySort} alwaysOpen={true}/><br/>
					</div>
					
					<div className='Gradient' style={gradientStyles[primarySort]}></div>
					
					<div className='Dots'>
						
						{bins.map((bin, i) => (
							<div className='Bin' key={i}>
									{bin.map((color, j) => (<Dot key = {j} bgColor = {color}/>))}
							</div>
						))}
						
					</div>
					
				</section>
			)
			
		} else {
			return (
				<section className='Colors'>
					<h2>Colors</h2>
					
					<div className='Sorting-options'>
						<Slider title="Max Number of Bins: " funct={this.updateNumBins} selected={numBins} min='1' max='20'/>
						
						<Dropdown className='p-button' title='Primary Sort:' labels={hsl} params={[0,1,2]} funct={this.updatePrimarySort} selected={primarySort} alwaysOpen={true}/><br/>
						
						<Dropdown className='p-button' title='Secondary Sort:' labels={hsl} params={[0,1,2]} funct={this.updateSecondarySort} selected={secondarySort} alwaysOpen={true}/><br/>
					</div>
					
					<div className='Gradient' style={gradientStyles[primarySort]}></div>
				
				</section>
			)
		}
		
	}
		
}	


export default Colors;