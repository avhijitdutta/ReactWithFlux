"use strict";

var React = require('react');
var Input = require('../common/textInput');
var SelectBox = require('../common/selectBox');

var AuthorForm = React.createClass({
	propTypes: {
		course:	React.PropTypes.object.isRequired,
		onSave:	React.PropTypes.func.isRequired,
		onChange: React.PropTypes.func.isRequired,
		errors: React.PropTypes.object,
		authorList: React.PropTypes.array
	},

	render: function() {
		return (
			<form>
				<h1>Manage Courses</h1>
				<Input
					name="title"
					label="Title"
					value={this.props.course.title}
					onChange={this.props.onChange}
					error={this.props.errors.title} />

				<Input
					name="length"
					label="Length"
					value={this.props.course.length}
					onChange={this.props.onChange}
					error={this.props.errors.length} />

					<Input
						name="category"
						label="Category"
						value={this.props.course.category}
						onChange={this.props.onChange}
						error={this.props.errors.length} />

				<SelectBox
						name="author"
						label="Authors"
						values={this.props.authorList}
						value={this.props.course.author}
						onChange={this.props.onChange}
						error ={this.props.errors.legths}/>
				<input type="submit" value="Save" className="btn btn-default" onClick={this.props.onSave} />
			</form>
		);
	}
});

module.exports = AuthorForm;
