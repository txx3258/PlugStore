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
        //console.log(msgBoxHt)
    },200);

    $('#msgBoxClose').click(function(){
        $('#msgBox').hide();
        $('#msgBoxBody').remove();
    });

    jQuery.fn.center = function () {
            this.css('position','absolute');
            this.css('top', ( $(window).height() - this.height() ) /2 +$(window).scrollTop() + 'px');
            this.css('left', ( $(window).width() - this.width() ) / 2+$(window).scrollLeft() + 'px');
            return this;
        }

    $("#bannerBar").center();


    $('#banner').mousedown( function (event) {

        var isMove = true;
        var abs_x = event.pageX - $('#bannerBar').offset().left;
        var abs_y = event.pageY - $('#bannerBar').offset().top;

        $(document).mousemove(function (event) {
            if (isMove) {
                var obj = $('#bannerBar');
                obj.css({'left':event.pageX - abs_x, 'top':event.pageY - abs_y});
            }
        }).mouseup(function () {
            isMove = false;
        });

    });

})($,window);

