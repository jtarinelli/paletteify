import React, {Component} from 'react';
import {BrowserRouter as Router, Switch, Route, Link, Redirect, useParams, useLocation} from 'react-router-dom';

import './App.css';
import ArtistHeader from './components/ArtistHeader.js';
import ArtistBody from './components/ArtistBody.js';
import PlaylistPage from './components/PlaylistPage.js';
import CurrentUserPage from './components/CurrentUserPage.js';
import SearchBox from './components/SearchBox.js';
import SearchResults from './components/SearchResults.js';

var l = window.location;
const clientId = 'a4e61050459f4f3cbac28ccd3826f37a';
const redirectUri = l.protocol + '//' + l.hostname + (l.port ? ':' + l.port : '') + '/paletteify/callback';
var scopes = ['playlist-read-private', 'user-top-read'];

var hash = l.hash // idk what this even is, move it into somewhere?
	.substring(1)
	.split('&')
	.reduce(function(initial, item) {
		if (item) {
			var parts = item.split('=');
			initial[parts[0]] = decodeURIComponent(parts[1]);
		}
		return initial;
	}, {});

l.hash = '';

// menu on top of every page except login page
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

// shows login button, and profile link + search when logged in
function LoginPage(props) {
	return (
		<header className='App-header Loading Cover'>
		
			
			
			<div className='Login-menu'>
				<a href={`https://accounts.spotify.com/authorize?client_id=${clientId}&redirect_uri=${redirectUri}&response_type=token&scope=${scopes}`}>
					<h2 className='Login-button'>Login to Spotify</h2>
				</a>
				
				{props.token !== null && 
					<div className='Menu'>
						<Link to ='/paletteify/me'>My Profile</Link>
						<SearchBox/>
					</div>}	
			</div>
			
			<div className='App-description'>
				<h1 className='Bigboi'>Paletteify</h1>
				<p>Break down the color palettes <br/>of your favorite artists and playlists</p>
			</div>
				
		</header>
	)
}

// renders search results
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

// renders playlist page
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

// renders artist page
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

// custom hook to get search queries from url
function useQuery() {
  return new URLSearchParams(useLocation().search);
}

// handles fresh page loads for gitpages
// ex) redirect from paletteify.git.io/?p=/me to paletteify.git.io/me without 404 page
function Redirector() { 
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

// app itself, handles routing, errors, and api tokens
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