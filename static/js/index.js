var host = 'http://' + window.location.host;



function updateTagVers() {
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
                option = '<p><span id="red" style="color:blue">' + tags[i] + '</span></p>';
                $("#toptagsid h4").after(option)
            }
        }
    });
}

$(function () {
    updateTagVers();
    console.log("test")
});