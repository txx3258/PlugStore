/**
 * Created by tangxx3 on 2015/5/5.
 */
var express = require('express');
var router = express.Router();

/* 增加积分 */
router.post('/incruserjf', function(req, res, next) {
    //参数检验
    checkParms(req.body);


});

router.get('/adpincruserjf', function(req, res, next) {
    res.send('respond with a resource');
});

router.get('/operincruserjf', function(req, res, next) {
    res.send('respond with a resource');
});


//router.get('/', function(req, res, next) {
//    res.send('respond with a resource');
//});
//
//
//router.get('/', function(req, res, next) {
//    res.send('respond with a resource');
//});
//
//router.get('/', function(req, res, next) {
//    res.send('respond with a resource');
//});
//
//router.get('/', function(req, res, next) {
//    res.send('respond with a resource');
//});
//
//router.get('/', function(req, res, next) {
//    res.send('respond with a resource');
//});
//
//router.get('/', function(req, res, next) {
//    res.send('respond with a resource');
//});

module.exports = router;