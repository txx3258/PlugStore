/**
 * Created by tangxx3 on 2015/5/12.
 */
var express = require('express');
var router = express.Router();
var constants=require('../service/common/constants');
var developerService=require('../service/DeveloperService').DeveloperService;


router.get('/manage', function(req, res, next) {
    var registerName=req.session?req.session.registerName:'';

    res.render('developer/manage', { title: '开发者管理',
        staticResourceUrl: constants.staticResourceHost,
        mClass:"manage",
        registerName:registerName
    });
});

router.post('/uploadPlugInfo', function(req, res, next) {

    developerService.uploadPlugInfo(req,res);
});


router.get('/plugInfo', function(req, res, next) {

    developerService.fetchPlugInfo(req,res);
});

router.get('/upload', function(req, res, next) {

    var session=req.session;
        registerName=session?session.registerName:'',
        nickName=session?session.nickname:'',
        userId=session?session.userId:'';

    res.render('developer/upload', { title: '插件上传',
        staticResourceUrl: constants.staticResourceHost,
        mClass:"upload",
        registerName:registerName,
        nickName:nickName
    });
});


router.get('/comment', function(req, res, next) {

    developerService.fetchComment(req,res);

});

router.get('/commentList', function(req, res, next) {
    developerService.fetchCommentList(req,res);
});

router.get('/register', function(req, res, next) {
    var registerName=req.session?req.session.registerName:'';

    res.render('developer/register', { title: '插件上传',
        staticResourceUrl: constants.staticResourceHost,
        mClass:"upload",
        registerName:registerName
    });
});

router.get('/login', function(req, res, next) {
    var registerName=req.session?req.session.registerName:'';

    var code=req.query.code,
        message='';
    if (code=='NOT_PASS'){
        message='用户或密码错误';
    }

    res.render('developer/login', { title: '插件上传',
        staticResourceUrl: constants.staticResourceHost,
        message:message,
        registerName:registerName
    });
});



router.get('/logout', function(req, res, next) {
    if (req.session){
        req.session=undefined;
    }

    res.redirect(constants.INDEX);
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