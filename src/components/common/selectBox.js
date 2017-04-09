"use strict";

var React = require('react');

var SelectBox = React.createClass({
  propTypes: {
    name: React.PropTypes.string.isRequired,
    label: React.PropTypes.string.isRequired,
    onChange: React.PropTypes.func.isRequired,
    placeholder: React.PropTypes.string,
    values: React.PropTypes.array.isRequired,
    value: React.PropTypes.object,
    error: React.PropTypes.string
  },
   render: function () {

    var createOptions = function(option){

      return (
        <option value={option.value} key={option.value} label={option.label} > {option.label}</option>
      );
    };

    var wrapperClass = 'form-group';
    if (this.props.error && this.props.error.length > 0) {
      wrapperClass += " " + 'has-error';
    }
    return (
      <div className={wrapperClass}>
        <label htmlFor={this.props.name}>{this.props.label}</label>

          <select value={this.props.value.id} className="form-control" name={this.props.name} ref={this.props.name} onChange={this.props.onChange}>
            {this.props.values.map(createOptions, this)}
         </select>
      </div>
    );
  }
});

module.exports = SelectBox;
