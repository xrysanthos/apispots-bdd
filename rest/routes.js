/**
 * API Routes.
 * 
 * @author Chris Spiliotopoulos
 */
var Joi = require('joi');
var fs = require('fs');
var path = require('path');

var TestsService = require('./services/TestsService');
var CukesService = require('./services/CukesService');


/*
 * API routes
 */
module.exports = function(server) {
	
	server.route({
		path : '/tests/run',
		method : 'POST',
		config : {
			tags : [ 'api' ],
			description : 'Executes a single BDD test',
			notes : 'My route notes',
			validate : {
				payload : Joi.object().keys({
					'name' : Joi.string(),
					'file' : Joi.object().meta({
						swaggerType : 'file'
					})
				})
			},
			payload : {
				allow : 'multipart/form-data',
				output : 'file',
				parse : true
			},
			handler : function(request, reply) {
				
				var payload = request.payload;
				var file = payload.file.path;
				
				/*
				 * Run the test with Cucumber
				 */
				CukesService.run( file, function(err, response){
					
					reply(response);
				});
				
			}
		}
	});
	
}
