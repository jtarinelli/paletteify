import React, {Component} from 'react';

class Track extends Component {
	
	render () {
		
		const{name, url} = this.props
		
		return (
		<div className="Track">
			<a href = {url}>
				<p>{name}</p>
			</a>
		</div>
		)
	}
}

export default Track;