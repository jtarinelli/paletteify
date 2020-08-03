import React, {Component} from 'react';
import {Link} from "react-router-dom";

// displays results for a search for an artist or playlist
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
		
		fetch('https://api.spotify.com/v1/search?q='.concat(query).concat('&type=artist%2Cplaylist&limit=19'), {headers})
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
	
	requestNextPage(url) {
		const {headers, handleErrors} = this.props.requestInfo;
		
		fetch(url, {headers})
			.then(handleErrors)
			.then(response => response.json())
			.then(stuff => this.setState(prevState => {				
				let newData = prevState.data;
				
				if (stuff.artists !== undefined) {
					newData.artists.items = newData.artists.items.concat(stuff.artists.items);
					newData.artists.next = stuff.artists.next;
				} else if (stuff.playlists !== undefined) {
					newData.playlists.items = newData.playlists.items.concat(stuff.playlists.items);
					newData.playlists.next = stuff.playlists.next;
				}
				
				return ({data: newData})
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
			this.setState({isLoaded: false})
		}
	}
	
	render() {
		const {data, isLoaded, error, errorCode, artistsVisible, playlistsVisible} = this.state;
		const {query} = this.props.requestInfo;
		
		if (isLoaded && !error) {
			return (			
				<div className='Search-results'>
				
					<header className="App-header Loading">
						<h1>Search for "{query}"</h1>
					</header>
					
					<section className='Body'>
						<button className='h2-button' onClick={this.toggleArtistsVisible}><h2>Artists</h2></button>
						<div className={'Albums ' + (artistsVisible ? 'visible' : 'hidden')}>
						
							{data.artists.items.length === 0 ? 
								
								<p>No results found</p> :
								
								data.artists.items.map((artist, i) => (
									<div className='Album-small' key={i}>
										<Link to={{pathname: '/paletteify/artist/'.concat(artist.id)}}>
											{artist.images.length === 0 ? 
											<div className='Image-replacement'/> :
											<img src={artist.images[0].url} alt={artist.name}/>}
											<p><b>{artist.name}</b></p>
										</Link>
									</div>
								))}
								
								{data.artists.next !== null &&
									<button className='h2-button Album-small-button' onClick={() => this.requestNextPage(data.artists.next)}>
										<div className='Album-small'>
											<div className='Image-replacement'>
												<h2>Load more</h2>
											</div>
											<p>  </p>
										</div>
									</button>
								}

						</div>
						
						<div>
						<button className='h2-button' onClick={this.togglePlaylistsVisible}><h2>Playlists</h2></button>
						<div className={'Albums ' + (playlistsVisible ? 'visible' : 'hidden')}>
							{data.playlists.items.length === 0 ? 
								<p>No results found</p> :
								
								data.playlists.items.map((playlist, i) => (
									<div className='Album-small' key={i}>
										<Link to={{pathname: '/paletteify/playlist/'.concat(playlist.id)}}>
											
											{playlist.images.length === 0 ? 
											
												<div className='Image-replacement'/> :
						
												<img src={playlist.images[0].url} alt={playlist.name}/>
												
											}
											
											<p><b>{playlist.name}</b></p>
										</Link>
									</div>
							))}
							
							{data.playlists.next !== null &&
									<button className='h2-button Album-small-button' onClick={() => this.requestNextPage(data.playlists.next)}>
										<div className='Album-small'>
											<div className='Image-replacement'>
												<h2>Load more</h2>
											</div>
											<p>  </p>
										</div>
									</button>
								}
						</div>
						</div>
						
					</section>
				
				</div>
			)
		
		} else {
			return (
				<div className='Search-results'>
				
					<header className="App-header Loading">
						<h1>Search for "{query}"</h1>
							{error && <h1>Error: {errorCode}</h1>}
					</header>
					
					{error && errorCode !== '401' && <h2><a href='https://developer.spotify.com/documentation/web-api/'>Status code info here</a></h2>}
					{error && errorCode === '401' && <Link to='/paletteify/'><h2>Unauthorized: Try logging in again</h2></Link>}
					{!error && <h2>Loading...</h2>}
					
				</div>
			)
		}
		
	}
}

export default SearchResults;