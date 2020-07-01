import React, {Component} from 'react';
import {BrowserRouter as Router, Switch, Route, Link, useParams} from "react-router-dom";

import './App.css';
import ArtistHeader from './components/ArtistHeader.js';
import ArtistBody from './components/ArtistBody.js';
import Album from './components/Album.js';

const token = 'BQC1R4_UGVgM3MrtHdqaOvCzjFhEO4x2TIZxnXynAYGXtm0pKRgZrPg0cns7RZBe-XeLeRnfg6p9WRTSZPnhNC9acNZamC23MvMpWMcE9nv9c6dOuHiDz3qogwYt_hTTzRnHe3k1eEBngTBi';

/* to do:
** make nice landing/search page and appearing menu bar
** fix id form so both pressing enter and the button works (or not cause it'll be a search eventually anyway >:))
** reduce repetition with update/grab functions for options
** make toptracks work better with more than 2 columns
** maybe? change dropdown to actual html select element instead of all divs
** make numBins not a dropdown(prob form/textbox would be good? or actual dropdown w/ scrollbar)
** play snippets of top songs (might need to redo track component)
** automatically get token (need to login??)
** load more albums button
** factor out makeResponse function if possible (binding? make a component? idk)
** show better message on error 
**** it seems like when there's an error the api returns multiple objects, but idk how to get them
*/

function handleErrors(response) {
	// idk if this should be a method or not? where do i put this
    if (!response.ok) {
        throw Error(response.status);
    }
    return response;
}

class SearchBoxes extends Component {
	constructor(props) {
		super(props);

		this.handleChange = this.handleChange.bind(this);

		this.state = {
			value: '',
			visible: true
			};
	}

	handleChange(event) {
		this.setState({value: event.target.value});
	}
	
	toggleVisible = () => {
		this.setState(prevState => ({
			visible: !prevState.visible
		}));
	}
	
	render() {
		const {visible} = this.state;
		
		return (
			<div>
				<div className= {"Menu " + (visible ? 'visible' : 'hidden')}>
					<label>
						Enter artist ID: <input type="text" value={this.state.value} onChange={this.handleChange} />
					</label>
					<Link to={this.state.value} className="p-button">>></Link>
					<Link to="/artist/4Kg3vBPMPfnYrnZo2A4czS">Shouta</Link>
					<Link to="/artist/1iR65pQAV4ssTTf9JRNr9X">Mamo</Link>
					<Link to="/artist/1S2S00lgLYLGHWA44qGEUs">Gen</Link>
				</div>
				{/*<button onClick={this.toggleVisible} className="h2-button Menu-icon"><h2>UWU</h2></button>*/}
			</div>
		);
	}
}

function SearchPage() {
	return (
		<header className="App-header Loading">
			<h1>Paletteify</h1>
			<SearchBoxes/>
		</header>
	)
}

function DoPlaylistPage() {
	let {playlistID} = useParams();
	let requestInfo = {
		playlistID: playlistID,
		country: "US",
		headers: {'Authorization': 'Bearer '.concat(token)},
		handleErrors: handleErrors
	}
		
	return (
		<div>
			<PlaylistPage requestInfo={requestInfo}/>
		</div>
	)
}

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
			errorCode: null
		}
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
		if (prevState.data !== this.state.data && this.state.isLoaded === false) {
			this.makeAlbums();
			this.setState({
				isLoaded: true
			})
		}
	}
	
	render () {
		const {isLoaded, data, error, errorCode} = this.state;
		const albums = Object.values(this.state.albums);
		
		if (isLoaded && !error) {
			return (
				<div>
					<header className="App-header">
						<div className="Playlist-image">
							<img src={data.images.length > 1 ? data.images[1].url : data.images[0].url} alt={data.name}/></div>
						<div className="Playlist-info">
							<h1><a href={data.external_urls.spotify}>{data.name}</a></h1>
							<p>{data.description}</p>
							<p><a href={data.owner.external_urls.spotify}>{data.owner.display_name}</a></p>
						</div>
					</header>
					<div className="Playlist-body">
						<button className="h2-button"><h2>Albums</h2></button>
						<div className="Albums">
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

function ArtistPage() {
	let {artistID} = useParams();
	let requestInfo = {
		artistID: artistID,
		country: "US",
		headers: {'Authorization': 'Bearer '.concat(token)},
		handleErrors: handleErrors
	}
		
	return (
		<div>
			<ArtistHeader requestInfo={requestInfo}/>
			<ArtistBody requestInfo={requestInfo}/>
		</div>
	)
}

function ErrorPage() {
	// not current used
	return (
		<header className="App-header Loading">
			<h1>There's nothing here broseph</h1>
			<p>Link back to search page here (but not yet XD)</p>
		</header>
	)
}

function App() {
		
	return (
		<div className="App">
			<Router>
				<Switch>
					<Route path="/artist/:artistID">
						<SearchBoxes/>
						<ArtistPage/>
					</Route>
					<Route path="/playlist/:playlistID">
						<SearchBoxes/>
						<DoPlaylistPage/>
					</Route>
					<Route path="/">
						<SearchPage/>
					</Route>
				</Switch>
			</Router>
		</div>
	);
}

export default App;