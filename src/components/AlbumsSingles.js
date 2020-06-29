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
		if (this.props.numColors !== prevProps.numColors) {
			this.setState({
				colors: null,
				sectionsLoaded: 0
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
			
		if (this.state.sectionsLoaded === 2) { //change to a variable
			passUpColors(this.state.colors);
		}

	}
	
	render() {
		const {requestInfo, numColors, display, onHover} = this.props;
		
		return (
			<section className = "Albums-Singles">
					<AlbumsSection group="album" title="Albums" visible = {true} grabColors={this.grabColors} requestInfo={requestInfo} numColors={numColors} display={display} onHover={onHover}/>
					<AlbumsSection group="single" title="Singles and EPs" visible = {false} grabColors={this.grabColors} requestInfo={requestInfo} numColors={numColors} display={display} onHover={onHover}/>
						{/*<AlbumsSection group="appears_on" title="Appears On" visible = {false} grabColors={this.grabColors} requestInfo={requestInfo} numColors={numColors} display={display}/>*/}
				</section>
		)
	
	}
}

export default AlbumsSingles;