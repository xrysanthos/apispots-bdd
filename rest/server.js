/*
 * Dependencies
 */
var Hapi = require('hapi');
var Good = require('good');
var Joi = require('joi');
var hapiSwaggered = require('hapi-swaggered');
var hapiSwaggeredUi = require('hapi-swaggered-ui');

/*
 * Hapi server instance
 */
var server = new Hapi.Server();

server.connection({
	host : 'localhost',
	port : 3000,
	labels : [ 'api' ],
	app: {
    swagger: {
      info: {
        title: 'API Spots - BDD Testing API',
        description: 'Test your APIs using BDD'
      }
    }
  }
});

/*
 * Good console
 */
server.register({
	register : Good,
	options : {
		reporters : [ {
			reporter : require('good-console'),
			events : {
				response : '*',
				log : '*'
			}
		} ]
	}
}, function(err) {
	if (err) {
		throw err; // something bad happened loading the plugin
	}
	
	server.start(function() {
		server.log('info', 'Server running at: ' + server.info.uri);
	});
});

/*
 * Swagger plugin options
 */
server.register({
	register : hapiSwaggered,
	options : {
		tags : {
			'/foobar' : 'Example foobar description'
		},
		info : {
			title : 'Example API',
			description : 'Tiny hapi-swaggered example',
			version : '1.0'
		}
	}
}, {
	select : 'api',
	routes : {
		prefix : '/swagger'
	}
}, function(err) {
	if (err) {
		throw err
	}
});

server.register({
	register : hapiSwaggeredUi,
	options : {
		title : 'Example API',
		authorization : {
			field : 'apiKey',
			scope : 'query' // header works as well
		// valuePrefix: 'bearer '// prefix incase
		}
	}
}, {
	select : 'api',
	routes : {
		prefix : '/docs'
	}
}, function(err) {
	if (err) {
		throw err
	}
});

/*
 * load plugins & API routes
 */
require('./routes')(server);

/*
 * start the server
 */
server.start(function() {
	server.log('Server running at:', server.info.uri);
});