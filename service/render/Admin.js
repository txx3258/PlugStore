/**
 * Created by soft_tangxiaoxian on 15/5/28.
 */
var constants=require('../common/constants');
function login(res){
    res.render('admin/login', { title: '后台管理登录',
        staticResourceUrl: constants.staticResourceHost,
        message:"",
        error:false
    });
}


function loginFail(res){
    res.render('admin/login', { title: '后台管理',
        staticResourceUrl: constants.staticResourceHost,
        message:"用户名或密码错误！",
        error:true
    });
}

function loginSuccess(res){
    res.render('admin/manage', { title: '后台管理',
        staticResourceUrl: constants.staticResourceHost,
        mClass:"comment"
    }) ;
}

module.exports.login=login;
module.exports.loginFail=loginFail;
module.exports.loginSuccess=loginSuccess;