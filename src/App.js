import React, {Component} from 'react';
import {BrowserRouter as Router, Switch, Route, Link, useParams} from "react-router-dom";

import './App.css';
import ArtistHeader from './components/ArtistHeader.js';
import ArtistBody from './components/ArtistBody.js';
import PlaylistPage from './components/PlaylistPage.js';
import CurrentUserPage from './components/CurrentUserPage.js';

export const authEndpoint = 'https://accounts.spotify.com/authorize'; // not used currently
const clientId = "a4e61050459f4f3cbac28ccd3826f37a";
const redirectUri = "http://localhost:3000/me";
const scopes = ["playlist-read-private"];

const hash = window.location.hash // idk what this even is
	.substring(1)
	.split("&")
	.reduce(function(initial, item) {
	if (item) {
		var parts = item.split("=");
		initial[parts[0]] = decodeURIComponent(parts[1]);
	}
	return initial;
	}, {});

window.location.hash = "";

/* to do:
** figure out what to do when token expires
** make it so you dont constantly have 2 login/re log in every time i save this file (might be fixed?)
** add no login option if you don't want to
** highlight options change but actual selection doesn't when new playlist is loaded via search box
**** should seperate options from body so it doesn't reload a billion times everytime it updates
** dot size option (maybe also album image size?)
** make nice landing/search page and appearing menu bar (make menu its own thing)
** multiple artists for playlist album
** fix id form so both pressing enter and the button works (or not cause it'll be a search eventually anyway >:))
** reduce repetition with update/grab functions for options
** make toptracks work better with more than 2 columns
** maybe? change dropdown to actual html select element instead of all divs
** make numBins not a dropdown(prob form/textbox would be good? or actual dropdown w/ scrollbar)
** play snippets of top songs (might need to redo track component)
** automatically get token (need to login??)
** load more albums button
** factor out makeResponse function if possible (add root variable i think)
** show better message on error 
**** it seems like when there's an error the api returns multiple objects, but idk how to get them
*/

function handleErrors(response) {
	// idk if this should be a method or not? where do i put this
    if (!response.ok) {
        throw Error(response.status);
    }
    return response;
}

class SearchBoxes extends Component {
	constructor(props) {
		super(props);

		this.artistChange = this.artistChange.bind(this);
		this.playlistChange = this.playlistChange.bind(this);

		this.state = {
			artistID: '4Kg3vBPMPfnYrnZo2A4czS',
			playlistID: '23DwRYO7j6CdIZ3flegkTq',
			visible: true
			};
	}

	artistChange(event) {
		this.setState({artistID: event.target.value});
	}
	
	playlistChange(event) {
		this.setState({playlistID: event.target.value});
	}
	
	toggleVisible = () => {
		this.setState(prevState => ({
			visible: !prevState.visible
		}));
	}
	
	render() {
		const {visible} = this.state;
		
		return (
			<div>
				<div className= {"Menu " + (visible ? 'visible' : 'hidden')}>
					<label>
						Enter artist ID: <input type="text" value={this.state.artistID} onChange={this.artistChange}/>
					</label>
					<Link to={"/artist/" + this.state.artistID}>>></Link>
					<label>
						Enter playlist ID: <input type="text" value={this.state.playlistID} onChange={this.playlistChange}/>
					</label>
					<Link to={"/playlist/" + this.state.playlistID}>>></Link>
				</div>
				{/*<button onClick={this.toggleVisible} className="h2-button Menu-icon"><h2>UWU</h2></button>*/}
			</div>
		);
	}
}

function Menu() {
	// add logout button on end (profile/logout right aligned)
	return (
		<div className="Menu">
			<Link to="/">Home</Link>
			<SearchBoxes/>
			<Link to ="/me">My Profile</Link>
		</div>
	)
}

function LoginPage(props) {
	return (
		<header className="App-header Loading Cover">
			<h1 className="Bigboi">Paletteify</h1>
			<h2 className="Login-button"><a href={`https://accounts.spotify.com/authorize?client_id=${clientId}&redirect_uri=${redirectUri}&response_type=token&scope=${scopes}`}>Login to Spotify</a></h2>
			{props.token !== 'undefined' && <SearchBoxes/>}
		</header>
	)
}

function DoPlaylistPage(props) {
	let {playlistID} = useParams();
	let requestInfo = {
		playlistID: playlistID,
		country: "US",
		headers: {'Authorization': 'Bearer '.concat(props.token)},
		handleErrors: handleErrors
	}
		
	return (
		<div>
			<PlaylistPage requestInfo={requestInfo}/>
		</div>
	)
}

function ArtistPage(props) {
	let {artistID} = useParams();
	let requestInfo = {
		artistID: artistID,
		country: "US",
		headers: {'Authorization': 'Bearer '.concat(props.token)},
		handleErrors: handleErrors
	}
		
	return (
		<div>
			<ArtistHeader requestInfo={requestInfo}/>
			<ArtistBody requestInfo={requestInfo}/>
		</div>
	)
}

function ErrorPage() {
	// not currently used
	return (
		<header className="App-header Loading">
			<h1>There's nothing here broseph</h1>
			<p>Link back to search page here (but not yet XD)</p>
		</header>
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
		let token = hash.access_token;
		
		if (token) {
			this.setState({
				token: token
			});
			localStorage.setItem('token', token);
		}
	}
		
	render() {
		let {token} = this.state;
		
		return (
			<div className="App">
				<Router>
					<Switch>
						<Route path="/artist/:artistID">
							<Menu/>
							<ArtistPage token={token}/>
						</Route>
						<Route path="/playlist/:playlistID">
							<Menu/>
							<DoPlaylistPage token={token}/>
						</Route>
						<Route path="/me">
							<Menu/>
							<CurrentUserPage token={token}/>
						</Route>
						<Route path="/">
							<LoginPage token={token} handleErrors={handleErrors}/> 
						</Route>
					</Switch>
				</Router>
			</div>
		)
	}
}

export default App;