import React, {Component} from 'react';

class Slider extends Component {
	
	constructor(props) {
		super(props);
		this.valueChange = this.valueChange.bind(this);
		
		this.state = {value: this.props.selected};
	}
	
	valueChange(event) {
		const newValue = event.target.value;
		this.setState({value: newValue});
		this.props.funct(newValue);
	}
	
	render() {
		let {value} = this.state;
		const {title, min, max} = this.props;
		
		return (
			<div className='Slider'>
				<p>
					{title}
					<input type='range' min={min} max={max} value={value} onChange={this.valueChange}/>
					{value}
				</p>
			</div>
		)
		
	}
}

export default Slider;