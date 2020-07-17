import React, {Component} from 'react';
import AlbumOptions from './AlbumOptions.js';
import Album from './Album.js';
import Colors from './Colors.js';
import {Link} from 'react-router-dom';

class PlaylistPage extends Component {
	
	constructor(props) {
		super(props);
		this.makeAlbums = this.makeAlbums.bind(this);
		
		this.state = {
			isLoaded: false,
			data: null,
			albums: {},
			numColors: 5,
			display: 0,
			onHover: 'Disappears',
			colors: null,
			error: false,
			errorCode: null,
			visible: true
		}
	}
	
	toggleVisible = () => {
		this.setState(prevState => ({
			visible: !prevState.visible
		}));
	}
	
	makeAlbums() {
		let {data, albums} = this.state;
		
		data.tracks.items.forEach(song => {
			let track = song.track;
			if (!track.is_local) {
				if (albums[track.album.id] != null) {
					albums[track.album.id].tracks.push({
						name: track.name,
						url: track.external_urls.spotify
					})
				} else {
					albums[track.album.id] = {
						name: track.album.name,
						url: track.album.external_urls.spotify,
						image: track.album.images[1],
						artists: track.album.artists,
						tracks: [{
							name: track.name,
							url: track.external_urls.spotify
						}]
					}
				}
			}
		})
	}
	
	makeRequest() {
		const {playlistID, headers, handleErrors} = this.props.requestInfo;
		
		fetch('https://api.spotify.com/v1/playlists/'.concat(playlistID), {headers})
			.then(handleErrors)
			.then(response => response.json())
			.then(stuff => this.setState({ 
				data: stuff
				}))
			.catch(error => this.setState({
				error: true,
				errorCode: error.message
			}));
	}
	
	grabColors = (albumColors) => {
		let prevColors = this.state.colors;	
		
		if (prevColors === null) {
			this.setState({
				colors: albumColors
			})
		} else {
			this.setState({
				colors: prevColors.concat(albumColors)
			})
		}
	}
	
	grabNumColors = (num) => {
		this.setState({
			numColors: num
		})
	}
	
	grabDisplay = (option) => {
		this.setState({
			display: option
		})
	}
	
	grabOnHover = (option) => {
		this.setState({
			onHover: option
		})
	}
	
	componentDidMount() {
		this.makeRequest();
	}

	componentDidUpdate(prevProps, prevState) {
		if (prevProps !== this.props) {
			this.makeRequest();
			this.setState({
				isLoaded: false,
				data: null,
				colors: null,
				albums: {},
				error: false,
				errorCode: null
			})
		} 
		
		if (prevState.data !== this.state.data && this.state.data != null && this.state.isLoaded === false) {
			this.makeAlbums();
			this.setState({
				isLoaded: true
			})
		} 
		
		if (prevState.numColors !== this.state.numColors) {
			this.setState({
				colors: null
			})
		}
	}
	
	render () {
		const {isLoaded, data, colors, numColors, onHover, display, error, errorCode, visible} = this.state;
		const albums = Object.values(this.state.albums);
		
		if (isLoaded && !error) {
			return (
				<div>
				
					<header className='App-header'>
						<div className='Playlist-image'>
							<img src={data.images[0].url} alt={data.name}/>
						</div>
						<div className='Playlist-info'>
							<h1><a href={data.external_urls.spotify}>{data.name}</a></h1>
							<p className='Playlist-description'>{data.description}</p>
							<p><a href={data.owner.external_urls.spotify}>{data.owner.display_name}</a></p>
						</div>
					</header>
					
					<div className='Playlist-body'>
						<AlbumOptions grabNumColors={this.grabNumColors} grabDisplay={this.grabDisplay} grabOnHover={this.grabOnHover}/>
						<div className='Albums-Singles'>
							<button className='h2-button' onClick={this.toggleVisible}><h2>Albums</h2></button>
							<div className={'Albums ' + (visible ? 'visible' : 'hidden')}>
								{albums.map(
									(album, i) => (
										<div className='Album' key={i}>
											<Album 
											name = {album.name}
											image = {album.image.url}
											url = {album.url}
											grabColors = {this.grabColors}
											numColors = {numColors}
											display = {display}
											onHover = {onHover}
											/>
											<p>
												{album.artists.map((artist, i) => {
													if (i === 0) {
														return (
															<span key={i}><Link to={'/paletteify/artist/' + artist.id}>{artist.name}</Link></span>
														)
													} else {
														return (
															<span key={i}>, <Link to={'/paletteify/artist/' + artist.id}> {artist.name}</Link></span>
														)
													}
												})}
												</p>
											<ul>
												{album.tracks.map((track, i) => (
													<li key={i}><a href={track.url}>{track.name}</a></li>
												))}
											</ul>
										</div>
									)
								)}
							</div>
						</div>
						<Colors colors={colors}/>
					</div>
				</div>
			)
			
		} else {
			return (
			<header className='App-header Loading'>
				{error ? <h1>Error: {errorCode}</h1> : <h1>Loading...</h1>}
					{error && errorCode !== '401' && <p><a href='https://developer.spotify.com/documentation/web-api/'>Status code info here</a></p>}
					{error && errorCode === '401' && <Link to='/paletteify/'><p>Unauthorized: Try logging in again</p></Link>}
			</header>
			)
		} 
		
	}
	
}

export default PlaylistPage;