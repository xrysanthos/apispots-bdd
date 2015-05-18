var Cucumber = require('cucumber');
var SwaggerConverter = require('./lib/swagger/swagger-converter');

SwaggerConverter('http://api-radio.akazoo.fm/explorer/resources', function(err, api){
	console.log(api);
});

//var cli = Cucumber.Cli(process.argv);
//
//cli.run(function (succeeded) {
//  var code = succeeded ? 0 : 1;
//
//  process.on('exit', function () {
//    process.exit(code);
//  });
//
//  var timeoutId = setTimeout(function () {
//    console.error('Cucumber process timed out after waiting 60 seconds for the node.js event loop to empty.  There may be a resource leak.  Have all resources like database connections and network connections been closed properly?');
//    process.exit(code);
//  }, 60 * 1000);
//
//  if (timeoutId.unref) {
//    timeoutId.unref();
//  }
//  else {
//    clearTimeout(timeoutId);
//  }
//});