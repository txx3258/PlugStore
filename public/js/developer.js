/**
 * Created by tangxx3 on 2015/5/22.
 */
(function(){
    var upLoadFileSuccessFlg=0;

    //$("#upload_tap_1").click(function(){
    //    $(this).parent().children().removeClass('active new-active app-li-1');
    //    $(this).addClass('active new-active app-li-1');
    //    $("#app-title-bg").css('left','0');
    //
    //    $("#upload_plug_info").show();
    //    $("#upload_plug_file").hide();
    //})
    //
    //$("#upload_tap_2").click(function(){
    //    $(this).parent().children().removeClass('active new-active app-li-1');
    //    $(this).addClass('active new-active app-li-1');
    //    $("#app-title-bg").css('left','378px');
    //
    //    $("#upload_plug_file").show();
    //    $("#upload_plug_info").hide();
    //});
    $("#upload_file_next").click(function(){
            $("#upload_tap_2").parent().children().removeClass('active new-active app-li-1');
            $("#upload_tap_2").addClass('active new-active app-li-1');
            $("#app-title-bg").css('left','378px');

            $("#upload_plug_info").show();
            $("#upload_plug_file").hide();
    });


    //$("#uploadPlugInfoSubmit").click(function(){
    //    $("#recordSubmit").val('1');
    //});

    $("#uploadPlugInfoNext").click(function(){
        if ($("#recordSubmit").val()!='0'){
            alert('请先提交信息后，在上传插件文件');
        }else{
            $("#upload_tap_2").parent().children().removeClass('active new-active app-li-1');
            $("#upload_tap_2").addClass('active new-active app-li-1');
            $("#app-title-bg").css('left','378px');

            $("#upload_plug_file").show();
            $("#upload_plug_info").hide();
        }
    });




})();
