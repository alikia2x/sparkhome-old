import SettingsSwitchRow from "./settingsSwitchRow";
import SettingsGroup from "./settingsGroup";
import { useTranslation } from "react-i18next";
import React from "react";

export default function Settings() {
    const { t } = useTranslation();
    return (
        <div className="pt-4">
            <SettingsGroup>
                <SettingsSwitchRow settingKey="bgBlur" />
                <SettingsSwitchRow settingKey="focusWhenLaunch"/>
                <SettingsSwitchRow settingKey="elementBackdrop"/>
            </SettingsGroup>
        </div>
    );
}
