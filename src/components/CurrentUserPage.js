import React, {Component} from 'react';

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
	
	componentDidUpdate() {
		this.makeRequest(); //prob not a good idea in long run/put in an if statement unless page will be totally static
	}
	
	render() {
		const {data, error, errorCode} = this.state;
		
		if (data !== null && !error) {
			return (	
				<header className="App-header">	
					<div className="Playlist-image">
						<img src={data.images[0].url} alt={data.name}/>
					</div>			
					<div className="Playlist-info">
						<a href={data.external_urls[0]}><h1>{data.display_name}</h1></a>
					</div>
				</header>
			)
		} else {
			return (
				<header className="App-header">	
					{error ? <h1>Error: {errorCode}</h1> : <h1>Loading...</h1>}
				</header>
			)
		}
	}
}

export default CurrentUserPage;