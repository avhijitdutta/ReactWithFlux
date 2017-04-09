"use strict";

var React = require('react');
var Router = require('react-router');
var Link = require('react-router').Link;
var courseStore = require('../../stores/courseStore');
var CourseActions = require('../../actions/courseActions');
var CourseList = require('./courseList');

var CoursePage = React.createClass({

	getInitialState: function() {

		return {
			courses: courseStore.getAllCourses()
		};

	},

	componentWillMount: function() {
		console.log(courseStore.getAllCourses());
		courseStore.addChangeListener(this._onChange);
	},

	//Clean up when this component is unmounted
	componentWillUnmount: function() {
		courseStore.removeChangeListener(this._onChange);
	},

	_onChange: function() {
		console.log(courseStore.getAllCourses());
		this.setState({ courses: courseStore.getAllCourses() });
	},

	render: function() {
		return (
			<div>
				<h1>Courses</h1>
				<Link to="addCourse" className="btn btn-default">Add Course</Link>
				<CourseList courses={this.state.courses} />
			</div>
		);
	}
});

module.exports = CoursePage;
