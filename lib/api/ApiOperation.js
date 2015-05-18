/**
 * Endpoint operation module.
 */

/*
 * Modules
 */
var unirest = require('unirest');

var ApiOperation = function() {
	
	// the scheme
	this.scheme = 'http';
	
	// the base URL
	this.baseUrl = null;
	
	// the endpoint
	this.path = null;
	
	// the method to be called
	this.method = null;
		
	// the operation response
	this.response = null;
	
	// the request data object
	this.request = {
			headers: {},
			body: null,
			timeout: null,
			params: {
				path: {},
				query: {}
			}
	};
	
	/**
	 * Executes the operation request and 
	 * returns the response.
	 */
	var _execute = function(callback) {
		
		try {
			
			var self = this;
			
			// get a request instance for the target operation
			var url = 'http://' + this.baseUrl + this.path;
		
			/*
			 * replace any path params
			 */
			for ( var param in this.request.params.path )
			{
				var value = this.request.params.path[param];
				var placeholder = '{' + param + '}'; 
				url = url.replace( placeholder, value );				
			}

			var Req = unirest[this.method](url);
	
			// set the request headers
			Req.headers( this.request.headers );

			// set the body
			if (this.request.body)
				Req.send( this.request.body );

			// set the timeout
			if ( this.request.timeout )
				Req.timeout( this.request.timeout );
			
			// set any query params
			Req.query( this.request.params.query );
		
			// send the request
			Req.end(function(response) {
		
				// store the response
				self.response = response;
				
				callback(response);
			});
			
		} catch (e) {
			callback(e);
		}
		
	}
	
	
	// return the public interface
	return {
			
		/*
		 * Methods
		 */
		execute : _execute,
		
		request: this.request,
		
		response: this.response,
		
		headers: this.request.headers,
		
		params: this.request.params
		
	}

}

module.exports = ApiOperation;
