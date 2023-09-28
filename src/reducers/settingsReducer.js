import { UPDATE_SETTINGS } from "../actions/types";
import i18n from "../locale/index";

const initialState = {
    version: 1,
    wallpaper:
        "https://sparkhome.cdn.bcebos.com/img/wallp/1.jpg?x-bce-process=style/2K",
    showWeather: true,
    showHitokoto: true,
    elementBackdrop: true,
    bgBlur: true,
    connectionCheck: true,
    coverBlur: true,
    showShortcutOnFocus: false,
    currentSearchEngine:
        i18n.language.includes("en") ? "google" : "baidu",
    timeShowSecond: true,
    focusWhenLaunch: false,
    searchEngines: 
        i18n.language.includes("en") ?
            {   
                "google": "https://www.google.com/search?q=%s",
                "bing": "https://www.bing.com/search?q=%s",
                "duckduckgo": "https://duckduckgo.com/?q=%s"
            }
            :
            {
                "baidu": "https://www.baidu.com/s?wd=%s",
                "google": "https://www.google.com/search?q=%s",
                "bing": "https://www.bing.com/search?q=%s"
            }
    ,
};

const settingsReducer = (state = initialState, action) => {
    switch (action.type) {
        case UPDATE_SETTINGS:
            return {
                ...state,
                ...action.payload,
            };
        default:
            return state;
    }
};

export default settingsReducer;
