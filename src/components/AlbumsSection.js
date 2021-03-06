import React, {Component} from 'react';
import Album from './Album.js';

// one section of albums for the artist page
class AlbumsSection extends Component {
	
	constructor(props) {
		super(props);
		
		this.state = {
			visible: this.props.visible, 
			isLoaded: false,
			data: null,
			colors: null,
			error: false,
			errorCode: null
		}
	}
	
	toggleVisible = () => {
		this.setState(prevState => ({
			visible: !prevState.visible
		}));
	}
	
	makeRequest() {
		const {artistID, country, headers, handleErrors} = this.props.requestInfo;
		const {group} = this.props;
		
		fetch('https://api.spotify.com/v1/artists/'.concat(artistID).concat('/albums?include_groups='.concat(group).concat('&market=').concat(country)), {headers})
			.then(handleErrors)
			.then(response => response.json())
			.then(stuff => this.setState({ 
				isLoaded: true,
				data: stuff
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
				
				newData.items = prevState.data.items.concat(stuff.items);
				newData.next = stuff.next;
				
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
	
	componentDidUpdate(prevProps, prevState) {
		if (this.props.requestInfo !== prevProps.requestInfo) {
			this.makeRequest();
			this.setState({
				isLoaded: false,
				data: null,
				colors: null,
				error: false,
				errorCode: null
			})
		}
		
		if (this.props.numColors !== prevProps.numColors) {
			this.setState({
				colors: null
			})
		}
	}
	
	grabColors = (albumColors) => {
		let passUpColors = this.props.grabColors;
		let numColors = this.props.numColors;
		let prevColors = this.state.colors;
		const albumsCount = this.state.data.items.length;
		
		if (prevColors === null) {
			this.setState({colors: albumColors})
		} else {
			this.setState({colors: prevColors.concat(albumColors)})
		}
			
		// when all album colors are collected, send them up to AlbumsSingles
		if (this.state.colors.length >= albumsCount * numColors) {
			passUpColors(this.state.colors); 
		}
	}
	
	render() {
		const {title, numColors, display, onHover} = this.props;
		const {visible, isLoaded, data, error, errorCode} = this.state;
		
		if (isLoaded && data.items.length === 0) {
			return null;
			
		} else if (isLoaded && !error) {
			return (
				<div>
					<button onClick={this.toggleVisible} className='h2-button'><h2>{title}</h2></button>
					<div className = {'Albums ' + (visible ? 'visible' : 'hidden')}>
						
						{data.items.map((album, i) => (
							<div className='Album' key={i}>
								<Album 
								name = {album.name}
								image = {album.images[1].url}
								url = {album.external_urls.spotify}
								grabColors = {this.grabColors}
								numColors = {numColors}
								display = {display}
								onHover = {onHover}
								/>
							</div>
						))}
						
						{data.next !== null &&
							<button className='h2-button Album-small-button' onClick={() => this.requestNextPage(data.next)}>
								<div className='Album'>
									<div className='Image-replacement'>
										<h2>Load more</h2>
									</div>
									<p>  </p>
								</div>
							</button>
						}
						
					</div>
				</div>
			)
			
		} else {
			return (
				<div>
					<button onClick={this.toggleVisible} className='h2-button'><h2>{title}</h2></button>
					<div className = {'Albums ' + (visible ? 'visible' : 'hidden')}>
						{error ? <p>Error:  {errorCode}</p> : <p>...</p>}
					</div>
				</div>
			) 
		} 
	}
}

export default AlbumsSection;