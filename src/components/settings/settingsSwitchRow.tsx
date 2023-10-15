import { useContext } from "react";
import { SettingsContext, SettingsDispatchContext } from "../../contexts/settingsContext";
import ToggleSetting from "./toggle";

type SettingsSwitchRowProps = {
    name: string;
    description: string;
    settingKey: string;
};

function SettingsSwitchRow({ name, description, settingKey }: SettingsSwitchRowProps) {
    const settings = useContext(SettingsContext);
    const dispatch = useContext(SettingsDispatchContext);

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
            <div className="h-[1px] ml-6 bg-neutral-200"></div>
        </div>
    );
}

export default SettingsSwitchRow;