import SettingsSwitchRow from "./settingsSwitchRow";
import SettingsGroup from "./settingsGroup";

export default function Settings() {
    return (
        <div className="pt-4">
            <SettingsGroup>
                <SettingsSwitchRow name="聚焦搜索框时背景模糊" settingKey="bgBlur" description="" />
                <SettingsSwitchRow name="主页启动时自动聚焦到搜索框" settingKey="focusWhenLaunch" description="" />
                <SettingsSwitchRow
                    name="元素毛玻璃效果"
                    description={"开启后，页面中的部分元素将添加背景模糊效果。此选项可能会影响性能。"}
                    settingKey="elementBackdrop"
                />
            </SettingsGroup>
        </div>
    );
}
