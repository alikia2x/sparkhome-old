const dict = {
    "en": {
        "搜索": "Search",
    },
};

function t(text) {
    var lang = navigator.language;
    if (lang.includes("en")) {
        return dict["en"][text];
    }
    else {
        return text;
    }
}

class Background extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            blur: false,
        }
    }
    render() {
        const css = "w-full h-full fixed object-cover inset-0 duration-300 z-0 ";
        var var_css = this.state.blur ? "blur-sm scale-125" : "";
        return (
            <img src={this.props.src} className={css + var_css}></img>
        );
    }
}

class Search extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            blur: false,
        }
    }
    render() {
        const css = "relative z-1 w-[400px] h-10 rounded-3xl top-48 left-1/2 translate-x-[-50%] text-center outline-none border-solid border-0 ";
        var var_css = get_settings("elementBackdrop") ? "bg-[rgba(255,255,255,0.7)] backdrop-blur" : "bg-[rgba(255,255,255,0.9)]";
        return (
            <input type="text" placeholder={t('搜索')} className={ css + var_css }></input>
        );
    }
}

function getScreenInfo() {
    //屏幕信息，分别为缩放比例、分辨率、界面可用分辨率
    var ratio = 0;
    if (window.devicePixelRatio !== undefined) ratio = window.devicePixelRatio;
    else if (window.outerWidth !== undefined && window.innerWidth !== undefined) ratio = window.outerWidth;
    return [ratio, window.screen.height, window.screen.width, window.screen.availHeight, window.screen.availWidth];
}

const default_settings = {
    "wallpaper": "https://sparkhome.cdn.bcebos.com/img/wallp/1.jpg?x-bce-process=image/resize%2Climit_0%2Cm_lfit%2Cw_1920",
    "showWeather": true,
    "showHitokoto": true,
    "elementBackdrop": true,
    "bgBlur": true,
    "timeSync": true,
    "connectionCheck": true,
    "coverBlur": true,
    "showShortcutOnFocus": false,
};

var settings = {};

function init_settings() {
    if (localStorage.getItem("settings") === null) {
        settings = default_settings;
        localStorage.setItem("settings", JSON.stringify(default_settings));
    } else {
        settings = JSON.parse(localStorage.getItem("settings"));
    }
}

function change_settings(name, value) {
    try {
        init_settings();
        settings[name] = value;
        localStorage.setItem("settings", JSON.stringify(settings));
    } catch (error) {
        console.error(error);
    }
}

function get_settings(name) {
    init_settings();
    return settings[name];
}

init_settings();

const root = ReactDOM.createRoot(document.getElementById('root'));
const element = (
    <div>
        <Background src={settings["wallpaper"]} />
        <Search></Search>
    </div>
);
root.render(element);