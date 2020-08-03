import React, {Component} from 'react';

// displays the top 10 tracks on an artist page
class TopTracks extends Component {
	
	constructor(props) {
		super(props);
		
		this.state = {
			isLoaded: false,
			data: null,
			error: false,
			errorCode: null
		}
	}
	
	componentDidMount() {
		const {artistID, country, headers, handleErrors} = this.props.requestInfo;
		
		fetch('https://api.spotify.com/v1/artists/'.concat(artistID).concat('/top-tracks?country='.concat(country)), {headers})
			.then(handleErrors)
			.then(response => response.json())
			.then(stuff => this.setState({ 
				isLoaded: true,
				data: stuff 
				}))
			.catch(error => this.setState ({
				error: true,
				errorCode: error.message
			}));
	}

	render() {
		const {isLoaded, data, error, errorCode} = this.state;
		
		if (isLoaded && !error) {
			return (
				<div>
					<p>Top Tracks</p>
					<ol className='Top-tracks'>
						
						{data.tracks.map((track, i) => (
							<li className='Track' key = {i}>
								<a href ={track.external_urls.spotify}>
									<p>{track.name}</p>
								</a>
							</li>
						))}
						
					</ol>
				</div>
			)
			
		} else {
			return (
				<div>
					<p>Top Tracks</p>
					{error ? <p>Error:  {errorCode}</p> : <p>...</p>}
				</div>
			)
		} 
	}
}

export default TopTracks;