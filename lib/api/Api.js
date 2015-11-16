/**
 * Central API proxy.
 */
var assert = require('chai').assert;
var ApiDefinition = require('./ApiDefinition');
var RestApiDefinition = require('./rest/RestApiDefinition');
var SwaggerApiDefinition = require('./swagger/SwaggerApiDefinition');

var Api = (function() {

  /*
   * Supported specs
   */
  var SPECS = ['rest', 'swagger'];

  // the definitions map
  var _definitions = {};

  // loaded definition instance
  var _definition = null;

  // current operation instance
  var _operation = null;

  /**
   * Parses an API definition of the given type at the given URL.
   */
  var _parseDefinition = function(type, url, cb) {

    try {

      // is the definition cached?
      if (typeof _definitions[url] !== 'undefined') {
        var def = _definitions[url];

        // switch to the requested definition instance
        _definition = def;

				return cb(null, def);
      }

      type = type.toLowerCase();

      // check if type is supported
      assert.include(SPECS, type, "[" + type + "] API type is not supported");

      /*
       * use the appropriate definition module
       */
      var def = null;

      if (type === 'rest')
        def = new RestApiDefinition();
      else if (type === 'swagger')
        def = new SwaggerApiDefinition();
      else
        return cb("Unknown API definition");

      /*
       * parse the definition at the given URL
       */
      def.parse(url, function(err) {

        // cache the definition
        _definitions[url] = def;

        // store the ApiDefinition instance
        _definition = def;

        // we're done parsing
        cb(err, def);
      });

    } catch (e) {
      console.error(e);

      cb(e);
    }

  }

  /**
   * Returns the parsed API definition instance
   */
  var _getDefinition = function() {
    return _definition;
  }

  /**
   * Returns an operation instance
   */
  var _getOperation = function( /* args */ ) {

    // definition must exist
    assert.isNotNull(_definition);

    // call the implementation passing all the arguments
    var op = _definition.getOperation.apply(this, arguments);

    // get the security instance
    var security = _definition.security;

    /*
     * apply security on the operation
     */
    _applySecurity(op, security);

    // remove previous operation from memory
    delete _operation;
    _operation = null;

    // store the current operation
    _operation = op;

    return op;
  }

  /**
   * Applies any security data on the
   * operation.
   */
  var _applySecurity = function(operation, security) {
    try {

      /*
       * blend query params
       */
      if (Object.keys(security.params.query).length > 0) {
        for (var param in security.params.query) {
          var value = security.params.query[param];
          operation.params.query[param] = value;
        }
      }

      /*
       * blend security headers
       */
      if (Object.keys(security.params.headers).length > 0) {
        for (var param in security.params.headers) {
          var value = security.params.headers[param];
          operation.headers[param] = value;
        }
      }

    } catch (e) {
      console.error(e);
    }
  }

  /**
   * Returns the current operation instance
   */
  var _getCurrentOperation = function() {

    return _operation;
  }

  return {

    /*
     * PUBLIC METHODS
     */

    parseDefinition: _parseDefinition,

    getDefinition: _getDefinition,

    getOperation: _getOperation,

    getCurrentOperation: _getCurrentOperation

  };

}());

module.exports = Api;
