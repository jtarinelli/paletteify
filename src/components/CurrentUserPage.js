import React, {Component} from 'react';
import {Link} from 'react-router-dom';

class Playlists extends Component {
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
		var headers = {'Authorization': 'Bearer '.concat(this.props.token)};
		
		fetch('https://api.spotify.com/v1/me/playlists', {headers})
			.then(this.props.handleErrors)
			.then(response => response.json())
			.then(stuff => this.setState({ 
				data: stuff,
				isLoaded: true
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
			this.setState({
				isLoaded: false
			})
		}
	}
	
	render() {
		const {data, isLoaded, error, errorCode, visible} = this.state;
		
		if (isLoaded && !error) {
			return (	
				<div className='Body'>
					<button className='h2-button' onClick={this.toggleVisible}><h2>Playlists</h2></button>
					<div className={'Albums ' + (visible ? 'visible' : 'hidden')}>
						{data.items.map((item, i) => (
							<div key={i} className='Album'>
								<Link to={'/paletteify/playlist/' + item.id}>
									<img src={item.images[0].url} alt={item.name}/>
									<p>{item.name}</p>
								</Link>
							</div>
						))}
					</div>
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
		var headers = {'Authorization': 'Bearer '.concat(this.props.token)};
		
		fetch('https://api.spotify.com/v1/me', {headers})
			.then(this.props.handleErrors)
			.then(response => response.json())
			.then(stuff => this.setState({ 
				data: stuff,
				isLoaded: true
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
			this.setState({
				isLoaded: false
			})
		}
	}
	
	render() {
		const {data, isLoaded, error, errorCode} = this.state;
		const {token} = this.props;
		
		if (isLoaded && !error) {
			return (
				<div>
					<header className='App-header'>	
						<div className='Playlist-image'>
							<img src={data.images[0].url} alt={data.name}/>
						</div>			
						<div className='Playlist-info'>
							<a href={data.external_urls.spotify}><h1>{data.display_name}</h1></a>
						</div>
					</header>
					<div className="User-body">
						<Playlists token={token}/>
					</div>
				</div>
			)
		} else {
			return (
				<header className='App-header Loading'>	
					{error ? <h1>Error: {errorCode}</h1> : <h1>Loading...</h1>}
					{error && errorCode !== '401' && <p><a href='https://developer.spotify.com/documentation/web-api/'>Status code info here</a></p>}
					{error && errorCode === '401' && <Link to='/paletteify/'><p>Unauthorized: Try logging in again</p></Link>}
				</header>
			)
		}
	}
}

export default CurrentUserPage;