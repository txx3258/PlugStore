/**
 * Created by tangxx3 on 2015/5/5.
 */
var utils = require('./utils');
var constants = require('./constants');
var security=require('../SecurityService').SecurityService;

function validateLogin(req,res,next){

    if (req.url.indexOf('/login')!=-1||req.url.indexOf('/register')!=-1){
        return next();
    }

    var role=security.unsign(req.session.secret);


    if (role&&role>=1){
        return next();
    }else if (req.url.indexOf('/developer')==0){
        return res.redirect('/developer/login');
    }else if (req.url.indexOf('/admin')==0){
        return res.redirect('/admin/login');
    }else{
        return res.send("wrong url");
    }
}

function validateParam(req, res, next) {
    var params = req.body;

    if (check(params)) {
        next();
    }

    function check(params) {
        if (!params) {
            throw new Error({status: 400, code: 'AMS-400', message: 'Invalid request.非法请求！'});
        }
        if (!utils.NotEmpty(params.appId)
            || !utils.NotEmpty(params.reqId)
            || !utils.NotEmpty(params.signature)) {
            throw new Error({status: 400, code: 'AMS-400', message: 'Invalid request.非法请求！'});
        }
        return true;
    }
}

function handleResult(req, res, next) {
    var result = {};

    if (result["success"] === true) {
        result["success"] = true;
        result["code"] = '';
        result["msg"] = '';
        result["data"] = req.data ? req.data : {};
    } else if (result["success"] === false) {
        result["success"] = false;
        result["code"] = req.code ? req.code : 'UNKNOWN';
        result["msg"] = req.msg ? req.msg : 'UNKNOWN';
        ;
        result["data"] = req.data ? req.data : {};
    } else {
        res.status(404);
        result = {
            status: 404,
            code: 'AMS-404',
            message: 'Not Find'
        }
    }

    res.json(result)
}

function handleError(err, req, res, next) {

    //res.status(err.status);
    //res.render('error', {
    //    message: "error",
    //    error: err
    //});

    res.send("error");
}

function handleNotURL(req, res, next) {
    res.status(404);
    var result = {
        status: 404,
        code: 'AMS-404',
        message: 'Not Find'
    }

    res.send(JSON.stringify(result));
}

function handleFavicon(req, res, next) {
    if (req.url == '/favicon.ico') {
        res.end('');
    } else {
        next();
    }
}

module.exports.handleFavicon = handleFavicon;
module.exports.handleNotURL = handleNotURL;
module.exports.handleResult = handleResult;
module.exports.handleError = handleError;
module.exports.validateParam = validateParam;
module.exports.validateLogin=validateLogin;