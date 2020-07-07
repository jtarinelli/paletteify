import React, {Component} from 'react';
import {Link} from "react-router-dom";

class Playlists extends Component {
	// show images like albums section? :0
	constructor(props) {
		super(props);
		
		this.state = {
			isLoaded: false,
			data: null,
			errorCode: null,
			visible: true
		}
	}
	
	toggleVisible = () => {
		this.setState(prevState => ({
			visible: !prevState.visible
		}));
	}
	
	makeRequest() {
		const {handleErrors, token} = this.props.requestInfo;
		let headers = {'Authorization': 'Bearer '.concat(token)};
		
		fetch('https://api.spotify.com/v1/me/playlists', {headers})
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
	
	componentDidMount() {
		this.makeRequest();
	}
	
	componentDidUpdate(prevProps) {
		if (prevProps !== this.props) {
			this.makeRequest();
		}
	}
	
	render() {
		const {data, error, errorCode, visible} = this.state;
		
		if (data !== null && !error) {
			console.log(data);
			return (	
				<div>
					<button className="h2-button" onClick={this.toggleVisible}><h2>Playlists</h2></button>
					<ul className={"Playlists " + (visible ? 'visible' : 'hidden')}>
						{data.items.map((item, i) => (
							<li key={i}>
								<p><Link to={'/playlist/' + item.id}>{item.name}</Link></p>
							</li>
						))}
					</ul>
				</div>
			)
		} else {
			return (
				<div>	
					{error ? <h2>Error: {errorCode}</h2> : <h2>Loading...</h2>}
				</div>
			)
		}
	}
}

class CurrentUserPage extends Component {
	
	constructor(props) {
		super(props);
		
		this.state = {
			isLoaded: false,
			data: null,
			errorCode: null,
		}
	}
	
	makeRequest() {
		const {handleErrors} = this.props;
		let headers = {'Authorization': 'Bearer '.concat(this.props.token)};
		
		fetch('https://api.spotify.com/v1/me', {headers})
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
	
	componentDidMount() {
		this.makeRequest();
	}
	
	componentDidUpdate(prevProps) {
		if (prevProps !== this.props) {
			this.makeRequest();
		}
	}
	
	render() {
		const {data, error, errorCode} = this.state;
		const requestInfo = {handleErrors: this.props.handleErrors, token: this.props.token};
		
		if (data !== null && !error) {
			return (
				<div>
					<header className="App-header">	
						<div className="Playlist-image">
							<img src={data.images[0].url} alt={data.name}/>
						</div>			
						<div className="Playlist-info">
							<a href={data.external_urls.spotify}><h1>{data.display_name}</h1></a>
						</div>
					</header>
					<div>
						<Playlists requestInfo={requestInfo}/>
					</div>
				</div>
			)
		} else {
			return (
				<header className="App-header Loading">	
					{error ? <h1>Error: {errorCode}</h1> : <h1>Loading...</h1>}
				</header>
			)
		}
	}
}

export default CurrentUserPage;