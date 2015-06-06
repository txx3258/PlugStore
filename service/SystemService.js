/**
 * Created by soft_tangxiaoxian on 15/5/30.
 */
var mysql = require('./common/database').mysql;
var sql = require('./sql/Admin');
var utils = require('./common/utils');
var render = require('./render/system');
var constants=require('./common/constants');
var ejs=require("ejs");
var fs=require("fs");
var security=require('./SecurityService').SecurityService;

function SystemService() {

}

SystemService.prototype.fetchAppListForDev = function (req, res) {
    var status=req.query.status;
    var reg=/^[0-9]$/;
    if (!reg.test(status)){
        res.send('');
        return;
    }

    var _sql = utils.format(sql.develop_applist_select,status);
    var handlers = {
        sql: _sql,
        callback: res,
        handler:appListForDev
    }

    mysql.query(handlers);

    function appListForDev(result, res) {
        if (result && result.length > 0) {
            result.forEach(function(app){

                //调整日期
                app.app_publishdate=utils.convertDate(app.app_publishdate);
            })

            fs.readFile(constants.PART_VIEW+"appTableView.ejs",'utf8',function(err,data){
                if (err){
                    res.send('appTableView.ejs error');
                }else{
                    res.send(ejs.render(data.toString(),{apps:result}));
                }
            })
        } else {
            res.send('暂无数据!');
        }
    }
}


SystemService.prototype.fetchAppHost = function (req, res) {
    var _sql = sql.hostAppName_Select;

    var handlers = {
        sql: _sql,
        callback: res,
        handler: appHost
    }

    mysql.query(handlers);

    function appHost(result, res) {
        if (result && result.length > 0) {
            fs.readFile(constants.PART_VIEW+"hostApp.ejs",'utf8',function(err,data){
                if (err){
                    res.send('hostApp.ejs error');
                }else{
                    res.send(ejs.render(data.toString(),{hostApps:result}));
                }
            })
        } else {
            res.send('database error');
        }
    }
}

SystemService.prototype.fetchAppType=function(req,res){
    var _sql = sql.appTypeInfo_Select;


    var handlers = {
        sql: _sql,
        callback: res,
        handler: appType
    }

    mysql.query(handlers);

    function appType(result, res) {
        if (result && result.length > 0) {
            fs.readFile(constants.PART_VIEW+"appType.ejs",'utf8',function(err,data){
                if (err){
                    res.send('appType.ejs error');
                }else{
                    res.send(ejs.render(data.toString(),{apptypes:result}));
                }
            });
        } else {
            res.send('database error');
        }
    }
}

SystemService.prototype.queryAppListForDev = function (req, res) {
    var appname=req.query.appname;
    if (appname.length==0){
        res.send('暂无数据!');
        return;
    }

    var _sql = utils.format(sql.query_dev_applist_select,appname);
    var handlers = {
        sql: _sql,
        callback: res,
        handler:appListForDev
    }

    mysql.query(handlers);

    function appListForDev(result, res) {
        if (result && result.length > 0) {
            result.forEach(function(app){
                //调整日期
                app.app_publishdate=utils.convertDate(app.app_publishdate);
            })

            fs.readFile(constants.PART_VIEW+"appTableView.ejs",'utf8',function(err,data){
                if (err){
                    res.send('appTableView.ejs error');
                }else{
                    res.send(ejs.render(data.toString(),{apps:result}));
                }
            })
        } else {
            res.send('暂无数据!');
        }
    }

}

SystemService.prototype.checkLogin=function(req,res){
    var url=req.body.redirect;
    var backup=req.body.backup;
    try {
        var registerName = req.body.registerName;
        var password = req.body.password;

        registerName = registerName.replace(/~|@|#|^|&|\(|\)|and|or|'|"|=/g, '');
        password = password.replace(/~|@|#|^|&|\(|\)|and|or|'|"|=/g, '');

        var _sql = utils.format(sql.checkUser, registerName, password);

    } catch (e) {
        res.redirect(backup);
        return;
    }

    var handlers = {
        sql: _sql,
        callback: res,
        handler: checkUser
    }

    mysql.query(handlers);

    function checkUser(result, res) {
        if (result && result[0]['count'] == 1) {
            req.session.secret=security.sign(result[0].type);
            
            res.redirect(url);
        } else {
            res.redirect(backup);
        }
    }
}


module.exports.SystemService = new SystemService;