var Q = require('q');
var Promise = require('bluebird');
var GitHubApi = require('github');
var yelp = require('./yelp');


var github = new GitHubApi({
    version: '3.0.0'
});

var getUserAvatarWithCallback = function(user, callback){
    github.search.users({q: user}, function(err, res) {
    	if (err) { callback(err, null); }
    	else{
    		var avatarUrl = res.items[0].avatar_url;
    		callback(null, avatarUrl);
    	}
    });
};

// getUserAvatarWithCallback('kunq', function(err, avatar) {
// 	console.log('got url with callback patter', avatar);
// });

var params = {
        location: 'San+Francisco',
        limit: 2,
        deals_filter: true
  };

var getYelpSearchResultWithCallback = function(searchQuery, callback){
   yelp.search(searchQuery, function(err, resp, data){
	if(err) { callback(err, null); }
	else{
	  callback(null, data);
	}
   });
};

//getYelpSearchResultWithCallback(params, function(err, data) {
//	console.log('Yelp search results', data);
//});


// now use bluebird promise

var getUserAvatarWithBluebird = function(user) {
	return new Promise(function(resolve, reject){
		github.search.users({ q: user }, function(err, res) {
			if (err) { reject(err); }
			else{
				var avatarUrl = res.items[0].avatar_url;
				resolve(avatarUrl);
			}
		});
	});
};

// getUserAvatarWithBluebird('kunq')
// .then(function(avatarUrl){
// 	console.log('got url with bluebird promise', avatarUrl);
// })
// .catch(function(error){
// 	console.log('error getting avatar with bluebird', error);
// });

var getUserAvatarWithQ = function(user) {
	var deferred = Q.defer();
	github.search.users({ q: user }, function(err, res) {
		if (err) { deferred.reject(err); }
		else{
			var avatarUrl = res.items[0].avatar_url;
			deferred.resolve(avatarUrl);
		}
	});
	return deferred.promise;
};

getUserAvatarWithQ('kunq')
.then(function(avatarUrl){
  console.log('1: got url with q promise', avatarUrl);
  // Then are chainable! Whatever we return in the previous 'then' gets passed into the next one
  return avatarUrl + ' SUPERAWESOMEAPPENDEDTEXT!!!!!! WOO!';
})
.then(function(appendedAvatarURL) {
  console.log('2. check out the new appended url ' + appendedAvatarURL);
  // use setTimeout to simulate an aync process before the resolve. Anything asyncronous could happen here
    var deferred = Q.defer();
    setTimeout(function() {
      deferred.resolve(appendedAvatarURL + ' and we did more async!');
    }, 2000);
    throw Error ('error in code');
    //return deferred.promise;
})
.then(function(appendedAvatarURLAfterAnotherAsyncOperation) {
    // This 'then' function will only execute after the promise returned from the previous function has been resolved
    console.log('3. Now check out the even moar appended url! Woah!', appendedAvatarURLAfterAnotherAsyncOperation);
})
.then(function(){
   console.log('4. Now check out the even moar appended url! Woah!');
})
.catch(function(error){
	console.log('error getting avatar with q', error);
})
.finally(function() {
    // the 'finally' function will always get run regardless if the promise was resolved (successful) or rejected (errored)
    console.log('Finally, this will always get run');
  });


