/**
 * Created by soft_tangxiaoxian on 15/5/28.
 */
var HTTP=require('./service/common/singleton').HTTP;

var fs=require('fs');
//var params={
//    //url:"http://119.29.16.116/EmpowerADS/api/commentlist?bizIdentity=12&si=1&c=20",
//    url:"http://119.29.16.116/EmpowerADS/Services/User/SignIn",
//    method:'POST',
//    form: {
//        email:'2538291@qq.com',
//        password:'123456'
//    },
//    json: true
////"/data/appstore/ads/Services/Ads/Images/",
//}

var params = {
    url:"http://119.29.16.116/EmpowerADS/Services/User/register",
    method: 'POST',
    form: {
        email:'111111',
        nickname:'111111',
        password:'111111',
        paypwd:'111111',
        phone:'111111',
        realname:'111111',
        cardno:'111111'
    },
    json: true
}

HTTP.request(params,print,"111");

function print(res,body){
    console.log(JSON.stringify(body));


    fs.writeFile('/Users/soft_tangxiaoxian/Desktop/log.txt',JSON.stringify(body),'utf8',function(err){

    });

    //var json=JSON.parse(body);
    //
    //var success=json.success;
    //var dataList=json.data.datalist;
    //
    //
    //
    //if (success&&dataList.length>1){
    //    console.log();
    //}else{
    //    //res.send();
    //}

}



//var fs=require('fs'),
//    ejs=require('ejs');
//var str=fs.readFileSync("/Users/soft_tangxiaoxian/Desktop/PlugStore/str.ejs",'utf8');
//
//var template = ejs.render(str, {supplies:[1,3,4,5]});
//console.log(template);

//var mysql = require('mysql');
//var pool  = mysql.createPool({
//    "connectionLimit":"10",
//    "host":"119.29.16.116",
//    "user":"root",
//    "password":"root",
//    "database":"auto_desk_appstore",
//    "insecureAuth":true
//});
//
//pool.query('select * from bim_app_user', function(err, rows, fields) {
//    console.log(err);
//    if (err) throw err;
//
//    console.log('The solution is: ', rows[0].solution);
//});









