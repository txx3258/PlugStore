/**
 * Created by soft_tangxiaoxian on 15/5/30.
 */
var mysql = require('./common/database').mysql;
var sql = require('./sql/Admin');
var utils = require('./common/utils');
var render = require('./render/system');
var constants=require('./common/constants');
var logger=require('./common/log4js');
var ejs=require("ejs");
var fs=require("fs");
var security=require('./SecurityService').SecurityService;
var HTTP = require('./common/singleton').HTTP;

function SystemService() {

}

SystemService.prototype.fetchAppListForDev = function (req, res) {
    var status=req.query.status,
        devID=req.session.userId;
    var reg=/^[0-9]$/;
    if (!reg.test(status)){
        res.send('');
        return;
    }

    var _sql = utils.format(sql.develop_applist_select,status,devID);
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
                app.icon_addr=constants.ICON_URL+app.icon_addr;
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

SystemService.prototype.fetchAppHostType = function (req, res) {
    var _sql = sql.hostAppType_Select;

    var handlers = {
        sql: _sql,
        callback: res,
        handler: appHost
    }

    mysql.query(handlers);

    function appHost(result, res) {
        if (result && result.length > 0) {
            fs.readFile(constants.PART_VIEW+"hostAppType.ejs",'utf8',function(err,data){
                if (err){
                    res.send('hostApp.ejs error');
                }else{
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


                    res.send(ejs.render(data.toString(),{hostApps:rtn}));
                }
            })
        } else {
            res.send('database error');
        }
    }
}


SystemService.prototype.fetchAppType=function(req,res){
    var query=req.query,
        hostapp_id=query.hostapp_id,
        typecode=query.typecode;

    if (hostapp_id==undefined){
        var _sql = sql.appTypeInfo_Select;
    }else{
        var _sql =utils.format(sql.appHostTypeInfo_Select,hostapp_id);
    }

    if (typecode==undefined){
        var TYPE_VIEW="appType.ejs";
    }else{
        var TYPE_VIEW="appTypeCode.ejs";
    }

    var handlers = {
        sql: _sql,
        callback: res,
        handler: appType
    }

    mysql.query(handlers);

    function appType(result, res) {
        if (result && result.length > 0) {
            fs.readFile(constants.PART_VIEW+TYPE_VIEW,'utf8',function(err,data){
                if (err){
                    res.send('appType.ejs error');
                }else{
                    res.send(ejs.render(data.toString(),{apptypes:result}));
                }
            });
        } else {
            res.send('暂无类别');
        }
    }
}

SystemService.prototype.queryAppListForDev = function (req, res) {
    var appname=req.query.appname,
        devID=req.sessionID.userId;
    if (appname==undefined||appname.length==0){
        res.send('查询名称不正确!');
        return;
    }

    var _sql = utils.format(sql.query_dev_applist_select,appname,devID);
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

        registerName = registerName.replace(/~|#|^|&|\(|\)|and|or|'|"|=/g, '');
        password = password.replace(/~|@|#|^|&|\(|\)|and|or|'|"|=/g, '');

        var params={
            url:constants.ACCOUNT_API+"Services/User/SignIn",
            method:'POST',
            form: {
                email:registerName,
                password:password
            },
            json: true
        }

        HTTP.request(params,handleLogin,res);

        function handleLogin(res,result){
            if (result&&result.success==true){
                var data=result.data;

                req.session.token=data.token;
                req.session.userId=data.userId;
                req.session.registerName=registerName;
                req.session.nickname=data.nickname;
                req.session.secret=security.sign(data.t);

                res.redirect(url);
            }else{
                res.redirect(backup);
            }
        }
    } catch (e) {
        res.redirect(backup);
    }
}

SystemService.prototype.putDeveloperBaseInfo=function(req,res){
    var body=req.body;

    var registerName=body.registerName,
        password=utils.MD5(body.password),
        name=body.name,
        email=body.email,
        qq=body.qq,
        wechat=body.wechat,
        phone=body.phone,
        certificate_type=body.certificate_type,
        certificate_no=body.certificate_no,
        remark=body.remark,
        nickname=body.nickname;

    var _sql = utils.format(sql.developer_register_Insert,registerName,password,name,email,qq
        ,wechat,phone,certificate_type,certificate_no,remark,nickname,utils.convertDate(new Date()),'1','0');

    var handlers = {
        sql: _sql,
        callback: res,
        handler: developerBaseInfo
    };

    mysql.query(handlers);

    function developerBaseInfo(result, res) {
        if (result && result.affectedRows==1) {
            console.log('success');
        } else {
            console.log('fail');
        }
        res.redirect(constants.INDEX);
    }

}

SystemService.prototype.deleteTable=function(req,res){
    var id=req.query.id,
        table=req.query.table,
        col_id=req.query.col_id;

    var _sql = utils.format(sql.delete_table,table,col_id,id);

    var handlers = {
        sql: _sql,
        callback: res,
        handler: delTable
    };

    mysql.query(handlers);

    function delTable(result, res) {
        if (result && result.affectedRows==1) {
            console.log('success');
        } else {
            console.log('fail');
        }
        res.send('');
    }

}

SystemService.prototype.registerUser=function(req,res){
    var query=req.query;

    var params = {
        url: constants.ACCOUNT_API+"/Services/User/register",
        method: 'POST',
        form: {
            email:query.email,
            nickname:query.nickname,
            password:query.password,
            paypwd:query.paypwd,
            phone:query.phone,
            realname:query.realname,
            cardno:query.cardno
        },
        json: true
    }

    logger.info('registerUser',params.url);

    HTTP.request(params, handleRegister, res);

    function handleRegister(res,result){
        logger.infoRemoteHttp('handleRegister:'+result);

        if (result&&result.success==true){
            res.send('账号注册成功！开始尝试一下客户端软件吧');
        }else{
            res.send(result.message);
        }
    }
}

SystemService.prototype.addreview=function(req,res){
    var token=req.session.token,
        query=req.query;
    if (!token){
        res.send('请登录后在评论！');
        return;
    }

    var tokens='&token='+req.session.token;
    var param=utils.builderParams(query);

    var params = {
        url: constants.COMMENT_API+"api/addreview?"+param+tokens,
        method: 'GET'
    }
    logger.info('addreview',params.url);

    HTTP.request(params, handleReview, res);

    function handleReview(res,result){
        logger.infoRemoteHttp('handleReview:'+result);

        if (!result){
            res.send('请重新登录，登录时间过期！');
            return;
        }

        try{
            var json=JSON.parse(result);
            if(json.success==true){
                fs.readFile(constants.PART_VIEW+"commentReply.ejs",'utf8',function(err,data){
                    if (err){
                        res.send('系统繁忙，回复失败！');
                    }else{
                        res.send(ejs.render(data.toString(),{reply:json.data.model,count:Math.floor(Math.random(47)*10000)}));
                    }
                })
            }else{
                res.send('请重新登录，登录时间可能过期！');
            }
        }catch (e){
            res.send('系统繁忙，回复失败！');
        }
    }
}


SystemService.prototype.addcomment=function(req,res){
    var token=req.session.token,
        query=req.query;

    if (!token){
        res.send('请登录后在评论！');
        return
    }

    var tokens='&token='+req.session.token;
    var param=utils.builderParams(query);
    var params = {
        url: constants.COMMENT_API+"api/addcomment?"+param+tokens,
        method: 'GET'
    }

    logger.info('addcomment',params.url);

    HTTP.request(params, handleComment, res);

    function handleComment(res,result){
        logger.infoRemoteHttp('handleComment:'+result);

        if (!result){
            res.send('请重新登录，登录时间过期！');
            return;
        }

        try{
            var json=JSON.parse(result);
            if(json.success==true){
                fs.readFile(constants.PART_VIEW+"commentComment.ejs",'utf8',function(err,data){
                    if (err){
                        res.send('系统繁忙，添加评论失败！');
                    }else{
                        res.send(ejs.render(data.toString(),{comment:json.data.model,count:Math.floor(Math.random(47)*10000)}));
                    }
                })
            }else{
                res.send('请重新登录，登录时间可能过期！');
            }
        }catch (e){
            res.send('系统繁忙，回复失败！');
        }
    }
}

module.exports.SystemService = new SystemService;