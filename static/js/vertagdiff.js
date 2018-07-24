var host = 'http://' + window.location.host;


function onchangeSelectType() {
    $("#select_type").change(function () {
        var type = $("#select_type").val();
        if (type == "platform") {
            setAddrSelect('platform')
        } else if (type == "media") {
            setAddrSelect('media')
        }
    });
}

// discard
// function onchangeSelectTags() {
//
//     $("#select_tags").change(function () {
//         $.ajax({
//             url: host + "/api/v1/updatetags",
//             async: false,
//             dataType: "json",
//             type: "get",
//             contentType: "application/x-www-form-urlencoded",
//             success: function (res) {
//                 console.log(res)
//             }
//         });
//     });
//
// }


function setTagsSelect() {
    $.ajax({
        url: host + "/api/v1/gettags",
        async: false,
        dataType: "json",
        type: "get",
        contentType: "application/x-www-form-urlencoded",
        success: function (res) {
            var tags = res["tags"];
            for (var i = 0; i < tags.length; i++) {
                var option = "";
                option = '<option value=' + tags[i] + '>' + tags[i] + '</option>';
                $("#select_tags").append(option)
            }
        }
    });
}


function setAddrSelect(type) {

    if (type == 'platform') {
        $.ajax({
            url: host + "/api/v1/getipselects",
            async: false,
            dataType: "json",
            type: "post",
            contentType: "application/x-www-form-urlencoded",
            data: {
                type: "platform"
            },
            success: function (res) {
                var addrs = res["addrs"];
                var option = '<option value="">请选择</option>';

                for (var i = 0; i < addrs.length; i++) {
                    option += '<option value=' + addrs[i] + '>' + addrs[i] + '</option>'
                }
                $("#select_addr").html(option)
            }
        });
    } else {
        $.ajax({
            url: host + "/api/v1/getipselects",
            async: false,
            dataType: "json",
            type: "post",
            contentType: "application/x-www-form-urlencoded",
            data: {
                type: "media"
            },
            success: function (res) {
                var addrs = res["addrs"];
                var option = '<option value="">请选择</option>';

                for (var i = 0; i < addrs.length; i++) {
                    option += '<option value=' + addrs[i] + '>' + addrs[i] + '</option>'
                }
                $("#select_addr").html(option)
            }
        });
    }
}

function getDiffVersions() {
    var uri = host + "/api/v1/querydiffv";
    var addr = $("#select_addr").val();
    var tag = $("#select_tags").val();
    var type = $("#select_type").val();
    if (addr == "") {
        alert("请选择发布版本");
    }
    if (tag == "") {
        alert("请选择服务器");
    }
    $("#upgrade_id").text("升级");
    $.ajax({
        url: uri,
        async: false,
        dataType: "json",
        type: "post",
        contentType: "application/x-www-form-urlencoded",
        data: {
            tag: tag,
            addr: addr,
            type: type
        },
        success: function (res) {
            if (res.status == "success") {
                var len = res.result.length;
                var vers = res.result;
                var txt = "";
                var txthead = "";
                console.log(res);
                if (len == 2) {
                    for (v in vers[0]) {
                        if (v != "versiontag") {
                            txt += "<tr><td>" + v + "</td><td>" + vers[0][v] + "</td><td>" + vers[1][v] + "</td></td>"
                        } else {
                        }
                        if (txthead == "") {
                            txthead += "<tr><th>" + "模块名称" + "</th><th>" + tag + "</th><th>" + addr + "</th></td>"
                            // txthead += "<tr><th>" + "模块名称" + "</th><th>" + vers[0]["versiontag"] + "</th><th>" + vers[1]["versiontag"] + "</th></td>"
                        }
                    }
                }
                $("#caselist tbody").html(txt);
                $("#caselist thead").html(txthead);
                tableOnClick();

            }
        }
    });
    //console.ilog("test2");
    compareSetColor(1);

}

/* function compareSetColor() {

 *     $("#caselist tbody tr").each(function() {
 *         var $td1 = $($(this).find("td")[1]);
 *         var $td2 = $($(this).find("td")[2]);
 *         if ($td1.text() == $td2.text()) {
 *             $td1.css("color", "blue");
 *             $td2.css("color", "blue");
 *         }
 *     });
 * }
 */


function compareSetColor(index) {
    $("#caselist tbody tr").each(function () {
        var _tds = $(this).find("td"),
            _tempText = _tds[index] ? $(_tds[index]).text() : '',
            _count = 0;
        for (var i = 0; i < _tds.length; i++) {
            if ($(_tds[i]).text() == _tempText && i != index) {
                $(_tds[i]).css('color', 'blue');
                _count++;
            }
        }
        if (_count > 0) {
            $(_tds[index]).css('color', 'blue');
        }
    });
}


function getversionBySSH(param) {
    var uri = host + "/api/v1/get/" + param;
    $.ajax({
        url: uri,
        async: false,
        dataType: "json",
        type: "get",
        contentType: "application/x-www-form-urlencoded",
        success: function (res) {
            console.log(res);
            var headText = "";
            headText += '<tr><th>模块名称</th>';
            headText += '<th>' + param + '</th>';
            headText += '</tr>';
            $("#caselist thead").html(headText);
            var text = "";
            var ver = res.msg;
            for (var k in ver) {
                console.log(k, ":", ver[k]);
                text += '<tr><td>' + k + '</td><td>' + ver[k] + '</td></tr>'
            }
            $("#caselist tbody").html(text);
            /* alert("正在查询... \n请确认！ ");*/
            if (res.status == 'failed') {
                alert(res.err);
            }
        }
    });
}


function tableOnClick() {
    //console.ilog("tableOnClick..")
    $('#caselist tbody tr').click(function () {
        var td0 = $(this).find("td:eq(1)").text();
        var td1 = $(this).find("td:eq(2)").text();
        if (td0 != "" && td1 != "") {
            if ($(this).hasClass("success")) {
                $(this).removeClass("success");
            } else {
                $(this).addClass("success");

            }
        }
    });
}

function getSelectTagList() {
    var obj = {};
    $("#tagslist tr.success").each(function () {
        var eq1 = $(this).find("td").eq(0);
        var eq2 = $(this).find("td").eq(1);
        obj[eq1.text()] = eq2.text();
    });
    console.log(obj);
}

function dockerUpdate() {
    var thLength = $("#caselist thead th").length;
    if (thLength != 3) {
        alert("请选择服务器");
        return
    }
    var host = $("#caselist thead th:eq(2)").html();
    document.getElementById('upgrade_id').innerHTML = '升级中...';
    //if (host=='10.1.41.56'||host=='10.1.41.60'||host=='10.1.41.20'||host=='10.1.62.3'){
    var h = '10.1.41.56';
    if (h == '10.1.41.56') {
        var obj = {};
        $("#caselist tr.success").each(function () {
            var eq1 = $(this).find("td").eq(0);
            var eq2 = $(this).find("td").eq(1);
            obj[eq1.text()] = eq2.text()
        });
        //console.ilog(obj)
        //obj = JSON.stringify(obj);

        $.ajax({
            /* url:"http://10.1.41.201:8019/update",*/
            url: "http://" + host + ":8019/update",
            async: true,
            dataType: "json",
            type: "post",
            contentType: "application/x-www-form-urlencoded",
            /* contentType: "application/json",*/
            data: obj,
            success: function (res) {

                if (res.status == 'success') {
                    $("#upgrade_id").text("升级完成")
                } else {
                    $("#upgrade_id").text("升级失败")
                }
            }
        });
    }

}

function shhQuery() {
    var serverHost = $("#select_addr").val();
    var type = $("#select_type").val();
    console.log(serverHost);
    $("#upgrade_id").text("升级");
    if (serverHost == "") {
        alert("请选择服务器！")
    } else {
        if (type == "platform") {
            getversionBySSH(serverHost)
        } else {
            getMediaVersionBySSH(serverHost)
        }
    }
}

function getMediaVersionBySSH(param) {
    var uri = host + "/api/v1/getmedia/" + param;
    $.ajax({
        url: uri,
        async: false,
        dataType: "json",
        type: "get",
        contentType: "application/x-www-form-urlencoded",
        success: function (res) {
            console.log(res);
            var headText = "";
            headText += '<tr><th>模块名称</th>';
            headText += '<th>' + param + '</th>';
            headText += '</tr>';
            $("#caselist thead").html(headText);
            var text = "";
            var ver = res.msg;
            for (var k in ver) {
                console.log(k, ":", ver[k]);
                text += '<tr><td>' + k + '</td><td>' + ver[k] + '</td></tr>'
            }
            $("#caselist tbody").html(text);

        }
    });
}

$(function () {
    // getversion()
    setTagsSelect();
    // onchangeSelectTags();
    onchangeSelectType();
});