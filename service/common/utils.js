/**
 * Created by tangxx3 on 2015/5/5.
 */
function NotEmpty(str){
    return str&&str.length>0;
}

function Min(val,min){
    return parseInt(val,10)>=parseInt(min,10);
}

function Max(val,max){
    return parseInt(val,10)<=parseInt(max,10);
}

function convertDate(date){
    var new_date=new Date(date);

    var year=new_date.getFullYear();
    var month=new_date.getMonth()>=10?new_date.getMonth():'0'+new_date.getMonth();
    var day=new_date.getDay()>=10?new_date.getDay():'0'+new_date.getDay();

    return year+'-'+month+'-'+day;
}

function format(str){
    var len=arguments.length;

    if(len==1){
        return str;
    }else{
        var reg=/{\d+}/;
        for(var i=1;i<len;i++){
            str=str.replace(reg,arguments[i]);
        }
        return str;
    }
}

module.exports.NotEmpty=NotEmpty;
module.exports.Min=Min;
module.exports.Max=Max;
module.exports.format=format;
module.exports.convertDate=convertDate;