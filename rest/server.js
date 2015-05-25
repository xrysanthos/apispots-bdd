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
	port : 3000,
	labels : [ 'api' ],
	app: {
    swagger: {
      info: {
        title: 'API Spots - BDD API Testing',
        description: 'Test your APIs using BDD',
        version: '0.0.1',
        contact: {
        	name: 'Chris Spiliotopoulos (@chefArchitect)',
        	url: 'https://github.com/chefArchitect',
        	email: 'chrysanthos.spiliotopoulos@gmail.com'
        },
        license: {
        	name: 'MIT',
        	url: 'http://opensource.org/licenses/MIT'
        }
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
		title : 'API Spots - BDD API Testing'
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