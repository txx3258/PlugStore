/**
 * Created by tangxx3 on 2015/5/14.
 */
//单例模式处理
var mysql=require('mysql');
var config=require("./constants").mysql;
var async=require("async");

var mysql_pool=(function(){
    var option_mysql={
        connectionLimit :config.connectionLimit,
        host     : config.host,
        user     : config.user,
        password : config.password,
        database : config.database
    }

    function mysql(args) {
        this.pool = require('mysql').createPool(args);
    }

    mysql.prototype.query = function (handlers) {
        if(!this.pool){
            console.log("the mysql username or password is wrong !!!");
            handlers.handler(undefined,handlers.callback);
            return;
        }

        this.pool.getConnection(function(err, connection) {
            connection.query(handlers.sql,function(err, rows) {
                handlers.handler(rows,handlers.callback);
                connection.release();
            });
        });
    }

    mysql.prototype.queryArrays = function (handlers) {
        this.pool.getConnection(function (err, connection) {
            connection.beginTransaction(function (err) {
                if (err) {
                    handlers.handler(false, handlers.callback);
                    return;
                }

                async.each(handlers.sql, function (sql, callback) {
                    connection.query(sql, function (err, result) {
                        callback(err)
                    });
                }, function (err,result) {
                    if (err) {
                        connection.rollback(function() {
                            handlers.handler(false, handlers.callback);
                        });

                    } else {
                        connection.commit(function(err) {
                            if (err) {
                                connection.rollback(function() {
                                    handlers.handler(false, handlers.callback);
                                });
                            }else{
                                handlers.handler(true, handlers.callback);
                            }

                        });
                    }
                    connection.release();
                });
            })
        })
    }

    var instance;

    var _static = {
        connect: function () {
            if (instance === undefined) {
                instance = new mysql(option_mysql);
            }
            return instance;
        },
        query:function(handlers){
            return this.connect().query(handlers);
        },
        queryArrays:function(handlers){
            return this.connect().queryArrays(handlers);
        }
    };
    return _static;
})();

module.exports.mysql=mysql_pool;


