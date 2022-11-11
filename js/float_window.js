const engine_txt = document.getElementById('engine_txt');
const search_engine = document.getElementById("search_engine");
const about_box = document.getElementById("about_box");
const cover_about = document.getElementById("cover_about");
const settings = document.getElementById("settings");
const cover_settings = document.getElementById("cover_settings");

function drop_appear() {
    engine_txt.setAttribute("appear", "true");
    search_engine.style.display = "block";
    setTimeout('search_engine.style.opacity = 1;', 10);
}

function drop_disappear() {
    engine_txt.setAttribute("appear", "false");
    search_engine.style.opacity = 0;
    setTimeout('search_engine.style.display="none";', 280);
}

function about_out() {
    $.ajax({
        url: "https://api.rastart.top/about",
        type: "GET",
        success: function (data) {
            $("#about_history")[0].innerHTML = data;
        }
    });
    about_box.style.display = "inline";
    cover_about.style.display = "inline";
    document.body.setAttribute("onkeydown", "");
    setTimeout('out_motion(cover_about,about_box)', 50);
}

function about_close() {
    cover_about.style.backgroundColor = "rgba(0,0,0,0)";
    if (get_settings("cover_blur")) {
        cover_about.style.backdropFilter = "blur(0px)";
    }
    about_box.style.opacity = 0;
    about_box.style.scale = 0.7;
    document.body.setAttribute("onkeydown", "if(event.keyCode==13) {search_focus() } if(event.keyCode==27) search_blur()");
    setTimeout('close_motion(cover_about,about_box)', 300);
}


function settings_out() {
    load_settings();
    load_img();
    settings.style.display = "inline";
    cover_settings.style.display = "inline";
    document.body.setAttribute("onkeydown", "");
    setTimeout('out_motion(cover_settings,settings)', 50);
}

function settings_close() {
    cover_settings.style.backgroundColor = "rgba(0,0,0,0)";
    if (get_settings("cover_blur")) {
        cover_settings.style.backdropFilter = "blur(0px)";
    }
    settings.style.opacity = 0;
    settings.style.scale = 0.7;
    document.body.setAttribute("onkeydown", "if(event.keyCode==13) {search_focus() } if(event.keyCode==27) search_blur()");
    setTimeout('close_motion(cover_settings,settings)', 300);
}

//用于动画结束后复位一些东西
function close_motion(cover,window) {
    cover.style.display = "none";
    window.style.display="none";
}

function out_motion(cover,window) {
    cover.style.backgroundColor = "rgba(0,0,0,0.5)";
    if (get_settings("cover_blur")) {
        cover.style.backdropFilter = "blur(10px)";
    }
    window.style.opacity = 1;
    window.style.scale = 1;
}