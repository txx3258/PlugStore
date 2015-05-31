/**
 * Created by soft_tangxiaoxian on 15/5/30.
 */
var mysql = require('./common/database').mysql;
var sql = require('./sql/Admin');
var utils = require('./common/utils');
var render = require('./render/Admin');
var formidable = require('formidable');
var constants=require('./common/constants');
var fs = require('fs');

function DeveloperService(){

    this.form=undefined;
    this.bytesReceived=undefined;
    this.bytesExpected=undefined;
}

DeveloperService.prototype.uploadPlugInfo=function(req,res){
    var body=req.body;
    var appname=body.appname,
        appEnName=body.appEnName,
        uid=body.uid,
        app_info=body.app_info,
        app_abstract=body.app_abstract,

        app_size=body.app_size,
        is_pay=body.is_pay,
        app_price=body.app_price,

        app_publishdate=body.app_publishdate,
        app_versioncode=body.app_versioncode,
        app_version=body.app_version,

        app_status=1,

        available=1,
        developer_id=body.developer_id,
        hostapp_id=body.hostapp_id,
        apptype_id=body.apptype_id;

    if (body.support_version instanceof Array){
        support_version=body.support_version.join(';');
    }else{
        support_version=body.support_version;
    }

    var _sql = utils.format(sql.bimApp_Insert,appname,appEnName,uid,app_info,app_abstract
                            ,app_size,is_pay,app_price
                            ,app_publishdate,app_versioncode,app_version,support_version
                            ,app_status,available,developer_id,hostapp_id,apptype_id);

    var handlers = {
        sql: _sql,
        callback: res,
        handler: plugInfo
    };

    mysql.query(handlers);

    function plugInfo(result, res) {
        console.log(JSON.stringify(result));
        if (result && result.affectedRows==1) {
            res.send('success');
        } else {
            res.send('failed');
        }
    }


    //this.uploadPlugIcon(req,res);
}



DeveloperService.prototype.uploadPlugFile=function(req,res){
    //if (this.form!=undefined){
    //    res.send("again");
    //    return;
    //}

    //创建上传表单
    this.form = new formidable.IncomingForm();
    //设置编辑
    this.form.encoding = constants.upload_form.encoding;
    //设置上传目录
    this.form.uploadDir = constants.upload_form.uploadDir;
    //保留后缀
    this.form.keepExtensions = constants.upload_form.keepExtensions;
    //文件大小
    this.form.maxFieldsSize = constants.upload_form.maxFieldsSize;


    this.form.parse(req, function(err, fields, files) {
        //if (err) {
        //    res.send('again');
        //    this.form=undefined;
        //    return;
        //}
        var fileName=req.query.fileName;

        var upload=files["uploadFile"];
        var icon=files["uploadIcon"];
        var filePath=handleFilePath(upload,"_file_",fileName,constants.upload_form.uploadDir);
        var iconPath=handleFilePath(icon,"_icon_",fileName,constants.icon_form.uploadDir);


        fs.rename(icon.path, iconPath,function(err){
            fs.rename(upload.path, filePath,function(err){
                console.log(filePath+err);
                res.send(icon.name+"和"+upload.name+":success");
                //this.form=undefined;

                this.bytesReceived=1;
                this.bytesExpected=1;

            });
        });

        function handleFilePath(upload,type,name,path){
            var pos=upload.name.lastIndexOf('.');
            var fileType=upload.name.substring(pos);

            return path+name+type+fileType;
        };

    });
    this.form.on('progress', function(bytesReceived, bytesExpected) {
        this.bytesReceived=bytesReceived;
        this.bytesExpected=bytesExpected;
    });
}


DeveloperService.prototype.queryUploadProgress=function(req,res){
    if (this.form!=undefined){
        res.send(Math.floor((new Number(this.bytesReceived)/new Number(this.bytesExpected))*100)+"%");
    }else{
        res.send('上传完成!');
    }
}


module.exports.DeveloperService = new DeveloperService;




//var express = require('express');
//    router = express.Router(),
//    formidable = require('formidable'),
//        fs = require('fs'),
//        TITLE = 'formidable上传示例',
//        AVATAR_UPLOAD_FOLDER = '/avatar/'
//        /* GET home page. *   */
//        router.get('/', function(req, res) {
//            res.render('index', { title: TITLE });
//        }});
//        router.post('/', function(req, res) {
//
//
//             form.parse(req, function(err, fields, files) {
//                 if (err) {
//                     res.locals.error = err;
//                     res.render('index', { title: TITLE });
//                     return;
//                 }
//                 var extName = '';
//                 //后缀名
//                 switch (files.fulAvatar.type) {
//                     case 'image/pjpeg':extName = 'jpg';				break;
//                     case 'image/jpeg':				extName = 'jpg';				break;
//                     case 'image/png':				extName = 'png';				break;
//                     case 'image/x-png':				extName = 'png';				break;
//                 }
//                 if(extName.length == 0){
//                     res.locals.error = '只支持png和jpg格式图片';
//                     res.render('index', { title: TITLE });
//                     return;
//                 }
//                 var avatarName = Math.random() + '.' + extName;
//                 var newPath = form.uploadDir + avatarName;
//                 console.log(newPath);
//                 fs.renameSync(files.fulAvatar.path, newPath);
//                 //重命名
//                 });
//            res.locals.success = '上传成功';
//            res.render('index', { title: TITLE });	});
//module.exports = router;


