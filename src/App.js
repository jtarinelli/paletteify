import React, {Component} from 'react';
import './App.css';
const getColors = require('get-image-colors');
//const chroma = require('chroma-js');

const artistID = '4Kg3vBPMPfnYrnZo2A4czS'; //'4Kg3vBPMPfnYrnZo2A4czS';
const token = 'BQAg-MGucyWcr8IM7QsNARhVRA7M3judXv9c3sfOgSUHiuPRm3ENMPS4XjhjrPf6xI7bdp7W_UH4LedhoDCbmAqRALNeQw4KvNFda7tsgrtBZwDE4BzUXZOSOlX3Qw5PiobhhMmazaHnpSbB';
const country = "JP";
const headers = { 'Authorization': 'Bearer '.concat(token) }

/* to do:
** break up components into their own files
** figure out why i can't initialize some album sections to be open and other closed
** store colors along with albums (just name or include other info/whole object??)
** play snippets of top songs
** add all 5(?) colors on hover
** automatically get token (need to login??)
** load more albums button
** fix top tracks for long song titles
** factor out makeResponse function if possible (binding? make a component? idk)
** show error code/status message on error (go on api page and figure out how to get the messages)
** make pages with router (login page, search page, user?/artist/playlists pages with the id in the url)
*/

function handleErrors(response) {
	// idk if this should be a method or not? where do i put this
    if (!response.ok) {
        throw Error(response);
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
		const passUpColors = this.props.grabColors;

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
			
			// callback to pass colors to parent (album) if it exists
			if (passUpColors != null) {
				passUpColors(colors);
			}
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
		
		if (isLoaded && !error) {
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
					<p>{error ? "Error" : "..."}</p>
				</div>
			)
		} 
	}
}

class Header extends Component {
	
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
		
		if (isLoaded && !error) {
			return (
			<header className="App-header">
			<div className="Artist-image"><Image src={data.images[0].url} alt={data.name}/></div>
			<div className="Artist-info">
				<h1><a href={data.external_urls.spotify}>{data.name}</a></h1>
				<TopTracks />
			</div>
		</header>
			)
			
		} else {
			return (
			<header className="App-header Loading">
				<h1>{error ? "Error" : "Loading..."}</h1>
					{error && <p>Open console for status code</p>}
			</header>
			)
		} 
		
	}
}

class Album extends Component {
	
	grabColors = (imageColors) => {
		let passUpColors = this.props.grabColors;
		passUpColors(imageColors);
	}
	
	render() {
	
		const {name, image, url} = this.props
		
		return (
			<a href = {url}>
			<Image src={image} alt={name} grabColors={this.grabColors}/>
				<p>{name}</p>
			</a>
		)
	}
}

class AlbumsSection extends Component {
	
	constructor(props) {
		super(props);
		
		this.state = {
			visible: this.props.visible, 
			isLoaded: false,
			data: null,
			colors: null,
			error: false
		}
	}
	
	toggleVisible = () => {
		this.setState(prevState => ({
			visible: !prevState.visible
		}));
	}
	
	componentDidMount() {
		const group = this.props.group;
		fetch('https://api.spotify.com/v1/artists/'.concat(artistID).concat('/albums?include_groups='.concat(group).concat('&market=').concat(country)), {headers})
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
	
	grabColors = (albumColors) => {
		let passUpColors = this.props.grabColors;
		let prevColors = this.state.colors;
		let albumsCount = this.state.data.items.length;
		
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
		if (this.state.colors.length === albumsCount * 5) {
			passUpColors(this.state.colors); 
		}
	}
	
	render() {
		const {title} = this.props;
		const {visible, isLoaded, data, error} = this.state;
		console.log(this.props);
		
		if (isLoaded && data.items.length === 0) {
			return null;
		} else if (isLoaded && !error) {
			return (
				<div>
					<button onClick={this.toggleVisible} className="h2-button"><h2>{title}</h2></button>
					<div className = {"Albums " + (visible ? 'visible' : 'hidden')}>
						{data.items.map(
							(album, i) => (
								<div className="Album" key={i}>
								<Album 
								name = {album.name}
								image = {album.images[1].url}
								url = {album.external_urls.spotify}
								grabColors = {this.grabColors}
								/>
								</div>
							)
						)}
					</div>
				</div>
			) 
		} else {
			return (
				<div>
					<button onClick={this.toggleVisible} className="h2-button"><h2>{title}</h2></button>
					<div className = {"Albums " + (visible ? 'visible' : 'hidden')}>
						<p>{error ? "Error" : "Loading..."}</p>
					</div>
				</div>
			) 
		} 
	}
}

class AlbumsSingles extends Component {
	
	constructor(props) {
		super(props);
		this.state = ({
			colors: null,
			sectionsLoaded: 0,
		})
	}
					
	grabColors = (albumsColors) => {
		let passUpColors = this.props.grabColors;
		let prevColors = this.state.colors;
		let prevSectionsLoaded = this.state.sectionsLoaded;
		
		if (prevColors === null) {
			this.setState({
				colors: albumsColors,
				sectionsLoaded: 1
			})
		} else {
			this.setState({
				colors: prevColors.concat(albumsColors),
				sectionsLoaded: prevSectionsLoaded + 1
			})
		}
			
		if (this.state.sectionsLoaded === 2) { //change to a variable
			passUpColors(this.state.colors);
		}

	}
	
	render() {
		
		return (
			<section className = "Albums-Singles">
					<AlbumsSection group="album" title="Albums" visible = "true" grabColors={this.grabColors}/>
					<AlbumsSection group="single" title="Singles and EPs" visible = "false" grabColors={this.grabColors}/>
					{/*<AlbumsSection group="appears_on" title="Appears On" visible = "false" grabColors={this.grabColors}/>*/}
				</section>
		)
	
	}
}

class Dot extends Component {
	
	render() {
		const {bgColor} = this.props;
		
		return (
			<div className="Dot" style={{"backgroundColor": bgColor}}></div>
		)
	}
	
}

class Colors extends Component {
	
	render() {
		let {colors} = this.props

		if (colors === null) {
			return (
				<section className="Colors">
					<h2>Colors</h2>
					<p>Collecting colors...</p>
				</section>
			)
		} else {
			return (
				<section className="Colors">
					<h2>Colors</h2>
					{colors.map(
						(color, i) => (<Dot 
							key = {i}
							bgColor = {color}
							/>
						)
					)}
				</section>
			)
		}
		
	}	
	
}

class Body extends Component {
	
	constructor(props) {
		super(props);
		this.state = ({
			colors: null
		})
	}
	
	grabColors = (allColors) => {
		this.setState({
			colors: allColors
		})
	}
	
	render() {
		let allColors = this.state.colors;
	
		return (
			<div className="Body">
				<AlbumsSingles grabColors={this.grabColors}/>
				<Colors colors={allColors}/>
			</div>
		)
			
	}
}

function App() {
	
	return (
		<div className="App">
			<Header/>
			<Body/>
		</div>
	);
}

export default App;