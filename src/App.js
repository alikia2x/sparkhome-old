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
    const [showWindow, setShowWindow] = useState(false);
    const [showOneSearch, setShowOnesearch] = useState(false);
    const [windowInfo, setWindowInfo] = useState({
        content: <></>,
        title: "",
    });

    const getEnginesKeyList = () => {
        const engineDict = props.settings.searchEngines;
        const keyDict = [];
        for (let key in engineDict) {
            keyDict.push(key);
        }
        return keyDict;
    };

    const getEngineName = (target) => {
        if (t('search.engine.' + target) === 'search.engine.' + target) {
            return target;
        }
        else {
            return t('search.engine.' + target);
        }
    }

    const handleEngineChange = (target) => {
        props.updateSettings({ currentSearchEngine: target });
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
        setShowWindow(!showWindow);
    };

    const handleWelcomeContinue = () => {
        setShowWindow(false);
    }

    const handleKeyPress = (event) => {
        if ((event.key === " " || event.key === "Enter") && isFocus===true) {
            event.preventDefault();
            searchbarFocus();
        }
        else if (event.key === "Escape" && isFocus===false) {
            event.preventDefault();
            searchbarBlur();
        }
        else if (event.altKey && event.keyCode === 83) {
            event.preventDefault();
            handleToggleSettings();
        }
    };

    const initialCheck = () => {
        if (localStorage.getItem("firstLaunchFlag")) ;
        else {
            setTimeout(() => {
                setShowWindow(true);
                setWindowInfo({ content: <Welcome handleContinue={handleWelcomeContinue}></Welcome>, title: t('introText.windowTitle') });
                localStorage.setItem("firstLaunchFlag", "true");
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
                isShow={showWindow}
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
                engine={props.settings.searchEngines[props.settings.currentSearchEngine]}
                onFocus={searchbarFocus}
                searchboxRef={searchboxRef}
            />

            <Selector
                items={getEnginesKeyList()}
                max_show={5}
                current={
                    getEngineName(props.settings.currentSearchEngine)
                }
                classes="w-28 h-8 top-[17rem] z-10 left-1/2 translate-x-[-50%] absolute "
                elementBackdrop={props.settings.elementBackdrop}
                selectedOnChange={handleEngineChange}
                displayHandler={getEngineName}
                align="center"
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
