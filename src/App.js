import React, {Component} from 'react';
import './App.css';
const getColors = require('get-image-colors');

const artistID = '4Kg3vBPMPfnYrnZo2A4czS';
const token = 'BQCSAFCeMiSoigmNMvGxm9DpADZ15kDXISjTznD8SFDK8ZpVFcQ-qG5CYEy3jSVw7QeA3sWk6ZF06vJ8gdQMohNpgBPt-zXiDc-ADObIIAF4f7huh8JfYZn9RF-Ug2YeppJbUuoO';

// to collect all colors pass object down from app -> albums -> album -> image
// and add colors to object within color getter/ .then
// idk how to still associate them with the album tho, wish there were dictionaries

// to do:
// colors section (list em all/maybe graph on color wheel
// play snippets of top songs
// make collapsable clicky things buttons
// add image alts
// add all 5(?) colors on hover
// add error handling to http calls
// automatically get token (need to login??)
// load more albums button
// fix top tracks for long song titles

class Image extends Component {
	
	constructor(props) {
		super(props);
		
		this.state = {
			colorsLoaded: false,
			bgStyle: {
				backgroundColor: "white"
			},
			imageColors: []
		}

	}
	
	componentDidMount() {
		const {src} = this.props
			if (this.state.colorsLoaded === false) {
				this.fetchColors(src)
			}	
	}

	fetchColors(imageURL) {
		let currentObject = this;

		var promise = getColors(imageURL);
		promise.then(function(result) {
			var colors = result.map(color => color.hex());
			
			currentObject.setState({
				colorsLoaded: true,
				bgStyle: {
					backgroundColor: colors[0]
				},
				imageColors: colors
			})
		})
	}
	
	render() {
		const {src} = this.props
		
		return (
			<div className="Background" style = {this.state.bgStyle}>
				<img src={src} />
			</div>
		)
	}
}

class Track extends Component {
	
	render () {
		
		const{name, image, url} = this.props
		
		return (
		<div className="Track">
			<a href = {url}>
				<p>{name}</p>
			</a>
		</div>
		)
	}
}

class TopTracks extends Component {
	
	constructor(props) {
		super(props);
		
		this.state = {
			isLoaded: false,
			data: null
		}
	}
	
	componentDidMount() {
		const headers = { 'Authorization': 'Bearer '.concat(token) }
		fetch('https://api.spotify.com/v1/artists/'.concat(artistID).concat('/top-tracks?country=US'), {headers})
			.then(response => response.json())
			.then(stuff => this.setState({ 
				isLoaded: true,
				data: stuff 
				}));
	}

	render() {
		
		const {isLoaded, data} = this.state;
		
		if (isLoaded) {
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
					<p>...</p>
				</div>
			)
		}
	}
}

class ArtistProfile extends Component {
	
	constructor(props) {
		super(props);
		
		this.state = {
			isLoaded: false,
			data: null
		}
	}
	
	componentDidMount() {
		const headers = { 'Authorization': 'Bearer '.concat(token) }
		fetch('https://api.spotify.com/v1/artists/'.concat(artistID), {headers})
			.then(response => response.json())
			.then(stuff => this.setState({ 
				isLoaded: true,
				data: stuff 
				}));
	}


	render () {
		const {isLoaded, data} = this.state;
		
		if (isLoaded) {
			return (
			<header className="App-header">
			<div className="Artist-image"><Image src={data.images[0].url}/></div>
			<div className="Artist-info">
				<h1><a href={data.external_urls.spotify}>{data.name}</a></h1>
				<TopTracks />
			</div>
		</header>
			)
		} else {
			return (
			<header className="App-header Loading">
					<h1>Loading...</h1>
			</header>
			)
		}
	}
}

class Album extends Component {
	
	render() {
	
		const {name, image, url} = this.props
		
		return (
			<a href = {url}>
			<Image src={image} />
				<p>{name}</p>
			</a>
		)
	}
}

class AlbumsSection extends Component {
	
	constructor(props) {
		super(props);
		
		this.state = {
			visible: true
		}
	}
	
	toggle = () => {
		this.setState(prevState => ({
			visible: !prevState.visible
		}));
	}
	
	
	render() {
		
		const {albums, title} = this.props;
		const {visible} = this.state;
		

		return (
			<div>
				<a><button onClick={this.toggle} className="h1-button"><h1>{title}</h1></button></a>
				<div className = {"Albums " + (visible ? 'visible' : 'hidden')}>
					{albums.map(
						(album, i) => (
							<div className="Album" key={i}>
							<Album 
							name = {album.name}
							image = {album.images[1].url}
							url = {album.external_urls.spotify}
							/>
							</div>
						)
					)}
				</div>
			</div>
		) 
	}
}

class AlbumsSingles extends Component {
	
	constructor(props) {
		super(props);
		
		this.state = {
			isLoaded: false,
			data: null
		}
	}
	
	componentDidMount() {
		const headers = { 'Authorization': 'Bearer '.concat(token) }
		fetch('https://api.spotify.com/v1/artists/'.concat(artistID).concat('/albums?market=US'), {headers})
			.then(response => response.json())
			.then(stuff => this.setState({ 
				isLoaded: true,
				data: stuff
				}));
	}
	
	render() {
		
		const {isLoaded, data} = this.state;
		
		if (isLoaded) {
			
			console.log(data.items.filter((album) => (album.album_group === "album")));
			
			const albums = data.items.filter((album) => (album.album_group === "album"));
			const singles = data.items.filter((album) => (album.album_group === "single"));
			const appears = data.items.filter((album) => (album.album_group === "appears_on"));
			
			return (
				<section className = "Albums-Singles" >
					{albums.length > 0 ? <AlbumsSection albums={albums} title="Albums"/> : null}
					{singles.length > 0 ? <AlbumsSection albums={singles} title="Singles and EPs"/> : null}
					{appears.length > 0 ? <AlbumsSection albums={appears} title="Featured On"/> : null}
				</section>
			)
		} else {
			return (
				<section className = "Albums-Singles" >
						<p>Loading...</p>
				</section>
			)

		}
	}
}

function App() {
	return (
		<div className="App">
			<ArtistProfile/>
			<AlbumsSingles/>
		</div>
	);
}

export default App;