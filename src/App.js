import React, {Component} from 'react';
import {BrowserRouter as Router, Switch, Route, Link, useParams} from 'react-router-dom';

import './App.css';
import ArtistHeader from './components/ArtistHeader.js';
import ArtistBody from './components/ArtistBody.js';
import PlaylistPage from './components/PlaylistPage.js';
import CurrentUserPage from './components/CurrentUserPage.js';

const clientId = 'a4e61050459f4f3cbac28ccd3826f37a';
const redirectUri = 'http://localhost:3000/paletteify/';
//const redirectUri = 'https://jtarinelli.github.io/paletteify/';
var scopes = ['playlist-read-private'];

var hash = window.location.hash // idk what this even is, move it into somewhere
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

/* to do:
** figure out how to make redirecting to your profile page on login work (spotify redirect to redirect page that redirects to profile? lol)
** figure out what to do when token expires/check if token in local storage is expired 
** add no login option if you don't want to and figure out how to log out
** highlighted options change but actual selection doesn't when new playlist is loaded via search box
**** should seperate options from body so it doesn't reload a billion times everytime it updates
** dot size option (maybe also album image size?) 
** make menu collapsable
** multiple artists for playlist album
** fix id form so both pressing enter and the button works (or not cause it'll be a search eventually anyway >:))
** make toptracks work better with more than 2 columns
** maybe? change dropdown to actual html select element instead of all divs
** make numBins not a dropdown(prob form/textbox would be good? or actual dropdown w/ scrollbar)
** play snippets of top songs (might need to redo track component)
** load more albums button
** factor out makeResponse function if possible (make requestor obj/class that takes in string and holds just data/error info?)
** show better message on error 
**** it seems like when there's an error the api returns multiple objects, but idk how to get them
*/

class SearchBoxes extends Component {
	constructor(props) {
		super(props);

		this.artistChange = this.artistChange.bind(this);
		this.playlistChange = this.playlistChange.bind(this);

		this.state = {
			artistID: '',
			playlistID: '',
			};
	}

	artistChange(event) {
		this.setState({artistID: event.target.value});
	}
	
	playlistChange(event) {
		this.setState({playlistID: event.target.value});
	}
	
	render() {
		return (
			<div className='Search-boxes'>
				<label>
					Enter artist ID: <input type='text' value={this.state.artistID} onChange={this.artistChange}/>
				</label>
				<Link to={'/paletteify/artist/' + this.state.artistID}>>></Link>
				<label>
					Enter playlist ID: <input type='text' value={this.state.playlistID} onChange={this.playlistChange}/>
				</label>
				<Link to={'/paletteify/playlist/' + this.state.playlistID}>>></Link>
			</div>
		);
	}
}

class Menu extends Component {
	render() {
		return (
			<div className='Menu'>
				<Link to='/paletteify/'>Home</Link>
				<SearchBoxes/>
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
			<h2 className='Login-button'><a href={`https://accounts.spotify.com/authorize?client_id=${clientId}&redirect_uri=${redirectUri}&response_type=token&scope=${scopes}`}>Login to Spotify</a></h2>
			{props.token !== null && <div>
				<p><Link to='/paletteify/me'>My Profile</Link></p>
				<SearchBoxes/>
				</div>}
		</header>
	)
}

function DoPlaylistPage(props) {
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

class App extends Component {
	
	constructor(props) {
		super(props);
		const token = localStorage.getItem('token');
		
		this.state = ({
			token: token
		})
	}
	
	componentDidMount() {
		const token = hash.access_token;
		
		if (token) {
			this.setState({
				token: token
			});
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
						<Route path='/paletteify/me'>
							<Menu/>
							<CurrentUserPage token={token} handleErrors={this.handleErrors}/>
						</Route>
						<Route path='/paletteify/'>
							<LoginPage token={token}/> 
						</Route>
					</Switch>
				</Router>
			</div>
		)
	}
}

export default App;