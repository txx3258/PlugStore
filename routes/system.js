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

router.get('/devAppList', function(req, res, next) {
    systemService.fetchAppListForDev(req,res);
});

router.get('/queryAppListForDev', function(req, res, next) {
    systemService.queryAppListForDev(req,res);
});

router.get('/register', function(req, res, next) {
    systemService.queryAppListForDev(req,res);
});

module.exports = router;