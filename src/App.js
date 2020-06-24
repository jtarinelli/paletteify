import React, {Component} from 'react';
import './App.css';

import Header from './components/Header.js';
import AlbumsSingles from './components/AlbumsSingles.js';
import Colors from './components/Colors.js';
import Dropdown from './components/Dropdown.js';

//const chroma = require('chroma-js');

const artistID = '4Kg3vBPMPfnYrnZo2A4czS'; //'4Kg3vBPMPfnYrnZo2A4czS';
const token = 'BQBNOfNuXpZKmLAkjfuY_tqTeRH6yFfItc-sQFuEOPUZlyl88avglGCo_xU2YA3l4fjfoVbLZntZAz843V5MMA0T5oyffh41POlzlTojXyqo7Kh-2xL4VP6ySXJ4P5CLRgRa6xxB9muwB_BW';
const country = "US";
const headers = { 'Authorization': 'Bearer '.concat(token) }

/* to do:
** make all options changable from site/ui
** make dropdown prettier/put it somewhere better, would like it to open horizontally
** find a better way to pass global variables around to all the components
** store colors along with albums (just name or include other info/whole object??)
** play snippets of top songs
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

class Options extends Component {
	
	constructor(props) {
		super(props);
		this.state = ({
			numColors: 5,
			display: 0
		})
	}
	
	toggleVisible = () => {
		this.setState(prevState => ({
			visible: !prevState.visible
		}));
	}
	
	updateNumColors = (num) => {
		this.props.grabNumColors(num);
	}
	
	updateDisplay = (option) => {
		this.props.grabDisplay(option);
	}
	
	render() {
		let colorLabels = [1,2,3,4,5,6,7];
		let colorParams = [1,2,3,4,5,6,7];
		
		let displayLabels = ["Vertical", "Diagonal", "Target"];
		let displayParams = [0,1,2];
		
		return (
			<div className="Options">
				<Dropdown title="#" labels={colorLabels} params={colorParams} funct={this.updateNumColors} tooltip="Number of colors"/>
				<Dropdown title="//" labels={displayLabels} params={displayParams} funct={this.updateDisplay} tooltip="Colors display mode"/>
			</div>
		)
		
	}
	
}

class Body extends Component {
	
	constructor(props) {
		super(props);
		this.state = ({
			colors: null,
			numColors: 5,
			colorOptions: {count: 5},
			display: 0
		})
	}
	
	grabColors = (allColors) => {
		this.setState({
			colors: allColors
		})
	}
	
	grabNumColors = (num) => {
		this.setState({
			numColors: num,
			colorOptions: {count: num}
		})
	}
	
	grabDisplay = (option) => {
		this.setState({
			display: option
		})
	}
	
	render() {
		let allColors = this.state.colors;
		const {artistID, country, headers, handleErrors} = this.props;
		let {numColors, colorOptions, display} = this.state;
	
		return (
			<div className="Body">
				<Options grabNumColors={this.grabNumColors} grabDisplay={this.grabDisplay}/>
				<AlbumsSingles grabColors={this.grabColors} artistID={artistID} country={country} headers={headers} handleErrors={handleErrors} colorOptions={colorOptions} numColors={numColors} display={display}/>
				<Colors colors={allColors}/>
			</div>
		)
			
	}
}

function App() {
	return (
		<div className="App">
			<Header artistID={artistID} country={country} headers={headers} handleErrors={handleErrors} colorOptions={{count: 5}}/>
			<Body artistID={artistID} country={country} headers={headers} handleErrors={handleErrors}/>
		</div>
	);
}

export default App;