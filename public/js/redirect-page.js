$(document).ready(function () {
    window.setInterval(function () {
        var tr = $("#counter_seconds").html();
        tr = eval(tr);
        if (tr == 0) {
            location.href = "index.html";
        } 
        else {
            $("#counter_seconds").html(tr - 1);
        }
    }, 1000);
});