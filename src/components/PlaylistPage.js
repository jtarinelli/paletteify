import React, {Component} from 'react';
import Album from './Album.js';
import {Link} from "react-router-dom";

class PlaylistPage extends Component {
	
	constructor(props) {
		super(props);
		this.makeAlbums = this.makeAlbums.bind(this);
		
		this.state = {
			isLoaded: false,
			data: null,
			albums: {},
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
		let numColors = 5;
		let prevColors = this.state.colors;
		let albumsCount = this.state.albums.length;
		
		if (prevColors === null) {
			this.setState({
				colors: albumColors
			})
		} else {
			this.setState({
				colors: prevColors.concat(albumColors)
			})
		}
			
		// when all album colors are collected, send them up to AlbumsSingles
		/*
		if (this.state.colors.length === albumsCount * numColors) {
			passUpColors(this.state.colors); 
		}
		*/
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
	}
	
	render () {
		const {isLoaded, data, error, errorCode, visible} = this.state;
		const albums = Object.values(this.state.albums);
		
		if (isLoaded && !error) {
			return (
				<div>
					<header className="App-header">
						<div className="Playlist-image">
							<img src={data.images[0].url} alt={data.name}/></div>
						<div className="Playlist-info">
							<h1><a href={data.external_urls.spotify}>{data.name}</a></h1>
							<p className="Playlist-description">{data.description}</p>
							<p><a href={data.owner.external_urls.spotify}>{data.owner.display_name}</a></p>
						</div>
					</header>
					<div className="Playlist-body">
						<button className="h2-button" onClick={this.toggleVisible}><h2>Albums</h2></button>
						<div className={"Albums " + (visible ? 'visible' : 'hidden')}>
							{albums.map(
								(album, i) => (
									<div className="Album" key={i}>
										<Album 
										name = {album.name}
										image = {album.image.url}
										url = {album.url}
										grabColors = {this.grabColors}
										numColors = {5}
										display = {0}
										onHover = "Disappears"
										/>
										<p><Link to={"/artist/" + album.artists[0].id}>{album.artists[0].name}</Link></p>
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
				</div>
			)
			
		} else {
			return (
			<header className="App-header Loading">
				{error ? <h1>Error: {errorCode}</h1> : <h1>Loading...</h1>}
					{error && <p><a href="https://developer.spotify.com/documentation/web-api/">Status code info here</a></p>}
			</header>
			)
		} 
		
	}
	
}

export default PlaylistPage;