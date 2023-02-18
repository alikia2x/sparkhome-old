var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var dict = {
    "en": {
        "搜索": "Search"
    }
};

function t(text) {
    var lang = navigator.language;
    if (lang.includes("en")) {
        return dict["en"][text];
    } else {
        return text;
    }
}

var Background = function (_React$Component) {
    _inherits(Background, _React$Component);

    function Background(props) {
        _classCallCheck(this, Background);

        var _this = _possibleConstructorReturn(this, (Background.__proto__ || Object.getPrototypeOf(Background)).call(this, props));

        _this.state = {
            blur: false
        };
        return _this;
    }

    _createClass(Background, [{
        key: "render",
        value: function render() {
            var css = "w-full h-full fixed object-cover inset-0 duration-300 z-0 ";
            var var_css = this.state.blur ? "blur-sm scale-125" : "";
            return React.createElement("img", { src: this.props.src, className: css + var_css });
        }
    }]);

    return Background;
}(React.Component);

var Search = function (_React$Component2) {
    _inherits(Search, _React$Component2);

    function Search(props) {
        _classCallCheck(this, Search);

        var _this2 = _possibleConstructorReturn(this, (Search.__proto__ || Object.getPrototypeOf(Search)).call(this, props));

        _this2.state = {
            blur: false
        };
        return _this2;
    }

    _createClass(Search, [{
        key: "render",
        value: function render() {
            var css = "relative z-1 w-[400px] h-10 rounded-3xl top-48 left-1/2 translate-x-[-50%] text-center outline-none border-solid border-0 ";
            var var_css = get_settings("elementBackdrop") ? "bg-[rgba(255,255,255,0.7)] backdrop-blur" : "bg-[rgba(255,255,255,0.9)]";
            return React.createElement("input", { type: "text", placeholder: t('搜索'), className: css + var_css });
        }
    }]);

    return Search;
}(React.Component);

function getScreenInfo() {
    //屏幕信息，分别为缩放比例、分辨率、界面可用分辨率
    var ratio = 0;
    if (window.devicePixelRatio !== undefined) ratio = window.devicePixelRatio;else if (window.outerWidth !== undefined && window.innerWidth !== undefined) ratio = window.outerWidth;
    return [ratio, window.screen.height, window.screen.width, window.screen.availHeight, window.screen.availWidth];
}

var default_settings = {
    "wallpaper": "https://sparkhome.cdn.bcebos.com/img/wallp/1.jpg?x-bce-process=image/resize%2Climit_0%2Cm_lfit%2Cw_1920",
    "showWeather": true,
    "showHitokoto": true,
    "elementBackdrop": true,
    "bgBlur": true,
    "timeSync": true,
    "connectionCheck": true,
    "coverBlur": true,
    "showShortcutOnFocus": false
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

var root = ReactDOM.createRoot(document.getElementById('root'));
var element = React.createElement(
    "div",
    null,
    React.createElement(Background, { src: settings["wallpaper"] }),
    React.createElement(Search, null)
);
root.render(element);