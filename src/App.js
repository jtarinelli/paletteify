import React, {Component} from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useParams
} from "react-router-dom";

import './App.css';
import Header from './components/Header.js';
import Body from './components/Body.js';

const token = 'BQDDoAkSjUDfUuEfaZF-YEqveuZI5iXEOq2b1MvfTl0oOCkuPVONlTEuE53zahL8s7EKiiV23RzmxMYPg8oEmYZcv5ikZuHdrWQMeOLkp-mKflge9CuDIzMVLgbNiJnwe-GwfP_jAlKDR1RG';

/* to do:
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
** make pages with router (login page, search page, user?/artist/playlists pages with the id in the url)
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
		artistID: artistID, //'4Kg3vBPMPfnYrnZo2A4czS'
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

function App() {
		
	return (
		<div className="App">
			<Router>
				<ul>
					<li>
					<Link to="/netflix">Netflix</Link>
					</li>
					<li>
					<Link to="/4Kg3vBPMPfnYrnZo2A4czS">Shouta</Link>
					</li>
					<li>
					<Link to="1iR65pQAV4ssTTf9JRNr9X">Mamo</Link>
					</li>
				</ul>
				<Switch>
					<Route path="/:artistID" children={<ArtistPage/>} />
				</Switch>
			</Router>
		</div>
	);
}

export default App;