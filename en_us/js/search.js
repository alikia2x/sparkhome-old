const engine_name_cn = { 'baidu': 'Baidu', 'bing': 'Bing', 'google': 'Google', 'sougou': 'Sougou', 'fsou': "F Search" };
const include_engine = {
    "baidu": "https://www.baidu.com/s?wd=%s",
    "bing": "https://cn.bing.com/search?q=%s",
    "google": "https://www.google.com/search?q=%s",
};
const extra_engine = {
    "yandex": "https://yandex.com/search/?text=%s",
    "sougou": "https://www.sogou.com/web?query=%s",
    "360": "https://www.so.com/s?q=%s",
    "duckduckgo": "https://duckduckgo.com/?q=%s",
    "ecosia": "https://www.ecosia.org/search?q=%s",
    "fsou": "https://fsoufsou.com/search?q=%s",
};
const website_search = {
    "google_trans": "https://translate.google.cn/?sl=%sl&tl=%tl&text=%s&op=translate",//谷歌翻译
    "csdn": "https://so.csdn.net/so/search?q=%s",//csdn
    "amazon": "https://www.amazon.cn/s?k=%s",//亚马逊
    "wiki": "https://en.wikipedia.org/wiki/Special:Search?search=%s",//维基百科
    "bilibili": "https://search.bilibili.com/all?keyword=%s",//哔哩哔哩
    "tencent_video": "https://v.qq.com/x/search/?q=%s",//腾讯视频
    "douyin": "https://www.douyin.com/search/%s",//抖音
    "iqiyi": "https://so.iqiyi.com/so/q_%s",//爱奇艺
    "youku": "https://so.youku.com/search_video/q_%s",//优酷
    "douyu": "https://www.douyu.com/search/?kw=%s",//斗鱼
    "huya": "https://www.huya.com/search?hsk=%s",//虎牙
    "pexel": "https://www.pexels.com/zh-cn/search/%s/",//pexel
    "163music": "https://music.163.com/#/search/m/?s=%s",//网易云音乐
    "zhihu": "https://www.zhihu.com/search?type=content&q=%s",//知乎
    "cnblogs": "https://zzk.cnblogs.com/s?w=%s",//cnblogs
    "jd": "https://search.jd.com/Search?keyword=%s",//京东
    "tmall": "https://list.tmall.com/search_product.htm?q=%s",//天猫
    "taobao": "https://s.taobao.com/search?q=%s",//淘宝
    "weibo": "https://s.weibo.com/weibo?q=%s",//微博
    "douban": "https://www.douban.com/search?q=%s",//豆瓣
    "juejin": "https://juejin.cn/search?query=%s",//稀土掘金
    "suning": "https://search.suning.com/%s/",//苏宁易购
    "weipinhui": "https://category.vip.com/suggest.php?keyword=%s",//唯品会
    "souhu": "https://search.sohu.com/?queryType=outside&keyword=%s",//搜狐
    "netease": "https://www.163.com/search?keyword=%s",//网易
    "toutiao": "https://so.toutiao.com/search?dvpf=pc&source=input&keyword=%s",//今日头条
    "xigua": "https://www.ixigua.com/search/%s",//西瓜视频
    "tieba": "https://tieba.baidu.com/f?ie=utf-8&kw=%s&fr=search",//百度贴吧
};
function search_big() {
    document.getElementById("search").setAttribute("focus", "true");
    document.getElementById("main").style.transition = "300ms";
    if (get_settings("bg_blur") == true) {
        document.getElementById("main").style.filter = "blur(10px) brightness(0.7)";
        document.getElementById("main").style.transform = "scale(1.15)";
    }
    else {
        document.getElementById("main").style.filter = "brightness(0.5)";
    }
}

function search_small() {
    if (document.getElementById("search").getAttribute("focus") != null) {
        document.getElementById("search").removeAttribute("focus");
        if (get_settings("bg_blur") == true) {
            //动画
            document.getElementById("main").style.animationName = "bg_small";
            document.getElementById("main").style.animationDuration = "0.3s";
            //固定设置
            document.getElementById("main").style.transform = "scale(1)";
            document.getElementById("main").style.filter = "blur(0px)";
        }
        else {
            document.getElementById("main").style.filter = "";
        }
        document.getElementById("suggestions").style.opacity = "0";
        document.getElementById("search").value = "";
        drop_disappear();
        document.getElementById("suggestions").style.opacity = "0";
        setTimeout('document.getElementById("sug_box").style.display = "none";document.getElementById("sug_box").innerHTML = "";', 150);
    }
}

function search_blur() {
    document.getElementById("search").blur();
    search_small();
}

function search_focus() {
    document.getElementById("search").focus();
    search_big();
}

function set_engine() {
    //主界面的引擎显示
    if (localStorage.getItem("engine_list") != "" && localStorage.getItem("engine_list") != "{}") {
        var engine_list = JSON.parse(localStorage.getItem("engine_list"));
    }
    else { var engine_list = {}; }
    if (localStorage.getItem('engine') == null) {
        localStorage.setItem('engine', 'bing');
    }
    if (localStorage.getItem('engine') in engine_list==false && localStorage.getItem('engine') in include_engine==false){
        localStorage.setItem('engine', 'bing');
    }
    var engine = localStorage.getItem('engine');
    if (engine in engine_name_cn) {
        document.getElementById("engine_txt").innerHTML = engine_name_cn[engine];
    }
    else {
        document.getElementById("engine_txt").innerHTML = engine;
    }
}

function engine_change(engine) {
    //底层修改
    localStorage.setItem('engine', engine);
    set_engine();
    fresh_setting_engine();
}

function fresh_setting_engine() {
    var engine = localStorage.getItem('engine');
    //复位其它项
    for (var i = 0; i < document.getElementById("internal_engine").children.length; i++){
        document.getElementById("internal_engine").children[i].removeAttribute("using");      
    }
    for (var i = 0; i < document.getElementById("extra_engine").children.length; i++){
        document.getElementById("extra_engine").children[i].removeAttribute("using");      
    }
    document.getElementById("settings_" + engine).setAttribute("using","true");    
}

function load_engine() {
    //用于将引擎列表写入到设置界面中
    if (localStorage.getItem("engine_list") != "" && localStorage.getItem("engine_list") != "{}") {
        var engine_list=JSON.parse(localStorage.getItem("engine_list"));
        var html="";
        for (var key in engine_list) {
            html += '<div class="engine" id="settings_'+key+'" ><div onclick="engine_change(\''+key+'\')"><span class="engine_name">'+key+'</span><span class="engine_url">'+engine_list[key]+'</span></div><div class="remove" onclick="remove_engine(this)"></div></div>';
        }
        document.getElementById("extra_engine").innerHTML=html+document.getElementById("extra_engine").innerHTML;
    }
    else {
        document.getElementById("extra_engine").innerHTML = '<div class="engine" onclick="add_engine_user()"><span class="engine_name">Add</span></div>';
    }
}

function add_engine_user() {
    Swal.fire({
        title: 'Add Search Engine',
        confirmButtonText: "Add",
        showCancelButton: true,
        cancelButtonText: "Cancel",
        html:
            'Name<br><input id="add_engine_name" class="add_engine_input"><br>' +
            'URL<br>P.S.:You need to replace the keyword with %s<br><input id="add_engine_url" class="add_engine_input">',
    }).then((result) => {
        if (result.value) {
            var name = document.getElementById("add_engine_name").value;
            var url = document.getElementById("add_engine_url").value;
            add_engine(name, url);
        }
    });
}

function add_engine(name, url) {
    if (url.indexOf("http") == 0 && url.indexOf("%s") != -1) {
        try {
            var engine_list = JSON.parse(localStorage.getItem("engine_list"));
        } catch (error) {
            var engine_list = {};
        }
        engine_list[name] = url;
        localStorage.setItem("engine_list", JSON.stringify(engine_list));
        set_engine();
        load_engine();
        write_engine_list();
        fresh_setting_engine();   
    }
    else {
        Swal.fire({
            title: 'Error',
            text: "Input format incorrect!",
            type: "error",
        });
    } 
}

function remove_engine(element) {
    Swal.fire({
        title: 'Confirm delete',
        text: "Sure to delete?",
        type: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Delete',
        cancelButtonText: "Cancel",
      }).then((result) => {
        if (result.value) {
            var engine_list = JSON.parse(localStorage.getItem("engine_list"));
            var engine = element.parentElement.id.replace("settings_", "");
            delete engine_list[engine];
            localStorage.setItem("engine_list", JSON.stringify(engine_list));
            set_engine();
            load_engine();
            write_engine_list();
            fresh_setting_engine();
        }
      })
}

function search(keyword) {
    var engine = localStorage.getItem('engine');
    if (engine in include_engine) {
        var url = include_engine[engine].replace("%s",keyword);
    }
    else {
        var engine_list=JSON.parse(localStorage.getItem("engine_list"));
        var url = engine_list[engine].replace("%s",keyword);
    }
    link(url);
}

function init_engine() {
    if (localStorage.getItem("engine_list") == null)
        localStorage.setItem("engine_list", "");
}

function write_engine_list() {
    //主界面引擎列表
    if (localStorage.getItem("engine_list") != "" && localStorage.getItem("engine_list") != "{}") {
        var engine_list=JSON.parse(localStorage.getItem("engine_list"));
        var html="";
        for (var key in engine_list){
            if(key in engine_name_cn)
                html+='<a value='+key+' onclick="engine_change(\''+key+'\')">'+engine_name_cn[key]+'</a>';
            else
                html+='<a value='+key+' onclick="engine_change(\''+key+'\')">'+key+'</a>';
        }
        document.getElementById("search_engine").innerHTML = '<a value="baidu" onclick="engine_change(\'baidu\')">Baidu</a><a value="bing" onclick="engine_change(\'bing\')">Bing</a><a value="google" onclick="engine_change(\'google\')">Google</a>'
        + html;
    } else {
        document.getElementById("search_engine").innerHTML = '<a value="baidu" onclick="engine_change(\'baidu\')">Baidu</a><a value="bing" onclick="engine_change(\'bing\')">Bing</a><a value="google" onclick="engine_change(\'google\')">Google</a>'
    }
}
init_engine();
load_engine();
fresh_setting_engine();