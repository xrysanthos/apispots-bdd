/**
 * Central API proxy.
 */
var assert = require('chai').assert;

var Api = (function() {
	
	/*
	 * Supported specs
	 */
	var SPECS = [ 'swagger' ];
	
	// loaded definition instance
	var _definition = null;
	
	// current operation instance
	var _operation = null;
	
	/**
	 * Parses an API definition of the given type at the given URL.
	 */
	var _parseDefinition = function(type, url, cb) {
		
		try {
			
			// check if the definition in request is already stored
			if (_definition)
				return cb( null, _definition );
			
			var ApiDefinition = null;
			
			type = type.toLowerCase();
			
			// check if type is supported
			assert.include( SPECS, type, "[" + type + "] API type is not supported" );
			
			/*
			 * use the appropriate definition module
			 */
			if (type === 'swagger') {
				ApiDefinition = require('./swagger/SwaggerApiDefinition');
			}
			
			/*
			 * parse the definition at the given URL
			 */
			ApiDefinition.parse( url, function(err){
				
				// store the ApiDefinition instance
				_definition = ApiDefinition;
				
				// we're done parsing
				cb(err, ApiDefinition);
			});
			
			
		} catch (e) {
			console.error(e);
			
			cb(e);
		}
		
	}
	
	/**
	 * Returns the parsed API definition instance
	 */
	var _getDefinition = function()
	{
		return _definition;
	}
	
	/**
	 * Returns an operation instance
	 */
	var _getOperation = function()
	{
		// definition must exist
		assert.isNotNull( _definition );
		
		// call the implementation passing all the arguments
		var op = _definition.getOperation.apply(this, arguments );
		
		// store the current operation
		_operation = op;
		
		return op;
	}
	
	/**
	 * Returns the current operation instance
	 */
	var _getCurrentOperation = function(){
		return _operation;
	}
	
	return {
		
		/*
		 * PUBLIC METHODS
		 */

		parseDefinition: _parseDefinition,
		
		getDefinition : _getDefinition,
		
		getOperation: _getOperation,
		
		getCurrentOperation: _getCurrentOperation
	
	};
	
}());

module.exports = Api;
