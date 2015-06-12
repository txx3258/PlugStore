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

router.post('/checkLogin', function(req, res, next) {
    systemService.checkLogin(req,res);
});

router.post('/putDevBaseInfo',function(req,res,next){
    systemService.putDeveloperBaseInfo(req,res);
});

router.get('/delete_table',function(req,res,next){
    systemService.deleteTable(req,res);
});




module.exports = router;