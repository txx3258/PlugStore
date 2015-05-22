/**
 * Created by tangxx3 on 2015/5/12.
 */
(function($,window){
    //$('#login_admin').click(function(){
    //    var url="/manage";
    //    $.my_ajax_html(url,"#commentsList");
    //});

    var mgsBoxInterval=setInterval(function(){
       var msgBoxHt=parseInt($('#msgBox').css('bottom'));
        if(msgBoxHt<0){
            msgBoxHt+=20;
            $('#msgBox').css('bottom',msgBoxHt);
        }else{
            clearInterval(mgsBoxInterval)
        }
        console.log(msgBoxHt)
    },200);

    $('#msgBoxClose').click(function(){
        $('#msgBox').hide();
        $('#msgBoxBody').remove();
    })
})($,window);