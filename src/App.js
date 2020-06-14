import React, {Component} from 'react';
import './App.css';
const getColors = require('get-image-colors');

const artistID = '4Kg3vBPMPfnYrnZo2A4czS'

// to collect all colors pass object down from app -> albums -> album -> image
// and add colors to object within color getter/ .then
// idk how to still associate them with the album tho, wish there were dictionaries

// to do on front end: colors section (list em all/maybe graph on color wheel
// play snippets of top songs
// make collapsable clicky things buttons
// add image alts
// add all 5(?) colors on hover

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
		const headers = { 'Authorization': 'Bearer BQAKlSGcIZKvNgYmT6L_m-H3b4Ny0cjTWNWZOv_n2LgLLfgpdaEsjJWoJiGCdEm7wz2-IgrBob8u0owvQv5zL9RXW-uz_XYBXcEy8RSl5aP5YgFjdR1YKY3z8eiM8LZ6hzM1hQHe' }
		fetch('https://api.spotify.com/v1/artists/4Kg3vBPMPfnYrnZo2A4czS/top-tracks?country=US')
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
							(track, i) => (<li key = {i}><Track 
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
		const headers = { 'Authorization': 'Bearer BQAKlSGcIZKvNgYmT6L_m-H3b4Ny0cjTWNWZOv_n2LgLLfgpdaEsjJWoJiGCdEm7wz2-IgrBob8u0owvQv5zL9RXW-uz_XYBXcEy8RSl5aP5YgFjdR1YKY3z8eiM8LZ6hzM1hQHe' }
		fetch('https://api.spotify.com/v1/artists/4Kg3vBPMPfnYrnZo2A4czS')
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
		
		/*
		return (
		<header className="App-header">
			<div className="Artist-image"><Image src={data.images[0].url}/></div>
			<div className="Artist-info">
				<h1><a href={data.external_urls.spotify}>{data.name}</a></h1>
				<p>Top Tracks</p>
				<ol className="Top-tracks">
					{topTracks.map(
						(track, i) => (<li key = {i}><Track 
						name = {track.name}
						url = {track.external_urls.spotify}
						/></li>
						)
					)}
				</ol>
			</div>
		</header>
		)
		*/
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

class Albums extends Component {
	
	constructor(props) {
		super(props);
		
		this.state = {
			isLoaded: false,
			data: null,
			visible: true
		}
	}
	
	componentDidMount() {
		const headers = { 'Authorization': 'Bearer BQAKlSGcIZKvNgYmT6L_m-H3b4Ny0cjTWNWZOv_n2LgLLfgpdaEsjJWoJiGCdEm7wz2-IgrBob8u0owvQv5zL9RXW-uz_XYBXcEy8RSl5aP5YgFjdR1YKY3z8eiM8LZ6hzM1hQHe' }
		fetch('https://api.spotify.com/v1/artists/4Kg3vBPMPfnYrnZo2A4czS/albums?market=US')
			.then(response => response.json())
			.then(stuff => this.setState({ 
				isLoaded: true,
				data: stuff,
				visible: true
				}));
	}
	
	toggle = () => {
		this.setState(prevState => ({
			visible: !prevState.visible
		}))
		console.log(this.state.visible);
	}
	
	render() {
		
		const {isLoaded, data, visible} = this.state
		
		if (isLoaded) {
			return (
				<section className = "Albums-Singles" >
					<a><h1 onClick={this.toggle}>Albums and Singles</h1></a>
					<div className = {"Albums " + (visible ? 'visible' : 'hidden')}>
						{data.items.map(
							(album, i) => (<div className="Album" key={i}><Album 
							name = {album.name}
							image = {album.images[1].url}
							url = {album.external_urls.spotify}
							/></div>
							)
						)}
					</div>
				</section>
			)
		} else {
			return (
				<section className = "Albums-Singles" >
					<a><h1 onClick={this.toggle}>Albums and Singles</h1></a>
					<div className = {"Albums " + (visible ? 'visible' : 'hidden')}>
						<p>Loading...</p>
					</div>
				</section>
			)

		}
	}
}

function App() {
	return (
		<div className="App">
			<ArtistProfile/>
			<Albums/>
		</div>
	);
}

export default App;