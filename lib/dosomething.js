var _ = require('lodash');
var Q = require('Q');

var a = [11, 12, 13, 14, 15];
var o = [{id: 11}, {id: 12}, {}, {id: 14}, {id: 15}];
var results = [];
var x = [];
_.forOwn(o, function(value, index){
	if (_.isEmpty(value)){
		console.log(value);
	}
	else {
		x.push(value);
	}
});
console.log(x);

// var getItemWithPromise = function(param, callback){
// 	var deferred = Q.defer();
// 	if (param === null) {deferred.reject( new Error(' Empty Paramter'));}
// 	else { 
// 		//param = param * 100;
// 		deferred.resolve(param);
// 	}
// 	return deferred.promise;
// };

// _.forOwn(o, function(item, index){
// 	_.forOwn(item, function(val, key){
// 		// if (key == 'id'){
// 		// 	console.log(val);
// 		// }
// 		var result = getItemWithPromise(item)
// 		.then(function(data){
// 			return Q(data);
// 		});
// 		results.push(result);
// 	});
// 	// var result = getItemWithPromise(item)
// 	// .then(function(data){
// 	// 	return Q(data);
// 	// });
// 	// results.push(result);
// });

// Q.all(results)
// .then(function(data){
// 	console.log(data);
// });