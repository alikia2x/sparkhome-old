function get_bing(){
    let xhr = new XMLHttpRequest();
    xhr.open("GET", "https://api.rastart.top/bing", true);
    xhr.onreadystatechange = function() {
        if (xhr.readyState === XMLHttpRequest.DONE && xhr.status === 200) {
            let data = xhr.responseText;
            localStorage.setItem("bing_data", data);
            localStorage.setItem("bing_data",data);
            data=JSON.parse(data);
            document.getElementById("bing_desc").innerText=data.images[0]["copyright"];
            document.getElementById("bing_img").src = "https://cn.bing.com" + data.images[0].url;
        }
        else{
            return "error";
        }
    };
    xhr.send();
}


function set_wallpaper(url) {
    document.getElementById("wallpaper_link").value = url;
    localStorage.setItem('pic', url);
    if (url === "bing") {
        document.getElementById("main").setAttribute('src', "https://cn.bing.com" + JSON.parse(localStorage.getItem("bing_data")).images[0].url);
    }
    else {
        document.getElementById("main").setAttribute('src', url);
    }
}

function load_wallpaper() {
    //启动时加载上一次的壁纸
    let url = localStorage.getItem('pic');
    if (url == null) {
        set_wallpaper("https://sparkhome.cdn.bcebos.com/img/wallp/1.jpg?x-bce-process=image/resize%2Climit_0%2Cm_lfit%2Cw_1920");
        localStorage.setItem('pic', 'https://sparkhome.cdn.bcebos.com/img/wallp/1.jpg?x-bce-process=image/resize%2Climit_0%2Cm_lfit%2Cw_1920');
    }
    if (url === "bing") {
        set_wallpaper("bing");
    }
    else {
        document.getElementById("main").setAttribute('src', url);
    }
}


function bg_loaded(obj) {
    obj.style.opacity = "1";
}