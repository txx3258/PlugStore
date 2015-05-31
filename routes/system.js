/**
 * Created by tangxx3 on 2015/5/5.
 */
var express = require('express');
var router = express.Router();

var systemService=require('../service/SystemService').SystemService;

router.get('/hostAppName', function(req, res, next) {
    systemService.fetchAppHost(req,res);
});

router.get('/appType', function(req, res, next) {
    systemService.fetchAppType(req,res);
});


module.exports = router;