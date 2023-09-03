import React from "react";
import "./index.css";

import Search from "./components/search";
import Background from "./components/background";
import Selector from "./components/selector";
import Time from "./components/time";
import Window from "./components/window";
import Settings from "./components/settings";
import Welcome from "./components/welcome";

import { Cog8ToothIcon } from "@heroicons/react/24/outline";

import { connect } from "react-redux";
import { updateSettings } from "./actions/settingsActions";
import { Trans } from 'react-i18next';


class App extends React.Component {
    constructor() {
        super();
        this.searchboxRef = React.createRef();
    }

    state = {
        //背景聚焦状态
        isFocus: false,
        showSettings: false,
        windowInfo: {
            "content": <></>,
            "title": "",
        },
    };

    getEnginesNameList() {
        let engineDict = this.props.settings["searchEngines"];
        let nameList = [];
        for (let key in engineDict) {
            nameList.push(this.props.settings.searchEngines[key]["name"]);
        }
        return nameList;
    }

    handleEngineChange = (target) => {
        let engineDict = this.props.settings["searchEngines"];
        //为了保证Selector组件的可复用性，给其名为`items`的props的传值为引擎名称的显示名称列表，而非`searchEngines`这个dict。
        //这会导致调用回调时，此函数接收到的是显示名称，故遍历反查出其key。
        for (let key in engineDict) {
            if (this.props.settings["searchEngines"][key]["name"] === target) {
                this.props.updateSettings({ currentSearchEngine: key });
            }
        }
    };

    searchbarFocus = () => {
        this.setState({ isFocus: true });
        this.searchboxRef.current.focus();
    }

    searchbarBlur = () => {
        this.setState({ isFocus: false });
        this.searchboxRef.current.blur();
    }

    handleToggleSettings = () => {
        this.setState({ windowInfo: { "content": <Settings></Settings>, "title": <Trans>settings.title</Trans> } });
        this.setState({ showSettings: !this.state.showSettings });
    };

    handleKeyPress = (event) => {
        if ((event.key === " " || event.key === "Enter" ) && !this.state.isFocus) {
            event.preventDefault();
            this.searchbarFocus();
        } else if (event.key === "Escape" && this.state.isFocus) {
            this.searchbarBlur();
        }
    }

    initialCheck = () => {
        if (localStorage.getItem("firstLaunchFlag"));
        else {
            //localStorage.setItem("firstLaunchFlag", "好困啊");
            setTimeout(() => {
                this.setState({ showSettings: true });
                this.setState({ windowInfo: { "content": <Welcome handleContinue={this.props.onClose}></Welcome>, "title": <Trans>introText.windowTitle</Trans> } });
            }, 500);
        }
    }

    componentDidMount = () => {
        if (this.props.settings.focusWhenLaunch) {
            this.searchbarFocus();
        }
        this.initialCheck();
        document.addEventListener("keydown", this.handleKeyPress);
    }

    componentWillUnmount() {
        document.removeEventListener("keydown", this.handleKeyPress);
    }

    render() {
        let settingsBtnBackdrop = this.props.settings.elementBackdrop ? "backdrop-blur-md" : "";
        let settingsBtnCSS = "p-2 text-white bg-[rgba(255,255,255,0.2)] dark:bg-[rgba(10,10,10,0.2)] hover:bg-gray-600 rounded-full " + settingsBtnBackdrop;
        return (
            <div
                id="app"
                className="h-full fixed overflow-hidden w-full font-DIN bg-black"
            >
                <div
                    id="settingsBtn"
                    className="absolute z-20 right-4 bottom-4 w-10 h-10"
                >
                    <button
                        className={settingsBtnCSS}
                        onClick={this.handleToggleSettings}
                    >
                        <Cog8ToothIcon className="w-5 h-5" />
                    </button>
                </div>

                <Window
                    isShow={this.state.showSettings}
                    elementBackdrop={this.props.settings.elementBackdrop}
                    onClose={this.handleToggleSettings}
                    content={this.state.windowInfo["content"]}
                    title={this.state.windowInfo["title"]}
                />

                <Background
                    src={this.props.settings.wallpaper}
                    enableBlur={this.props.settings.bgBlur}
                    isFocus={this.state.isFocus}
                    onClick={this.searchbarBlur}
                />

                <Time showSecond={this.props.settings.timeShowSecond} />

                <Search
                    elementBackdrop={this.props.settings.elementBackdrop}
                    engine={
                        this.props.settings.searchEngines[
                            this.props.settings.currentSearchEngine
                        ]["link"]
                    }
                    onFocus={this.searchbarFocus}
                    searchboxRef={this.searchboxRef}
                />

                <Selector
                    items={this.getEnginesNameList()}
                    max_show={5}
                    //获取当前引擎的名字
                    current={
                        this.props.settings.searchEngines[
                            this.props.settings.currentSearchEngine
                        ]["name"]
                    }
                    classes="top-[17rem] z-10 left-1/2 translate-x-[-50%] absolute"
                    elementBackdrop={this.props.settings.elementBackdrop}
                    selectedOnChange={this.handleEngineChange}
                />
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        settings: state.settings,
    };
};

export default connect(mapStateToProps, { updateSettings })(App);
