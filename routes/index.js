var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.send('hello jifen!!!');
});
router.get('/index', function(req, res, next) {
  res.send('hello jifen!!!');
});

module.exports = router;
