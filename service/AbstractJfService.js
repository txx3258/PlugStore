/**
 * Created by tangxx3 on 2015/5/5.
 */
function AbstractJfService(){

}

AbstractJfService.prototype.doBiz=function(){
    this.preHandleRquest(req);

    var validateResult=validateMgr.validate(req);
    if(!validateResult.isSuccess()){
        return;
    }

    var result=this.doOperation(req);
    try{
        this.afterRequestDone(req,res);
    }catch (e){

    }

    return result;
};

AbstractJfService.prototype.preHandleRquest=function(){

};

AbstractJfService.prototype.doOperation=function(){
    throw new Error({
        status:500,
        code:'',
        message:Utils.getMessage('')
    });
};

AbstractJfService.prototype.afterRequestDone=function(){
    throw new Error({
        status:500,
        code:'',
        message:Utils.getMessage('')
    });
};

AbstractJfService.prototype.createResult=function(){
    throw new Error({
        status:500,
        code:'',
        message:Utils.getMessage('')
    });
};

AbstractJfService.prototype.buildFailedResult=function(code) {
    var result=this.createResult();

    result['success']=false;
    result['code']=code;
    result['message']=Utils.getMessage(code);

    return result;
};

module.exports.AbstractJfService=AbstractJfService;