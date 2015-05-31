/**
 * Created by soft_tangxiaoxian on 15/5/30.
 */
var mysql = require('./common/database').mysql;
var sql = require('./sql/Admin');
var utils = require('./common/utils');
var render = require('./render/Admin');
var constants=require('./common/constants');
var ejs=require("ejs");
var fs=require("fs");

function SystemService() {

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




module.exports.SystemService = new SystemService;