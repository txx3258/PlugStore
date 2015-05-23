var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.send('hello PlugStore!!!');
});
router.get('/index', function(req, res, next) {
  res.send('hello PlugStore!!!');
});

module.exports = router;
