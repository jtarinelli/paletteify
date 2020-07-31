import React, {Component} from 'react';
import {BrowserRouter as Router, Switch, Route, Link, Redirect, useParams, useLocation} from 'react-router-dom';

import './App.css';
import ArtistHeader from './components/ArtistHeader.js';
import ArtistBody from './components/ArtistBody.js';
import PlaylistPage from './components/PlaylistPage.js';
import CurrentUserPage from './components/CurrentUserPage.js';
import SearchBox from './components/SearchBox.js';
import SearchResults from './components/SearchResults.js';

const clientId = 'a4e61050459f4f3cbac28ccd3826f37a';
//const redirectUri = 'http://localhost:3000/paletteify/callback';
const redirectUri = 'https://jtarinelli.github.io/paletteify/callback';
var scopes = ['playlist-read-private', 'user-top-read'];

var hash = window.location.hash // idk what this even is, move it into somewhere?
	.substring(1)
	.split('&')
	.reduce(function(initial, item) {
		if (item) {
			var parts = item.split('=');
			initial[parts[0]] = decodeURIComponent(parts[1]);
		}
		return initial;
	}, {});

window.location.hash = '';

class Menu extends Component {
	render() {
		return (
			<div className='Menu'>
				<Link to='/paletteify/'>Home</Link>
				<SearchBox/>
				<div className='Menu-right'>
					<Link to ='/paletteify/me'>My Profile</Link>
				</div>
			</div>
		)
	}
}

function LoginPage(props) {
	return (
		<header className='App-header Loading Cover'>
			<h1 className='Bigboi'>Paletteify</h1>
			<a href={`https://accounts.spotify.com/authorize?client_id=${clientId}&redirect_uri=${redirectUri}&response_type=token&scope=${scopes}`}>
				<h2 className='Login-button'>Login to Spotify</h2>
			</a>
			
			{props.token !== null && 
				<div className='Menu'>
					<Link to ='/paletteify/me'>My Profile</Link>
					<SearchBox/>
				</div>}	
				
		</header>
	)
}

function DoSearchResults(props) {
	const {query} = useParams();
	var requestInfo = {
		query: query,
		country: 'US',
		headers: {'Authorization': 'Bearer '.concat(props.token)},
		handleErrors: props.handleErrors
	}
		
	return (
		<div>
			<SearchResults requestInfo={requestInfo}/>
		</div>
	)
}

function DoPlaylistPage(props) { // not ideal way to do this i think
	const {playlistID} = useParams();
	var requestInfo = {
		playlistID: playlistID,
		country: 'US',
		headers: {'Authorization': 'Bearer '.concat(props.token)},
		handleErrors: props.handleErrors
	}
		
	return (
		<div>
			<PlaylistPage requestInfo={requestInfo}/>
		</div>
	)
}

function ArtistPage(props) {
	const {artistID} = useParams();
	var requestInfo = {
		artistID: artistID,
		country: 'US',
		headers: {'Authorization': 'Bearer '.concat(props.token)},
		handleErrors: props.handleErrors
	}
		
	return (
		<div>
			<ArtistHeader requestInfo={requestInfo}/>
			<ArtistBody requestInfo={requestInfo}/>
		</div>
	)
}

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

function Redirector() { // come up with a better name
	let query = useQuery();
	let page = query.get("p");
	
	if (page !== null) {
		return (
			<Redirect to={'/paletteify'.concat(page)} />
		)
	} else {
		return null
	}
}

class App extends Component {
	
	constructor(props) {
		super(props);
		const token = localStorage.getItem('token');
		
		this.state = ({token: token});
	}
	
	componentDidMount() {
		const token = hash.access_token;
		
		if (token) {
			this.setState({token: token});
			localStorage.setItem('token', token);
		}
	}
	
	handleErrors(response) {
		if (!response.ok) {
			throw Error(response.status);
		}
		return response;
	}
		
	render() {
		const {token} = this.state;
		
		return (
			<div className='App'>
				<Router>
					<Switch>
					
						<Route path='/paletteify/artist/:artistID'>
							<Menu/>
							<ArtistPage token={token} handleErrors={this.handleErrors}/>
							</Route>
						<Route path='/paletteify/playlist/:playlistID'>
							<Menu/>
							<DoPlaylistPage token={token} handleErrors={this.handleErrors}/>
							</Route>
						<Route path='/paletteify/search/:query'>
							<Menu/>
							<DoSearchResults token={token} handleErrors={this.handleErrors}/>
							</Route>
						<Route path='/paletteify/me'>
							<Menu/>
							<CurrentUserPage token={token} handleErrors={this.handleErrors}/>
							</Route>
						<Route path='/paletteify/callback'>
							<Redirect to='/paletteify/me'/>
							</Route>
						<Route path='/paletteify/'>
							<Redirector/>
							<LoginPage token={token}/>
							</Route>
							
					</Switch>
				</Router>
			</div>
		)
	}
}

export default App;