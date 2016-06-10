/**
 * Bootstrap service.
 *
 *
 */

var log = require('winston');
var nconf = require('nconf');
var Hapi = require('hapi');
var Inert = require('inert');
var Vision = require('vision');
var hapiSwaggered = require('hapi-swaggered');
var hapiSwaggeredUi = require('hapi-swaggered-ui');

module.exports = function() {

  // is the environment initialized?
  var _initialized = false;

  // the server instance
  var _server = null;

  /**
   * Sets up the logging context
   */
  function _setupLogging(callback) {

    /*
     * setup logging framework
     */
    log.info('Initializing logging framework...');

    // Console transport
    if ((nconf.get()) &&
      (typeof nconf.get().logging !== 'undefined') &&
      (typeof nconf.get().logging.console !== 'undefined') &&
      (typeof nconf.get().logging.console.level !== 'undefined')) {

      // log.transports.Console.level = nconf.get().logging.console.level;
      log.remove(log.transports.Console);

      log.add(log.transports.Console, {
        level: nconf.get().logging.console.level,
        colorize: true
      });

      log.info('|_ Added Console transport [Level: ' +
        nconf.get().logging.console.level + ']');
    }

    if (callback) {
      callback();
    }
  }

  /**
   * Sets up the server
   */
  function _setupServer() {

    try {

      /*
       * Hapi server instance
       */
      _server = new Hapi.Server();

      /*
       * set the connection info
       * and Swagger plugin
       */
      _server.connection({
        port: 3000,
        labels: ['api'],
        routes: {
          cors: false
        }
      });

    } catch (e) {
      console.error('Error setting up server: ' + e);
    }
  }

  /**
   * Sets up the server plugins
   */
  function _setupServerPlugins() {

    try {

      /*
       * Swagger plugin options
       */

      var opts = {
        schemes: ['http', 'https'],
        cors: false,
        info: {
          title: 'API Spots - BDD API Testing',
          description: 'Test your APIs using BDD',
          version: '1.0.0',
          contact: {
            name: 'Chris Spiliotopoulos (@chefArchitect)',
            url: 'https://github.com/chefArchitect',
            email: 'chrysanthos.spiliotopoulos@gmail.com'
          }
        }
      };

      _server.register([
        Inert,
        Vision,
      ]);

      _server.register({
        register: hapiSwaggered,
        options: opts
      }, {
        select: 'api',
        routes: {

        }
      }, function(err) {
        if (err) {
          throw err;
        }
      });

      /*
       * Hapi Swaggered UI plugin
       */
      opts = {};

      _server.register({
        register: hapiSwaggeredUi,
        options: opts
      }, {
        select: 'api',
        routes: {
          prefix: '/docs'
        }
      }, function(err) {
        if (err) {
          throw err;
        }
      });

    } catch (e) {
      console.error('Error setting up server plugins: ' + e);
    }
  }

  /**
   * Sets up the server plugins
   */
  function _setupRouting() {

    try {

      /*
       * load API routes
       */
      require('../routes')(_server);

    } catch (e) {
      console.error('Error setting up routes: ' + e);
    }
  }

  return {

    /**
     *
     */
    setup: function(callback) {

      if (_initialized) {
        return;
      }

      log.info('==========================================');
      log.info('Setting up contexts...');

      // setup logging
      _setupLogging();

      // setup server
      _setupServer();

      // setup the plugins
      _setupServerPlugins();

      // setup routing
      _setupRouting();

      /*
       * start the server
       */
      _server.start(function() {

        log.info('Server running at:', _server.info.uri);

        log.info('==========================================');

        _initialized = true;

        // notify listeners
        if (callback) {
          callback();
        }
      });

    }

  };

}();
