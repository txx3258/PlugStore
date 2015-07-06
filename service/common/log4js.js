/**
 * Created by soft_tangxiaoxian on 15/7/5.
 */
var log4js = require('log4js');

/**
 * 配置信息
 */
log4js.configure({
    appenders: [
        {
            type: 'console'
        },{
            type: 'file',
            filename: 'logs/access.log',
            maxLogSize: 1024,
            backups:4,
            category: 'normal'
        },{
            type: 'dateFile',
            filename: 'logs/remote-http.log',
            maxLogSize: 1024,
            backups:4,
            category: 'remote-http'
        },{
            type: 'dateFile',
            filename: 'logs/db-mysql.log',
            maxLogSize: 1024,
            backups:4,
            category: 'db-mysql'
        }
    ],
    "levels":{ "logInfo": "INFO"},
    replaceConsole: true
});


exports.info=function(name,info){
    var logger = log4js.getLogger(name);

    logger.info(info);
}

exports.infoRemoteHttp=function(info){
    var logger = log4js.getLogger("remote-http");
    logger.info(info);
}

exports.warnRemoteHttp=function(warn){
    var logger = log4js.getLogger("remote-http");

    logger.warn(warn);
}

exports.infoDbMql=function(info){
    var logger = log4js.getLogger("db-mysql");

    logger.info(info);
}

exports.warnDbMql=function(warn){
    var logger = log4js.getLogger("db-mysql");

    logger.warn(warn);
}
