import { useContext } from "react";
import { SettingsContext, SettingsDispatchContext } from "../../contexts/settingsContext";
import ToggleSetting from "./toggle";
import { useTranslation } from "react-i18next";

type SettingsSwitchRowProps = {
    settingKey: string;
};

function SettingsSwitchRow({ settingKey }: SettingsSwitchRowProps) {
    const { t } = useTranslation();
    const settings = useContext(SettingsContext);
    const dispatch = useContext(SettingsDispatchContext);
    const name = t("settings." + settingKey + ".title");
    const description = t("settings." + settingKey + ".description");

    const handleToggleChange = (isEnabled: boolean) => {
        dispatch({
            type: "PATCH",
            key: settingKey,
            value: isEnabled,
        });
    };

    return (
        <div className="relative w-full h-auto bg-white dark:bg-zinc-800 px-5 rounded-md">
            <span className="text-base absolute leading-4 top-5">{name}</span>
            <ToggleSetting
                classes="mt-4 right-5 absolute"
                settingKey={settingKey}
                checked={settings.get(settingKey)}
                onChange={(isEnabled) => handleToggleChange(isEnabled)}
            />
            <span className="text-sm text-neutral-500 pt-[2.4rem] h-auto block pb-4 max-w-[90%]">{description}</span>
        </div>
    );
}

export default SettingsSwitchRow;