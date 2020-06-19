import React, {Component} from 'react';
import TopTracks from './TopTracks.js';
import Image from './Image.js';

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
		const {artistID, country, headers, handleErrors} = this.props;
		
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
		const {artistID, country, headers, handleErrors, colorOptions} = this.props;
		
		if (isLoaded && !error) {
			return (
			<header className="App-header">
			<div className="Artist-image"><Image src={data.images[0].url} alt={data.name} options={colorOptions}/></div>
			<div className="Artist-info">
				<h1><a href={data.external_urls.spotify}>{data.name}</a></h1>
				<TopTracks artistID={artistID} country={country} headers={headers} handleErrors={handleErrors}/>
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

export default Header;