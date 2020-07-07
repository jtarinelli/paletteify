import React, {Component} from 'react';
import Dropdown from './Dropdown.js';

class AlbumOptions extends Component {
	
	constructor(props) {
		super(props);
		this.state = ({
			numColors: 5,
			display: 0,
			onHover: "Disappears"
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
	
	updateOnHover = (option) => {
		this.props.grabOnHover(option);
		this.setState({
			onHover: option
		});
	}
	/*
	componentDidUpdate(prevProps, prevState) {
		if (prevProps !== this.props) {
			console.log("props");
			console.log(this.props);
		}
		if (prevState !== this.state) {
			console.log("state");
		}
	}
	*/
	render() {
		let numColorsOptions = [1,2,3,4,5,6,7];
		
		let displayLabels = ["Diagonal", "Vertical", "Target"];
		let displayParams = [0,1,2];
		
		let onHoverLabels = ["Album Art", "Color Palette"];
		let onHoverParams = ["Disappears", "Appears"];
		
		let {numColors, display, onHover} = this.state;
		
		return (
			<div className="Options">
				<Dropdown title="#" labels={numColorsOptions} params={numColorsOptions} funct={this.updateNumColors} tooltip="Number of colors per album" className="h2-button" selected={numColors}/>
				<Dropdown title="☐" labels={onHoverLabels} params={onHoverParams} funct={this.updateOnHover} tooltip="Display by default" className="h2-button" selected={onHover}/>
				<Dropdown title="//" labels={displayLabels} params={displayParams} funct={this.updateDisplay} tooltip="Album colors display style" className="h2-button" selected={display}/>
			</div>
		)
		
	}
	
}

export default AlbumOptions;