/**
 * Tag Hooks
 */

var Strings = require('strings.js');


var TagHooks = function () {
	
	/**
	 * Tag: @WithDelay
	 * 
	 * Injects a programmatic delay prior to 
	 * executing the scenario.  Must be followed
	 * by a tag containing the delay time in ms
	 * 
	 * e.g. @WithDelay @1000
	 */
  this.Before("@WithDelay", function (scenario, cb) {
    
  	var tags = scenario.getTags();
  	
  	var delay = 0;
  	
  	// find the index of the @WithDelay tag
  	var idx = 0;
  	
  	for ( idx in tags )
  	{
  		var tag = tags[idx];
  		
  		if ( tag.getName() === '@WithDelay' )
  			break;
  	}

   	if ( tags.length <= (Number(idx) + 1) )
  		return cb();
  	
  	// the following tag should always be the delay time in ms
   	idx++;
  	var tag = tags[idx].getName();
    var parts = tag.split('@');
    
    if (! Strings.isNumeric(parts[1]) )
    	return cb();
    
    delay = Number(parts[1]);
    
    /*
     * set the timeout
     */
    setTimeout( cb, delay );
  	
  });
};

module.exports = TagHooks;