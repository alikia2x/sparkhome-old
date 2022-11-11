const support_lang = ['中文', '汉语', '英语', '法语', '德语', '俄语', '拉丁语', '日语', '韩语', '意大利语', '葡萄牙语'];
const lang_dic = {
    '中文': 'zh-CN', '汉语': 'zh-CN', '英语': 'en', '法语': 'fr', '德语': 'de', '俄语': 'ru', '拉丁语': 'la', '日语': 'ja',
    '韩语': 'ko', '意大利语': 'it', '葡萄牙语': 'pt',
};
const length_unit = {
    "m": 1, "meter": 1, "meters": 1, "cm": 0.01, "dm": 0.1, "mm": 0.001, "km": 1000, "inch": 0.0254, "inches": 0.0254,
    "ft": 0.3048, "mile": 1609.344, "miles": 1609.344, "米": 1, "厘米": 0.01, "分米": 0.1, "毫米": 0.001, "千米": 1000,
    "公里": 1000, "里": 500, "英寸": 0.0254, "英尺": 0.3048, "英里": 1609.344
};
const data_unit = {
    "b": 0.125, "B": 1, "Kb": 128, "KB": 1024, "Mb": 131072, "MB": 1048576, "Gb": 134217728, "GB": 1073741824, "Tb": 137438953472, "TB": 1099511627776
};

unit_list = [length_unit, data_unit];

function copy(txt) {
    var inputtemp = document.createElement("input");// 整一个input
    inputtemp.setAttribute("value", txt);// 赋值
    document.body.appendChild(inputtemp);// 添加节点
    inputtemp.select();// 选取文本域中的内容
    document.execCommand('Copy');// 复制
    document.body.removeChild(inputtemp);// 删除掉没用的节点
}

function add_smart_sug(text, onclick, icon) {
    var result_sug = document.createElement('div');
    result_sug.setAttribute("class", "suggestion");
    result_sug.textContent = text;
    result_sug.setAttribute("onclick", onclick);
    result_sug.innerHTML = '<i style="height: 16px; width:16px;display: inline-block;position: relative;left: -30px;padding-right: 5px;" class="iconfont ' + icon + '"></i>' + result_sug.innerHTML;
    document.getElementById("smart_sug_box").appendChild(result_sug);
}
function wiki(text) {
    if (text.indexOf('什么是') == 0) {
        var word = text.replace("什么是", "");
        add_smart_sug("在百度百科中搜索:" + word, "link('https://baike.baidu.com/search?word=" + word + "&pn=0&rn=0&enc=utf8')", "icon-baike");
        return true;
    }
    else {
        return false;
    }
}
function smart_trans(text) {
    if (text.indexOf('翻译') == 0) {
        if (text.indexOf(' ') != -1) {
            //用空格分割
            var splited_text = text.split(" ");
            //清除空元素                    
            splited_text.clean('');
            if (splited_text.length >= 3) {
                var plain_txt = splited_text[1];
                var target_lang = splited_text[2];
                //默认翻译至中文
                if (target_lang == "") {
                    var word_display = plain_txt;
                    if (plain_txt.length >= 40){
                        word_display = plain_txt.substr(0, 37) + "...";
                    }
                    add_smart_sug("翻译: " + word_display, "link('https://translate.google.cn/?sl=auto&tl=zh-CN&text=" + plain_txt + "&op=translate')", "icon-shuyi_fanyi-36");
                }
                //
                else if (lang_dic[target_lang] != null) {
                    var word_display = plain_txt;
                    if (plain_txt.length >= 40){
                        word_display = plain_txt.substr(0, 37) + "...";
                    }
                    add_smart_sug("将" + word_display + "翻译为" + target_lang, "link('https://translate.google.cn/?sl=auto&tl=" + lang_dic[target_lang] + "&text=" + plain_txt + "&op=translate')", "icon-shuyi_fanyi-36")
                }
            }
        }
        return true;
    }
    else if (text.indexOf('是什么意思') != -1) {
        if (text.indexOf('是什么意思') == text.length - 5) {
            var plain_txt = text.substr(0, text.length - 5);
            var word_display = plain_txt;
            if (plain_txt.length >= 40){
                word_display = plain_txt.substr(0, 37) + "...";
            }
            add_smart_sug("翻译:" + word_display, "link('https://translate.google.cn/?sl=auto&tl=zh-CN&text=" + plain_txt + "&op=translate')", "icon-shuyi_fanyi-36");
            return true;
        }
    }
    else if (text.indexOf('什么意思') != -1) {
        if (text.indexOf('什么意思') == text.length - 4) {
            var plain_txt = text.substr(0, text.length - 4);
            var word_display = plain_txt;
            if (plain_txt.length >= 40){
                word_display = plain_txt.substr(0, 37) + "...";
            }
            add_smart_sug("翻译:" + word_display, "link('https://translate.google.cn/?sl=auto&tl=zh-CN&text=" + plain_txt + "&op=translate')", "icon-shuyi_fanyi-36");
            return true;
        }
    }
    else if (text.indexOf('翻译') != -1) {
        if (text.indexOf('翻译') == text.length - 2) {
            var plain_txt = text.substr(0, text.length - 2);
            var word_display = plain_txt;
            if (plain_txt.length >= 40){
                word_display = plain_txt.substr(0, 37) + "...";
            }
            add_smart_sug("翻译:" + word_display, "link('https://translate.google.cn/?sl=auto&tl=zh-CN&text=" + plain_txt + "&op=translate')", "icon-shuyi_fanyi-36");
            return true;
        }
    }
    else {
        for (var i = 0; i < support_lang.length; i++) {
            if (text.indexOf(support_lang[i]) != -1) {
                var word = text.split(support_lang[i])[0];
                if (word[word.length - 1] == "的") {
                    word = word.substr(0, word.length - 1);
                }
                add_smart_sug("将" + word + "翻译为" + support_lang[i], "link('https://translate.google.cn/?sl=auto&tl=" + lang_dic[support_lang[i]] + "&text=" + word + "&op=translate')", "icon-shuyi_fanyi-36");
                return true;
            }
        }
    }
    return false;
}

function smart_url(text) {
    clear_smart_sug()
    //别问我,这re我自己也看不懂了.
    //反正url,域名,ip都能很好匹配就对了
    var url_re = /^https?:\/\/([\w-]+\.)+[\w-]+(\/[\w-./?%&=]*)?:?[0-9]{0,5}\/?[-a-zA-Z0-9/.?&=]*$/;
    var domain_re = /^[a-zA-Z0-9][-a-zA-Z0-9]{0,62}(\.[a-zA-Z][-a-zA-Z]{0,62})+\.?:?[0-9]{0,5}\/?[-a-zA-Z0-9/.?&=]*$/;
    var ip_re = /^((2(5[0-5]|[0-4]\d))|[0-1]?\d{1,2})(\.((2(5[0-5]|[0-4]\d))|[0-1]?\d{1,2})){3}:?[0-9]{0,5}\/?[-a-zA-Z0-9/.?&=]*$/;
    if (url_re.test(text)) {
        var result_sug = document.createElement('div');
        result_sug.setAttribute("class", "suggestion");
        var word_display = text;
        if (text.length >= 60) {
            word_display = text.substr(0, 59) + "...";
        }
        add_smart_sug("访问: " + word_display, "link('" + text + "')", "icon-lianjie");
        return 0;
    }
    else if (domain_re.test(text)) {
        var result_sug = document.createElement('div');
        result_sug.setAttribute("class", "suggestion");
        var word_display = text;
        if (text.length >= 60) {
            word_display = text.substr(0, 59) + "...";
        }
        add_smart_sug("访问: https://" + word_display, "link('https://" + text + "')", "icon-lianjie");
        return 0;
    }
    else if (ip_re.test(text)) {
        var result_sug = document.createElement('div');
        result_sug.setAttribute("class", "suggestion");
        var word_display = text;
        if (text.length >= 60) {
            word_display = text.substr(0, 59) + "...";
        }
        add_smart_sug("访问: http://" + word_display, "link('http://" + text + "')", "icon-lianjie");
        return 0;
    }
}

function unit_trans(text) {
    if (text.indexOf(' ') != -1) {
        var splited_text = text.split(" ");
        splited_text.clean('');
        splited_text.clean('in');
        splited_text.clean('to');
        splited_text.clean('convert');
        splited_text.clean('conv');
        splited_text.clean('Convert');
        if (splited_text.length >= 3) {
            for (var i = 0; i < unit_list.length; i++) {
                var unit_before = splited_text[1];
                var unit_after = splited_text[2];
                var number = splited_text[0];
                if (unit_list[i].hasOwnProperty(unit_before) && unit_list[i].hasOwnProperty(unit_after)) {
                    var result = "" + parseFloat((number * unit_list[i][unit_before] / unit_list[i][unit_after]).toFixed(8));
                    result = result.replace("NaN", "错误");
                    add_smart_sug("换算结果:" + result + "(单击以复制)", "copy(" + result + ");", "icon-zuoyoujiantou");
                }
            }
        }
    }
    else if (text.indexOf("是多少") != -1) {
        var splited_text = text.split("是多少");
        var split_num = /[0-9]+\.?[0-9]*/g;
        if (splited_text.length == 2) {
            for (var i = 0; i < unit_list.length; i++) {
                if (split_num.test(splited_text[0])) {
                    var unit_pos = splited_text[0].search(split_num) + splited_text[0].match(split_num)[0].length;
                    var unit_pos_finish = splited_text[0].length - 1;
                    var unit_before = splited_text[0].substr(unit_pos, unit_pos_finish);
                    var unit_after = splited_text[1];
                    var number = parseFloat(splited_text[0].match(split_num)[0]);
                    if (unit_list[i].hasOwnProperty(unit_before) && unit_list[i].hasOwnProperty(unit_after)) {
                        var result = "" + (number * unit_list[i][unit_before] / unit_list[i][unit_after]).toFixed(6);
                        result = result.replace("NaN", "错误");
                        add_smart_sug("换算结果:" + result + "(单击以复制)", "copy(" + result + ");", "icon-zuoyoujiantou");
                    }
                }
            }
        }
    }
}

function now_date(text) {
    var today = new Date();
    var y = today.getFullYear();
    var mon = today.getMonth() + 1;
    var d = today.getDate();
    const weeks = new Array("星期日", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六");
    var w = weeks[today.getDay()];
    var hour = today.getHours();
    var min = today.getMinutes();
    var sec = today.getSeconds();
    min = addZero(min);
    sec = addZero(sec);
    hour = addZero(hour);
    if (text == "日期"){
        var result = y + "年" + mon + "月" + d + "日";
        add_smart_sug(result+"(单击以复制)", "copy('" + result + "');", "icon-zuoyoujiantou");
    }
    else if (text == "时间"){
        var result = hour + ":" + min;
        add_smart_sug(result+"(单击以复制)", "copy('" + result + "');", "icon-zuoyoujiantou");
    }
    else if (text == "准确时间"){
        var result = hour + ":" + min + ":" + sec;
        add_smart_sug(result+"(单击以复制)", "copy('" + result + "');", "icon-zuoyoujiantou");
    }
}

function addZero(i){
    if (i < 10) {i = "0" + i;}
    return i;
}

function smart_calculate(text){
    var result=calculate(text);
    if(isNaN(result)==false){
        add_smart_sug("计算结果: " + result + "（单击以复制结果)", "copy(" + result + ")", "icon-jisuanqi");
        return true;
    }
    return false;
}

function clear_smart_sug() {
    for (var i = 0; i < document.getElementById("smart_sug_box").children.length; i++) {
        var sg = document.getElementById('smart_sug_box').children[i];
        sg.remove();
    }
}

function one_search() {
    var sug_box = document.getElementById("sug_box");
    sug_box.style.display = 'inline';
    clear_smart_sug();
    document.getElementById("suggestions").style.opacity = "0.8";
    keyword = document.getElementById("search").value;
    if (keyword.length == 0) {
        document.getElementById("suggestions").style.opacity = "0";
        setTimeout('document.getElementById("sug_box").style.display = "none";document.getElementById("sug_box").innerHTML = "";', 150);
        clear_smart_sug();
        return -1;
    } 
    smart_url(keyword);
    unit_trans(keyword);
    smart_calculate(keyword);
    now_date(keyword);
    wiki(keyword);
    smart_trans(keyword);
    oScript = document.createElement('script');
    oScript.src = "https://suggestion.baidu.com/su?wd=" + keyword + "&cb=suggestion";
    document.body.appendChild(oScript);
    document.body.removeChild(oScript);
}
function suggestion(data) {
    //在搜索框聚焦时触发
    if (document.getElementById("search").hasAttribute("focus")) {
        //仅在当前搜索框内容等于请求内容时触发
        //if (document.getElementById("search").value.toLowerCase()==data.q){
        var sug_box = document.getElementById("sug_box");
        var list = data.s;
        var str = '';
        if (list.length > 0) {
            list.forEach(function (ele, index) {
                str += '<div class="suggestion" onclick="search(' + "'" + ele + "'" + ')">' + ele + '</div>';
            });
            sug_box.innerHTML = str;
        }
        else {
            document.getElementById("sug_box").innerHTML = "";
        }
        document.getElementById("suggestions").style.opacity = "1";
        //}
    }
    else {
        document.getElementById("suggestions").style.opacity = "0";
        document.getElementById("sug_box").innerHTML = "";
        setTimeout('document.getElementById("sug_box").style.display = "none";', 150);
    }
}

var priority = {
    '^': 3,
    '*': 2,
    '/': 2,
    '+': 1,
    '-': 1,
};

//字符串转数组
function strExpression2arrExpression(expression){
    var arr = [];
    for (var i = 0, s, t, l = expression.length; i < l; i++) {
        s = expression.charAt(i);
        if (isNaN(s) && s != '.') {
            arr.push(s);
        } 
        else {
            t = s;
            while (i < l) {
                s = expression.charAt(i + 1);
                if (!isNaN(s) || s == '.') {
                    t += s;
                    i++;
                    if (t.split(".").length - 1 > 1) {
                        return ["fuckyou!"];
                    }
                } else {
                    break;
                }
            }
            arr.push(parseFloat(t));
        }
    }
    return arr;
}

//数组转前缀表达式
function infixExpression2prefixExpression(arrExpression){
    
    var s1 = [], s2 = [], operator = function (o) {
        var last = s1[s1.length - 1];
        if (s1.length == 0 || last == ')') {
            s1.push(o);
        } 
        else if (priority[o] >= priority[last]) {
            s1.push(o);
        } 
        else {
            s2.push(s1.pop());
            operator(o);
        }
    };
    s1.length = 0;
    s2.length = 0;
    for (var i = arrExpression.length - 1, o; i >= 0; i--) {
        o = arrExpression[i];
        if (!isNaN(o)) {
            s2.push(o);
        } 
        else {
            if (o == '+' || o == '-' || o == '*' || o == '/' || o=='^') {//运算符
                operator(o)
            } 
            else {//括号
                if (o == ')') {//右括号
                    s1.push(o)
                } 
                else if(o == '('){//左括号
                    var s = s1.pop();
                    while (s!=undefined && s != ')' && s.length>0) {
                        s2.push(s);
                        s = s1.pop();
                    }
                }
                else{
                    return NaN;
                }
            }
        }
    }
    if (s1.length > 0) {
        while (s1[0] != undefined) {
            s2.push(s1.pop())
        }
    }
    s1.length = 0;
    return s2.slice();
}

//计算前缀表达式
function computePrefixExpression(prefixExpression){
    var s1 = [], result;
    s1.length = 0;
    //计算
    while (prefixExpression.length > 0) {
        var o = prefixExpression.shift();
        if (!isNaN(o)) {
            s1.push(o);
        } 
        else {
            switch (o) {
                case '+':
                {
                    result = s1.pop() + s1.pop();
                    break;
                }
                case '-':
                {
                    result = s1.pop() - s1.pop();
                    break;
                }
                case '*':
                {
                    result = s1.pop() * s1.pop();
                    break;
                }
                case '/':
                {
                    result = s1.pop() / s1.pop();
                    break;
                }
                case '^':
                {
                    result = Math.pow(s1.pop(),s1.pop());
                    break;
                }
            }
            s1.push(result);
        }
    }
    return s1[0];
}

function calculate(string){
    return computePrefixExpression(infixExpression2prefixExpression(strExpression2arrExpression(string)));
}