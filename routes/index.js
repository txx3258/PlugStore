var express = require('express');
var router = express.Router();
var mysql=require('../service/common/database');
/* GET home page. */
router.get('/', function(req, res, next) {
  mysql.query()

  res.send('hello PlugStore!!!');
});
router.get('/index', function(req, res, next) {
  res.send('hello PlugStore!!!');
});

module.exports = router;
