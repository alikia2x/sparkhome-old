import SettingsSwitchRow from "./settingsSwitchRow";
import SettingsGroup from "./settingsGroup";

export default function Settings() {
    return (
        <div className="pt-4">
            <SettingsGroup title="appearance">
                <SettingsSwitchRow settingKey="bgBlur" />
                <SettingsSwitchRow settingKey="elementBackdrop"/>
            </SettingsGroup>
            <SettingsGroup title="behavior">
                <SettingsSwitchRow settingKey="focusWhenLaunch"/>
            </SettingsGroup>
        </div>
    );
}
