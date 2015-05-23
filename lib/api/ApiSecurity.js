/**
 * API security module.
 */

/*
 * Modules
 */
var unirest = require('unirest');

var ApiSecurity = function() {
	
	/*
	 * The security type
	 */
	this.type = null;
	
	/*
	 * Security params
	 */
	this.params = {
			query: {}
	};
	
	/*
	 * Public
	 */
	return {
			
		params: this.params
		
	}

}

module.exports = ApiSecurity;
