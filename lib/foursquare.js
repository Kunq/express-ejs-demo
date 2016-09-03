
  
//var oauthSignature = require('oauth-signature');  
var n = require('nonce')();  
var request = require('request');  
var qs = require('querystring');  
var _ = require('lodash');
var base_url = "https://api.foursquare.com/v2";


var CLIENT_ID="5GYLC30XGL2N2BUGP5MUQLE0M40XI32TIYNDGPGOFESLOP3D";
var CLIENT_SECRET ="ISLE2CKXBYCGUO4FRN0B2WKKGZ2GXLRO04U4KMRCZTDWNEPA";


/* Function for foursquare venue explore call
 * ------------------------
 * params: object with params to search
 * callback: callback(error, response, body)
 */
module.exports.venueExplore= function (params, callback) {
  var httpMethod = 'GET';
  var url = base_url + '/venues/explore';
  makeRequestToFoursquare(httpMethod, url, params, callback);
};


/* Function for foursquare venue search call
 * ------------------------
 * params: object with params to search
 * callback: callback(error, response, body)
 */
module.exports.venueSearch = function (params, callback) {
  var httpMethod = 'GET';
  var url = base_url + '/venues/search';
  makeRequestToFoursquare(httpMethod, url, params, callback);
};

/* Function for foursquare menu search call
 * ------------------------
 * params: object with params to search
 * callback: callback(error, response, body)
 */
module.exports.menuSearch = function (venue_id, callback) {
  var httpMethod = 'GET';
  var url = base_url + '/venues/' + venue_id + '/menu';
  var params = '';
  makeRequestToFoursquare(httpMethod, url, params, callback);
};

function makeRequestToFoursquare(method, apiUrl, params, callback) {
  var required_params = {
    client_id : CLIENT_ID,
    client_secret : CLIENT_SECRET,
    v : n().toString().substr(0,10)
  };
  var parameters = _.assign(required_params, params);

  /* Then we turn the paramters object, to a query string */
  var paramURL = qs.stringify(parameters);
  var apiURL = apiUrl + '?' + paramURL;
  /* Then we use request to send make the API Request */
  request(apiURL, function(error, response, body){
    var bodyData = JSON.parse(body);
    if (bodyData.meta.code !== 200 ) {
      error = bodyData.meta.errorDetail;
    }
    return callback(error, response, body);
  });
}