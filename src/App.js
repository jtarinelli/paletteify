import React, {Component} from 'react';
import './App.css';

import Header from './components/Header.js';
import AlbumsSingles from './components/AlbumsSingles.js';
import Colors from './components/Colors.js';

//const chroma = require('chroma-js');

const artistID = '4Kg3vBPMPfnYrnZo2A4czS'; //'4Kg3vBPMPfnYrnZo2A4czS';
const token = 'BQCnS1wFdNOIPNibqCyzs2j8WkMf3FHuKA59PKScBpG_yBszLf1KmtovPVypNuRBW3AdDZC1XlNHLyGWU4qzHSJv1Vclctge5oxvkdBn-Aq5hvj-K8zSv2s0tmU3VLBhf_5OQeSEmVXLuuCg';
const country = "US";
const headers = { 'Authorization': 'Bearer '.concat(token) }
/*
const numColors = 7; //for whatever reason 8 returns an array of seven and 
					 //anything above that returns an array 1 smaller than specified here
const colorOptions = {count: numColors};
*/

/* to do:
** make options changable from site/ui
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

class ColorOptions extends Component {
	
	constructor(props) {
		super(props);
		
		this.state = {
			visible: false,
			numColors: 1
		}
	}
	
	toggleVisible = () => {
		this.setState(prevState => ({
			visible: !prevState.visible
		}));
	}
	
	updateNumColors = (num) => {
		this.setState({
			numColors: num
		})
		this.props.grabNumColors(num);
	}
	
	render() {
		let {visible} = this.state;
		
		return (
			<div className="Dropdown">
				<button className="h2-button" onClick={this.toggleVisible}>Number of Colors</button>
				<ul className={"Dropdown-content " + (visible ? 'visible' : 'hidden')}>
					<li><button className="Dropdown-option" onClick={() => this.updateNumColors(1)}>One</button></li>
					<li><button className="Dropdown-option" onClick={() => this.updateNumColors(3)}>Three</button></li>
					<li><button className="Dropdown-option" onClick={() => this.updateNumColors(5)}>Five</button></li>
				</ul>
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
			colorOptions: {count: 5}
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
	
	render() {
		let allColors = this.state.colors;
		const {artistID, country, headers, handleErrors} = this.props;
		let {numColors, colorOptions} = this.state;
	
		return (
			<div className="Body">
				<ColorOptions grabNumColors={this.grabNumColors}/>
				<AlbumsSingles grabColors={this.grabColors} artistID={artistID} country={country} headers={headers} handleErrors={handleErrors} colorOptions={colorOptions} numColors={numColors}/>
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