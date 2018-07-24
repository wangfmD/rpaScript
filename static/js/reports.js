var host = 'http://' + window.location.host;


function spanOnClick(e) {
    var verid = $(e).attr("data-verid");
    console.log("verid:", verid);
    $.ajax({
        url: host + "/api/v1/getcasevers/" + verid,
        async: false,
        dataType: "json",
        type: "get",
        contentType: "application/x-www-form-urlencoded",
        success: function (res) {

            var result = res.result;
            var txt = "";
            for (k in result["platform"]) {
                txt += '<tr><td>' + k + '</td><td>' + result["platform"][k] + '</td></tr>';
            }
            $("#modalVersionid tbody").html(txt)
        }
    });
}

function getl() {
    $.ajax({
        url: host + "/api/v1/getinfo",
        async: false,
        dataType: "json",
        /* json: "callback",*/
        type: "get",
        contentType: "application/x-www-form-urlencoded",
        success: function (res) {
            console.log(res);
            var text = "";
            if (null == res) {
                text += "<tr >";
                text += "<td colspan='3' align='center'>无数据</td>";
                text += "</tr>";
            } else {
                console.log(res);
                for (var i = 0; i < res.caseInfots.length; i++) {
                    duration = getime(res.caseInfots[i].START_TIME, res.caseInfots[i].STOP_TIME);
                    console.log(res.caseInfosts);
                    report = "/static/report/" + res.caseInfots[i].REPORT_PATH;
                    if (res.caseInfots[i].TYPE == 1) {
                        type = "web";
                    } else if (res.caseInfots[i].TYPE == 0) {
                        type = "互动课";
                    } else if (res.caseInfots[i].TYPE == 2) {
                        type = "精品课";
                    } else if (res.caseInfots[i].TYPE == 3) {
                        type = "Api";
                    } else if (res.caseInfots[i].TYPE == 9) {
                        type = "UI";
                    } else if (res.caseInfots[i].TYPE == 10) {
                        type = "MCUdriver";
                    } else {
                        type = "其他";
                    }
                    if (res.caseInfots[i].STATUS == 0) {
                        status = "执行中";
                    } else if (res.caseInfots[i].STATUS == 1) {
                        status = "结束";
                    } else {
                        status = "异常";
                    }

                    text += '<tr><td>' + res.caseInfots[i].ID + '</td><td><a href="' + report + '">' + res.caseInfots[i].CASE_NAME + '</a></td><td>' + '<span data-toggle="modal" data-target="#myModal" id="versionid" onclick="spanOnClick(this)" data-verid=' + res.caseInfots[i].exec_version + '>version</span>' + '</td><td>' + duration + '</td><td>' + res.caseInfots[i].START_TIME + '</td><td>' + res.caseInfots[i].STOP_TIME + '</td><td>' + type + '</td><td>' + status + '</td></tr>';
                }
            }
            //        $(#caselist tbody).html(text);
            $("#caselist tbody").html(text);

        }
    });
}

function getime(start, stop) {
    var starttime = new Date(start);
    var stoptime = new Date(stop);
    du = (stoptime - starttime) / 1000;
    console.log(starttime);
    console.log(stoptime);
    console.log(du);
    return du
}

$(function () {
    //alert("ddd");
    getl();
    //         getime("Fri, 13 Oct 2017 17:12:31 GMT", "Fri, 13 Oct 2017 17:13:36 GMT");
    //spanOnClick();
});