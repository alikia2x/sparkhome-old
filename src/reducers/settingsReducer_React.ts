import { replacer } from "../utils/mapSupport4JSON";

export default function settingsReducer(draft: Map<string, any>, action) {
    switch (action.type) {
        case "PATCH": {
            draft.set(action.key, action.value);
            // 持久化
            localStorage.setItem("settings", JSON.stringify(draft, replacer));
            break; 
        }
        case "PUT": {
            // 将整个draft清空，并用action.payload的值遍历覆盖
            draft.clear();
            action.payload.forEach((value, key) => {
                draft.set(key, value);
            })
            // 持久化
            localStorage.setItem("settings", JSON.stringify(draft, replacer));
            break;
        }
        default: {
            throw Error("Unsupported action: " + action.type);
        }
    }
}