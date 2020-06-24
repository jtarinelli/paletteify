import React, {Component} from 'react';
import AlbumsSection from './AlbumsSection.js';

class AlbumsSingles extends Component {
	
	constructor(props) {
		super(props);
		this.state = ({
			colors: null,
			sectionsLoaded: 0
		})
	}
	
	componentDidUpdate(prevProps) {
		if (this.props.colorOptions !== prevProps.colorOptions) {
			this.setState({
				colors: null
			})
		}
	}
					
	grabColors = (albumsColors) => {
		let passUpColors = this.props.grabColors;
		let prevColors = this.state.colors;
		let prevSectionsLoaded = this.state.sectionsLoaded;
		
		if (prevColors === null) {
			this.setState({
				colors: albumsColors,
				sectionsLoaded: 1
			})
		} else {
			this.setState({
				colors: prevColors.concat(albumsColors),
				sectionsLoaded: prevSectionsLoaded + 1
			})
		}
			
		if (this.state.sectionsLoaded === 3) { //change to a variable
			passUpColors(this.state.colors);
		}

	}
	
	render() {
		const {artistID, country, headers, handleErrors, colorOptions, numColors, display} = this.props;
		
		return (
			<section className = "Albums-Singles">
					<AlbumsSection group="album" title="Albums" visible = {true} grabColors={this.grabColors} artistID={artistID} country={country} headers={headers} handleErrors={handleErrors} colorOptions={colorOptions} numColors={numColors} display={display}/>
					<AlbumsSection group="single" title="Singles and EPs" visible = {false} grabColors={this.grabColors} artistID={artistID} country={country} headers={headers} handleErrors={handleErrors} colorOptions={colorOptions} numColors={numColors} display={display}/>
					<AlbumsSection group="appears_on" title="Appears On" visible = {false} grabColors={this.grabColors} artistID={artistID} country={country} headers={headers} handleErrors={handleErrors} colorOptions={colorOptions} numColors={numColors} display={display}/>
				</section>
		)
	
	}
}

export default AlbumsSingles;