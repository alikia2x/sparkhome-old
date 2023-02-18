class Background extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            blur: false,
        }
    }
    render() {
        return (
            <img src={this.props.src} className={"w-full h-full fixed object-cover inset-0 duration-300" + (this.state.blur ? "blur-sm scale-125" : "")}></img>
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
        return (
            <input type="text" placeholder="搜索"></input>
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
const element = <Background src={settings["wallpaper"]} />;
root.render(element);