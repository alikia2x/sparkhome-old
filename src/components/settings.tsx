
import { useContext } from 'react';
import { SettingsContext, SettingsDispatchContext } from '../contexts/settingsContext';
import { Switch } from "@headlessui/react";

type SettingsSwitchRowProps = {
  name: string;
  description: string;
  settingKey: string;
};

function ToggleSetting({ settingKey, checked, onChange, classes }: { settingKey: string, checked: boolean, onChange: (key: string, isEnabled: boolean) => void, classes: string }) {
  const handleChange = (isEnabled) => {
      onChange(settingKey, isEnabled);
  };

  return (
      <Switch
          checked={checked}
          onChange={handleChange}
          className={`${
              checked ? "bg-red-600" : "bg-gray-300 dark:bg-neutral-500"
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

function SettingsSwitchRow({ name, description, settingKey }: SettingsSwitchRowProps) {
  const settings = useContext(SettingsContext);
  const dispatch = useContext(SettingsDispatchContext);

  const handleToggleChange = (settingKey: string, isEnabled: boolean) => {
    console.log(settingKey, isEnabled);
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
        onChange={handleToggleChange}
      />
      <span className="text-sm text-neutral-500 pt-[2.4rem] h-auto block pb-4 max-w-[90%]">{description}</span>
      <div className="h-[1px] ml-6 bg-neutral-200"></div>
    </div>
  );
}

export default function Settings() {
  const dispatch = useContext(SettingsDispatchContext);

  const updateSettings = (payload: { key: string, value: any }) => {
    dispatch({
      type: "MODIFY",
      key: payload.key,
      value: payload.value,
    });
  }

  return (
    <div className="pt-4">
      <div className="bg-white dark:bg-zinc-800 rounded-md mx-4">
        <SettingsSwitchRow
          name="聚焦搜索框时背景模糊"
          settingKey="bgBlur"
          description=""
        />
        <SettingsSwitchRow
          name="主页启动时自动聚焦到搜索框"
          settingKey="focusWhenLaunch"
          description=""
        />
        <SettingsSwitchRow
          name="元素毛玻璃效果"
          description={"开启后，页面中的部分元素将添加背景模糊效果。此选项可能会影响性能。"}
          settingKey="elementBackdrop"
        />
      </div>
    </div>
  );
}