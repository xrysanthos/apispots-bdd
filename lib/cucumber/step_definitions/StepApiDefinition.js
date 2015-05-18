/*
 * Modules
 */


module.exports = function() {
	
	var Given = When = Then = this.defineStep;
	
	/**
	 * Given
	 */
	Given(/^a "([^"]*)" API definition at "([^"]*)"$/, function (type, url, cb) {
		
		var world = this;
				
		var Api = world.Api;
		
		
		/*
		 * parse the API definition
		 */
		Api.parseDefinition( type, url, function(err, definition){
		
			cb(err);
		});
		
		
		
	});
	
	
};

