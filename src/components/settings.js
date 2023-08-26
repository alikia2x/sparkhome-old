import React from "react";
import { connect } from "react-redux";
import { updateSettings } from "../actions/settingsActions";
import { Switch } from "@headlessui/react";

function ToggleSetting({ settingKey, checked, onChange }) {
    const handleChange = (isEnabled) => {
        onChange(settingKey, isEnabled);
    };

    return (
        <Switch
            checked={checked}
            onChange={handleChange}
            className={` ${
                checked ? "bg-red-600" : "bg-gray-300"
            } relative inline-flex h-6 w-11 items-center rounded-full`}
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
        <div>
            <div className="relative w-full h-84 align-middle">
                显示
                <ToggleSetting
                    settingKey="showWeather"
                    checked={settings.showWeather}
                    onChange={handleToggleChange}
                />
            </div>
            <br/>
            <ToggleSetting
                settingKey="elementBackdrop"
                checked={settings.elementBackdrop}
                onChange={handleToggleChange}
            />
            
        </div>
    );
}

const mapStateToProps = (state) => {
    return {
        settings: state.settings,
    };
};

export default connect(mapStateToProps, { updateSettings })(Settings);
