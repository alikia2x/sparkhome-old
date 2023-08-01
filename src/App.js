import React from "react";
import "./index.css";

import Search from "./components/search";
import Background from "./components/background";
import Selector from "./components/selector";
import Time from "./components/time";
import Window from "./components/window";
import Settings from "./components/settings";

import {Cog8ToothIcon} from '@heroicons/react/24/outline';

import {connect} from 'react-redux';
import { updateSettings } from './actions/settingsActions';

class App extends React.Component {
    state = {
        //背景聚焦状态
        isFocus: false,
        showWindow: false,
    };


    getEnginesNameList() {
        let engineDict = this.props.settings["searchEngines"];
        let nameList = [];
        for (let key in engineDict) {
            nameList.push(this.props.settings.searchEngines[key]["name"]);
        }
        return nameList;
    }

    //使用箭头函数，使得`this`能正常指代。
    handleSelectorChange = (target) => {
        let engineDict = this.props.settings["searchEngines"];
        //为了保证Selector组件的可复用性，给其名为`items`的props的传值为引擎名称的显示名称列表，而非`searchEngines`这个dict。
        //这会导致调用回调时，此函数接收到的是显示名称，故遍历反查出其key。
        for (let key in engineDict) {
            if (this.props.settings["searchEngines"][key]["name"] === target) {
                this.props.updateSettings({"currentSearchEngine": key});
            }
        }
    };

    handleSearchboxFocusSwitch = () => {
        this.setState({isFocus: !this.state.isFocus});
    };

    handleToggleWindow = () => {
        this.setState({showWindow: !this.state.showWindow});
    };

    handleMainAppKeyDown = (e) => {
        if (e.key === "Enter") {
            console.debug("Pressed Enter.")
            document.getElementById("searchBox").blur();
        }
    }

    componentDidMount() {
        //Nothing yet.
    }

    render() {
        return (
            <div id="app" className="h-full fixed overflow-hidden w-full font-DIN"
                 onKeyDown={(e) => this.handleMainAppKeyDown(e)}>
                <div id="settingsBtn" className="absolute z-20 right-4 bottom-4 w-10 h-10">
                    <button
                        className="p-2 text-white bg-[rgba(255,255,255,0.2)] hover:bg-gray-600 rounded-full"
                        onClick={this.handleToggleWindow}
                    >
                        <Cog8ToothIcon className="w-5 h-5"/>
                    </button>
                </div>

                {this.state.showWindow && (
                    <Window coverBackdrop={this.props.settings.elementBackdrop} onClose={this.handleToggleWindow} content={(
                        <Settings/>
                    )}
                    />
                )}

                <Background
                    src={this.props.settings.wallpaper}
                    enableBlur={this.props.settings.bgBlur}
                    isFocus={this.state.isFocus}
                />

                <Time showSecond={this.props.settings.timeShowSecond}/>

                <Search
                    elementBackdrop={this.props.settings.elementBackdrop}
                    engine={this.props.settings.searchEngines[this.props.settings.currentSearchEngine]["link"]}
                    onFocusSwitch={this.handleSearchboxFocusSwitch}
                />

                <Selector
                    items={this.getEnginesNameList()}
                    max_show={7}
                    //获取当前引擎的名字
                    current={this.props.settings.searchEngines[this.props.settings.currentSearchEngine]["name"]}
                    css="top-[17rem] st:top-44 z-10 left-1/2 translate-x-[-50%] absolute"
                    elementBackdrop={this.props.settings.elementBackdrop}
                    selectedOnChange={this.handleSelectorChange}
                />
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        settings: state.settings,
    }
};

export default connect(mapStateToProps, {updateSettings})(App);