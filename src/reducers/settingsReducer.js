import { UPDATE_SETTINGS } from "../actions/types";

const initialState = {
    wallpaper:
        "https://sparkhome.cdn.bcebos.com/img/wallp/7.jpg?x-bce-process=image/resize%2Climit_0%2Cm_lfit%2Cw_1920",
    showWeather: true,
    showHitokoto: true,
    elementBackdrop: true,
    bgBlur: true,
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
