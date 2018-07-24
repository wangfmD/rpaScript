var host = 'http://' + window.location.host;


// function showAdd() {
//     /* $("#tagsform").removeClass("hidden");*/
//     var div = $("#tagsform");
//     if (div.hasClass("hidden") == true) {
//         div.removeClass("hidden");
//     } else {
//         div.addClass("hidden");
//     }
// }

function updateTag() {
    var obj = getTagsId(0);
    if (obj.length != 1) {
        alert("请选择一条待修改记录！")
    } else {
        $('#updateTagModal').modal('show')
    }
}

function updateTagModal() {
    var obj = getTagsId(0);
    var tagFormDate = $("#updateTagForm").serializeArray()
    tagFormDate.push({name: "id", value: obj[0]})
    $.ajax({
        url: host + "/api/v1/updatetags",
        dataType: "json",
        type: "post",
        contentType: "application/x-www-form-urlencoded",
        data: tagFormDate,
        success: function (res) {
            console.log(res);
            queryTags();
        }
    });
}

function addTags() {
    var versionid = $("input").val();
    var tags = $("textarea").val();
    $.ajax({
        url: host + "/api/v1/addtags",
        dataType: "json",
        type: "post",
        contentType: "application/x-www-form-urlencoded",
        data: {
            versionid: versionid,
            tags: tags
        },
        success: function (res) {
            console.log(res);
            queryTags();
        }
    });
}

var tags = [];

function queryTags() {
    $.ajax({
        url: host + "/api/v1/tags",
        dataType: "json",
        type: "post",
        contentType: "application/x-www-form-urlencoded",
        data: {},
        success: function (res) {
            console.log(res);
            tags = res.result;
            console.log(tags);
            var txt = "";

            for (var i = 0; i < tags.length; i++) {
                console.log(tags[i]);
                txt += '<tr><td>' + tags[i].id + '</td><td><a href="#" data-toggle="modal" data-target="#tagsInfoModal" onclick="showTagsInfo(' + i + ')">' + tags[i].versionid + '</a></td><td>' + tags[i].isselect + '</td>></tr>'
            }
            $("#tagslist tbody").html(txt);
            tableOnClick();
        }
    });
}

function showTagsInfo(i) {
    var tagstxt = "";
    for (k in tags[i]) {
        tagstxt += '<tr><td>' + k + '</td><td>' + tags[i][k] + '</td></tr>';
    }
    $("#tagTable tbody").html(tagstxt);
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


// 参数：table的第几列
function getTagsId(i) {
    var obj = [];
    $("#tagslist tr.success").each(function () {
        // var eq1 = $(this).find("td").eq(0);
        var eq2 = $(this).find("td").eq(i);
        obj.push(eq2.text());
    });

    return obj
}

function deleteTags() {
    obj = getTagsId(1);
    console.log("+++");
    console.log(obj);
    console.log("+++1");
    $.ajax({
        url: host + "/api/v1/deltags",
        dataType: "json",
        type: "post",
        contentType: "application/x-www-form-urlencoded",
        data: {
            tagsId: JSON.stringify(obj),

            // obj
        },
        success: function (res) {
            console.log(res);
            queryTags();
        }


    });
    // window.location.reload()

}

$(function () {
    queryTags()
});