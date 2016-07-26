var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  var user_id = req.param('id');

  res.render('index', { title: 'Express' , userid: user_id});
});

router.post('/', function(req, res) {
  var sizes = req.body.sizes;


  /* Here you can store checked value in an Array or Json object instead of String: */
  var sizesString= '';
  for (var i=0; i < sizes.length; i++) {
  	sizesString += sizes[i] + '<br />';
  }
  res.send('You have selected the following sizes: <br />' + sizesString);

});


module.exports = router;
