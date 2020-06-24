import React, {Component} from 'react';

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
		const {title, labels, params, funct, tooltip} = this.props;
		
		return (
			<div className="Dropdown">
				<button className="h2-button" onClick={this.toggleVisible} title={tooltip}>{title}</button>
				<ul className={"Dropdown-content " + (visible ? 'visible' : 'hidden')}>
					{labels.map((label, i) => (
						<li key={i}><button className="Dropdown-option" onClick={() => funct(params[i])}>{label}</button></li>
					))}
				</ul>
			</div>
		)
	}
	
}

export default Dropdown;