/**
 * Created by soft_tangxiaoxian on 15/6/3.
 */
var constants=require('../common/constants');

function loginFail(res,url){
    res.render(url, { title: '管理界面',
        staticResourceUrl: constants.staticResourceHost,
        message:"用户名或密码错误！",
        error:true
    });
}

function loginSuccess(res,url){
    res.render(url, { title: '管理界面',
        staticResourceUrl: constants.staticResourceHost,
        mClass:"manage"
    }) ;
}

module.exports.loginFail=loginFail;
module.exports.loginSuccess=loginSuccess;