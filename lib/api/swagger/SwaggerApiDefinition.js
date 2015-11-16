/**
 * Extension of the ApiDefinition module that parses Swagger specifications.
 */

/*
 * Modules
 */
var ApiDefinition = require('../ApiDefinition');
var swaggered = require('./swaggered');
var expect = require('chai').expect;
var ApiOperation = require('../ApiOperation');

function SwaggerApiDefinition() {

	var THIS = {};

	THIS.__proto__ = ApiDefinition();

	/**
	 * Override the default parse method.
	 */
	THIS.parseDefinition = function( url, cb ){
		try {

			/*
			 * Parse the Swagger definition at the given URL
			 */
			swaggered.parse( url, function(err, spec){

				// store the loaded spec internally
				THIS.spec = spec;

				// return the response
				cb(err, spec);
			});

		} catch (e) {
			console.error(e);
		}
	}

	/**
	 * Searches the spec for an operation having the given Id.
	 */
	var _getOperationById = function(opid){
		try {

			var spec = THIS.spec;

			// check if the operation exists
			expect(spec).to.have.property('paths');

			var paths = spec.paths;

			// find the operation with this Id
			var operation = null;

			for ( key_path in paths )
			{
				var path = paths[key_path];

				for (key_method in path)
				{
					var method = path[key_method];

					if (method.operationId === opid)
					{
						operation = method;
						operation['path'] = key_path;
						operation['method'] = key_method;
						break;
					}
				}
			}

			// return the operation instance
			return operation;

		} catch (e) {
			console.error(e);
		}
	}

	/**
	 * Searches the spec for an operation having the given Id.
	 */
	var _getOperationByPath = function(endpoint, method){
		try {

			var spec = THIS.spec;

			expect(spec).to.have.property('paths');

			var paths = spec.paths;

			// find the operation with this Id
			var operation = null;

			// check if the operation exists
			if ( ( typeof paths[endpoint] === 'undefined' ) ||
					( typeof paths[endpoint][method] === 'undefined'  ))
				return null;

			operation = paths[endpoint][method];
			operation['path'] = endpoint;
			operation['method'] = method;

			// return the operation instance
			return operation;

		} catch (e) {
			console.error(e);
		}
	}

	/**
	 * Returns an operation instance.
	 */
	THIS.getOperation = function( opid, endpoint, method ){
		try {

			var ref = null;

			/*
			 * try to get a reference to the correct operation in the spec
			 */
			if (typeof opid !== 'undefined')
				ref = _getOperationById( opid );
			else
				ref = _getOperationByPath( endpoint, method );

			if (! ref)
				return null;

			/*
			 * create a new ApiOperation instance and fill in the attributes
			 */
			var op = new ApiOperation();
			op.scheme = (typeof THIS.spec.schemes !== 'undefined' ? THIS.spec.schemes[0] : 'http' );
			op.baseUrl = THIS.spec.host + (typeof THIS.spec.basePath !== 'undefined' ? THIS.spec.basePath : '');
			op.path = ref.path;
			op.method = ref.method;

			// return the operation instance
			return op;

		} catch (e) {
			console.error(e);
		}
	}

	/*
	 * Public
	 */
	return THIS;


};

module.exports = SwaggerApiDefinition;
