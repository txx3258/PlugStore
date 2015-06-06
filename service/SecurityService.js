/**
 * Created by soft_tangxiaoxian on 15/6/3.
 */
var crypto=require('crypto');
var constants=require('./common/constants');

function SecurityService(){

}

SecurityService.prototype.sign=function(type){
    var val=type+"|9"+new Date().getTime();

    var sConfig=constants.security;
    var cipher=crypto.createCipher(sConfig.arg1,sConfig.secret);

    var crypted=cipher.update(val,sConfig.arg3,sConfig.arg2);
    crypted+=cipher.final(sConfig.arg2);

    return crypted;
}

SecurityService.prototype.unsign=function(crypted){
    if (!crypted||crypted.length!=64){
        return -1;
    }

    var sConfig=constants.security;
    var decipher=crypto.createDecipher(sConfig.arg1,sConfig.secret);

    return decipher.update(crypted,sConfig.arg2,sConfig.arg3)[0];
}




module.exports.SecurityService=new SecurityService();



//function test(){
//    var security=new SecurityService();
//
//    var s=security.sign('2');
//
//    console.log(s);
//
//    console.log('--------------');
//
//    var e=security.unsign(s);
//
//    console.log(e);
//}
//
//test();