/**
 * APIs world module
 */

 

module.exports = function World(callback) {
	
	
	this.World = function World(callback) {
			
		/*
		 * World Attributes
		 */
		this.Api = require('../api/Api');

			
		
		
		// tell Cucumber we're finished and to use 'this' as the world instance
		callback();
	};
	
};
