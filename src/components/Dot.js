import React, {Component} from 'react';

class Dot extends Component {
	
	render() {
		const {bgColor} = this.props;
		
		return (
			<div className="Dot" style={{"backgroundColor": bgColor}}></div>
		)
	}
	
}

export default Dot;