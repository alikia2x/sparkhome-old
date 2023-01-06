function fresh_time(){
    var time_send = new Date().getTime();
    $.ajax({
        url: "/time",
        type: "GET",
        success: function (data) {
            var network_time = data;
            if (isNaN(network_time))
            {
                network_time = new Date().getTime();
            }
            var time_end=new Date().getTime();
            var delay = (time_end - time_send) / 2;
            console.log("网络延迟"+delay+"ms");
            var real_nettime = network_time - delay;
            var correction = real_nettime - time_send;
            localStorage.setItem("corr",correction);
        },
        error: function () {
            localStorage.setItem("coor","0");
        }
    });
}
if(get_settings("time_sync")==true){
    fresh_time();
}
else{
    localStorage.setItem("corr","0");
}
tick();
var main_loop = setInterval(tick, 1000);
var last_time=new Date().getTime() + parseInt(localStorage.getItem("corr"));
function tick() {
    var dat = new Date();
    if (isNaN(localStorage.getItem("corr"))){
        var real_time = dat.getTime();
    }
    else{
        var real_time = dat.getTime() + parseInt(localStorage.getItem("corr"));
    }
    if(Math.abs(real_time-last_time)>5000&&get_settings("time_sync")){
        fresh_time();
    }
    else if(get_settings("time_sync")==false){
        localStorage.setItem("corr","0");
    }
    var date = new Date(real_time);
    var hour = "00" + date.getHours();
    hour = hour.substr(hour.length - 2);
    var minute = "00" + date.getMinutes();
    minute = minute.substr(minute.length - 2);
    var second = "00" + date.getSeconds();
    second = second.substr(second.length - 2);
    document.getElementById("divBottom").innerHTML = hour + ":" + minute + ":" + second;
    last_time=real_time;
}