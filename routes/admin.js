/**
 * Created by tangxx3 on 2015/5/12.
 */
var express = require('express');
var router = express.Router();
var constants=require('../service/common/constants');

router.get('/', function(req, res, next) {
    res.render('admin/login', { title: '后台管理登录',
        staticResourceUrl: constants.staticResourceHost,
        message:"",
        error:false
    });
});

router.get('/login', function(req, res, next) {
    res.render('admin/login', { title: '后台管理登录',
        staticResourceUrl: constants.staticResourceHost,
        message:"",
        error:false
    });
});

router.post('/manage', function(req, res, next) {
    var userName=req.body.userName;
    var userPwd=req.body.userPwd;

    if (userName=="admin@163.com"&&userPwd=="admin"){
        res.render('admin/manage', { title: '后台管理',
            staticResourceUrl: constants.staticResourceHost,
            mClass:"comment"
        }) ;
    }else{
        res.render('admin/login', { title: '玄魂的测试代码',
            staticResourceUrl: constants.staticResourceHost,
            message:"用户名或密码错误！",
            error:true
        });
    }

});

router.get('/manage', function(req, res, next) {
    res.render('admin/manage', { title: '后台管理',
        staticResourceUrl: constants.staticResourceHost,
        mClass:"manage"
    });
});

router.get('/comment', function(req, res, next) {
    res.render('admin/comment', { title: '评论管理',
        staticResourceUrl: constants.staticResourceHost,
        mClass:"comment"
    });
});


router.get('/flower', function(req, res, next) {
    res.render('admin/flower', { title: '流程审批',
        staticResourceUrl: constants.staticResourceHost,
        mClass:"flower"
    });
});

router.get('/list', function(req, res, next) {
    res.render('admin/list', { title: '榜单管理',
        staticResourceUrl: constants.staticResourceHost,
        mClass:"list"
    });
});

router.get('/layout', function(req, res, next) {
    res.render('admin/layout', { title: '布局管理',
        staticResourceUrl: constants.staticResourceHost,
        mClass:"layout"
    });
});

module.exports = router;