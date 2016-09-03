'use strict';

var Yelp = require('yelp'); //Yelp API
var Promise = require('bluebird');



//pRate Yelp credentials
var opts = {
  consumer_key: process.env.YELP_CONSUMER_KEY,
  consumer_secret: process.env.YELP_CONSUMER_SECRET,
  token: process.env.YELP_TOKEN,
  token_secret: process.env.YELP_TOKEN_SECRET 
};

var yelp = new Yelp(opts);

//getBusiness function
module.exports.getBusiness = function(businessId){
  return new Promise(function(resolve, reject){
    yelp.business((businessId), function(err, res) {
       if (err) { reject(err); }
       else{
         resolve(res);
       }
    });
  });
};


module.exports.search = function(params){
  return new Promise(function(resolve, reject){
    yelp.search((params), function(err, res) {
       if (err) { reject(err); }
       else{
         resolve(res);
       }
    });
  });
};

module.exports.phoneSearch = function(params){
  return new Promise(function(resolve, reject){
    yelp.phoneSearch((params), function(err, res) {
       if (err) { reject(err); }
       else{
         resolve(res);
       }
    });
  });
};
