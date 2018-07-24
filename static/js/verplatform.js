var host = 'http://' + window.location.host;

function getversion() {
    var txt = $("#addr").val();
    if (txt != "") {
        getversionBySSH(txt);
    }

}

function onchangeSelect() {
    $("#select_addr").change(function () {
        var checkValue = $("#select_addr").val();
        getversionBySSH(checkValue);
        alert("正在查询...    \n请确认！");
    });
}

function setSelect() {
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
            for (var i = 0; i < addrs.length; i++) {
                var option = "";
                option = '<option value=' + addrs[i] + '>' + addrs[i] + '</option>';
                $("#select_addr").append(option)
            }
        }
    });
}

function getversions() {
    var uri = host + "/api/v1/getvs";
    $.ajax({
        url: uri,
        async: false,
        dataType: "json",
        type: "get",
        contentType: "application/x-www-form-urlencoded",
        success: function (res) {
            var text = "";
            var headText = "";
            var ver = res.versions;
            for (var k in ver[0]) {
                if (k != "serveraddr" && k != "id") {
                    text += '<tr><td>' + k
                }
                for (var i = 0; i < ver.length; i++) {
                    if (k != "serveraddr" && k != "id") {
                        text += '</td><td>' + ver[i][k]
                    }
                }
            }
            text += '</td></tr>';
            headText += '<tr><th>模块名称</th>';
            for (var i = 0; i < ver.length; i++) {
                headText += '<th>' + ver[i]["serveraddr"] + '</th>'
            }
            headText += '</tr>';
            $("#caselist tbody").html(text);
            $("#caselist thead").html(headText);

        }
    });
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

//
// function getApiVersion() {
//     $.ajax({
//         url: host + "/api/v1/getversion",
//         async: false,
//         dataType: "json",
//         type: "get",
//         contentType: "application/x-www-form-urlencoded",
//         success: function (res) {
//             console.log("yes");
//             var text = "";
//             var ver = res.version;
//             for (var k in ver) {
//                 console.log(k, ":", ver[k]);
//                 text += '<tr><td>' + k + '</td><td>' + ver[k] + '</td></tr>'
//             }
//             $("#caselist tbody").html(text);
//         }
//     });
// }

$(function () {
    setSelect();
    onchangeSelect();
});
