import React, {Component} from 'react';
import {Link} from 'react-router-dom';

class SearchBox extends Component {
	constructor(props) {
		super(props);
		this.queryChange = this.queryChange.bind(this);

		this.state = {
			query: ''
			};
	}

	queryChange(event) {
		this.setState({query: event.target.value});
	}
	
	render() {
		return (
			<div className='Search-box'>
				<label>
					<input type='text' placeholder='Search' value={this.state.query} onChange={this.queryChange}/>
				</label>
				<Link to={'/paletteify/search/' + this.state.query}>>></Link>
			</div>
		);
	}
}

export default SearchBox;