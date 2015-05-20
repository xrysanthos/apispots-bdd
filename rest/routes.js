/**
 * API Routes.
 * 
 * @author Chris Spiliotopoulos
 */
var Joi = require('joi');
var fs = require('fs');
var path = require('path');

var TestsService = require('./services/TestsService');

/*
 * API routes
 */
module.exports = function(server) {
	
	/**
	 * POST /tests/run
	 * 
	 * Executes a single BDD test file
	 */
	server
			.route({
				path : '/tests/run',
				method : 'POST',
				config : {
					tags : [ 'api' ],
					description : 'Executes a single BDD test',
					notes : 'Upload and execute a BDD test feature file described using the Gherkin3 syntax.',
					validate : {
						payload : Joi.object().keys({
							'file' : Joi.object().meta({
								swaggerType : 'file'
							}).required().description('A file containing a valid test feature written in Gherkin3 syntax'),
							'tags' : Joi.string().description('A comma-separated list of @ tags to be executed within the test file, e.g @dev,@test'),
						})
						
					},
					payload : {
						allow : 'multipart/form-data',
						output : 'file',
						parse : true
					},
					handler : function(request, reply) {
						
						var payload = request.payload;
						
						// get the request data
						var file = payload.file.path;
						var tags = payload.tags;
						
						if (typeof tags !== 'undefined')
							tags = decodeURIComponent(tags);
						
						/*
						 * Run the test
						 */
						TestsService.runTest(file, tags, function(success, logs) {
							
							return reply(logs).code( (success ? 200 : 400) );
						});
						
					}
				}
			});
	
}
