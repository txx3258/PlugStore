/**
 * Created by soft_tangxiaoxian on 15/5/28.
 */
var mysql = require('./common/database').mysql;
var sql = require('./sql/Admin');
var utils = require('./common/utils');
var render = require('./render/Admin');
var constants=require('./common/constants');
var fs=require('fs');
var ejs=require("ejs");

function AdminService() {

}

AdminService.prototype.fetchDevUsers = function (req, res) {
    var _sql = utils.format(sql.bimUser_Select, '1','0');

    var handlers = {
        sql: _sql,
        callback: res,
        handler: devUsers
    }

    mysql.query(handlers);

    function devUsers(result, res) {
        if (result && result.length > 0) {

            result.forEach(function(user){
                //调整日期
                user.registerDate=utils.convertDate(user.registerDate);
                var remark=user.remark;

                if (remark&&remark.length>10){
                    user["remark"]=remark.substring(0,10)+"……";
                }
                user["remarks"]=remark;
            })

            fs.readFile(constants.PART_VIEW+"flower_developer.ejs",'utf8',function(err,data){
                if (err){
                    res.send('');
                }else{
                    res.send(ejs.render(data.toString(),{users:result}));
                }
            })
        } else {
            res.send('');
        }
    }
}


AdminService.prototype.fetchFlowerApp = function (req, res) {
    var _sql = utils.format(sql.flower_app_Select, '0');

    var handlers = {
        sql: _sql,
        callback: res,
        handler: flowerApp
    }

    mysql.query(handlers);

    function flowerApp(result, res) {
        if (result && result.length > 0) {

            result.forEach(function(app){
                //调整日期
                app.app_publishdate=utils.convertDate(app.app_publishdate);

            })

            fs.readFile(constants.PART_VIEW+"flower_app.ejs",'utf8',function(err,data){
                if (err){
                    res.send('');
                }else{
                    res.send(ejs.render(data.toString(),{apps:result}));
                }
            })
        } else {
            res.send('');
        }
    }
}


AdminService.prototype.fetchHostApp = function (req, res) {
    var _sql = sql.hostAppName_Select;

    var handlers = {
        sql: _sql,
        callback: res,
        handler: hostApp
    }

    mysql.query(handlers);

    function hostApp(result, res) {
        if (result && result.length > 0) {

            result.forEach(function(app){
                //调整日期
                var hostAppName=app.hostAppName;
                if (hostAppName.length>35){
                    app.hostAppName=hostAppName.substring(0,35)+"...";
                }
                app["hostAppNameFull"]=hostAppName;

                var hostPackageName=app.hostPackageName;
                if (hostPackageName.length>35){
                    app.hostPackageName=hostPackageName.substring(0,35)+"...";
                }
                app["hostPackageNameFull"]=hostPackageName;

                var own_version=app.own_version;
                if (own_version.length>35){
                    app.own_version=own_version.substring(0,35)+"...";
                }
                app["own_versionFull"]=own_version;

            })

            fs.readFile(constants.PART_VIEW+"layout_hostapp.ejs",'utf8',function(err,data){
                if (err){
                    res.send('');
                }else{
                    res.send(ejs.render(data.toString(),{hostApps:result}));
                }
            })
        } else {
            res.send('');
        }
    }
}






module.exports.AdminService = new AdminService;