var host = 'http://' + window.location.host;

// 选择表行，颜色设置
function tableOnClick() {
    //console.ilog("tableOnClick..")
    $('#taskslist tbody tr').click(function () {
        if ($(this).hasClass("success")) {
            $(this).removeClass("success");
        } else {
            $(this).addClass("success");
        }
    });
}

// 选择行，获取ID
function getTaskId() {
    var obj = [];
    $("#taskslist tr.success").each(function () {
        // var eq1 = $(this).find("td").eq(0);
        var eq2 = $(this).find("td").eq(0);
        obj.push(eq2.text());
    });

    return obj
}

// 执行任务
function run() {
    var obj = getTaskId();
    console.log(obj);
    $.ajax({
        url: host + "/api/v1/taskstart",
        dataType: "json",
        type: "post",
        contentType: "application/x-www-form-urlencoded",
        data: {
            id: obj[0]
        },
        success: function (res) {
            console.log(res);
            window.location.reload();
        }
    });

}

function addTaskBtn() {
    var formSer = $("#addTaskForm").serializeArray();
    $.ajax({
        url: host + "/api/v1/taskadd",
        dataType: "json",
        type: "post",
        contentType: "application/x-www-form-urlencoded",
        data: formSer,
        success: function (res) {
            console.log(res);
            window.location.reload();
        }
    });
}


function delTasksBtn() {
    var ids = getTaskId();
    $.ajax({
        url: host + "/api/v1/taskdel",
        dataType: "json",
        type: "post",
        contentType: "application/x-www-form-urlencoded",
        data:{
            idList: JSON.stringify(ids)
        },
        success: function (res) {
            console.log(res);
            // window.location.reload();
        }

    });
}

$(function () {
    tableOnClick();
    $("#runTask").click(function () {
        var obj = getTaskId();
        if (obj.length != 1) {
            alert("请选择一条记录！ ")
        } else {
            run()
        }
    })
});