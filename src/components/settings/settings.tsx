import SettingsSwitchRow from "./settingsSwitchRow";
import SettingsGroup from "./settingsGroup";

export default function Settings() {
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
