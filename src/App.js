import React, {Component} from 'react';
import './App.css';
const getColors = require('get-image-colors');
//const chroma = require('chroma-js');

const artistID = '4Kg3vBPMPfnYrnZo2A4czS'; //'4Kg3vBPMPfnYrnZo2A4czS';
const token = 'BQDRCn-nDLCC2O0czyB0FjlmrnTcgyxAiDu2QaGxnZfuu9ic3W7_RElb2upFtpgUH99y765O-FeKatzrhwZ1iJhA3U0Rpylby6oO3YptoXAItwe8o2T52IrM0kCxd_-tVjUhDvX3MuL50eDI';
const country = "JP";
const headers = { 'Authorization': 'Bearer '.concat(token) }

// to collect all colors pass object down from app -> albums -> album -> image
// and add colors to object within color getter/ .then
// idk how to still associate them with the album tho, wish there were dictionaries

// to do:
// colors section (list em all/maybe graph on color wheel)
// play snippets of top songs
// add image alts (4 some reason not really working)
// add all 5(?) colors on hover
// automatically get token (need to login??)
// load more albums button
// fix top tracks for long song titles
// make seperate api calls for each section of albums (cause some ppl have a lot of albums)
// factor out makeResponse function (binding? idk)

function handleErrors(response) {
	// idk if this should be a method or not
    if (!response.ok) {
        throw Error(response.status);
    }
    return response;
}

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
		this.fetchColors(this.props.src)
	}

	fetchColors(imageURL) {
		let currentObject = this;

		var promise = getColors(imageURL);
		promise.then(function(result) {
			// sort by saturation 
			result.sort((a,b) => b.hsl()[1] - a.hsl()[1]);
			let colors = result.map(color => color.hex());

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
		const {src, alt} = this.props
		
		return (
			<div className="Background" style = {this.state.bgStyle}>
				<img src={src} alt={alt} />
			</div>
		)
	}
}

class Track extends Component {
	
	render () {
		
		const{name, url} = this.props
		
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
			data: null,
			error: false
		}
	}
	
	componentDidMount() {
		fetch('https://api.spotify.com/v1/artists/'.concat(artistID).concat('/top-tracks?country='.concat(country)), {headers})
			.then(handleErrors)
			.then(response => response.json())
			.then(stuff => this.setState({ 
				isLoaded: true,
				data: stuff 
				}))
			.catch(error => this.setState ({
				error: true
			}));
	}


	render() {
		
		const {isLoaded, data, error} = this.state;
		
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
		} else if (error) {
			return (
				<div>
					<p>Top Tracks</p>
					<p>Error</p>
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
			data: null,
			error: false
		}
	}
	
	componentDidMount() {
		fetch('https://api.spotify.com/v1/artists/'.concat(artistID), {headers})
			.then(handleErrors)
			.then(response => response.json())
			.then(stuff => this.setState({ 
				isLoaded: true,
				data: stuff 
				}))
			.catch(error => this.setState({
				error: true
			}));
	}


	render () {
		const {isLoaded, data, error} = this.state;
		
		if (isLoaded) {
			return (
			<header className="App-header">
			<div className="Artist-image"><Image src={data.images[0].url} alt={data.name}/></div>
			<div className="Artist-info">
				<h1><a href={data.external_urls.spotify}>{data.name}</a></h1>
				<TopTracks />
			</div>
		</header>
			)
		} else if (error) {
			return (
			<header className="App-header Loading">
					<h1>Error</h1>
					<p>Open console for status code</p>
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
			<Image src={image} alt={name}/>
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
			data: null,
			error: false
		}
	}
	
	componentDidMount() {
		fetch('https://api.spotify.com/v1/artists/'.concat(artistID).concat('/albums?market='.concat(country)), {headers})
			.then(handleErrors)
			.then(response => response.json())
			.then(stuff => this.setState({ 
				isLoaded: true,
				data: stuff
				}))
			.catch(error => this.setState({
				error: true
			}));
	}
	
	render() {
		
		const {isLoaded, data, error} = this.state;
		
		if (isLoaded) {
			const albums = data.items.filter((album) => (album.album_group === "album"));
			const singles = data.items.filter((album) => (album.album_group === "single"));
			const appears = data.items.filter((album) => (album.album_group === "appears_on"));
			
			return (
				<section className = "Albums-Singles" >
					{albums.length > 0 && <AlbumsSection albums={albums} title="Albums"/>}
					{singles.length > 0 && <AlbumsSection albums={singles} title="Singles and EPs"/>}
					{appears.length > 0 && <AlbumsSection albums={appears} title="Featured On"/>}
				</section>
			)
		} else if (error) {
			return (
				<section className = "Albums-Singles" >
						<h1>Error</h1>
				</section>
			)
		} else {
			return (
				<section className = "Albums-Singles" >
						<h1>Loading...</h1>
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