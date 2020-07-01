import React, {Component} from 'react';
import {BrowserRouter as Router, Switch, Route, Link, useParams} from "react-router-dom";

import './App.css';
import ArtistHeader from './components/ArtistHeader.js';
import ArtistBody from './components/ArtistBody.js';
import PlaylistPage from './components/PlaylistPage.js';

const token = 'BQCUL8BfS6neRdk3vuCwRHXBiiupX1-SUqYmcdvLoEPL5IzccEzvIIlGo05HfssTsrAQ9Vfq2W3c8szKx7f8ph8MvId6WKnKPpCMBn9wyFi4lXbiklDqJ8ii96UYKd2ku15KKyHJL4uGdigy';

/* to do:
** make stuff more reusable
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

function SearchPage() {
	return (
		<header className="App-header Loading">
			<h1 className="Bigboi">Paletteify</h1>
			<SearchBoxes/>
		</header>
	)
}

function DoPlaylistPage() {
	let {playlistID} = useParams();
	let requestInfo = {
		playlistID: playlistID,
		country: "US",
		headers: {'Authorization': 'Bearer '.concat(token)},
		handleErrors: handleErrors
	}
		
	return (
		<div>
			<PlaylistPage requestInfo={requestInfo}/>
		</div>
	)
}

function ArtistPage() {
	let {artistID} = useParams();
	let requestInfo = {
		artistID: artistID,
		country: "US",
		headers: {'Authorization': 'Bearer '.concat(token)},
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

function App() {
		
	return (
		<div className="App">
			<Router>
				<Switch>
					<Route path="/artist/:artistID">
					{/*<Link to="/">Home</Link>*/}
						<SearchBoxes/>
						<ArtistPage/>
					</Route>
					<Route path="/playlist/:playlistID">
						<Link to="/">Home</Link>
						<SearchBoxes/>
						<DoPlaylistPage/>
					</Route>
					<Route path="/">
						<SearchPage/>
					</Route>
				</Switch>
			</Router>
		</div>
	);
}

export default App;