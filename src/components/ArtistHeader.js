import React, {Component} from 'react';
import TopTracks from './TopTracks.js';
import {Link} from "react-router-dom";

// header for the artist page, contains image, name, and top tracks
class ArtistHeader extends Component {
	
	constructor(props) {
		super(props);
		
		this.state = {
			isLoaded: false,
			data: null,
			error: false,
			errorCode: null
		}
	}
	
	makeRequest() {
		const {artistID, headers, handleErrors} = this.props.requestInfo;
		
		fetch('https://api.spotify.com/v1/artists/'.concat(artistID), {headers})
			.then(handleErrors)
			.then(response => response.json())
			.then(stuff => this.setState({ 
				isLoaded: true,
				data: stuff 
				}))
			.catch(error => this.setState({
				error: true,
				errorCode: error.message
			}));
	}
	
	componentDidMount() {
		this.makeRequest();
	}

	componentDidUpdate(prevProps) {
		if (prevProps !== this.props) {
			this.makeRequest();
			this.setState({
				isLoaded: false,
				data: null,
				error: false,
				errorCode: null
			})
		}
	}

	render () {
		const {isLoaded, data, error, errorCode} = this.state;
		const {requestInfo} = this.props;
		
		if (isLoaded && !error) {
			return (
				<header className="App-header">
					<div className="Artist-image"><img src={data.images[0].url} alt={data.name}/></div>
					<div className="Artist-info">
						<h1><a href={data.external_urls.spotify}>{data.name}</a></h1>
						<TopTracks requestInfo={requestInfo}/>
					</div>
				</header>
			)
			
		} else {
			return (
				<header className="App-header Loading">
					{error ? <h1>Error: {errorCode}</h1> : <h1>Loading...</h1>}
					{error && errorCode !== '401' && 
						<p><a href="https://developer.spotify.com/documentation/web-api/">Status code info here</a></p>}
					{error && errorCode === '401' && 
						<Link to='/paletteify/'><p>Unauthorized: Try logging in again</p></Link>}
				</header>
			)
		} 
		
	}
}

export default ArtistHeader;