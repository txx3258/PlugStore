/**
 * Created by tangxx3 on 2015/5/12.
 */
var express = require('express');
var router = express.Router();
var constants=require('../service/common/constants');
var formidable=require('formidable');
var util=require('util');

router.get('/login', function(req, res, next) {
    var userName=req.query.userName;
    var userPwd=req.query.userPwd;

    if (userName=="admin@163.com"&&userPwd=="admin"){
        res.render('developer/manage', { title: '玄魂的测试代码',staticResourceUrl: constants.staticResourceHost}) ;
    }else{
        res.render('admin/login', { title: '玄魂的测试代码',
            staticResourceUrl: constants.staticResourceHost});
    }
});
router.get('/manage', function(req, res, next) {
    res.render('developer/manage', { title: '玄魂的测试代码',
        staticResourceUrl: constants.staticResourceHost,
        mClass:"manage"
    });
});


router.get('/upload', function(req, res, next) {
    res.render('developer/upload', { title: '文件上传',
        staticResourceUrl: constants.staticResourceHost,
        mClass:"upload"
    });
});


router.post('/uploadFile',function(req,res,next){
    var form=new formidable.IncomingForm();

    console.log("文件默认属性：");
    form.parse(req,function(err,fields,files){
        res.send("已经成功上传文件:"+files!=null?files.uploadFile.name:"");
    });

})

module.exports = router;