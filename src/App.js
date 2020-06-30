import React, {Component} from 'react';
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

class ArtistPage extends Component {
		
	constructor(props) {
		super(props)
		
		this.state = ({
			requestInfo: this.props.requestInfo
		})
	}
	
	grabArtistID = (id) => {
		console.log("AAA");
		this.setState({
			requestInfo: {
				artistID: id
			}
		});
	}
	
	render() {
		let {requestInfo} = this.state;
		
		return (
			<div>
				<Header requestInfo={requestInfo} grabArtistID={this.grabArtistID}/>
				<Body requestInfo={requestInfo}/>
			</div>
		)
	}
}

function App() {
	
	const requestInfo = {
		artistID: '4Kg3vBPMPfnYrnZo2A4czS', //'4Kg3vBPMPfnYrnZo2A4czS'
		country: "US",
		headers: {'Authorization': 'Bearer '.concat(token)},
		handleErrors: handleErrors
	}
	
	return (
		<div className="App">
			<ArtistPage requestInfo={requestInfo}/>
		</div>
	);
}

export default App;