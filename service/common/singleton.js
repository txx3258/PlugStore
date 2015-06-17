
var ROOT_PATH = (function () {
    function Singleton(args) {
        this.path = args;
    }

    Singleton.prototype.getPath = function () {

        return this.path;
    }

    var instance;

    var _static = {
        getInstance: function (args) {
            if (instance === undefined) {
                instance = new Singleton(args);
            }
            return instance;
        }
    };
    return _static;
})();

var HTTP=(function(){
    function Req(){
        this.req=require("request");
    }

    Req.prototype.doGet=function(options,callback,res){
        this.req(options,function(error,response,body){
            if (!error&&response.statusCode==200){
                callback(res,body);
            }else{
                callback(res);
            }
        })
    }

    var instance;

    var _static = {
        getInstance: function () {
            if (instance === undefined) {
                instance = new Req();
            }
            return instance;
        },
        request:function(options,callback,res){
            this.getInstance().doGet(options,callback,res);
        }
    };
    return _static;

})();

module.exports.ROOT_PATH=ROOT_PATH;
module.exports.HTTP=HTTP;