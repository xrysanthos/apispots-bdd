/*
 * Modules
 */
var expect = require('chai').expect;
var assert = require('chai').assert;
var Strings = require('strings.js');
var nconf = require('nconf');
var strformat = require('strformat');

module.exports = function() {

	var Given = When = Then = this.defineStep;

	/**
	 * And a request with body of type '$model'
	 */
	Given(/^request body$/, function (body, callback) {

		expect(body).not.to.be.null;

		// set the request body
		var op = this.Api.getCurrentOperation();
		op.request.body = body;

		callback();
	});

	/**
	 * ... request header '$header' equals '$value'
	 */
	Given(/^request header "([^"]*)" equals "([^"]*)"$/, function (header, value, callback) {
		// set the header
		var op = this.Api.getCurrentOperation();

		// replace any placeholders
		value = strformat(value, nconf.get());

		op.request.headers[header] = value;

		callback();
	});

	/**
	 * Sets the content type of the request
	 */
	Given(/^request type "([^"]*)"$/, function (type, callback) {

		// set the 'Content-Type' header
		var op = this.Api.getCurrentOperation();
		op.request.headers['Content-Type'] = type;

		callback();
	});

	/**
	 * Sets single path param value
	 */
	Given(/^request path param "([^"]*)" equals "([^"]*)"$/, function (param, value, callback) {

		var op = this.Api.getCurrentOperation();
		op.request.params.path[param] = value;

		callback();
	});

	/**
	 * Sets single query param value
	 */
	Given(/^request query param "([^"]*)" equals "([^"]*)"$/, function (param, value, callback) {

		var op = this.Api.getCurrentOperation();
		op.request.params.query[param] = value;

		callback();
	});

	/**
	 * ... request query params [table]
	 */
	Given(/^request query params$/, function (table, callback) {
		var op = this.Api.getCurrentOperation();

		/*
		 * go through the params / values
		 * from the table
		 */
		for (var idx in table.rows())
		{
			var row = table.rows()[idx];
			var param = row[0];
			var value = row[1];

			value = Strings.replace(value, '"', '');
			value = Strings.replace(value, "'", '');
			value = Strings.trim(value);

			// add the query param to the map
			op.request.params.query[param] = value;
		}

		callback();
	});

	/**
	 * ... request form params
	 * 			| param | name |
	 *      | one   | 1    |
	 *      ...
	 */
	Given(/^request form params$/, function (table, callback) {
		var op = this.Api.getCurrentOperation();

		/*
		 * go through the params / values
		 * from the table
		 */
		for (var idx in table.rows())
		{
			var row = table.rows()[idx];
			var param = row[0];
			var value = row[1];

			// add the query param to the map
			op.request.params.form[param] = value;
		}

		callback();
	});

	/**
	 * ... request timeout is "$timeoutInMillis"
	 */
	Given(/^request timeout is "([^"]*)"$/, function (timeout, callback) {

		var op = this.Api.getCurrentOperation();

		if (isNaN(timeout))
			return callback.fail("Time out should be a valid number in millis");

		op.request.timeout = Number(timeout);

		callback();
	});


	/**
	 * Executes a request for the current operation.
	 */
	When(/ executed$/, function(callback) {

		/*
		 * execute the operation and get the response
		 */
		var op = this.Api.getCurrentOperation();

		op.execute( function(err, response){

			// a response should be returned
			expect(op.response).not.to.be.null;

			callback();
		});

	});



};
