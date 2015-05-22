/**
 * Created by tangxx3 on 2015/5/12.
 */
var express = require('express');
var router = express.Router();
var constants=require('../service/common/constants');

router.get('/', function(req, res, next) {
    res.render('admin/login', { title: '玄魂的测试代码',staticResourceUrl: constants.staticResourceHost});
});

router.get('/login', function(req, res, next) {
    res.render('admin/login', { title: '玄魂的测试代码',staticResourceUrl: constants.staticResourceHost});
});
router.post('/manage', function(req, res, next) {
    res.render('admin/manage', { title: '玄魂的测试代码',staticResourceUrl: constants.staticResourceHost});
});
router.get('/manage', function(req, res, next) {
    res.render('admin/manage', { title: '玄魂的测试代码',staticResourceUrl: constants.staticResourceHost});
});

module.exports = router;