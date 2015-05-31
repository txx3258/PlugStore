/**
 * Created by tangxx3 on 2015/5/12.
 */
(function($,window){

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

    $("#queryBoxClose").click(function(){
        $("#bannerBar").hide();
    });

    $("#list_tab li a").click(function(){
        var href=$(this).attr('href');
        if(href.length>2){
            $(this).parent().parent().children().children().children().removeClass('list_tab');
            $(this).children().addClass('list_tab');

            if(href=="list_type"){
                $("#list_type").show();
                $("#list_select").hide();
            }else{
                $("#list_type").hide();
                $("#list_select").show();
            }

            return false;
        }
    });
})($,window);

