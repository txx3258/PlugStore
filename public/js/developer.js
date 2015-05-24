/**
 * Created by tangxx3 on 2015/5/22.
 */
(function(){
    var upLoadFileSuccessFlg=0;

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
    $("#upload_file_next").click(function(){
            $("#upload_tap_2").parent().children().removeClass('active new-active app-li-1');
            $("#upload_tap_2").addClass('active new-active app-li-1');
            $("#app-title-bg").css('left','378px');

            $("#upload_plug_info").show();
            $("#upload_plug_file").hide();
    });

    $("#uploadFile").change(function(){
        $("#uploadProcess").show();
        document.forms[0].submit();
        var interval= setInterval(function(){
            var body=$(document.getElementById("hidden_frame").contentWindow.document.body).text();

            console.log(body);
            console.log(body.toString().indexOf("success"));
            if(body.toString().indexOf("success")!=-1){
                clearInterval(interval);
                $("#uploadProcess").hide();
                $("#programeListTd").html(body.replace(/<body>/g,'')+",文件已上传成功！");
                $("#upload_file_next").show();
            }

        },1000);
    });

    $("#app-title-taps li a").click(function(){

        var index=parseInt($(this).attr("id").substring(5));

        if(index!=6){
            $("#app-title-bg").css('left',index*110);
        }else{
            $("#app-title-bg").css('left',index*110-10);
        }

        return false;
    });


})();
