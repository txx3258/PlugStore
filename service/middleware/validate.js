/**
 * Created by tangxx3 on 2015/5/5.
 */
var utils=require('../common/utils');
var constants=require('../common/constants')
function validateParam(req, res, next){
    var params=req.body;

    if (check(params)) {
        next();
    }

    function check(params){
        if(!params){
            throw new Error({status:400,code:'AMS-400',message:'Invalid request.非法请求！'});
        }
        if(!utils.NotEmpty(params.appId)
        ||!utils.NotEmpty(params.reqId)
        ||!utils.NotEmpty(params.signature)){
            throw new Error({status:400,code:'AMS-400',message:'Invalid request.非法请求！'});
        }
        return true;
    }
}


module.exports.validateParam=validateParam;

