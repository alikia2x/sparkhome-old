const element_list = ["search_engine", "engine_txt", "search", "footer"];
const normal_opacity = ["0.9", "0.5", "0.7"];
const blur_opacity = ["0.4", "0.4", "0.5"];
function load_blur() {
    let element_blur = get_settings("enable_backdrop");
    let cover_blur = get_settings("cover_blur");
    //加载元素毛玻璃效果
    for (let i = 0; i < element_list.length; i++) {
        if (element_blur) {
            $("#"+element_list[i])[0].setAttribute("style", "-webkit-backdrop-filter:blur(5px);backdrop-filter:blur(10px)");
            $("#"+element_list[i])[0].style.backgroundColor = "rgba(255,255,255," + blur_opacity[i] + ")";
        }
        else {
            $("#"+element_list[i])[0].setAttribute("style", "-webkit-backdrop-filter:blur(0px);backdrop-filter:blur(0px)");
            $("#"+element_list[i])[0].style.backgroundColor = "rgba(255,255,255," + normal_opacity[i] + ")";
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
        if (get_settings('show_hitokoto')) {
            document.getElementById("hitokoto").style.display="inline";
        }
        else{
            document.getElementById("hitokoto").style.display="none";
        }
        let cache=localStorage.getItem("hitokoto_cache")
        if (cache != null) {
            $("#hitokoto")[0].innerHTML = cache;
            this.push2cache();
        }
        else {
            this.push2cache(true);
        }
    }
    fetch() {
        $.ajax({
            url: "https://v1.hitokoto.cn?c=i", type: "GET",
            success: function (data) {return data;}
        });
    }
    push2cache(push2home) {   
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
