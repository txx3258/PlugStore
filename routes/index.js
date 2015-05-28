var express = require('express');
var router = express.Router();
var mysql=require('../service/common/database');
/* GET home page. */
router.get('/', function(req, res, next) {
  var handlers={
    sql:'',
    handler:showUser,
    callback:res
  };

  function showUser(result,res){
    console.log(JSON.stringify(result));

    res.send('hello!');
  }

  //数据库操作
  mysql.query(handlers);
  //res.send('hello PlugStore!!!');
});
router.get('/index', function(req, res, next) {
  res.send('hello PlugStore!!!');
});

module.exports = router;
