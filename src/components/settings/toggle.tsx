import { Switch } from "@headlessui/react";

interface ToggleSettingProps {
    settingKey: string;
    checked: boolean;
    onChange: (isEnabled: boolean) => void;
    classes: string;
}

function ToggleSetting({ settingKey, checked, onChange, classes }: ToggleSettingProps) {
    const switchBackgroundClass = checked ? "bg-red-600" : "bg-gray-300 dark:bg-neutral-500";
    const switchTranslateClass = checked ? "translate-x-6" : "translate-x-1";

    const handleChange = (isEnabled: boolean) => {
        onChange(isEnabled);
    };

    return (
        <Switch
            checked={checked}
            onChange={handleChange}
            className={`inline-flex h-6 w-11 items-center rounded-full ${switchBackgroundClass} ${classes}`}
        >
            <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition ${switchTranslateClass}`}
            />
        </Switch>
    );
}

export default ToggleSetting;