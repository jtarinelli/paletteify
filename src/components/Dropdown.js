import React, {Component} from 'react';

class Dropdown extends Component {
	
	constructor(props) {
		super(props);
		
		this.state = {visible: false || this.props.alwaysOpen}
	}
	
	toggleVisible = () => {
		if (!this.props.alwaysOpen) {
			this.setState(prevState => ({
				visible: !prevState.visible
			}));
		}
	}
	
	render() {
		const {visible} = this.state;
		const {title, labels, params, funct, tooltip, className, alwaysOpen, selected} = this.props;
		
		return (
			<div className='Dropdown' onMouseEnter={this.toggleVisible} onMouseLeave={this.toggleVisible}>
			
			{alwaysOpen ? <p><b>{title}</b></p> : <div className={className}  title={tooltip}>{title}</div>}
			
				<ul className={'Dropdown-content ' + (visible ? 'visible' : 'hidden')}>
					
					{labels.map((label, i) => (
						<li key={i}>
							<button 
							className={selected===params[i] ? 'Dropdown-option Selected' : 'Dropdown-option'} 
							onClick={() => funct(params[i])}>{label}</button>
						</li>
					))}
					
				</ul>
			</div>
		)
	}
	
}

export default Dropdown;