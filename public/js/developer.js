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

    $("#upload_file_event").click(function(){
        alert("post");
        document.forms[0].submit();
        var interval= setInterval(function(){
            var body=document.getElementById("hidden_frame").contentWindow.document.body;

            console.log(body);
            if(body&&body.indexOf("成功")!=-1){
                clearInterval(interval);
                $("uploadProcess").hide();
                $("#programeListTd").html(body.replace(/<body>/g,''));
            }

        },500);


    });


})();
