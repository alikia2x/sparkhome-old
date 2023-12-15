import i18n from "../locale";
import { reviver, replacer } from "../utils/mapSupport4JSON";

export const initialSettings = new Map<string, any>([
    ["version", 4],
    ["wallpaper", "https://sparkhome.cdn.bcebos.com/img/wallp/1.jpg?x-bce-process=style/2K"],
    ["showWeather", true],
    ["showHitokoto", true],
    ["elementBackdrop", true],
    ["bgBlur", true],
    ["connectionCheck", true],
    ["coverBlur", true],
    ["showShortcutOnFocus", false],
    ["currentSearchEngine", i18n.language.includes("zh") ? "baidu" : "google"],
    ["timeShowSecond", true],
    ["focusWhenLaunch", false],
    [
        "searchEngines",
        i18n.language.includes("zh")
            ? new Map<string, string>([
                ["baidu", "https://www.baidu.com/s?wd=%s"],
                ["bing", "https://cn.bing.com/search?q=%s"],
                ["google", "https://www.google.com/search?q=%s"],
            ])
            : new Map<string, string>([
                ["google", "https://www.google.com/search?q=%s"],
                ["bing", "https://www.bing.com/search?q=%s"],
                ["duckduckgo", "https://duckduckgo.com/?q=%s"],
            ])
    ],
]);

export const loadSettings = (dispatchHook) => {
    let settings = initialSettings;
    const savedSettings = localStorage.getItem("settings");

    if (!savedSettings) {
        localStorage.setItem("settings", JSON.stringify(settings, replacer));
        return;
    }

    // 测试能否将其解析为字典，如果失败则直接使用默认值
    try {
        let parsedSettings: Map<string, any> = JSON.parse(savedSettings, reviver);
        // 当浏览器中存储的Settings的Version和模板中的Settings的Version不一致时：
        // 遍历模板Settings的每一个元素：
        // 当浏览器存储的Settings也有对应元素时，用存储的值覆盖模板值，否则保持模板默认;
        if (parsedSettings.get("version") === settings.get("version")) {
            //console.log("[Settings Initialization] Successfully loaded settings.");
            dispatchHook({
                type: "PUT",
                payload: parsedSettings,
            });
            return;
        }
        //console.log("[Settings Initialization] Version mismatch, trying to update.");

        settings.forEach((value, key) => {
            if (parsedSettings.has(key) && key !== "version") settings.set(key, parsedSettings.get(key));
        });

        //console.log("[Settings Initialization] Successfully updated settings.");

        dispatchHook({
            type: "PUT",
            payload: settings,
        });
        return;
    } catch (e) {
        //console.log("[Settings Initialization] Failed to parse settings, using default.");
    }
};
