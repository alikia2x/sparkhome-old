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

function SettingsRow({ name, description, settingKey, settings, updateSettings }) {
    const handleToggleChange = (settingKey, isEnabled) => {
        console.log(settingKey, isEnabled)
        updateSettings({
            ...settings,
            [settingKey]: isEnabled,
        });
    };
    return (
        <div
            name="SettingsRow"
            className="relative w-full h-auto bg-white dark:bg-zinc-800 px-3 rounded-md"
        >
            <span className="text-base absolute leading-4 top-4">{name}</span>
            <ToggleSetting
                classes="mt-3 right-4 absolute"
                settingKey={settingKey}
                checked={settings[settingKey]}
                onChange={handleToggleChange}
            />
            <span className="text-sm text-neutral-500 pt-[2.1rem] h-auto block pb-4 max-w-[90%]">
                {description}
            </span>
        </div>
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
            <div name="SetingsGroup" className="bg-white dark:bg-zinc-800 rounded-md">
                <div
                    name="SettingsRow"
                    className="relative w-full h-12 bg-white dark:bg-zinc-800 px-3 rounded-md"
                >
                    <span className="text-base absolute leading-4 top-4">
                        聚焦搜索框时背景模糊
                    </span>
                    <ToggleSetting
                        classes="mt-3 right-4 absolute"
                        settingKey="bgBlur"
                        checked={settings.bgBlur}
                        onChange={handleToggleChange}
                    />
                </div>
                <div
                    name="SettingsRow"
                    className="relative w-full h-auto min-h-[3rem] bg-white dark:bg-zinc-800 px-3 rounded-md"
                >
                    <span className="text-base absolute leading-4 top-4">
                        元素毛玻璃效果
                    </span>
                    <ToggleSetting
                        classes="mt-3 right-4 absolute"
                        settingKey="elementBackdrop"
                        checked={settings.elementBackdrop}
                        onChange={handleToggleChange}
                    />

                    <span className="text-sm text-slate-500 pt-8 h-auto block">
                        开启后，页面中的部分元素将添加背景模糊效果。此选项可能会影响性能。
                    </span>
                </div>
                <SettingsRow name="主页启动时自动聚焦到搜索框"
                    settingKey="focusWhenLaunch" settings={settings} updateSettings={updateSettings}>
                </SettingsRow>
                
                <SettingsRow name="元素毛玻璃效果"
                    description={"开启后，页面中的部分元素将添加背景模糊效果。此选项可能会影响性能。"}
                    settingKey="elementBackdrop" settings={settings} updateSettings={updateSettings}>
                </SettingsRow>
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