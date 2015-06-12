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


AdminService.prototype.fetchListApp = function (req, res) {
    var query=req.query,
        type=query.type,
        ejsView=query.ejsView;

    var _sql = utils.format(sql.list_app_Select, type);

    var handlers = {
        sql: _sql,
        callback: res,
        handler: listApp
    }

    mysql.query(handlers);

    function listApp(result, res) {
        if (result && result.length > 0) {

            result.forEach(function(app){
                //调整日期
                app.app_publishdate=utils.convertDate(app.app_publishdate);

            })

            fs.readFile(constants.PART_VIEW+ejsView,'utf8',function(err,data){
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

AdminService.prototype.fetchAppTypeRoot = function (req, res) {
    var _sql = sql.appTypeRoot_Select;

    var handlers = {
        sql: _sql,
        callback: res,
        handler: appTypeRoot
    }

    mysql.query(handlers);

    function appTypeRoot(result, res){
        if (result && result.length > 0) {

            fs.readFile(constants.PART_VIEW+"layout_apptyperoot.ejs",'utf8',function(err,data){
                if (err){
                    res.send('');
                }else{
                    res.send(ejs.render(data.toString(),{apptypeRoots:result}));
                }
            })
        } else {
            res.send('');
        }
    }

};
AdminService.prototype.editAppTypeRoot = function (req, res) {
    var query = req.query,
        id = query.id,
        code = query.code,
        name = query.name;

    var _sql = utils.format(sql.appTypeRoot_Update, code, name, id);

    var handlers = {
        sql: _sql,
        callback: res,
        handler: appTypeRoot
    }

    mysql.query(handlers);

    function appTypeRoot(result, res) {
        if (result && result.affectedRows == 1) {
            res.send('更新成功！');
        } else {
            res.send('更新失败！');
        }
    }
};


AdminService.prototype.addAppTypeRoot = function (req, res) {
    var query = req.query,
        code = query.code,
        name = query.name;

    var _sql = utils.format(sql.appTypeRoot_Insert, code, name,'-1');

    var handlers = {
        sql: _sql,
        callback: res,
        handler: hostApp
    }

    mysql.query(handlers);

    function hostApp(result, res) {
        if (result && result.affectedRows == 1) {
            res.send('添加成功！');
        } else {
            res.send('添加失败！');
        }
    }
};

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
                if (hostAppName&&hostAppName.length>35){
                    app.hostAppName=hostAppName.substring(0,35)+"...";
                }
                app["hostAppNameFull"]=hostAppName;

                var hostPackageName=app.hostPackageName;
                if (hostPackageName&&hostPackageName.length>35){
                    app.hostPackageName=hostPackageName.substring(0,35)+"...";
                }
                app["hostPackageNameFull"]=hostPackageName;

                var own_version=app.own_version;
                if (own_version&&own_version.length>35){
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


AdminService.prototype.fetchChooseListApp = function (req, res) {
    var query=req.query,
        type=query.type;

    var _sql = utils.format(sql.list_choose_Select,type);

    var handlers = {
        sql: _sql,
        callback: res,
        handler: chooseListApp
    }

    mysql.query(handlers);

    function chooseListApp(result, res) {
        if (result && result.length > 0) {
            result.forEach(function(app){
                //调整日期
                app.app_publishdate=utils.convertDate(app.app_publishdate);
            })

            fs.readFile(constants.PART_VIEW+"list_choose.ejs",'utf8',function(err,data){
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

AdminService.prototype.editHostApp = function (req, res) {
    var query=req.query,
        id=query.id,
        hostAppName=query.hostAppName,
        hostPackageName=query.hostPackageName,
        own_version=query.own_version;

    var _sql = utils.format(sql.hostAppName_Update,hostAppName,hostPackageName,own_version,id);

    var handlers = {
        sql: _sql,
        callback: res,
        handler: hostApp
    }

    mysql.query(handlers);

    function hostApp(result, res) {
        if (result && result.affectedRows==1) {
            res.send('更新成功！');
        } else {
            res.send('更新失败！');
        }
    }
};

AdminService.prototype.addHostApp = function (req, res) {
    var query=req.query,
        hostAppName=query.hostAppName,
        hostPackageName=query.hostPackageName,
        own_version=query.own_version;

    var _sql = utils.format(sql.hostAppName_Insert,hostAppName,hostPackageName,own_version);

    var handlers = {
        sql: _sql,
        callback: res,
        handler: hostApp
    }

    mysql.query(handlers);

    function hostApp(result, res) {
        if (result && result.affectedRows==1) {
            res.send('添加成功！');
        } else {
            res.send('添加失败！');
        }
    }
};


AdminService.prototype.addListApp = function (req, res) {
    var query=req.query,
        type=query.type,
        uid=query.uid;

    var order=Math.floor(Math.random(30)*100);


    if (uid instanceof Array){
        var uids=uid.map(function(id){
            return  utils.format(sql.list_app_Insert,id,type,'1',order);
        });

        addMutiAppList(uids);
    }else{
        var _sql = utils.format(sql.list_app_Insert,uid,type,'1',order);
        addOneAPPList(_sql);
    }

    function addMutiAppList(_sqls){
        var handlers = {
            sql: _sqls,
            callback: res,
            handler: listApp
        }

        mysql.queryArrays(handlers);

        function listApp(result, res) {
            if (result) {
                res.send('添加成功！');
            } else {
                res.send('添加失败！');
            }
        }
    }

    function addOneAPPList(_sql){

        var handlers = {
            sql: _sql,
            callback: res,
            handler: listApp
        }

        mysql.query(handlers);

        function listApp(result, res) {
            if (result && result.affectedRows==1) {
                res.send('添加成功！');
            } else {
                res.send('添加失败！');
            }
        }
    }

};



module.exports.AdminService = new AdminService;