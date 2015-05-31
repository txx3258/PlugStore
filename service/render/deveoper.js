/**
 * Created by soft_tangxiaoxian on 15/5/30.
 */
var constants=require('../common/constants');

function mineApp(res){
    res.render('developer/manage', { title: '开发者管理',
        staticResourceUrl: constants.staticResourceHost,
        mClass:"manage"
    });
}