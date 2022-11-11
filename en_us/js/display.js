const element_list = ["search_engine", "engine_txt", "search"];
const normal_opacity = ["0.7", "0.5", "0.45"];
const blur_opacity = ["0.3", "0.3", "0.3"];
function load_blur() {
    var enable_backdrop = get_settings("enable_backdrop");
    //加载元素毛玻璃效果
    for (var i = 0; i < element_list.length; i++) {
        if (enable_backdrop) {
            //document.getElementById(element_list[i]).style.backdropFilter = "blur(5px)";
            document.getElementById(element_list[i]).setAttribute("style", "-webkit-backdrop-filter:blur(5px);backdrop-filter:blur(5px)");
            document.getElementById(element_list[i]).style.backgroundColor = "rgba(255, 255, 255, " + blur_opacity[i] + ")";
        }
        else {
            //document.getElementById(element_list[i]).style.backdropFilter = "blur(0px)";
            document.getElementById(element_list[i]).setAttribute("style", "-webkit-backdrop-filter:blur(0px);backdrop-filter:blur(0px)");
            document.getElementById(element_list[i]).style.backgroundColor = "rgba(255, 255, 255, " + normal_opacity[i] + ")";
        }
    }
    if (get_settings("cover_blur")) {
        document.getElementById("cover_about").style.backdropFilter = "blur(10px)";
        document.getElementById("cover_settings").style.backdropFilter = "blur(10px)";
    }
    else {
        document.getElementById("cover_about").style.backdropFilter = "blur(0px)";
        document.getElementById("cover_settings").style.backdropFilter = "blur(0px)";
    }
}

function refresh_weather() {
    if (get_settings('show_weather') == false) {
        var weather_div = document.getElementById("he-plugin-simple");
        weather_div.style.display = 'none';
    }
    else if (get_settings('show_weather') == true) {
        var weather_div = document.getElementById("he-plugin-simple");
        weather_div.style.display = 'inline';
        document.getElementById("weather").setAttribute("src", "https://widget.qweather.net/simple/static/js/he-simple-common.js?v=2.0");
    }
}

function load_hitokoto() {
    if (get_settings('show_hitokoto') == true) {
        document.getElementById("hitokoto").style.display="inline";
    }
    else{
        document.getElementById("hitokoto").style.display="none";
    }
}

function get_hitokoto(){
    fetch('https://v1.hitokoto.cn?c=i')
    .then(response => response.json())
    .then(data => {
        const hitokoto = document.getElementById('hitokoto');
        hitokoto.innerHTML = "<br>"+data.hitokoto
    })
    .catch(console.error)
}