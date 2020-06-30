import React, {Component} from 'react';
import {BrowserRouter as Router, Switch, Route, Link, Redirect, useParams} from "react-router-dom";

import './App.css';
import Header from './components/Header.js';
import Body from './components/Body.js';

const token = 'BQB66hAHJwJtdD_-l5UeKFjOuSFFv2-xuI4VDdIfoTXF7zJ40hEY5eFJ8Aeg_KFdYW2JTJoGOJbTb0WtU1Qs5dLN0EdBLBjwxI6BxNyDCgRpCYCQmKtRr5DAz1jpa1EBAjSX7o-ATDptxxmz';

/* to do:
** make nice landing/search page and appearing menu bar
** fix id form so both pressing enter and the button works (or not cause it'll be a search eventually anyway >:))
** reduce repetition with update/grab functions for options
** make toptracks work better with more than 2 columns
** maybe? change dropdown to actual html select element instead of all divs
** make numBins not a dropdown(prob form/textbox would be good? or actual dropdown w/ scrollbar)
** play snippets of top songs (might need to redo track component)
** automatically get token (need to login??)
** load more albums button
** factor out makeResponse function if possible (binding? make a component? idk)
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
			<Header requestInfo={requestInfo}/>
			<Body requestInfo={requestInfo}/>
		</div>
	)
}

class ArtistIDForm extends Component {
	constructor(props) {
		super(props);

		this.handleChange = this.handleChange.bind(this);

		this.state = {
			value: '',
			visible: true
			};
	}

	handleChange(event) {
		this.setState({value: event.target.value});
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
						Enter artist ID: <input type="text" value={this.state.value} onChange={this.handleChange} />
					</label>
					<Link to={this.state.value} className="p-button">>></Link>
					<Link to="/artist/4Kg3vBPMPfnYrnZo2A4czS">Shouta</Link>
					<Link to="/artist/1iR65pQAV4ssTTf9JRNr9X">Mamo</Link>
					<Link to="/artist/1S2S00lgLYLGHWA44qGEUs">Gen</Link>
				</div>
				{/*<button onClick={this.toggleVisible} className="h2-button Menu-icon"><h2>UWU</h2></button>*/}
			</div>
		);
	}
}

function ErrorPage() {
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
			<ArtistIDForm/>
				<Switch>
					<Route path="/artist/:artistID" children={<ArtistPage/>}/>
					<Route path="/">
						<ErrorPage/>
					</Route>
				</Switch>
			</Router>
		</div>
	);
}

export default App;