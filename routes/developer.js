/**
 * Created by tangxx3 on 2015/5/12.
 */
var express = require('express');
var router = express.Router();
var constants=require('../service/common/constants');
var developerService=require('../service/DeveloperService').DeveloperService;


router.post('/manage', function(req, res, next) {
    res.render('developer/manage', { title: '开发者管理',
        staticResourceUrl: constants.staticResourceHost,
        mClass:"manage"
    });
});
router.get('/manage', function(req, res, next) {
    res.render('developer/manage', { title: '开发者管理',
        staticResourceUrl: constants.staticResourceHost,
        mClass:"manage"
    });
});

router.post('/uploadPlugInfo', function(req, res, next) {

    developerService.uploadPlugInfo(req,res);
});


router.get('/upload', function(req, res, next) {
    res.render('developer/upload', { title: '插件上传',
        staticResourceUrl: constants.staticResourceHost,
        mClass:"upload"
    });
});

router.get('/register', function(req, res, next) {
    res.render('developer/register', { title: '插件上传',
        staticResourceUrl: constants.staticResourceHost,
        mClass:"upload"
    });
});


router.get('/login', function(req, res, next) {
    var code=req.query.code,
        message='';
    if (code=='NOT_PASS'){
        message='用户或密码错误';
    }

    res.render('developer/login', { title: '插件上传',
        staticResourceUrl: constants.staticResourceHost,
        message:message
    });
});

router.post('/checkLogin', function(req, res, next) {
    res.render('developer/login', { title: '插件上传',
        staticResourceUrl: constants.staticResourceHost,
        mClass:"upload"
    });
});


router.post('/uploadFile',function(req,res,next){
    developerService.uploadPlugFile(req,res);
});

router.get('/queryUploadProcess', function(req, res, next) {
    developerService.queryUploadProgress(req,res);
});


module.exports = router;