const element_list = ["#search_engine", "#engine_txt", "#search", "div.link"];
const normal_opacity = ["0.8", "0.8", "0.8", "0.9"];
const blur_opacity = ["0.6", "0.6", "0.6", "0.7"];
function load_blur() {
    let element_blur = get_settings("enable_backdrop");
    let cover_blur = get_settings("cover_blur");
    //加载元素毛玻璃效果
    for (let i = 0; i < element_list.length; i++) {
        if (element_blur) {
            $(element_list[i]).css("-webkit-backdrop-filter", "blur(10px)");
            $(element_list[i]).css("backdrop-filter", "blur(10px)");
            $(element_list[i])[0].style.backgroundColor = "rgba(255,255,255," + blur_opacity[i] + ")";
        }
        else {
            $(element_list[i]).css("-webkit-backdrop-filter", "blur(0px)");
            $(element_list[i]).css("backdrop-filter", "blur(0px)");
            $(element_list[i])[0].style.backgroundColor = "rgba(255,255,255," + normal_opacity[i] + ")";
        }
    }
    if (cover_blur) {
        document.getElementById("cover_about").style.backdropFilter = "blur(10px)";
        document.getElementById("cover_settings").style.backdropFilter = "blur(10px)";
    }
    else {
        document.getElementById("cover_about").style.backdropFilter = "blur(0px)";
        document.getElementById("cover_settings").style.backdropFilter = "blur(0px)";
    }
}

function refresh_weather() {
    let weather_div;
    if (get_settings(`show_weather`) === "false") {
        weather_div = document.getElementById("he-plugin-simple");
        weather_div.style.display = 'none';
    }
    else if (get_settings('show_weather') === "true") {
        weather_div = document.getElementById("he-plugin-simple");
        weather_div.style.display = 'inline';
        document.getElementById("weather").setAttribute("src", "https://widget.qweather.net/simple/static/js/he-simple-common.js?v=2.0");
    }
}


class Hitokoto {
    constructor() {
        this.load();
    }
    //加载与显示
    load() {
        this.show();
        //查询是否有缓存
        let cache = localStorage.getItem("hitokoto_cache");
        //缓存存在则使用缓存数据并发起缓存请求，不存在则发起缓存请求并在得到数据后直接写入DOM
        if (cache != null) {
            $("#hitokoto")[0].innerHTML = cache;
            this.fetch();
        }
        else {
            this.fetch(true);
        }
    }
    //根据用户的设置来控制一言的显示
    show() {
        if (get_settings('show_hitokoto')) {
            document.getElementById("hitokoto").style.display="inline";
        }
        else{
            document.getElementById("hitokoto").style.display="none";
        }
    }
    fetch(push2home) {
        $.ajax({
            url: "https://v1.hitokoto.cn?c=i", type: "GET",
            success: function (data) {
                localStorage.setItem("hitokoto_cache", data.hitokoto);
                if (push2home) {
                    $("#hitokoto")[0].innerHTML = data.hitokoto;
                }
            }
        });
    }
}
