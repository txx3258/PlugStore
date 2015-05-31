/**
 * Created by soft_tangxiaoxian on 15/5/28.
 */
var mysql = require('./common/database').mysql;
var sql = require('./sql/Admin');
var utils = require('./common/utils');
var render = require('./render/Admin');

function AdminService() {

}

AdminService.prototype.checkUser = function (req, res) {
    try {
        var registerName = req.body.registerName;
        var password = req.body.userPwd;

        registerName = registerName.replace(/~|@|#|^|&|\(|\)|and|or|=/g, '');
        password = password.replace(/~|@|#|^|&|\(|\)|and|or|=/g, '');

        var _sql = utils.format(sql.checkUser, registerName, password);

    } catch (e) {
        render.loginFail(res);
        return;
    }

    var handlers = {
        sql: _sql,
        callback: res,
        handler: checkUser
    }

    mysql.query(handlers);

    function checkUser(result, res) {
        if (result && result[0]['count'] == 1) {
            render.loginSuccess(res);
        } else {
            render.loginFail(res);
        }
    }
}




module.exports.AdminService = new AdminService;