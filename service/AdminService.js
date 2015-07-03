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
var formidable=require('formidable');
var async=require('async');

function AdminService() {
    this.form=undefined;
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
};

AdminService.prototype.addFlowerSubmit=function(req,res){
    var query=req.query,
        id=query.id,
        table=query.table,
        col_id=query.col_id,
        up_col=query.up_col,
        flower=query.flower;

    var _sql = utils.format(sql.flowerSubmit_Update, table, up_col,flower,col_id,id);

    var handlers = {
        sql: _sql,
        callback: res,
        handler: flowerSubmit
    }

    mysql.query(handlers);

    function flowerSubmit(result, res) {
        if (result && result.affectedRows == 1) {
            res.send('操作成功！');
        } else {
            res.send('操作失败！');
        }
    }
};

AdminService.prototype.fetchListApp = function (req, res) {
    var query=req.query,
        type=query.type,
        other=query.other,
        ejsView=query.ejsView;


    if (other!=undefined){
        var _sql = utils.format(sql.list_app_other_Select, '1',type);
    }else{
        var _sql = utils.format(sql.list_app_Select, type);
    }



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
            res.send('已无可选的插件！');
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
        if (result) {

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
    var _sql = sql.hostAppType_Select;

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

            });

            var map={},rtn=[],j=0;
            for(var i in result){
                var obj=map[result[i].id];
                if (obj==undefined){
                    map[result[i].id]=j;
                    rtn[j++]=result[i];
                }else{
                    rtn[obj].name+=';'+result[i].name;
                }
            }

            fs.readFile(constants.PART_VIEW+"layout_hostapp.ejs",'utf8',function(err,data){
                if (err){
                    res.send('');
                }else{
                    res.send(ejs.render(data.toString(),{hostApps:rtn}));
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
        if (result) {
            result.forEach(function(app){
                //调整日期
                app.app_publishdate=utils.convertDate(app.app_publishdate);
                app.icon_addr=constants.ICON_URL+app.icon_addr;
            })

            fs.readFile(constants.PART_VIEW+"list_choose.ejs",'utf8',function(err,data){
                if (err){
                    res.send('list_choose.ejs error');
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
        own_version=query.own_version,
        apptype_id=query.apptype_id,
        app_product_id=query.app_product_id,
        maxID=query.maxID;
    var _sql=[];

    var _sqlHostApp = utils.format(sql.hostAppName_Update,hostAppName,hostPackageName,own_version,app_product_id,maxID);
    _sql.push(_sqlHostApp);

    var _sqlTypeAppDelete = utils.format(sql.appTypeList_Delete,maxID);
    _sql.push(_sqlTypeAppDelete);
    if (apptype_id instanceof Array){
        var _sqlTypeAppInsert = apptype_id.map(function(id){
            return utils.format(sql.appTypeList_Insert,maxID,id,'1');
        });

        _sql=_sql.concat(_sqlTypeAppInsert);
    }else if (apptype_id!=undefined){
        var _sqlTypeApp = utils.format(sql.appTypeList_Insert,maxID,apptype_id,'1');
        _sql.push(_sqlTypeApp);
    }

    var handlers = {
        sql: _sql,
        callback: res,
        handler: hostApp
    }

    mysql.queryArrays(handlers);

    function hostApp(result, res) {
        if (result) {
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
        own_version=query.own_version,
        apptype_id=query.apptype_id,
        app_product_id=query.app_product_id,
        maxID=query.maxID;
    var _sql=[];

    var _sqlHostApp = utils.format(sql.hostAppName_Insert,hostAppName,hostPackageName,own_version,app_product_id);
    _sql.push(_sqlHostApp);

    if (apptype_id instanceof Array){
        var _sqlTypeApp = apptype_id.map(function(id){
            return utils.format(sql.appTypeList_Insert,maxID,id,'1');
        });

        _sql=_sql.concat(_sqlTypeApp);

    }else if (apptype_id!=undefined){
        var _sqlTypeApp = utils.format(sql.appTypeList_Insert,maxID,apptype_id,'1');
        _sql.push(_sqlTypeApp);

    }

    var handlers = {
        sql: _sql,
        callback: res,
        handler: hostApp
    }

    mysql.queryArrays(handlers);

    function hostApp(result, res) {
        if (result) {
            res.send('添加成功！');
        } else {
            res.send('添加失败！');
        }
    }
};


AdminService.prototype.publishListApp=function(req, res){
    var uids=req.query.uid,
        type=req.query.type;


    var order=1;

    if (type=='list'){
        var _sqls=uids.map(function(uid){
            return  utils.format(sql.list_choose_Update,order++,uid);
        });
    }else if(type=='type'){
        var _sqls=uids.map(function(uid){
            var uidCol=uid.split("@#$!");
            return  utils.format(sql.type_choose_Update,order++,uidCol[0],uidCol[1]);
        });
    }else if (type=='ad'){
        var _sqls=uids.map(function(uid){
            return  utils.format(sql.ad_choose_Update,order++,uid);
        });
    }

    var handlers = {
        sql: _sqls,
        callback: res,
        handler: listApp
    }

    mysql.queryArrays(handlers);

    function listApp(result, res) {
        if (result) {
            res.send('发布成功！');
        } else {
            res.send('发布失败！');
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

AdminService.prototype.chooseListType=function(req, res){

    var _sql=sql.list_choose_type_Select;

    var handlers = {
        sql: _sql,
        callback: res,
        handler: listApp
    }

    mysql.query(handlers);

    function listApp(result, res) {
        if (result) {
            var map={};
            result.forEach(function(app){
                app.app_publishdate=utils.convertDate(app.app_publishdate);

                var hostapp_id=app.hostapp_id;
                var hostAppName= app.hostAppName;

                var key=hostapp_id+"@#$!"+hostAppName;
                var obj=map[key];

                if (obj==undefined){
                    map[key]=[];
                    map[key].push(app);
                }else{
                    map[key].push(app);
                }
            });

            fs.readFile(constants.PART_VIEW+'list_choose_type.ejs','utf8',function(err,data){
                if (err){
                    res.send('');
                }else{
                    res.send(ejs.render(data.toString(),{apps:map}));
                }
            })

        } else {
            res.send('发布失败！');
        }
    }

};

AdminService.prototype.chooseListAd=function(req, res){

    var _sql=sql.list_choose_ad_Select;

    var handlers = {
        sql: _sql,
        callback: res,
        handler: listAd
    }

    mysql.query(handlers);

    function listAd(result, res) {
        if (result) {
            result.forEach(function(ad){
                ad.create_time=utils.convertDate(ad.create_time);
            });

            fs.readFile(constants.PART_VIEW+'list_choose_ad.ejs','utf8',function(err,data){
                if (err){
                    res.send('');
                }else{
                    res.send(ejs.render(data.toString(),{ads:result}));
                }
            })
        } else {
            res.send('发布失败！');
        }
    }

};


AdminService.prototype.chooseListAdAdd=function(req, res){

    var _sql=sql.list_choose_ad_add_Select;

    var handlers = {
        sql: _sql,
        callback: res,
        handler: adAdd
    }

    mysql.query(handlers);

    function adAdd(result, res) {
        if (result) {
            result.forEach(function(ad){
                ad.appimg_path=constants.ICON_URL+ad.appimg_path;
            });

            fs.readFile(constants.PART_VIEW+'list_choose_ad_add.ejs','utf8',function(err,data){
                if (err){
                    res.send('');
                }else{
                    res.send(ejs.render(data.toString(),{ads:result}));
                }
            })
        } else {
            res.send('发布失败！');
        }
    }
};

AdminService.prototype.addListAd=function(req, res) {
    var query=req.query,
        appimg_id=query.appimg_id;
    var sqls=[];

    if (appimg_id instanceof Array){
        for(var i in appimg_id){
            var order=Math.floor(Math.random(50)*100);
            var _appimg_id=appimg_id[i].split("@#$!");
            var _sql=utils.format(sql.list_choose_ad_Insert,_appimg_id[0],_appimg_id[1],_appimg_id[2],utils.convertDate(),order,'1');

            sqls.push(_sql);
        }
    }else{
        var order=Math.floor(Math.random(50)*100);
        var _appimg_id=appimg_id.split("@#$!");

        var _sql=utils.format(sql.list_choose_ad_Insert,_appimg_id[0],_appimg_id[1],_appimg_id[2],utils.convertDate(),order,'1');
        sqls.push(_sql);
    }


    var handlers = {
        sql: sqls,
        callback: res,
        handler: adList
    }

    mysql.queryArrays(handlers)

    function adList(result, res) {
        if (result){
            res.send('添加成功！');
        }else{
            res.send('添加失败！');
        }
    }
}

AdminService.prototype.fetchBimAd=function(req, res) {
    var _sql = sql.bim_ad_Select;

    var handlers = {
        sql: _sql,
        callback: res,
        handler: bimAd
    }

    mysql.query(handlers);

    function bimAd(result,res){
        if (result){
            result.forEach(function(ad){
                ad.appimg_path=constants.ICON_URL+ad.appimg_path;
            })

            fs.readFile(constants.PART_VIEW+'layout_ad.ejs','utf8',function(err,data){
                if (err){
                    res.send('');
                }else{
                    res.send(ejs.render(data.toString(),{ads:result}));
                }
            })
        }else{
            res.send('系统繁忙中……');
        }
    }
};

AdminService.prototype.uploadBimAd=function(req, res) {
    var oThis=this;
    if (oThis.form!=undefined){
        res.send("again");
        return;
    }

    //创建上传表单
    oThis.form = new formidable.IncomingForm();
    //设置编辑
    oThis.form.encoding = constants.ads_form.encoding;
    //设置上传目录
    oThis.form.uploadDir = constants.ads_form.uploadDir;
    //保留后缀
    oThis.form.keepExtensions = constants.ads_form.keepExtensions;
    //文件大小
    oThis.form.maxFieldsSize = constants.ads_form.maxFieldsSize;  //adminUploadAdsPath

    oThis.form.multiples=constants.ads_form.multiples;;


    oThis.form.parse(req, function(err, fields, files) {
        if (err) {
            res.send('again');
            oThis.form = undefined;
            return;
        }

        var appimg_name=fields.appimg_name;
        var adsPath = files["adsPath"];
        if (!adsPath||files.length==0){
            res.send('again');
            return;
        }

        var times=new Date().getTime();

        async.each(adsPath, function(adPath, callback) {
            var pos=adPath.name.lastIndexOf('.');
            var fileType=adPath.name.substring(pos);
            var filePath=times+encodeURIComponent(adPath.name);

            fs.rename(adPath.path, constants.ads_form.uploadDir+filePath,function(err) {
                if (err){
                    callback("rename file error!");
                }

                var _sql = utils.format(sql.bim_ad_Insert,'-1',appimg_name,constants.adminUploadAdsPath+filePath,fileType);
                var handlers = {
                    sql: _sql,
                    callback: callback,
                    handler: uploadAddPath
                }

                mysql.query(handlers);

                function uploadAddPath(result,callback){
                    if (result){
                        callback();
                    }else{
                        callback("write sql error!");
                    }
                }
            });

        }, function(err){
            oThis.form = undefined;
            if( err ) {
                res.send(':error');
            } else {
                res.send(':success');
            }
        });
    });
};

AdminService.prototype.flowerQuery=function(req,res){
    var query=req.query,
        hostNameValue=query.hostNameValue,
        appStatusValue=query.appStatusValue,
        apptypeValue=query.apptype;

    if (apptypeValue instanceof Array){
        apptypeValue=apptypeValue.join(',');
    }

    var _sql = utils.format(sql.flower_query_app_Select,appStatusValue,hostNameValue,apptypeValue);
    var handlers = {
        sql: _sql,
        callback: res,
        handler: flowerApp
    }

    mysql.query(handlers);

    function flowerApp(result,res){
        var map={};
        result.forEach(function(app){
            //调整日期
            app.app_publishdate=utils.convertDate(app.app_publishdate);

        });

        result.forEach(function(app){
            var key=app.appid;
            var obj=map[key];

            if (obj==undefined){
                //map[key]=[];
                app["typename"]=app.name;
                map[key]=app;
            }else{
                var reapp=map[key];
                reapp["typename"]+=","+app.name;
            }
        });

        fs.readFile(constants.PART_VIEW+'flower_query_app.ejs','utf8',function(err,data){
            if (err){
                res.send('');
            }else{
                res.send(ejs.render(data.toString(),{apps:map}));
            }
        });
    }
}


module.exports.AdminService = new AdminService;
