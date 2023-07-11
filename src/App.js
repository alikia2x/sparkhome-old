import React from "react";
import "./index.css";
import Search from "./components/search";
import Background from "./components/background";
import Selector from "./components/selector";
import Time from "./components/time";
import Window from "./components/window";
import {Cog8ToothIcon} from '@heroicons/react/24/outline';

const defaultSettings = {
    wallpaper:
        "https://sparkhome.cdn.bcebos.com/img/wallp/7.jpg?x-bce-process=image/resize%2Climit_0%2Cm_lfit%2Cw_1920",
    showWeather: true,
    showHitokoto: true,
    elementBackdrop: true,
    bgBlur: true,
    timeSync: true,
    connectionCheck: true,
    coverBlur: true,
    showShortcutOnFocus: false,
    currentSearchEngine: "baidu",
    timeShowSecond: true,
    searchEngines: {
        baidu: {
            name: "百度",
            link: "https://www.baidu.com/s?wd=%s",
        },
        google: {
            name: "谷歌",
            link: "https://www.google.com/search?q=%s",
        },
        bing: {
            name: "必应",
            link: "https://www.bing.com/search?q=%s",
        },
        "nxawd": {
            "name": "fsaoxk",
            "link": "https://www.nxawd.com/search?q=%s"
        },
        "asjkd": {
            "name": "lmfrl",
            "link": "https://www.asjkd.com/search?q=%s"
        },
        "qoweu": {
            "name": "khqzl",
            "link": "https://www.qoweu.com/search?q=%s"
        },
        "icvjz": {
            "name": "qpczf",
            "link": "https://www.icvjz.com/search?q=%s"
        },
        "zbpae": {
            "name": "lwozh",
            "link": "https://www.zbpae.com/search?q=%s"
        },
        "pnsew": {
            "name": "ftprs",
            "link": "https://www.pnsew.com/search?q=%s"
        },
        "yuzsm": {
            "name": "rtupx",
            "link": "https://www.yuzsm.com/search?q=%s"
        },
        "jefoa": {
            "name": "wimcf",
            "link": "https://www.jefoa.com/search?q=%s"
        },
        "hltez": {
            "name": "yzfgr",
            "link": "https://www.hltez.com/search?q=%s"
        },
        "hqaeg": {
            "name": "rqpmd",
            "link": "https://www.hqaeg.com/search?q=%s"
        },
        "hxndy": {
            "name": "fciru",
            "link": "https://www.hxndy.com/search?q=%s"
        },
        "kqdyn": {
            "name": "zcrfg",
            "link": "https://www.kqdyn.com/search?q=%s"
        },
        "zowbt": {
            "name": "lfbxz",
            "link": "https://www.zowbt.com/search?q=%s"
        },
        "wstgx": {
            "name": "xwkfm",
            "link": "https://www.wstgx.com/search?q=%s"
        },
        "lxryc": {
            "name": "dorgs",
            "link": "https://www.lxryc.com/search?q=%s"
        },
        "hkqbg": {
            "name": "jmspl",
            "link": "https://www.hkqbg.com/search?q=%s"
        },
        "irhjo": {
            "name": "pkgrh",
            "link": "https://www.irhjo.com/search?q=%s"
        },
        "rgtcl": {
            "name": "fhkqy",
            "link": "https://www.rgtcl.com/search?q=%s"
        },
        "drtsz": {
            "name": "mqwbg",
            "link": "https://www.drtsz.com/search?q=%s"
        },
        "wqkru": {
            "name": "shqgm",
            "link": "https://www.wqkru.com/search?q=%s"
        }

    },
};

class App extends React.Component {
    state = {
        settings: defaultSettings,
        //背景聚焦状态
        isFocus: false,
        showWindow: false,
    };

    initSettings() {
        if (localStorage.getItem("settings") === null) {
            this.setState({settings: defaultSettings});
            localStorage.setItem("settings", JSON.stringify(defaultSettings));
        } else {
            const settings = JSON.parse(localStorage.getItem("settings"));
            this.setState({settings: settings});
        }
    }

    changeSettings(name, value) {
        try {
            this.initSettings();
            let settings = this.state.settings;
            settings[name] = value;
            this.setState({settings: settings});
            localStorage.setItem("settings", JSON.stringify(settings));
        } catch (error) {
            console.error(error);
        }
    }

    getEnginesNameList() {
        let engineDict = this.state.settings["searchEngines"];
        let nameList = [];
        for (let key in engineDict) {
            nameList.push(this.state.settings.searchEngines[key]["name"]);
        }
        return nameList;
    }

    componentDidMount() {
        this.initSettings();
    }

    //使用箭头函数，使得`this`能正常指代。
    handleDropdownChange = (target) => {
        let engineDict = this.state.settings["searchEngines"];
        //为了保证Dropdown组件的可复用性，给其名为`items`的props的传值为引擎名称的显示名称列表，而非`searchEngines`这个dict。
        //这会导致调用回调时，此函数接收到的是显示名称，故遍历反查出其key。
        for (let key in engineDict) {
            if (this.state.settings["searchEngines"][key]["name"] === target) {
                this.changeSettings("currentSearchEngine", key);
            }
        }
    };

    handleSearchboxFocusSwitch = () => {
        this.setState({isFocus: !this.state.isFocus});
    };

    handleToggleWindow = () => {
        this.setState({showWindow: !this.state.showWindow});
    };

    render() {
        return (
            <div id="app" className="h-full fixed overflow-hidden w-full">
                <div id="settingsBtn" className="absolute z-20 right-4 bottom-4 w-10 h-10">
                    <button
                        className="p-2 text-white bg-[rgba(255,255,255,0.2)] hover:bg-gray-600 rounded-full"
                        onClick={this.handleToggleWindow}
                    >
                        <Cog8ToothIcon className="w-5 h-5"/>
                    </button>
                </div>

                {this.state.showWindow && (
                    <Window onClose={this.handleToggleWindow} content={(
                        <div>
                            <h1 className="text-lg font-semibold">A Window</h1>
                            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas sit amet eros molestie,
                                pharetra lectus at, blandit enim. Etiam et lorem vel elit venenatis venenatis. Fusce eu
                                porttitor justo, non malesuada tortor. Aenean luctus eros sem, eget maximus leo faucibus
                                et. Praesent lobortis urna eu ipsum imperdiet fermentum. Quisque rutrum viverra
                                convallis. Fusce vulputate justo vitae nisl pulvinar, at placerat libero rutrum. </p>
                            <p>Fusce varius arcu leo, pulvinar consequat dui mattis quis. Morbi ipsum nisi, hendrerit
                                nec sodales quis, pulvinar iaculis ex. Aenean pulvinar consectetur lacinia. Nulla
                                facilisi. Aliquam molestie viverra augue sit amet viverra. Vestibulum laoreet tincidunt
                                eros, et lobortis odio suscipit ut. Sed vehicula lacus eu est interdum tristique. Cras
                                eu magna lectus. Phasellus finibus diam id consectetur consequat. </p>
                        </div>
                    )}
                    />
                )}

                <Background
                    src={this.state.settings.wallpaper}
                    enableBlur={this.state.settings.bgBlur}
                    isFocus={this.state.isFocus}
                />

                <Time showSecond={this.state.settings.timeShowSecond}/>

                <Search
                    elementBackdrop={this.state.settings.elementBackdrop}
                    engine={
                        this.state.settings.searchEngines[
                            this.state.settings.currentSearchEngine
                            ]["link"]
                    }
                    onFocusSwitch={this.handleSearchboxFocusSwitch}
                />

                <Selector
                    items={this.getEnginesNameList()}
                    current={
                        this.state.settings.searchEngines[
                            this.state.settings.currentSearchEngine
                            ]["name"]
                    } //获取当前引擎的名字
                    css="top-[17rem] st:top-44 z-10 left-1/2 translate-x-[-50%] absolute"
                    elementBackdrop={this.state.settings.elementBackdrop}
                    selectedOnChange={this.handleDropdownChange}
                />
            </div>
        );
    }
}

export default App;
