var settings_list = ["show_weather", "show_hitokoto", "enable_backdrop", "bg_blur", "time_sync", "warn_server_conn", "cover_blur"];     
var default_settings = {
    "show_weather": true,
    "show_hitokoto": true,
    "enable_backdrop": true,
    "bg_blur": true,
    "time_sync": true,
    "warn_server_conn": true,
    "cover_blur": true,
};

function load_img() {
    bg = document.getElementById("default_bg").getElementsByTagName("img");
    for (var i = 0; i < bg.length; i++) {
        bg[i].setAttribute('src', bg[i].getAttribute("_src"));
    }
    console.log("Done");
}

function load_settings() {
    var i = 0;
    init_settings();
    //读取设置
    var current_settings = JSON.parse(localStorage.getItem("settings"));

    for (setting in current_settings) {
        var check = document.getElementById(settings_list[i]);
        if (current_settings[setting] == true) {
            check.checked = true;
        }
        else {
            check.checked = false;
        }
        i++;
    }
    var url = localStorage.getItem('pic');
    document.getElementById("wallpaper_link").value = url;
}

function get_settings(name) {
    init_settings();
    var current_settings = JSON.parse(localStorage.getItem("settings"));
    return current_settings[name];
}

function save_settings() {
    var current_settings = JSON.parse(localStorage.getItem("settings"));
    var i = 0;
    for (setting in current_settings) {
        var check = document.getElementById(settings_list[i]);
        current_settings[setting] = check.checked;
        i++;
    }
    localStorage.setItem("settings", JSON.stringify(current_settings));
    refresh_weather();
    load_blur();
    load_hitokoto();
}

function init_settings() {
    //初始化
    if (localStorage.getItem("settings") == null) {
        current_settings = default_settings;
        localStorage.setItem("settings", JSON.stringify(default_settings));
    }
}