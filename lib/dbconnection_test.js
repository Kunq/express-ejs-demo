var assert = require('assert');
var MongoClient = require('mongodb').MongoClient;
var connection_string='mongodb://localhost:27017/platerate';



MongoClient.connect(connection_string, function(err, db) {
  assert.equal(err, null);
  console.log("Connected to Mongodb server.");
  db.collection('profile').findOne()
  .then(function(data){
  	console.log(data);
  	//db.close();
  })
  .catch(function(error){
  	console.log(error);
  });

  db.collection('venues').findOne()
  .then(function(data){
  	console.log(data);
  })
  .catch(function(error){
  	console.log(error);
  });

  db.close();
});