/**
 * Created by soft_tangxiaoxian on 15/5/30.
 */
var mysql = require('./common/database').mysql;
var sql = require('./sql/Admin');
var utils = require('./common/utils');
var render = require('./render/Admin');
var formidable = require('formidable');
var constants = require('./common/constants');
var fs = require('fs');
var HTTP = require('./common/singleton').HTTP;
var ejs = require("ejs");

function DeveloperService() {

    this.form = undefined;
    this.bytesReceived = undefined;
    this.bytesExpected = undefined;
}

DeveloperService.prototype.uploadPlugInfo = function (req, res) {
    var body = req.body;
    var appname = body.appname,
        appEnName = body.appEnName,
        uid = body.uid,
        app_info = body.app_info,
        app_abstract = body.app_abstract,

        app_size = body.app_size,
        is_pay = body.is_pay,
        app_price = body.app_price,

        app_publishdate = body.app_publishdate,
        app_versioncode = body.app_versioncode,
        app_version = body.app_version,

        app_status = 0,

        available = 1,
        developer_id = body.developer_id,
        hostapp_id = body.hostapp_id,
        apptype_id = -1;

    if (body.support_version instanceof Array) {
        support_version = body.support_version.join(';');
    } else {
        support_version = body.support_version;
    }

    var _sql = [];

    var orderNum = Math.floor(Math.random(47) * 50);
    if (body.apptype_code instanceof Array) {
        var apptype_code_sql = body.apptype_code.map(function (code) {
            return utils.format(sql.free_newtype_day_Insert, uid, code, orderNum, '1');
        });

        _sql = apptype_code_sql;
    } else {
        apptype_code_sql = utils.format(sql.free_newtype_day_Insert, uid, body.apptype_code, orderNum, '1');
        _sql.push(apptype_code_sql);
    }

    var _sqlBD = utils.format(sql.bimApp_Insert, appname, appEnName, uid, app_info, app_abstract
        , app_size, is_pay, app_price
        , app_publishdate, app_versioncode, app_version, support_version
        , app_status, available, developer_id, hostapp_id, apptype_id);
    _sql.push(_sqlBD);

    var handlers = {
        sql: _sql,
        callback: res,
        handler: plugInfo
    };

    mysql.queryArrays(handlers);

    function plugInfo(result, res) {
        if (result) {
            res.send('success');
        } else {
            res.send('failed');
        }
    }
}

DeveloperService.prototype.uploadPlugFile = function (req, res) {
    var oThis = this;
    if (oThis.form != undefined) {
        res.send("again");
        return;
    }

    //创建上传表单
    oThis.form = new formidable.IncomingForm();
    //设置编辑
    oThis.form.encoding = constants.upload_form.encoding;
    //设置上传目录
    oThis.form.uploadDir = constants.upload_form.uploadDir;
    //保留后缀
    oThis.form.keepExtensions = constants.upload_form.keepExtensions;
    //文件大小
    oThis.form.maxFieldsSize = constants.upload_form.maxFieldsSize;

    oThis.form.parse(req, function (err, fields, files) {
        if (err) {
            res.send('again');
            oThis.form = undefined;
            return;
        }

        var fileName = req.query.fileName;
        var uid = req.query.uid;
        var upload = files["uploadFile"];
        var icon = files["uploadIcon"];
        var filePath = handleFilePath(upload, "_file_", fileName);
        var iconPath = handleFilePath(icon, "_icon_", fileName);


        fs.rename(icon.path, constants.icon_form.uploadDir + iconPath, function (err) {
            if (err) {
                res.send('again');
                oThis.form = undefined;
                return;
            }
            fs.rename(upload.path, constants.upload_form.uploadDir + filePath, function (err) {
                if (err) {
                    res.send('again');
                    oThis.form = undefined;
                    return;
                }

                addFileAndIcon(iconPath, filePath, fileName, uid);

                oThis.form = undefined;
                oThis.bytesReceived = 1;
                oThis.bytesExpected = 1;

                res.send(icon.name + "和" + upload.name + ":success");
            });
        });

        function handleFilePath(upload, type, name) {
            var pos = upload.name.lastIndexOf('.');
            var fileType = upload.name.substring(pos);

            return name + type + fileType;
        };

        function addFileAndIcon(iconPath, filePath, fileName, uid) {
            var icon = constants.developerUploadIconPath + iconPath;
            var plug = constants.developerUploadPlugPath + filePath;

            var _sql = utils.format(sql.app_icon_file_Update, icon, plug, uid, fileName);

            var handlers = {
                sql: _sql,
                callback: null,
                handler: fileAndIcon
            }

            mysql.query(handlers);

            function fileAndIcon(result, res) {
            }
        }
    });

    this.form.on('progress', function (bytesReceived, bytesExpected) {
        oThis.bytesReceived = parseInt(bytesReceived);
        oThis.bytesExpected = parseInt(bytesExpected);
    });
}

DeveloperService.prototype.queryUploadProgress = function (req, res) {
    if (this.form != undefined) {
        console.log(this.bytesReceived + '' + this.bytesExpected);
        var percent = Math.floor((this.bytesReceived / this.bytesExpected) * 100);

        res.send(percent + "%");
    } else {
        res.send('上传完成!');
    }
}

DeveloperService.prototype.fetchCommentList = function (req, res) {
    var appInfo=req.query.appInfo,
        pager=req.query.pager,
        si=parseInt(pager)*10+1

    var params = {
        url: constants.COMMENT_API+"api/commentlist?bizIdentity=12&c=10&si="+si,
        method: 'GET'
    }

    HTTP.request(params, handleComment, res);

    function handleComment(res, result) {
        if (arguments.length == 1) {
            res.send('暂无评论');
            return;
        }

        var json = JSON.parse(result);
        if (json.success==true && json.data.dataList.length > 1) {
            var dataList = json.data.datalist;
            var pager=utils.pager(pager,10,json.data.totalCount,4);
            fs.readFile(constants.PART_VIEW + "developer_comment.ejs", 'utf8', function (err, data) {
                if (err) {
                    res.send('');
                } else {
                    var html=ejs.render(data.toString(), {datalist: dataList})+pager;

                    res.send(html);

                }
            })
        } else {
            res.send('暂无评论');
        }
    }
};

DeveloperService.prototype.fetchComment=function(req,res){
    var userId=req.query.userId;
    var registerName=req.session?req.session.registerName:'';

    var _sql = utils.format(sql.developer_uidfor_comment,userId);

    var handlers = {
        sql: _sql,
        callback: res,
        handler: devUid
    };

    mysql.query(handlers);

    function devUid(result, res) {
        var appInfo='';
        if (result&&result.length>0){
            appInfo=JSON.stringify(result);
        }

        res.render('developer/comment', { title: '我的评论',
            staticResourceUrl: constants.staticResourceHost,
            mClass:"upload",
            registerName:registerName,
            appInfo:appInfo
        });
    }
}


module.exports.DeveloperService = new DeveloperService;



