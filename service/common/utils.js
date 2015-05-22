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

module.exports.NotEmpty=NotEmpty;
module.exports.Min=Min;
module.exports.Max=Max;