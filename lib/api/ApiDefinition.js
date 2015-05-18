/**
 * Endpoint operation module.
 */

/*
 * Modules
 */


var ApiDefinition = (function() {
	
	/*
	 * Parsed specification
	 */
	this.spec = null;
	
	/**
	 * Parses an API definition of the 
	 * given type at the given URL.
	 */
	var _parse = function(url, cb){
		try {
			
			console.warn('Base class ApiDefinition does not know what to parse - implement in sub-classes');
			
		} catch (e) {
			console.error(e);
		}
	}
	
	/**
	 * Returns a valid operation instance
	 * that matches the criteria
	 */
	var _getOperation = function(  ){
		try {
			
			console.warn('Method not implemented yet...');
			
		} catch (e) {
			console.error(e);
		}
	}

	/*
	 * Public
	 */
	return {
		
		/*
		 * Methods
		 */
		parse : _parse,
		
		getOperation: _getOperation
	
	}


})();

module.exports = ApiDefinition;
