import React, {Component} from 'react';
import './App.css';

import Header from './components/Header.js';
import AlbumsSingles from './components/AlbumsSingles.js';
import Colors from './components/Colors.js';

//const chroma = require('chroma-js');

const artistID = '1iR65pQAV4ssTTf9JRNr9Z'; //'4Kg3vBPMPfnYrnZo2A4czS';
const token = 'BQD1HICUV8sj4t0hTIATa0dY3vkUHVzGYG4x2CU4zf2JIL4G3hao3KLs2pWKtg16R9KnFbmqfASs3UAB8zxxGZQi6SbOX5in_XpjaLwPBsIseMdusZEDG6WJ4FduvNmYbFt_Z5IT6JT7SAee';
const country = "US";
const headers = { 'Authorization': 'Bearer '.concat(token) }
const numColors = 5; //for whatever reason 8 returns an array of seven and 
					 //anything above that returns an array 1 smaller than specified here
const colorOptions = {count: numColors};

/* to do:
** maybe get rid of track and album components and do same thing in toptracks/albumsection
** find a better way to pass global variables around to all the components
** store colors along with albums (just name or include other info/whole object??)
** play snippets of top songs
** add all 5(?) colors on hover
** automatically get token (need to login??)
** load more albums button
** fix top tracks for long song titles/in general
** factor out makeResponse function if possible (binding? make a component? idk)
** show error code/status message on error 
**** it seems like when there's an error the api returns multiple objects, idk how to get them
** make pages with router (login page, search page, user?/artist/playlists pages with the id in the url)
*/

function handleErrors(response) {
	// idk if this should be a method or not? where do i put this
    if (!response.ok) {
        throw Error(response.status);
    }
    return response;
}

class Body extends Component {
	
	constructor(props) {
		super(props);
		this.state = ({
			colors: null
		})
	}
	
	grabColors = (allColors) => {
		this.setState({
			colors: allColors
		})
	}
	
	render() {
		let allColors = this.state.colors;
		const {artistID, country, headers, handleErrors, colorOptions} = this.props;
	
		return (
			<div className="Body">
				<AlbumsSingles grabColors={this.grabColors} artistID={artistID} country={country} headers={headers} handleErrors={handleErrors} colorOptions={colorOptions} numColors={numColors}/>
				<Colors colors={allColors}/>
			</div>
		)
			
	}
}

function App() {
	return (
		<div className="App">
			<Header artistID={artistID} country={country} headers={headers} handleErrors={handleErrors} colorOptions={colorOptions}/>
			<Body artistID={artistID} country={country} headers={headers} handleErrors={handleErrors} colorOptions={colorOptions}/>
		</div>
	);
}

export default App;