/**
 * Created by soft_tangxiaoxian on 15/5/28.
 */
var HTTP=require('./service/common/singleton').HTTP;

var params={
    url:"http://119.29.16.116/EmpowerADS/api/commentlist?bizIdentity=12&si=1&c=20",
    method:'GET'
}

function print(res,body){
    if (arguments.length==1){
        //res.send();
        return;
    }

    var json=JSON.parse(body);

    var success=json.success;
    var dataList=json.data.datalist;



    if (success&&dataList.length>1){
        console.log();
    }else{
        //res.send();
    }

}

HTTP.request(params,print,"111");

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