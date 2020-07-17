import React, {Component} from 'react';
import {Link, Redirect} from 'react-router-dom';

class SearchBox extends Component {
	constructor(props) {
		super(props);
		this.queryChange = this.queryChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);

		this.state = {
			query: '',
			redirect: false
			};
	}
	
	handleSubmit(event) {
		this.setState({
			redirect: true
		})
		event.preventDefault();
	}

	queryChange(event) {
		this.setState({query: event.target.value});
		if (this.state.redirect) {
			this.setState({
				redirect: false
			})
		}
	}
	
	render() {
		return (
			<div className='Search-box'>
				{this.state.redirect && <Redirect to={'/paletteify/search/' + this.state.query}/>}
				<form onSubmit={this.handleSubmit}>
					<label>
						<input type='text' placeholder='Search' value={this.state.query} onChange={this.queryChange}/>
					</label>
					<Link to={'/paletteify/search/' + this.state.query}>>></Link>
				</form>
			</div>
		);
	}
}

export default SearchBox;