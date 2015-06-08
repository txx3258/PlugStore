/**
 * Created by tangxx3 on 2015/5/12.
 */
var express = require('express'),
    router = express.Router(),
    constants=require('../service/common/constants'),
    adminService=require('../service/AdminService').AdminService,
    render=require('../service/render/Admin');


/***********************************登录管理***********************************************/
router.get('/', function(req, res, next) {
    render.login(res);
});



router.get('/login', function(req, res, next) {
    var code =req.query.code,
        message='';

    if(code=='NOT_PASS'){
        message='用户名或密码错误！'
    }

    render.login(res,message);
  //  res.send('hello');
});


/***********************************统计管理***********************************************/

router.get('/manage', function(req, res, next) {
    res.render('admin/manage', { title: '后台管理',
        staticResourceUrl: constants.staticResourceHost,
        mClass:"manage"
    });
});

/***********************************评论管理***********************************************/

router.get('/comment', function(req, res, next) {
    res.render('admin/comment', { title: '评论管理',
        staticResourceUrl: constants.staticResourceHost,
        mClass:"comment"
    });
});

/***********************************流程管理***********************************************/

router.get('/flower', function(req, res, next) {
    res.render('admin/flower', { title: '流程审批',
        staticResourceUrl: constants.staticResourceHost,
        mClass:"flower"
    });
});

router.get('/flower_developer', function(req, res, next) {

    adminService.fetchDevUsers(req,res);
});

router.get('/flower_app', function(req, res, next) {

    adminService.fetchFlowerApp(req,res);
});




/***********************************榜单管理***********************************************/

router.get('/list', function(req, res, next) {
    res.render('admin/list', { title: '榜单管理',
        staticResourceUrl: constants.staticResourceHost,
        mClass:"list"
    });
});

router.get('/list', function(req, res, next) {
    res.render('admin/list', { title: '榜单管理',
        staticResourceUrl: constants.staticResourceHost,
        mClass:"list"
    });
});

/***********************************布局管理***********************************************/

router.get('/layout', function(req, res, next) {
    res.render('admin/layout', { title: '布局管理',
        staticResourceUrl: constants.staticResourceHost,
        mClass:"layout"
    });
});

router.get('/layout_hostapp', function(req, res, next) {

    adminService.fetchHostApp(req,res);
});

module.exports = router;