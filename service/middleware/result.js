/**
 * Created by tangxx3 on 2015/5/5.
 */
function handleResult(req, res, next) {
    var result = {};

    if (result["success"]===true) {
        result["success"] = true;
        result["code"] = '';
        result["msg"] = '';
        result["data"] = req.data ? req.data : {};
    }else{
        result["success"]=false;
        result["code"]=req.code?req.code:'UNKNOWN';
        result["msg"]=req.msg?req.msg:'UNKNOWN';;
        result["data"]=req.data?req.data:{};
    }

    res.json(result)
}

function handleError(err, req, res, next){
    if(err.status){
        res.status(err.status);
        var result={
            status:req.status,
            code:req.code
        }

        res.send(JSON.stringify(result));
    }else{
        res.status(500);
        res.render('error', {
            message: err.message,
            error: err
        });
    }

}

module.exports.handleResult=handleResult;
module.exports.handleError=handleError;