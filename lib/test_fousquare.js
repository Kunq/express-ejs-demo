var Q = require('q');
var assert = require('assert');
var foursquare = require('./foursquare');
var _ = require('lodash');
var MongoClient = require('mongodb').MongoClient;

var venueSearch = function(param, callback) {
	var deferred = Q.defer();
	 foursquare.venueSearch(param,function(error, response, data){
	 	if (error) { deferred.reject(error); }
	 	else {
	 	  deferred.resolve(data);
	 	}
	 });
	 return deferred.promise;
};
var getVenue = function(param, callback){
	var deferred = Q.defer();
	foursquare.venueExplore(param,function(error, response, data){
		if (error){ deferred.reject(error); }
		else{
		 	var venue = JSON.parse(data);
		 	var groupLen = venue.response.groups.length;
		 	var venueList = [];
		 	_.forOwn(venue.response.groups, function(item, index){
		 		_.forOwn(item, function(value, key){
		 			if (key == 'items') {
		 				_.forOwn(value, function(item){
		 					venueList.push({
				 	  			"venueId": item.venue.id,
				 	  			"name": item.venue.name,
				 	  			"location": item.venue.location
				 	  	    });
		 				});
		 			}
		 		});
		 	});
		 	deferred.resolve(venueList);
	    }
	});
	return deferred.promise;
};


var getMenuItemsByID = function(venue, callback) {
	var deferred = Q.defer();
	var venue_id = '';
	 _.forOwn(venue, function(venueItem, key){
 		if ( key == 'venueId') {
 			venue_id = venueItem;
 		}
	 });

	foursquare.menuSearch(venue_id,function(error, response, data){
	 	if (error) { 
	 		deferred.reject(error); 
	 	}
	 	else {
	 	  var menu = JSON.parse(data);
	 	  var menusCount = menu.response.menu.menus.count;
		  var menuList = {};
	 	   if (menusCount > 0) {
				var menuItemList = [];
			 	_.forOwn(menu.response.menu.menus.items, function(menuItems){
			 		_.forOwn(menuItems.entries.items, function(entryItems){
			 			_.forOwn(entryItems, function(entryItemsMenu, key){
			 				if (key == 'entries') {
				 				_.forOwn(entryItemsMenu, function(entryItemMenuItems){
				 					_.forOwn(entryItemMenuItems, function(items){
					 					menuItemList.push({
							 	       		name: items.name,
							 	       		description: items.description
							 	       	});
				 					});
				 				});
			 			    }
			 			});
			 		});
			 	});
			 	menuList = _.assign(venue, {"menuitem": menuItemList});
	 	    }
	 	   // else{
	 	   // 	menuList = _.assign(venue, {"menuitem": "No Menu Found"});
	 	   // }
	       deferred.resolve(menuList);
	    }
	});
	return deferred.promise;
};


var param = {
	ll: '40.7,-74',
	near: 'New York, NY',
	llAcc: 1000.0,
	radius: 250,
	section: 'food',
	query: 'sushi'
};

var connection_string='mongodb://localhost:27017/platerate';


getVenue(param)
.then(function(venueList){
	MongoClient.connect(connection_string, function(err, db) {
  		console.log("Connected to Mongodb server.");
		db.collection('venue_test').drop(); 
		db.collection('venue_test').insertMany(venueList, function(err,result){
			assert.equal(err, null);
			assert.equal(venueList.length, result.result.n);
			console.log("inserted venue: " + result.result.n + ', ' + result.ops.length);
		});
		db.close();
	});
	return venueList;
})
.then(function(venueList){
	var results = [];
	_.forOwn(venueList, function(venue){
		var result = getMenuItemsByID(venue)
			.then(function(data){
				return Q(data);
			});
			results.push(result);
	});
	Q.all(results)
	.then(function(data){
		var result = [];
		_.forOwn(data, function(value, index){
			if ( !(_.isEmpty(value)) ) {
				result.push(value);
			}
		});
		return result;
	})
	.then(function(data){
		MongoClient.connect(connection_string, function(err, db) {
		  	assert.equal(err, null);
			db.collection('venueMenu_test').drop( function(err, result){
				db.close();
			});
			db.collection('venueMenu_test').insertMany(data, function(err,result){
				console.log("inserted menu items: " + result.result.n + ', ' + result.ops.length);
				db.close();
			});
		})
		.catch(function(error){
			console.log('2:' + error);
		});
	});
})
.catch(function(error){
	console.log(error);
})
.finally(function() {
});


// function cleanup(){
// 	db.close();
// }
// process.on('SIGINT', cleanup);
// process.on('SIGTERM', cleanup);
// process.on('uncaughtException', cleanup);







