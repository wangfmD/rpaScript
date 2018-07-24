var host = 'http://' + window.location.host;


function addServiceInfo() {
    var serviceInfoFormDate = $("#addServiceInfoForm").serializeArray();
    console.log(host);
    console.log(serviceInfoFormDate);
    $.ajax({
        url: host + "/api/v1/addservice",
        dataType: "json",
        type: "post",
        contentType: "application/x-www-form-urlencoded",
        data: serviceInfoFormDate,
        success: function (res) {
            console.log(res);
            window.location.reload();
        }
    });

}

function updateServiceInfo() {
    var serviceInfoFormDate = $("#updateServiceInfoForm").serializeArray();
    var obj = getTagsId();
    serviceInfoFormDate.push({name: "id", value: obj[0]});
    console.log(host)
    console.log(serviceInfoFormDate);
    $.ajax({
        url: host + "/api/v1/updateservice",
        dataType: "json",
        type: "post",
        contentType: "application/x-www-form-urlencoded",
        data: serviceInfoFormDate,
        success: function (res) {
            console.log(res);
            window.location.reload();
        }
    });

}

// 删除选择服务器列表
function delServiceInfoModal() {
    var obj = getTagsId();
    console.log(obj);
    $.ajax({
        url: host + "/api/v1/delservice",
        dataType: "json",
        type: "post",
        contentType: "application/x-www-form-urlencoded",
        data: {
            idList: JSON.stringify(obj)
        },
        success: function (res) {
            console.log(res);
            window.location.reload();
        }
    });

}

function tableOnClick() {
    //console.ilog("tableOnClick..")
    $('#tagslist tbody tr').click(function () {
        if ($(this).hasClass("success")) {
            $(this).removeClass("success");
        } else {
            $(this).addClass("success");
        }
    });
}

function getTagsId() {
    var obj = [];
    $("#tagslist tr.success").each(function () {
        // var eq1 = $(this).find("td").eq(0);
        var eq2 = $(this).find("td").eq(0);
        obj.push(eq2.text());
    });

    return obj
}

$(function () {
    console.log("ok");
    tableOnClick();
    $("#updateBtn").click(function () {
        var obj = getTagsId();
        if (obj.length != 1) {
            alert("请选择一条记录！")
        } else {
            // todo
            var $td = $("#tagslist tr.success").find("td");
            var status = $td.eq(5).text();
            var hostType = $td.eq(4).text();
            $("#updateHost").val($td.eq(1).text());
            $("#updateloginName").val($td.eq(2).text());
            $("#updatePassword").val($td.eq(3).text());
            $("#updateHostType").val($td.eq(4).text());
            // $("#updateloginName").val($td.eq(1).text())
            $('#updateComment').val($td.eq(6).text());

            // $("input[name='updateIsSelect']").each(function(){
            //     if(status == "未选"){
            //         $(this).prop( "checked", true );
            //     }
            // });
            if (hostType == "流媒体") {
                $("#updateHostType").val("media");
            } else {
                $("#updateHostType").val("platform");
            }
            if (status == "已选") {
                // $("input[name='isSelect']").get(0).checked = true
                $("input[type='radio']").get(0).checked = true;
            } else {
                // $("input[name='isSelect']").get(1).checked = true;
                $("input[type='radio']").get(1).checked = true;
            }
            $('#updateServiceInfoModal').modal('show')
        }
    })
});