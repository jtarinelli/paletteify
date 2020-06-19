import React, {Component} from 'react';
import './App.css';

import Header from './components/Header.js';
import AlbumsSingles from './components/AlbumsSingles.js';
import Colors from './components/Colors.js';

//const chroma = require('chroma-js');

const artistID = '4Kg3vBPMPfnYrnZo2A4czS'; //'4Kg3vBPMPfnYrnZo2A4czS';
const token = 'BQAvrumLCyU2JKp3V9HhORRkbozJHUZnf_CPt2GdeAINLCJ2HEekWSIds520TEbHeyrAnN2YuS7IFlJtL9-F_Ts-BZCdwzDhmZEvUbqeizVJtkOdxMTQ9lL1R2zx1d50-zlAcF8YrUyYoNxI';
const country = "JP";
const headers = { 'Authorization': 'Bearer '.concat(token) }
const numColors = 1; //for whatever reason 8 returns an array of seven and 
					 //anything above that returns an array 1 smaller than specified here
const colorOptions = {count: numColors};

/* to do:
** maybe get rid of track and album components and do same thing in toptracks/albumsection
** find a better way to pass global variables around to all the components
** figure out why i can't initialize some album sections to be open and other closed
** store colors along with albums (just name or include other info/whole object??)
** play snippets of top songs
** add all 5(?) colors on hover
** automatically get token (need to login??)
** load more albums button
** fix top tracks for long song titles
** factor out makeResponse function if possible (binding? make a component? idk)
** show error code/status message on error (go on api page and figure out how to get the messages)
** make pages with router (login page, search page, user?/artist/playlists pages with the id in the url)
*/

function handleErrors(response) {
	// idk if this should be a method or not? where do i put this
    if (!response.ok) {
        throw Error(response);
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