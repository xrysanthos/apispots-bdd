/**
 * Swagger definition parser.
 * 
 * @author Chris Spiliotopoulos
 */

/*
 * Modules
 */
var async = require('async');
var SwaggerConverter = require('./swagger-converter');
var parser = require('swagger-parser');
var unirest = require('unirest');

/**
 * Swagger definition parser.
 * 
 */
module.exports = function() {
	
	"use strict";

	String.prototype.startsWith = function(prefix) {
		return this.indexOf(prefix) === 0;
	}

	String.prototype.endsWith = function(suffix) {
		return this.match(suffix + "$") == suffix;
	};
	
	/*
	 * PRIVATE METHODS
	 */
	var _private = {
		
		/**
		 * Tries to parse a Swagger definition
		 */
		'parse' : function(url, cb) {
			
			/*
			 * get the definition resource
			 */
			_private.getResourceAtUrl(url, function(err, content) {
				
				var opts = {
					validateSchema : false,
					resolve$Refs : false
				};
				
				/*
				 * try to parse the document using the Swagger 2.0 parser
				 */
				parser.parse(content, opts, function(err, api) {
					
					if (!err)
						return cb(null, api);
			
					/*
					 * try to convert the old Swagger doc into the new format
					 */
					SwaggerConverter(url, function(err, api) {
						
						if (err)
							return cb(err);
						else
							return cb(null, api);
					});
					
				});
				
			});
		},
		
		/**
		 * Sends an HTTP GET request to fetch the resource at the specified URL.
		 */
		'getResourceAtUrl' : function(url, cb) {
			
			// GET the resource
			unirest.get( url ).end(function(response){
			
				cb( response.error, response.body );
			});

		}
	
	};
	
	/*
	 * PUBLIC METHODS
	 */

	return {
		
		parse : _private.parse
	
	}

}();
