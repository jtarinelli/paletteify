import React, {Component} from 'react';
import './App.css';
const getColors = require('get-image-colors')

const tracks = require('./json/topTracks.json');
const artistInfo = require('./json/artistInfo.json');
const albums = require('./json/albums.json');

// to collect all colors pass object down from app -> albums -> album -> image
// and add colors to object within color getter/ .then
// idk how to still associate them with the album tho, wish there were dictionaries

// to do: colors section (list em all/maybe graph on color wheel
// play snippets of top songs
// make collapsable clicky things buttons
// add image alts
// add all 5(?) colors on hover

class Image extends Component {
	
	state = {
		loaded: false,
		bgStyle: {
			backgroundColor: "white"
		},
		imageColors: []
	}
	
	fetchColors (imageURL) {
		let currentObject = this;

		var promise = getColors(imageURL);
		promise.then(function(result) {
			var colors = result.map(color => color.hex());
			
			currentObject.setState({
				loaded: true,
				bgStyle: {
					backgroundColor: colors[0]
				},
				imageColors: colors
			})
		})
	}
	
	render() {
		let {src} = this.props
		if (this.state.loaded === false) {
			this.fetchColors(src)
		}
		
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

class ArtistProfile extends Component {

	render () {
		let {data, topTracks} = this.props;
		topTracks = topTracks.tracks;
		
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
	//prob should seperate albums and singles at some point
	state = {
		visible: true
	}
	
	toggle = () => {
		this.setState(prevState => ({
			visible: !prevState.visible
		}))
		console.log(this.state.visible);
	}
	
	render() {
		
		let {albums} = this.props;
		albums = albums.items;
		
		return (
			<section className = "Albums-Singles" >
				<a><h1 onClick={this.toggle}>Albums and Singles</h1></a>
				<div className = {"Albums " + (this.state.visible ? 'visible' : 'hidden')}>
					{albums.map(
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
	}
}

function App() {

	return (
		<div className="App">
			<ArtistProfile data={artistInfo} topTracks={tracks}/>
			<Albums albums={albums}/>
		</div>
	);
}

export default App;
