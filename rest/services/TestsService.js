/**
 * Tests service.
 *
 * @author Chris Spiliotopoulos
 */

var fs = require('fs');

var CukesService = require('./CukesService');

module.exports = function() {

  /*
   * Private
   */

  /**
   * Executes a single test from the
   * given file.
   */
  var _runTest = function(file, tags, format, cb) {

    /*
     * Run the test with Cucumber
     */
    CukesService.run(file, tags, format, function(err, response) {

      // after the test is run, delete it from the disk
      fs.unlink(file);

      // return the response
      cb(err, response);
    });

  };


  return {

    /*
     *Public
     */


    runTest: _runTest

  };

}();
