import { useContext } from "react";
import { SettingsContext, SettingsDispatchContext } from "../../contexts/settingsContext";
import Selector from "../selector";
import { useTranslation } from "react-i18next";

type SettingsSwitchRowProps = {
    settingKey: string;
};

function SettingsSelectRow({ settingKey }: SettingsSwitchRowProps) {
    const { t } = useTranslation();
    const settings = useContext(SettingsContext);
    const dispatch = useContext(SettingsDispatchContext);
    const name = t("settings." + settingKey + ".title");
    const description = t("settings." + settingKey + ".description");


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
        dispatch({ type: "PATCH", key: "currentSearchEngine", value: target });
    };

    return (
        <div className="relative w-full h-auto bg-white dark:bg-[rgb(28,28,29)] px-5 rounded-md">
            <div className="text-base absolute leading-4 top-5">{name}</div>
            <Selector
                items={getEnginesKeyList()}
                max_show={3}
                current={getEngineName(settings.get("currentSearchEngine"))}
                classes="w-20 h-6 mt-4 right-5 absolute"
                selectedOnChange={handleEngineChange}
                displayHandler={getEngineName}
                align="center"
                btnStyle="!bg-[rgba(80, 80, 80, 0.7)]"
            />
            <div
                className="text-sm text-neutral-500 pt-[2.4rem] h-auto block pb-4 max-w-[90%]"
                dangerouslySetInnerHTML={{ __html: description }}
            ></div>
        </div>
    );
}

export default SettingsSelectRow;
