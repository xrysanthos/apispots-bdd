/*
 * Modules
 */
var expect = require('chai').expect;
var assert = require('chai').assert;
var xmlToJs = require('xml2js').parseString;
var Strings = require('strings.js');


module.exports = function() {

	var Given = When = Then = this.defineStep;

	/**
	 * ... response type '$mimeType'
	 */
	Given(/^response type "([^"]*)"$/, function (type, callback) {

		// set the 'Accepts' header
		var op = this.Api.getCurrentOperation();
		op.request.headers['Accepts'] = type;
	});

	/**
	 * response code is '$code'
	 */
	Then(/^response code is "([^"]*)"$/, function (code, callback) {

		// get the current operation
		var op = this.Api.getCurrentOperation();

		expect(op.response).not.to.be.null;

		if ( isNaN( code ) )
			return callback(new Error('Response code should be a valid number'));

		expect(op.response.code).to.eq(Number(code));

		callback();
	});


	/**
	 * response status is '$status'
	 */
	Then(/^response status is "([^"]*)"$/, function (status, callback) {

		// get the current operation
		var op = this.Api.getCurrentOperation();
		expect(op.response).not.to.be.null;

		var statuses = ['info', 'ok', 'clientError', 'serverError', 'accepted', 'noContent', 'badRequest', 'unauthorized', 'notAcceptable', 'notFound', 'forbidden', 'error'];

		if (! isNaN( status ) )
			return callback(new Error('Response status should not be a number, but one of [' + statuses + ']'));

		if ( statuses.indexOf( status ) == -1 )
			return callback(new Error('Response status should be one of [' + statuses + ']'));

		try{
			expect(op.response[status]).to.be.true;
		}
		catch (e){

			var msg = "Server status was different than '" + status + "' [" + op.response.error + "]";

			return callback(new Error(msg));
		}

		callback();
	});

	/**
	 * ... response has time out error
	 */
	Then(/^response has time out error$/, function (callback) {
		var op = this.Api.getCurrentOperation();
		expect(op.response).not.to.be.null;

		if (! op.response.error)
			return callback(new Error('Response has no error codes'));

		expect(op.response.error).to.have.deep.property('code', 'ETIMEDOUT');

		callback();
	});


	/**
	 * ... response body has attributes [table]
	 */
	Then(/^response body has attributes$/, function (table, callback) {

		var op = this.Api.getCurrentOperation();
		expect(op.response).not.to.be.null;

		// get the response body
		var body = op.response.body;

		/*
		 * go through the attributes / values from the table
		 */
		for (var idx in table.rows())
		{
			var row = table.rows()[idx];
			var attribute = row[0];
			var value = row[1];

			if ( ( typeof value === 'undefined') || (Strings.empty(value)) )
				value = null;

			/*
			 * resolve type - default is string
			 */
			if (value)
			{
				if ( ! isNaN(value) )
  			{
  				// number
  				value = Number(value);
  			}
  			else if ( (value === 'true') || (value === 'false') )
  			{
  				// boolean
  				value = ( value === 'true' ? true : false );
  			}
				else {
					value = Strings.replace( value, '"', '');
	  			value = Strings.replace( value, "'", '');
				}

  			// assert that attribute has the given value
  			expect(body).to.have.deep.property(attribute, value);
			}
			else
			{
				// assert that attribute has the given value
  			expect(body).to.have.deep.property(attribute);
			}
		}

		callback();
	});

	/**
	 * ... response body as JSON
	 */
	Then(/^response body as JSON$/, function (callback) {
		try {

			var op = this.Api.getCurrentOperation();
			var body = op.response.body;

			expect(body).not.to.be.null;

			// check if the response body is already JSON
			try{
				var json = JSON.parse( body );
			}
			catch (e){
				/*
				 * convert the response body to JSON
				 */


			}

			callback();

		} catch (e) {
			console.error(e);
		}
	});


	/**
	 * ... response is printed
	 */
	Then(/^response body is printed$/, function (callback) {
		try {

			var op = this.Api.getCurrentOperation();
			var body = op.response.body;

			expect(body).not.to.be.null;

			console.log(body);

			callback();

		} catch (e) {
			console.error(e);
		}
	});

};
