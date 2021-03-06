"use strict";
var React = require('react');
var Router = require('react-router');
var CourseForm = require('./courseForm');
var CourseActions = require('../../actions/courseActions');
var CourseStore = require('../../stores/courseStore');
var AuthorStore = require('../../stores/authorStore');
var toastr = require('toastr');

var ManageCoursePage = React.createClass({
	mixins: [
		Router.Navigation
	],

	statics: {
		willTransitionFrom: function(transition, component) {
			if (component.state.dirty && !confirm('Leave without saving?')) {
				transition.abort();
			}
		}
	},

	getInitialState: function() {
		return {
			course: { id: '', author: {}, category: '', length: '', title: '' },
			errors: {},
			dirty: false
		};
	},

	componentWillMount: function() {
		var courseId = this.props.params.id; //from the path '/course:id'
		if (courseId) {
			this.setState({course: CourseStore.getCourseById(courseId) });
		}
	},

	setCourseState: function(event) {
		this.setState({dirty: true});
		var field = event.target.name;
		var value = event.target.value;

		if(field === 'author'){
			var index = event.nativeEvent.target.selectedIndex;
			var text = event.nativeEvent.target[index].text;
			this.state.course[field] = {id: value, name: text};
		}else {
			this.state.course[field] = value;
		}

		return this.setState({course: this.state.course});
	},

	courseFormIsValid: function() {
		var formIsValid = true;
		this.state.errors = {}; //clear any previous errors.

		if (this.state.course.title.length < 3) {
			this.state.errors.title = 'Title is required.';
			formIsValid = false;
		}

		if (this.state.course.length.length === "") {
			this.state.errors.length = 'Length is required.';
			formIsValid = false;
		}

		if (this.state.course.category.length === "") {
			this.state.errors.category = 'Category should not be empty.';
			formIsValid = false;
		}

		this.setState({errors: this.state.errors});
		return formIsValid;
	},

	saveCourse: function(event) {
		event.preventDefault();
		console.log(this.state.course);
		if (!this.courseFormIsValid()) {
			return;
		}

		if (this.state.course.id) {
			CourseActions.updateCourse(this.state.course);
		} else {
			CourseActions.createCourse(this.state.course);
		}

		this.setState({dirty: false});
		toastr.success('Course saved.');
		this.transitionTo('courses');
	},
	formatAuthorList: function(){
		var listOfAuthor = [];
		var rawAuthorList = AuthorStore.getAllAuthors();

		for( var i = 0; i < rawAuthorList.length; i++ ){
			var tempObj = {label: rawAuthorList[i].firstName + " " + rawAuthorList[i].lastName, value: rawAuthorList[i].id};
			listOfAuthor.push(tempObj);
		}

		return listOfAuthor;

	},
	render: function() {
		return (
			<CourseForm
				course={this.state.course}
				onChange={this.setCourseState}
				onSave={this.saveCourse}
				errors={this.state.errors}
				authorList={this.formatAuthorList()}
				/>
		);
	}
});

module.exports = ManageCoursePage;
