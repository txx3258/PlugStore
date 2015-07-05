/**
 * Created by tangxx3 on 2015/5/5.
 */
function MD5(data) {
    var Buffer = require("buffer").Buffer;
    var buf = new Buffer(data);
    var str = buf.toString("binary");
    var crypto = require("crypto");
    return crypto.createHash("md5").update(str).digest("hex");
}

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
    if (date){
        var new_date=new Date(date);
    }else{
        var new_date=new Date();
    }

    var year=new_date.getFullYear();
    var month=new_date.getMonth()>=10?new_date.getMonth():'0'+new_date.getMonth();
    var day=new_date.getDate()>=10?new_date.getDate():'0'+new_date.getDate();

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
/**
 * 分页
 * @param currentPage 当前页
 * @param currentPageSize 页面条数
 * @param totalRecords 总条数
 * @param span 间隔数
 * @returns {string}
 */
function pager(currentPage, currentPageSize, totalRecords, span) {
    var page = [];
    var jj = Math.floor((totalRecords + currentPageSize - 1) / currentPageSize);
    if (jj >= 1) {
        if (currentPage >= span) {
            var i = currentPage - 2;
            page.push("<a href='javascript:void(0)'  onclick=ajax_page('0') ) >1</a>");
            page.push("<a href='javascript:void(0)' ) >...</a>");
            while (i <= currentPage + 2 && i <= jj) {
                if (i != currentPage+1) {
                    page.push("<a href='javascript:void(0)' onclick=ajax_page('{0}') >{1}</a>".format( i - 1, i));
                }
                else {
                    page.push("<a href='javascript:void(0)' class='active'>{0}</a> ".format( i));
                }
                i++;
            }
            if (i <= jj) {
                page.push("<a href='javascript:void(0)' ) >...</a>");
                page.push("<a href='javascript:void(0)' onclick=ajax_page('{0}')>{1}</a>".format( jj - 1, jj));
            }

            if ((currentPage + 1) <= jj){
                page.push("<a href='javascript:void(0)' onclick=ajax_page('{0}') >下一页</a>".format(i));
            }

        }
        else {
            var i;
            if (currentPage > 0){
                page.push("<a href='javascript:void(0)' onclick=ajax_page('{0}') >上一页</a>".format( currentPage - 1));
            }
            for (i = 0; i < span && i < jj; i++) {
                if (i != (currentPage))
                    page.push("<a href='javascript:void(0)' onclick=ajax_page('{0}') >{1}</a>".format( i, i + 1));
                else
                    page.push("<a href='javascript:void(0)' class='active'>{0} </a> ".format( i + 1));
            }
            if (span < jj) {
                page.push("<a href='javascript:void(0)' ) >...</a>");
                page.push("<a href='javascript:void(0)' onclick=ajax_page('{0}')>{1}</a>".format(jj - 1, jj));
            }
            if (currentPage + 1 < jj){
                page.push("<a href='javascript:void(0)' onclick=ajax_page('{0}') >下一页</a>".format(parseInt(currentPage + 1)));
            }
        }
    }
    page.push('</div>');

    return page.join('');
}

String.prototype.format= function(){
    var args = arguments;
    return this.replace(/\{(\d+)\}/g,function(s,i){
        return parseInt(args[i],10);
    });

}

function builderParams(query){
    var params=[];

    for(var key in query){
        params.push(key+"="+encodeURIComponent(query[key]));
    }

    return params.join('&');
}

function convertState(state){
    var status=parseInt(state);

    switch(status){
        case 0: return "申请中";
        case 1: return "已下架";
        case 2: return "未通过";
        case 3: return "测试中";
        case 4: return "冻结中";
        case 5: return "已通过";
        case 9: return "上架中";

        default :return "处理中";
    }
}

module.exports.NotEmpty=NotEmpty;
module.exports.Min=Min;
module.exports.Max=Max;
module.exports.format=format;
module.exports.convertDate=convertDate;
module.exports.pager=pager;
module.exports.MD5=MD5;
module.exports.builderParams=builderParams;
module.exports.convertState=convertState;