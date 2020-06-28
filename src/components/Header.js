import React, {Component} from 'react';
import TopTracks from './TopTracks.js';

class ArtistIDForm extends Component {
	constructor(props) {
		super(props);

		this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
		
		this.state = {value: ''};
	}

	handleChange(event) {
		this.setState({value: event.target.value});
	}

	handleSubmit(event) {
		console.log(this.state.value);
		this.props.grabArtistID(this.state.value);
		event.preventDefault();
	}

	render() {
		return (
			<form onSubmit={this.handleSubmit} className="ArtistIDForm">
				<label>
					ID: <input type="text" value={this.state.value} onChange={this.handleChange} />
				</label>
				<input type="submit" value=">>" />
			</form>
		);
	}
}

class Header extends Component {
	
	constructor(props) {
		super(props);
		
		this.state = {
			isLoaded: false,
			data: null,
			error: false,
			errorCode: null
		}
	}
	
	componentDidMount() {
		const {artistID, headers, handleErrors} = this.props.requestInfo;
		
		fetch('https://api.spotify.com/v1/artists/'.concat(artistID), {headers})
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

	render () {
		const {isLoaded, data, error, errorCode} = this.state;
		const {requestInfo} = this.props;
		
		if (isLoaded && !error) {
			return (
			<header className="App-header">
			<div className="Artist-image"><img src={data.images[0].url} alt={data.name}/></div>
			<div className="Artist-info">
				<h1><a href={data.external_urls.spotify}>{data.name}</a></h1>
					{/*<ArtistIDForm />*/}
				<TopTracks requestInfo={requestInfo}/>
			</div>
		</header>
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

export default Header;