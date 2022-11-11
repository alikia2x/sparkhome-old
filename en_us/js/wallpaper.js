function get_bing(){
    var xhr = new XMLHttpRequest();
    xhr.open("GET", "https://rastart.top/bing/today_bing.json", true);
    xhr.onreadystatechange = function() {
        if (xhr.readyState === XMLHttpRequest.DONE && xhr.status === 200) {
            var data = xhr.responseText;
            localStorage.setItem("bing_data", data);
            localStorage.setItem("bing_data",data);
            data=JSON.parse(data);
            var copyright=data.images[0].copyright;
            document.getElementById("bing_desc").innerText=copyright;
            document.getElementById("bing_img").src = "https://cn.bing.com" + data.images[0].url;
        }
        else{
            return "error";
        }
    };
    xhr.send();
}

function bg_change() {
    var url = document.getElementById("wallpaper_link").value;
    localStorage.setItem('pic', url);
    if (url == "bing") {
        document.getElementById("main").setAttribute('src', "https://cn.bing.com" + JSON.parse(localStorage.getItem("bing_data")).images[0].url);
    }
    else {
        document.getElementById("main").setAttribute('src', url);
    }
}

function set_wallpaper_link(url) {
    document.getElementById("wallpaper_link").value = url;
    bg_change(url); 
}
function load_wallpaper() {
    //启动时加载上一次的壁纸
    var url = localStorage.getItem('pic');
    if (url == null) {
        localStorage.setItem('pic', 'https://rastart.top/today_bing.jpg');
    }
    if (url == "bing") {
        set_wallpaper_link("bing");
    }
    else {
        document.getElementById("main").setAttribute('src', url);   
    }
}