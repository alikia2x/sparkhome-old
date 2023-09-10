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
import { useTranslation } from 'react-i18next';


import { useState, useRef, useEffect } from 'react';

function App(props) {
    const { t } = useTranslation()
    const searchboxRef = useRef(null);

    const [isFocus, setIsFocus] = useState(false);
    const [showSettings, setShowSettings] = useState(false);
    const [windowInfo, setWindowInfo] = useState({
        content: <></>,
        title: "",
    });

    const getEnginesNameList = () => {
        const engineDict = props.settings["searchEngines"];
        const nameList = [];
        for (let key in engineDict) {
            nameList.push(props.settings.searchEngines[key]["name"]);
        }
        return nameList;
    };

    const handleEngineChange = (target) => {
        const engineDict = props.settings["searchEngines"];
        for (let key in engineDict) {
            if (props.settings["searchEngines"][key]["name"] === target) {
                props.updateSettings({ currentSearchEngine: key });
            }
        }
    };

    const searchbarFocus = () => {
        setIsFocus(true);
        searchboxRef.current.focus();
    };

    const searchbarBlur = () => {
        setIsFocus(false);
        searchboxRef.current.blur();
    };

    const handleToggleSettings = () => {
        setWindowInfo({ content: <Settings></Settings>, title: t('settings.title') });
        setShowSettings(!showSettings);
    };

    const handleKeyPress = (event) => {
        if ((event.key === " " || event.key === "Enter") && !isFocus) {
            event.preventDefault();
            searchbarFocus();
        } else if (event.key === "Escape" && isFocus) {
            searchbarBlur();
        }
    };

    const initialCheck = () => {
        if (localStorage.getItem("firstLaunchFlag")) ;
        else {
            setTimeout(() => {
                setShowSettings(true);
                setWindowInfo({ content: <Welcome handleContinue={handleToggleSettings}></Welcome>, title: t('introText.windowTitle') });
            }, 500);
        }
    };

    useEffect(() => {
        if (props.settings.focusWhenLaunch) {
            searchbarFocus();
        }
        initialCheck();
        document.addEventListener("keydown", handleKeyPress);

        return () => {
            document.removeEventListener("keydown", handleKeyPress);
        };
    }, [props.settings.focusWhenLaunch]);

    let settingsBtnBackdrop = props.settings.elementBackdrop ? "backdrop-blur-md" : "";
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
                    onClick={handleToggleSettings}
                >
                    <Cog8ToothIcon className="w-5 h-5" />
                </button>
            </div>

            <Window
                isShow={showSettings}
                elementBackdrop={props.settings.elementBackdrop}
                onClose={handleToggleSettings}
                content={windowInfo["content"]}
                title={windowInfo["title"]}
            />

            <Background
                src={props.settings.wallpaper}
                enableBlur={props.settings.bgBlur}
                isFocus={isFocus}
                onClick={searchbarBlur}
            />

            <Time showSecond={props.settings.timeShowSecond} />

            <Search
                elementBackdrop={props.settings.elementBackdrop}
                engine={
                    t('search.engine.'+props.settings.currentSearchEngine)
                }
                onFocus={searchbarFocus}
                searchboxRef={searchboxRef}
            />

            <Selector
                items={getEnginesNameList()}
                max_show={5}
                current={
                    t('search.engine.'+props.settings.currentSearchEngine)
                }
                classes="top-[17rem] z-10 left-1/2 translate-x-[-50%] absolute"
                elementBackdrop={props.settings.elementBackdrop}
                selectedOnChange={handleEngineChange}
            />
        </div>
    );
}

const mapStateToProps = (state) => {
    return {
        settings: state.settings,
    };
};

export default connect(mapStateToProps, { updateSettings })(App);
