import React, {Component} from 'react';
import './App.css';

import Header from './components/Header.js';
import AlbumsSingles from './components/AlbumsSingles.js';
import Colors from './components/Colors.js';
import Dropdown from './components/Dropdown.js';

const token = 'BQB6SJuYkfgaMiiY_TFMBZo6HvN5fCynWEASMa4vhLQtR_T6s9aNpJ-05pobze2YifC0518Nwa2Nw8TTJTYh2hUbFlsfUYmas8TqvMz_xd6cwQku--kgN2B4ECIb-eTUFXToMGgOcqeeFYdV';

const requestInfo = {
	artistID: '66CXWjxzNUsdJxJ2JdwvnR', //'4Kg3vBPMPfnYrnZo2A4czS'
	country: "US",
	headers: {'Authorization': 'Bearer '.concat(token)},
	handleErrors: handleErrors
}

/* to do:
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
		this.setState({
			numColors: num
		});
	}
	
	updateDisplay = (option) => {
		this.props.grabDisplay(option);
		this.setState({
			display: option
		});
	}
	
	render() {
		let numColorsOptions = [1,2,3,4,5,6,7];
		
		let displayLabels = ["Diagonal", "Vertical", "Target"];
		let displayParams = [0,1,2];
		
		let {numColors, display} = this.state;
		
		return (
			<div className="Options">
				<Dropdown title="#" labels={numColorsOptions} params={numColorsOptions} funct={this.updateNumColors} tooltip="Number of colors per album" className="h2-button" selected={numColors}/>
				<Dropdown title="//" labels={displayLabels} params={displayParams} funct={this.updateDisplay} tooltip="Album colors display style" className="h2-button" selected={display}/>
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
	
	return (
		<div className="App">
			<ArtistPage requestInfo={requestInfo}/>
		</div>
	);
}

export default App;