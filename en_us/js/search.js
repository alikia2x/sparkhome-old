const engine_name_trans = {'baidu': '百度', 'bing': '必应', 'google': '谷歌', 'sougou': '搜狗', 'fsou': "F搜", "duckduckgo":"DuckDuckGo"},
    include_engine = {
        "duckduckgo": "https://duckduckgo.com/?q=%s",
        "bing": "https://cn.bing.com/search?q=%s",
        "google": "https://www.google.com/search?q=%s",
    }, extra_engine = {
        "yandex": "https://yandex.com/search/?text=%s",
        "sougou": "https://www.sogou.com/web?query=%s",
        "360": "https://www.so.com/s?q=%s",
        "baidu": "https://www.baidu.com/s?wd=%s",
        "ecosia": "https://www.ecosia.org/search?q=%s",
        "fsou": "https://fsoufsou.com/search?q=%s",
    }, website_search = {
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
    document.getElementById("shortcut").style.opacity = "0";
    if (get_settings("bg_blur") === true) {
        document.getElementById("main").style.filter = "blur(10px) brightness(0.7)";
        document.getElementById("main").style.transform = "scale(1.15)";
    }
    else {
        document.getElementById("main").style.filter = "brightness(0.5)";
    }
    setTimeout('document.getElementById("shortcut").style.display="none";',200);
}

function search_small() {
    if (document.getElementById("search").getAttribute("focus") != null) {
        document.getElementById("search").removeAttribute("focus");
        document.getElementById("shortcut").style.display="inline";
        setTimeout('document.getElementById("shortcut").style.opacity = "1";',60);
        if (get_settings("bg_blur") === true) {
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

//检查是否有自定义引擎
function check_extra_engine() {
    try {
        JSON.parse(localStorage.getItem("engine_list"));
        return true;
    }
    catch {
        return false;
    }
}

function set_engine() {
    let engine_list;
    //主界面的引擎显示
    if (check_extra_engine()) {
        //当前的引擎列表
        engine_list = JSON.parse(localStorage.getItem("engine_list"));
    }
    else {
        engine_list = {};
    }
    //初始化
    if (localStorage.getItem('engine') == null) {
        localStorage.setItem('engine', 'bing');
    }
    //本地存储引擎名有误
    if (!(localStorage.getItem('engine') in engine_list) && !(localStorage.getItem('engine') in include_engine)){
        localStorage.setItem('engine', 'bing');
    }
    let engine = localStorage.getItem('engine');
    //处理引擎中文名
    if (engine in engine_name_trans) {
        document.getElementById("engine_txt").innerHTML = engine_name_trans[engine];
    }
    else {
        document.getElementById("engine_txt").innerHTML = engine;
    }
}

//表层封装函数
function engine_change(engine) {
    //底层修改
    localStorage.setItem('engine', engine);
    set_engine();
    fresh_setting_engine();
}

//2022.10.23 04:06到此一游：我已经快看不懂我的代码了
//刷新设置中的引擎列表
function fresh_setting_engine() {
    let engine = localStorage.getItem('engine');
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
    if (check_extra_engine()) {
        var engine_list=JSON.parse(localStorage.getItem("engine_list"));
        var html="";
        for (var key in engine_list) {
            html += '<div class="engine" id="settings_'+key+'" ><div onclick="engine_change(\''+key+'\')"><span class="engine_name">'+key+'</span><span class="engine_url">'+engine_list[key]+'</span></div><div class="iconfont icon-delete"  style="font-size: 16px;position:absolute;right:10px;" onclick="remove_engine(this)"></div></div>';
        }
        document.getElementById("extra_engine").innerHTML=html+'<div class="engine" onclick="add_engine_user()"><span class="engine_name">添加</span></div>';
    }
    else {
        document.getElementById("extra_engine").innerHTML = '<div class="engine" onclick="add_engine_user()"><span class="engine_name">添加</span></div>';
    }
}

function add_engine_user() {
    Swal.fire({
        title: '添加搜索引擎',
        confirmButtonText: "添加",
        showCancelButton: true,
        cancelButtonText: "取消",
        showClass: {
            popup: 'fadeIn'
        },
        hideClass: {
            popup: 'fadeOut'
        },
        html:
            '名称<br><input id="add_engine_name" class="add_engine_input"><br>' +
            'URL<br>注:你需要将链接中的搜索词替换为%s<br><input id="add_engine_url" class="add_engine_input">',
    }).then((result) => {
        if (result.value) {
            let name = document.getElementById("add_engine_name").value;
            if (strlen(name) > 12) {
                Swal.fire({
                    title: '错误',
                    text: "名称过长！",
                    type: "error",
                });
                return 0;
            }
            let url = document.getElementById("add_engine_url").value;
            add_engine(name, url);
        }
    });
}

function add_engine(name, url) {
    let engine_list;
    if (url.indexOf("http") === 0 && url.indexOf("%s") !== -1) {
        try {
            engine_list = JSON.parse(localStorage.getItem("engine_list"));
        } catch (error) {
            engine_list = {};
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
            title: '错误',
            text: "输入格式有误！",
            type: "error",
        });
    }
}

function remove_engine(element) {
    Swal.fire({
        title: '确定删除',
        text: "确定删除该搜索引擎？",
        type: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: '删除',
        cancelButtonText: "取消",
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
    let url;
    var engine = localStorage.getItem('engine');
    if (engine in include_engine) {
        url = include_engine[engine].replace("%s", keyword);
    }
    else {
        let engine_list = JSON.parse(localStorage.getItem("engine_list"));
        url = engine_list[engine].replace("%s",keyword);
    }
    link(url);
}

function init_engine() {
    if (localStorage.getItem("engine_list") == null)
        localStorage.setItem("engine_list", "");
}

function write_engine_list() {
    //主界面引擎列表
    if (check_extra_engine()) {
        let engine_list = JSON.parse(localStorage.getItem("engine_list"));
        let html = "";
        for (let key in engine_list){
            if(key in engine_name_trans)
                html+=`<a value=${key} onclick="engine_change('${key}')">${engine_name_trans[key]}</a>`;
            else
                html+=`<a value=${key} onclick="engine_change('${key}')">${key}</a>`;
        }
        document.getElementById("search_engine").innerHTML = '<a value="google" onclick="engine_change(\'google\')">Google</a><a value="duckduckgo" onclick="engine_change(\'duckduckgo\')">DuckDuckGo</a><a value="bing" onclick="engine_change(\'bing\')">Bing</a>'
        + html;
    } else {
        document.getElementById("search_engine").innerHTML = '<a value="google" onclick="engine_change(\'google\')">Google</a><a value="duckduckgo" onclick="engine_change(\'duckduckgo\')">DuckDuckGo</a><a value="bing" onclick="engine_change(\'bing\')">Bing</a>'
    }
}
init_engine();
load_engine();
fresh_setting_engine();
