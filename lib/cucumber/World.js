/**
 * APIs world module
 */

var nconf = require('nconf');

/*
 * Load configuration environment
 */
if ( process.env.CONFIG )
{
  nconf.argv().env().file(process.env.CONFIG);
}

 /*
 * World Attributes
 */
function World(callback) {

  /*
   * World Attributes
   */
  this.Api = require('../api/Api');

	// done
	if (typeof callback === 'function')
	 callback();
};

module.exports = function() {
	this.World = World;
};
