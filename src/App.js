import React, {Component} from 'react';
import './App.css';

import Header from './components/Header.js';
import AlbumsSingles from './components/AlbumsSingles.js';
import Colors from './components/Colors.js';
import Dropdown from './components/Dropdown.js';

//const chroma = require('chroma-js');
const token = 'BQARX0r5e6kilHq1VkoQlQ3klhgQrsOaq2vAfuHKT6ZUmETXr2cQ4BVBgBAeBTl2njzuJjivB0rFeNmgZjqjvFikEv2lQFV77iUpJXIVImnb_SMo6RwVgrk9F6LG39hB7ap1vw4UaKpXHPXY';

const requestInfo = {
	artistID: '1iR65pQAV4ssTTf9JRNr9X',
	country: "US",
	headers: {'Authorization': 'Bearer '.concat(token)},
	handleErrors: handleErrors
}

/* to do:
** stop colors from accumulating and reset everytime num of colors is changed
** make dropdown prettier, would like it to open on hover and not change size on open
** store colors along with albums (just name or include other info/whole object??)
** play snippets of top songs (might need to redo track component)
** automatically get token (need to login??)
** load more albums button
** fix top tracks for long song titles/in general
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

class AlbumOptions extends Component {
	
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
				<Dropdown title="#" labels={colorLabels} params={colorParams} funct={this.updateNumColors} tooltip="Number of colors per album"/>
				<Dropdown title="//" labels={displayLabels} params={displayParams} funct={this.updateDisplay} tooltip="Album colors display style"/>
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
			numColors: num
		})
	}
	
	grabDisplay = (option) => {
		this.setState({
			display: option
		})
	}
	
	render() {
		let allColors = this.state.colors;
		const {requestInfo} = this.props;
		let {numColors, display} = this.state;
	
		return (
			<div className="Body">
				<AlbumOptions grabNumColors={this.grabNumColors} grabDisplay={this.grabDisplay}/>
				<AlbumsSingles grabColors={this.grabColors} requestInfo={requestInfo} numColors={numColors} display={display}/>
				<Colors colors={allColors}/>
			</div>
		)
			
	}
}

function App() {
	return (
		<div className="App">
			<Header requestInfo={requestInfo}/>
			<Body requestInfo={requestInfo}/>
		</div>
	);
}

export default App;