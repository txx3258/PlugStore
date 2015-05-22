/**
 * Created by tangxx3 on 2015/5/22.
 */
(function(){
    $("#upload_tap_1").click(function(){
        $(this).parent().children().removeClass('active new-active app-li-1');
        $(this).addClass('active new-active app-li-1');
        $("#app-title-bg").css('left','0');

        $("#upload_plug_file").show();
        $("#upload_plug_info").hide();
    })

    $("#upload_tap_2").click(function(){
        $(this).parent().children().removeClass('active new-active app-li-1');
        $(this).addClass('active new-active app-li-1');
        $("#app-title-bg").css('left','378px');

        $("#upload_plug_info").show();
        $("#upload_plug_file").hide();
    });

    $("#upload_file_event").change(function(){
        alert($("#upload_file_event").get(0).files[0].name)
    })
})();
