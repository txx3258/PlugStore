/**
 * Created by tangxx3 on 2015/5/12.
 */
var express = require('express');
var router = express.Router();
var constants=require('../service/common/constants');
var developerService=require('../service/DeveloperService').DeveloperService;

var fs=require('fs');
router.get('/login', function(req, res, next) {
    var userName=req.query.userName;
    var userPwd=req.query.userPwd;

    if (userName=="admin@163.com"&&userPwd=="admin"){
        res.render('developer/manage', { title: '玄魂的测试代码',
            staticResourceUrl: constants.staticResourceHost,
            mClass:"manage"
        }) ;
    }else{
        res.render('admin/login', { title: '玄魂的测试代码',
            staticResourceUrl: constants.staticResourceHost});
    }
});

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


router.post('/uploadFile',function(req,res,next){
    developerService.uploadPlugFile(req,res);
});

router.get('/queryUploadProcess', function(req, res, next) {
    developerService.queryUploadProgress(req,res);
});


module.exports = router;