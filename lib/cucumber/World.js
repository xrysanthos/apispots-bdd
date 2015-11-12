/**
 * APIs world module
 */

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
