import { useReducer, useMemo } from 'react';
import "./index.css";

import Search from "./components/search";
import Background from "./components/background";
import Selector from "./components/selector";
import Time from "./components/time";
import Window from "./components/window";
import Settings from "./components/settings/settings";
import Welcome from "./components/welcome";

import { Cog8ToothIcon } from "@heroicons/react/24/outline";
import { useTranslation } from "react-i18next";

import { useState, useRef, useEffect, useCallback } from "react";
import settingsReducer from "./reducers/settingsReducer_React";
import { useImmerReducer } from "use-immer";
import { enableMapSet } from "immer";

import { initialSettings, loadSettings } from "./const/settings";

import { SettingsContext, SettingsDispatchContext } from "./contexts/settingsContext";
import moment from "moment";

function App() {
    const { t } = useTranslation();
    const searchBoxRef = useRef(null);

    const [searchBoxIsFocus, setSearchBoxFocus] = useState(false);
    const [showWindow, setShowWindow] = useState(false);
    const [settings, dispatchSettings] = useImmerReducer(settingsReducer, initialSettings);
    const [windowInfo, dispatchWindowInfo] = useReducer(windowInfoReducer, {
        content: <></>,
        title: "",
    });

    function windowInfoReducer(state: any, action: { type: any; content: any; title: any; }) {
        switch (action.type) {
            case 'SET_WINDOW_INFO':
                return {
                    ...state,
                    content: action.content,
                    title: action.title,
                };
            default:
                return state;
        }
    }

    const getEnginesKeyList = () => {
        const keys: IterableIterator<string> = settings.get("searchEngines").keys();
        let keyDict: Array<string> = [];
        let key;
        while ((key = keys.next().value) !== undefined) {
            keyDict.push(key);
        }
        return keyDict;
    };

    const getEngineName = (target) => {
        if (t("search.engine." + target) === "search.engine." + target) {
            return target;
        } else {
            return t("search.engine." + target);
        }
    };

    const handleEngineChange = (target) => {
        dispatchSettings({ type: "PATCH", key: "currentSearchEngine", value: target });
    };

    const searchBarFocus = () => {
        setSearchBoxFocus(true);
        searchBoxRef.current.focus();
    };

    const searchBarBlur = () => {
        setSearchBoxFocus(false);
        searchBoxRef.current.blur();
    };

    const handleToggleSettings = useMemo(() => (target?: boolean) => {
        dispatchWindowInfo({
            type: "SET_WINDOW_INFO",
            content: <Settings></Settings>,
            title: t("settings.title"),
        });
        if (target != null) {
            setShowWindow(target);
            return;
        }
        setShowWindow(!showWindow);
    }, [showWindow, t]);

    const handleWelcomeContinue = () => {
        setShowWindow(false);
    };

    const initialCheck = useCallback(() => {
        if (localStorage.getItem("firstLaunchFlag") === null) {
            setTimeout(() => {
                setTimeout(() => {
                    setShowWindow(true);
                    dispatchWindowInfo({
                        type: "SET_WINDOW_INFO",
                        content: <Welcome handleContinue={handleWelcomeContinue}></Welcome>,
                        title: t("introText.windowTitle"),
                    });
                    localStorage.setItem("firstLaunchFlag", "true");
                }, 500);
            }, 500);
        }
    }, [t]);

    const handleKeyPress = useMemo(() => (event) => {
        if ((event.key === " " || event.key === "Enter") && document.activeElement !== searchBoxRef.current && showWindow === false) {
            event.preventDefault();
            searchBarFocus();
        } else if (event.key == "Escape" && document.activeElement === searchBoxRef.current && showWindow === false) {
            event.preventDefault();
            searchBarBlur();
        } else if (event.altKey && event.keyCode === 83 && showWindow === false) {
            event.preventDefault();
            handleToggleSettings();
        }
    }, [showWindow, handleToggleSettings]);

    useEffect(() => {
        initialCheck();
        enableMapSet();
        loadSettings(dispatchSettings);

        document.addEventListener("keydown", handleKeyPress);

        return () => {
            document.removeEventListener("keydown", handleKeyPress);
        };
    }, [dispatchSettings, handleKeyPress, initialCheck]);

    let settingsBtnBackdrop = settings.get("elementBackdrop") ? "backdrop-blur-md" : "";
    let settingsBtnCSS =
        "p-2 text-white bg-[rgba(255,255,255,0.2)] dark:bg-[rgba(10,10,10,0.2)] hover:bg-gray-600 rounded-full " +
        settingsBtnBackdrop;

    return (
        <SettingsContext.Provider value={settings}>
            <SettingsDispatchContext.Provider value={dispatchSettings}>
                <div id="app" className="h-full fixed overflow-hidden w-full font-DIN bg-black">
                    <div id="settingsBtn" className="absolute z-20 right-4 bottom-4 w-10 h-10">
                        <button className={settingsBtnCSS} onClick={() => handleToggleSettings()}>
                            <Cog8ToothIcon className="w-5 h-5" />
                        </button>
                    </div>

                    <Window
                        isShow={showWindow}
                        onClose={handleToggleSettings}
                        content={windowInfo["content"]}
                        title={windowInfo["title"]}
                    />

                    <Background src={settings.get("wallpaper")} isFocus={searchBoxIsFocus} onClick={() => searchBarBlur()} />

                    <Time showSecond={settings.get("timeShowSecond")} />

                    <Search
                        onFocus={searchBarFocus}
                        searchBoxRef={searchBoxRef}
                        autoFocus={settings.get("focusWhenLaunch")}
                    />

                    <Selector
                        items={getEnginesKeyList()}
                        max_show={5}
                        current={getEngineName(settings.get("currentSearchEngine"))}
                        classes="w-28 h-8 top-[17rem] z-10 left-1/2 translate-x-[-50%] absolute "
                        selectedOnChange={handleEngineChange}
                        displayHandler={getEngineName}
                        align="center"
                    />
                </div>
            </SettingsDispatchContext.Provider>
        </SettingsContext.Provider>
    );
}

export default App;
