import React, {Component} from 'react';
import Track from './Track.js';

class TopTracks extends Component {
	
	constructor(props) {
		super(props);
		
		this.state = {
			isLoaded: false,
			data: null,
			error: false
		}
	}
	
	componentDidMount() {
		const {artistID, country, headers, handleErrors} = this.props;
		
		fetch('https://api.spotify.com/v1/artists/'.concat(artistID).concat('/top-tracks?country='.concat(country)), {headers})
			.then(handleErrors)
			.then(response => response.json())
			.then(stuff => this.setState({ 
				isLoaded: true,
				data: stuff 
				}))
			.catch(error => this.setState ({
				error: true
			}));
	}

	render() {
		
		const {isLoaded, data, error} = this.state;
		
		if (isLoaded && !error) {
			return (
				<div>
					<p>Top Tracks</p>
					<ol className="Top-tracks">
						{data.tracks.map(
							(track, i) => (
								<li key = {i}><Track 
								name = {track.name}
								url = {track.external_urls.spotify}
								/></li>
							)
						)}
					</ol>
				</div>
			)
		} else {
			return (
				<div>
					<p>Top Tracks</p>
					<p>{error ? "Error" : "..."}</p>
				</div>
			)
		} 
	}
}

export default TopTracks;