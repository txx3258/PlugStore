var express = require('express');
var router = express.Router();


router.get('/register', function(req, res, next) {
  systemService.queryAppListForDev(req,res);
});

router.post('/checkLogin', function(req, res, next) {
  systemService.checkLogin(req,res);
});


module.exports = router;
