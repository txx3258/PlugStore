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
var HTTP=require('./common/singleton').HTTP;
var ejs=require("ejs");

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
        apptype_id=-1;

    if (body.support_version instanceof Array){
        support_version=body.support_version.join(';');
    }else{
        support_version=body.support_version;
    }

    var _sql=[];

    var orderNum=Math.floor(Math.random(47)*50);
    if (body.apptype_code instanceof Array){
        apptype_code_sql=body.apptype_code.map(function(code){
            return utils.format(sql.free_newtype_day_Insert,uid,code,orderNum,'1');
        });
        _sql.concat(apptype_code_sql);
    }else{
        apptype_code_sql=utils.format(sql.free_newtype_day_Insert,uid,body.apptype_code,orderNum,'1');
        _sql.push(apptype_code_sql);
    }

    var _sqlBD = utils.format(sql.bimApp_Insert,appname,appEnName,uid,app_info,app_abstract
                            ,app_size,is_pay,app_price
                            ,app_publishdate,app_versioncode,app_version,support_version
                            ,app_status,available,developer_id,hostapp_id,apptype_id);
    _sql.push(_sqlBD);

    var handlers = {
        sql: _sql,
        callback: res,
        handler: plugInfo
    };

    mysql.queryArrays(handlers);

    function plugInfo(result, res) {
        console.log(JSON.stringify(result));
        if (result) {
            res.send('success');
        } else {
            res.send('failed');
        }
    }


    //this.uploadPlugIcon(req,res);
}

DeveloperService.prototype.uploadPlugFile=function(req,res){
    var oThis=this;
    if (oThis.form!=undefined){
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


    oThis.form.parse(req, function(err, fields, files) {
        if (err) {
            res.send('again');
            oThis.form=undefined;
            return;
        }
        var fileName=req.query.fileName;
        var uid=req.query.uid;

        var upload=files["uploadFile"];
        var icon=files["uploadIcon"];
        var filePath=handleFilePath(upload,"_file_",fileName);
        var iconPath=handleFilePath(icon,"_icon_",fileName);


        fs.rename(icon.path, constants.upload_form.upload+DiriconPath,function(err){
            fs.rename(upload.path, constants.icon_form.uploadDir+filePath,function(err){
                res.send(icon.name+"和"+upload.name+":success");

                addFileAndIcon(iconPath,filePath,fileName,uid);

                oThis.form=undefined;

                oThis.bytesReceived=1;
                oThis.bytesExpected=1;

            });
        });

        function handleFilePath(upload,type,name){
            var pos=upload.name.lastIndexOf('.');
            var fileType=upload.name.substring(pos);

            return name+type+fileType;
        };

        function addFileAndIcon(iconPath,filePath,fileName,uid){
            var icon=constants.developerUploadIconPath+iconPath;
            var plug=constants.developerUploadPlugPath+fileName;

            var _sql = utils.format(sql.app_icon_file_Update, icon, plug,uid,fileName);

            var handlers = {
                sql: _sql,
                callback: null,
                handler: fileAndIcon
            }

            mysql.query(handlers);

            function fileAndIcon(result, res) {}
        }
    });
    this.form.on('progress', function(bytesReceived, bytesExpected) {
        oThis.bytesReceived=parseInt(bytesReceived);
        oThis.bytesExpected=parseInt(bytesExpected);
    });
}

DeveloperService.prototype.queryUploadProgress=function(req,res){
    if (this.form!=undefined){
        console.log(this.bytesReceived+''+this.bytesExpected);
        var percent=Math.floor((this.bytesReceived/this.bytesExpected)*100);

        res.send(percent+"%");
    }else{
        res.send('上传完成!');
    }
}

DeveloperService.prototype.fetchCommentList=function(req,res){

    var params={
        url:"http://119.29.16.116/EmpowerADS/api/commentlist?bizIdentity=12&si=1&c=20",
        method:'GET'
    }

    HTTP.request(params,handleComment,res);

    function handleComment(res,result){
        if (arguments.length==1){
            res.send('暂无评论');
            return;
        }

        var json=JSON.parse(result);
        var success=json.success;
        var dataList=json.data.datalist;

        if (success&&dataList.length>1){
            fs.readFile(constants.PART_VIEW+"developer_comment.ejs",'utf8',function(err,data){
                if (err){
                    res.send('');
                }else{
                    res.send(ejs.render(data.toString(),{datalist:dataList}));
                }
            })
        }else{
            res.send('暂无评论');
        }
    }
}

module.exports.DeveloperService = new DeveloperService;



