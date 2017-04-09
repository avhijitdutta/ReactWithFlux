"use strict";

var Dispatcher = require('../dispatcher/appDispatcher');
var courseApi = require('../api/courseApi');
var ActionTypes = require('../constants/actionTypes');

var CourseActions = {
	createCourse: function(course) {
		var newCourse = courseApi.saveCourse(course);
		//Hey dispatcher, go tell all the stores that an course was just created.
		Dispatcher.dispatch({
			actionType: ActionTypes.CREATE_COURSE,
			course: newCourse
		});
	},

	updateCourse: function(course) {
		var updatedCourse = courseApi.saveCourse(course);

		Dispatcher.dispatch({
			actionType: ActionTypes.UPDATE_COURSE,
			course: updatedCourse
		});
	},

	deleteCourse: function(id) {
		courseApi.deleteCourse(id);

		Dispatcher.dispatch({
			actionType: ActionTypes.DELETE_COURSE,
			id: id
		});
	}
};

module.exports = CourseActions;
