import { UPDATE_SETTINGS } from "../actions/types";

const initialState = {
    wallpaper:
        "https://sparkhome.cdn.bcebos.com/img/wallp/1.jpg?x-bce-process=style/2K",
    showWeather: true,
    showHitokoto: true,
    elementBackdrop: true,
    bgBlur: true,
    connectionCheck: true,
    coverBlur: true,
    showShortcutOnFocus: false,
    currentSearchEngine: "baidu",
    timeShowSecond: true,
    focusWhenLaunch: false,
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
    },
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
