'use strict';
var yelp = require('./yelp'); //Yelp API wrapper


// var yelpBusinessID = 'le-village-new-york';
// yelp.getBusiness(yelpBusinessID)
// .then(function(data){
//    console.log('got search result', data.deals);
// })
// .catch(function(error){
//    console.error('error on yelp getBusiness', error);
// });

// var params = {
// 	term: 'food',
//         location: 'San Francisco',
//         deals: true,
//         limit: 2
//   };

// yelp.search(params)
// .then(function(data){
//    console.log('got search result', data);
// })
// .catch(function(error){
//    console.error('error on yelp search', error);
// });

// var phone='4153458100';
var phone = {
	phone: '+1-415-908-3801'
};
yelp.phoneSearch(phone)
.then(function(data){
   console.log('got search result', data);
})
.catch(function(error){
   console.error('error on yelp phone search', error);
});

