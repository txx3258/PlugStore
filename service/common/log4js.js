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
            category: 'access-url'
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
    "levels":{ "logInfo": "DEBUG"},  //INFO  debug
    replaceConsole: true
});

exports.logger=function(){
    var log = log4js.getLogger("access-url");

    return log4js.connectLogger(log, {level:'info', format:':method :url'});
}

exports.infoRemoteHttp=function(info){
    var logger = log4js.getLogger("remote-http");
    logger.info(info);
}

exports.debugRemoteHttp=function(info){
    var logger = log4js.getLogger("remote-http");

    logger.debug(info);
}

exports.warnRemoteHttp=function(warn){
    var logger = log4js.getLogger("remote-http");

    logger.warn(warn);
}

exports.debugDbMql=function(info){
    var logger = log4js.getLogger("db-mysql");

    logger.debug(info);
}

exports.infoDbMql=function(info){
    var logger = log4js.getLogger("db-mysql");

    logger.info(info);
}

exports.warnDbMql=function(warn){
    var logger = log4js.getLogger("db-mysql");

    logger.warn(warn);
}
