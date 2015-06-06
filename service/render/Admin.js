/**
 * Created by soft_tangxiaoxian on 15/5/28.
 */
var constants=require('../common/constants');

function login(res,message){
    res.render('admin/login', { title: '后台管理登录',
        staticResourceUrl: constants.staticResourceHost,
        message:message
    });
}

module.exports.login=login;
