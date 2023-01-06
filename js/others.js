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
    xhr.open("GET", "/ping");
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

function strlen(s)  {
    var totalLength = 0;
    var i;
    var charCode;
    for (i = 0; i < s.length; i++) {
      charCode = s.charCodeAt(i);
      if (charCode < 0x007f) {
        totalLength = totalLength + 1;
      } else if ((0x0080 <= charCode) && (charCode <= 0x07ff)) {
        totalLength += 2;
      } else if ((0x0800 <= charCode) && (charCode <= 0xffff)) {
        totalLength += 3;
      }
    }
    return totalLength;
}