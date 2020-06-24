import React, {Component} from 'react';
import './App.css';

import Header from './components/Header.js';
import AlbumsSingles from './components/AlbumsSingles.js';
import Colors from './components/Colors.js';

//const chroma = require('chroma-js');

const artistID = '1S2S00lgLYLGHWA44qGEUs'; //'4Kg3vBPMPfnYrnZo2A4czS';
const token = 'BQB-kzGF_lwnNB-x1qcyMcO6EScaeaKjkKvPpa3YUAAII5A6N3aFvh498husah9qi_DdpSoDI2mWjooWF2CfQa0b4ubG-22xK4VM64OlXB6WDVDNm63hi7qV-8L3J_HrK7XCRc9B2ttGgpWR';
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

class Dropdown extends Component {
	
	constructor(props) {
		super(props);
		
		this.state = {
			visible: false
		}
	}
	
	toggleVisible = () => {
		this.setState(prevState => ({
			visible: !prevState.visible
		}));
	}
	
	render() {
		let {visible} = this.state;
		const {title, labels, params, funct} = this.props;
		
		return (
			<div className="Dropdown">
				<button className="h2-button" onClick={this.toggleVisible}>{title}</button>
				<ul className={"Dropdown-content " + (visible ? 'visible' : 'hidden')}>
					{labels.map((label, i) => (
						<li key={i}><button className="Dropdown-option" onClick={() => funct(params[i])}>{label}</button></li>
					))}
				</ul>
			</div>
		)
	}
	
}

class Options extends Component {
	
	constructor(props) {
		super(props);
		
		this.updateNumColors = this.updateNumColors.bind(this);
		
		this.state = {
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
		let labels = ["One","Three","Five"];
		let params = [1,3,5];
		
		return (
			<Dropdown title="Number of Colors" labels={labels} params={params} funct={this.updateNumColors}/>
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
				<Options grabNumColors={this.grabNumColors}/>
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