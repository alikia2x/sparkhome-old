function link(url) { window.open(url); }

Array.prototype.clean = function (deleteValue) {
    for (var i = 0; i < this.length; i++) {
        if (this[i] == deleteValue) {
            this.splice(i, 1);
            i--;
        }
    }
    return this;
};

function test_delay(){
    var time_send=new Date().getTime();
    var xhr = new XMLHttpRequest();
    xhr.open("GET", "./php/ping.php");
    xhr.send();
    xhr.onreadystatechange = function () {
        var time_end=new Date().getTime();
        var delay = (time_end - time_send);
        if (delay > 800 && get_settings("warn_server_conn")) {
            Swal.fire(
                '警告',
                '您与服务器的网络连接质量差, 延迟为'+delay+"ms.",
                'warning'
            );
        }
    };
}
function getJsonLength(jsonData) {
    var length;
    for (var ever in jsonData) {
        length++;
    }
    return length;
}