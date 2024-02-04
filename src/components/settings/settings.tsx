import SettingsSwitchRow from "./settingsSwitchRow";
import SettingsGroup from "./settingsGroup";
import SettingsSelectRow from "./settingsSelectRow";

export default function Settings() {
    return (
        <div className="pt-4">
            <SettingsGroup title="appearance">
                <SettingsSwitchRow settingKey="bgBlur" />
                <SettingsSwitchRow settingKey="elementBackdrop"/>
                <SettingsSwitchRow settingKey="timeShowSecond"/>
            </SettingsGroup>
            <SettingsGroup title="behavior">
                <SettingsSwitchRow settingKey="focusWhenLaunch"/>
                <SettingsSwitchRow settingKey="showShortcutOnFocus"/>
            </SettingsGroup>
            <SettingsGroup title="searchEngine">
                <SettingsSelectRow settingKey="currentSearchEngine"/>
            </SettingsGroup>
        </div>
    );
}
