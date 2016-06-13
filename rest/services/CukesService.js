/**
 * Cucumber service.
 *
 * @author Chris Spiliotopoulos
 */

var Cucumber = require('cucumber');
var path = require('path');

module.exports = function() {

  /*
   * Private
   */

  var _run = function(file, tags, format, cb) {

    try {

      // get the CLI instance
      var Cli = Cucumber.Cli;

      // get the app dir
      var appDir = path.dirname(require.main.filename);

      // options
      var options = {
        compiler: [],
        format: [format],
        name: [],
        colors: false,
        profile: [],
        require: [appDir + '/../lib/cucumber'],
        tags: []
      };

      /*
       * any specific tags to be executed?
       */
      if (typeof tags !== 'undefined') {
        options.tags = tags.split(',');
      }

      var args = [file];

      var configuration = new Cli.Configuration(options, args);

      var runtime = new Cucumber.Runtime(configuration);
      var formatters = configuration.getFormatters();
      var formatter = formatters[0];
      runtime.attachListener(formatter);

      runtime.start(function(response) {

        // return the response and log trace
        cb(response, formatter.getLogs());
      });

    } catch (e) {
      console.error(e);
    }
  };

  return {

    /*
     * Public
     */

    run: _run

  };

}();
