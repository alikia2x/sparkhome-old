const default_shortcut = [
    { "url": "https://www.bilibili.com/", "title": "哔哩哔哩", "icon": "https://www.bilibili.com/favicon.ico" },
    { "url": "https://music.163.com/", "title": "网易云音乐", "icon": "http://s1.music.126.net/style/favicon.ico" },
    { "url": "https://mail.163.com/", "title": "网易邮箱", "icon": "http://mail.163.com/favicon.ico" },
]

function add_shortcut() {
    Swal.fire({
        title: '添加快捷链接',
        confirmButtonText: "添加",
        showCancelButton: true,
        cancelButtonText: "取消",
        showClass: {
            popup: 'fadeIn'
        },
        hideClass: {
            popup: 'fadeOut'
        },
        backdrop: `
            rgba(0,0,0,0.4)
        `,
        html:
            `网站URL<br><input id="add_shortcut_url" class="add_engine_input"><br>
            网站名称(可选)<br><input id="add_shortcut_name" class="add_engine_input"><br>
            网站图标(可选)<br><input id="add_shortcut_icon" class="add_engine_input"><br>
            `
    }).then((result) => {
        if (result.value) {
            var url=document.getElementById("add_shortcut_url").value;
            var title=document.getElementById("add_shortcut_name").value;
            var icon=document.getElementById("add_shortcut_icon").value;
            var shortcut2add={};
            shortcut2add["url"]=url;

            var xhr = new XMLHttpRequest();
            xhr.open("GET", "https://api.rastart.top/icon?url="+btoa(url));
            xhr.send();
            xhr.onreadystatechange = function () {
                if (xhr.readyState === XMLHttpRequest.DONE && xhr.status === 200) {
                    var data=xhr.responseText;
                    try {
                        var data = JSON.parse(data);
                        if (data["code"]==0){
                            data["icon"]=decodeURIComponent(atob(data["icon"]));
                            data["title"]=decodeURIComponent(atob(data["title"]));
                            if (title==""){shortcut2add["title"]=data["title"];}
                            else{shortcut2add["title"]=title;}
                            if (icon==""){shortcut2add["icon"]=data["icon"];}
                            else{shortcut2add["icon"]=icon;}
                        }
                        else {
                            shortcut2add["title"]=url;
                            shortcut2add["icon"]=icon;
                        }
                    } catch (e) {
                        shortcut2add["title"]=url;
                        shortcut2add["icon"]=icon;
                    }
                    var current_shortcut=JSON.parse(localStorage.getItem("shortcut"));
                    current_shortcut.push(shortcut2add);
                    localStorage.setItem("shortcut",JSON.stringify(current_shortcut));
                    display_shortcut_home();
                }
            };
        }
    });
}


function display_shortcut_home() {
    try { var shortcut = JSON.parse(localStorage.getItem("shortcut")); }
    catch { init_shortcut(); }
    var html = "";
    for (var i = 0; i < shortcut.length; i++){
        html += `<div class="link" onclick='link("`+shortcut[i].url+`")'><img src="`+shortcut[i].icon+`" class="shortcut_icon"><div class="shortcut_title">`+shortcut[i].title+`</div></div>`;
    }
    html += `<div class="link" onclick='add_shortcut()'><div class="iconfont icon-add shortcut_icon" style="font-size: 34px;"></div></div>`;
    document.getElementById("shortcut").innerHTML = html;
}

init_shortcut();

function init_shortcut() {
    if (localStorage.getItem("shortcut") == null) {
        localStorage.setItem("shortcut", JSON.stringify(default_shortcut));
    }
    try {
        JSON.parse(localStorage.getItem("shortcut"));
    }
    catch {
        localStorage.setItem("shortcut", JSON.stringify(default_shortcut));
    }
    display_shortcut_home();
}
