import React from "react";
import { connect } from "react-redux";
import { updateSettings } from "../actions/settingsActions";
import { Switch } from "@headlessui/react";

function ToggleSetting({ settingKey, checked, onChange, classes }) {
    const handleChange = (isEnabled) => {
        onChange(settingKey, isEnabled);
    };

    return (
        <Switch
            checked={checked}
            onChange={handleChange}
            className={`${
                checked ? "bg-red-600" : "bg-gray-300"
            } inline-flex h-6 w-11 items-center rounded-full ${classes}`}
        >
            <span
                className={`${
                    checked ? "translate-x-6" : "translate-x-1"
                } inline-block h-4 w-4 transform rounded-full bg-white transition`}
            />
        </Switch>
    );
}

function Settings(props) {
    const { settings, updateSettings } = props;

    const handleToggleChange = (settingKey, isEnabled) => {
        updateSettings({
            ...settings,
            [settingKey]: isEnabled,
        });
    };

    return (
        <div className="pt-4">
            <div name="SetingsGroup" className="">
                <div
                    name="SettingsRow"
                    className="relative w-full h-12 bg-slate-200 dark:bg-zinc-800 px-3 rounded-md"
                >
                    <span className="text-base absolute leading-4 top-4">聚焦搜索框时背景模糊</span>
                    <ToggleSetting
                        classes="mt-3 right-4 absolute"
                        settingKey="bgBlur"
                        checked={settings.bgBlur}
                        onChange={handleToggleChange}
                    />
                </div>
                <br />
                <ToggleSetting
                    settingKey="elementBackdrop"
                    checked={settings.elementBackdrop}
                    onChange={handleToggleChange}
                />
                <ToggleSetting
                    settingKey="focusWhenLaunch"
                    checked={settings.focusWhenLaunch}
                    onChange={handleToggleChange}
                />
            </div>
        </div>
    );
}

const mapStateToProps = (state) => {
    return {
        settings: state.settings,
    };
};

export default connect(mapStateToProps, { updateSettings })(Settings);
