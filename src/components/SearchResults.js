import React, {Component} from 'react';
import {Link} from "react-router-dom";

class SearchResults extends Component {
	constructor(props) {
		super(props);
		
		this.state = {
			isLoaded: false,
			data: null,
			error: false,
			errorCode: null,
			artistsVisible: true,
			playlistsVisible: true
		}
	}
	
	toggleArtistsVisible = () => {
		this.setState(prevState => ({
			artistsVisible: !prevState.artistsVisible
		}));
	}
	
	togglePlaylistsVisible = () => {
		this.setState(prevState => ({
			playlistsVisible: !prevState.playlistsVisible
		}));
	}
	
	makeRequest() {
		const {query, headers, handleErrors} = this.props.requestInfo;
		
		fetch('https://api.spotify.com/v1/search?q='.concat(query).concat('&type=artist%2Cplaylist'), {headers})
			.then(handleErrors)
			.then(response => response.json())
			.then(stuff => this.setState({ 
				data: stuff,
				isLoaded: true
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
				isLoaded: false
			})
		}
	}
	
	render() {
		const {data, isLoaded, error, errorCode, artistsVisible, playlistsVisible} = this.state;
		const {query} = this.props.requestInfo;
		
		if (isLoaded && !error) {
			console.log(data.artists.items[0]);
			return (			
				<div className='Search-results'>
					<header className="App-header Loading">
						<h1>Search for "{query}"</h1>
					</header>
					<div className='Body'>
						<button className='h2-button' onClick={this.toggleArtistsVisible}><h2>Artists</h2></button>
						<div className={'Albums ' + (artistsVisible ? 'visible' : 'hidden')}>
							{data.artists.items.length === 0 ? 
								<p>No results found</p> :
								data.artists.items.map((artist, i) => (
									<div className='Album' key={i}>
										<Link to={{pathname: '/paletteify/artist/'.concat(artist.id)}}>
											{artist.images.length === 0 ? 
											<div className='Image-replacement'/> :
											<img src={artist.images[0].url} alt={artist.name}/>}
											<p>{artist.name}</p>
										</Link>
									</div>
								))
							}
						</div>
						<button className='h2-button' onClick={this.togglePlaylistsVisible}><h2>Playlists</h2></button>
						<div className={'Albums ' + (playlistsVisible ? 'visible' : 'hidden')}>
							{data.playlists.items.length === 0 ? 
								<p>No results found</p> :
								data.playlists.items.map((playlist, i) => (
									<div className='Album' key={i}>
										<Link to={{pathname: '/paletteify/playlist/'.concat(playlist.id)}}>
											{playlist.images.length === 0 ? 
											<div className='Image-replacement'/> :
											<img src={playlist.images[0].url} alt={playlist.name}/>}
											<p>{playlist.name}</p>
										</Link>
									</div>
								))
							}
						</div>
					</div>
				</div>
			)
		} else {
			return (
				<div className='Search-results'>
					<header className="App-header Loading">
						<h1>Search for {query}</h1>
							{error && <h2>Error: {errorCode}</h2>}
					</header>
					{error && errorCode !== '401' && <p><a href='https://developer.spotify.com/documentation/web-api/'>Status code info here</a></p>}
					{error && errorCode === '401' && <Link to='/paletteify/'><p>Unauthorized: Try logging in again</p></Link>}
					{!error && <h2>Loading...</h2>}
				</div>
			)
		}
	}
}

export default SearchResults;