import React, {Component} from 'react';
import AlbumsSingles from './AlbumsSingles.js';
import AlbumOptions from './AlbumOptions.js';
import Colors from './Colors.js';

class ArtistBody extends Component {
	
	constructor(props) {
		super(props);
		
		this.state = ({
			colors: null,
			numColors: 5,
			display: 0,
			onHover: 'Disappears'
		})
	}
	
	grabColors = (allColors) => {
		this.setState({colors: allColors})
	}
	
	grabNumColors = (num) => {
		this.setState({numColors: num})
	}
	
	grabDisplay = (option) => {
		this.setState({display: option})
	}
	
	grabOnHover = (option) => {
		this.setState({onHover: option})
	}
	
	render() {
		const allColors = this.state.colors;
		const {requestInfo} = this.props;
		const {numColors, display, onHover} = this.state;
	
		return (
			<div className='Body'>
				<AlbumOptions grabNumColors={this.grabNumColors} grabDisplay={this.grabDisplay} grabOnHover={this.grabOnHover}/>
				<AlbumsSingles grabColors={this.grabColors} requestInfo={requestInfo} numColors={numColors} display={display} onHover={onHover}/>
				<Colors colors={allColors}/>
			</div>
		)
			
	}
}

export default ArtistBody;