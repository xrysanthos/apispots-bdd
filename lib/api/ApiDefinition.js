/**
 * Endpoint operation module.
 */

/*
 * Modules
 */
var ApiSecurity = require('./ApiSecurity');

function ApiDefinition() {

	/*
	 * Parsed specification
	 */
	this.spec = null;

	/*
	 * API definition URL
	 */
	this.url = null;

	/*
	 * The API security instance
	 */
	this.security = new ApiSecurity();

	/**
	 * Parses an API definition of the
	 * given type at the given URL.
	 */
	this.parseDefinition = function(url, cb){
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
		parse : function(url, cb){

			try {

				// check if definition is cached
				if (this.spec)
					return cb(null, this.spec);

				// parse the definition using the appropriate implementation
				this.parseDefinition( url, cb );

			} catch (e) {
				console.error(e);
			}

		},

		getOperation: _getOperation,

		security: this.security
	}


};

module.exports = ApiDefinition;
