import React from 'react';
import './index.css';
import Search from './components/search';
import Background from './components/background';
import Dropdown from './components/dropdown';

const defaultSettings = {
  wallpaper:
    "https://sparkhome.cdn.bcebos.com/img/wallp/7.jpg?x-bce-process=image/resize%2Climit_0%2Cm_lfit%2Cw_1920",
  showWeather: true,
  showHitokoto: true,
  elementBackdrop: true,
  bgBlur: true,
  timeSync: true,
  connectionCheck: true,
  coverBlur: true,
  showShortcutOnFocus: false,
  currentSearchEngine: "baidu",
  searchEngines: {
    "baidu": {
      "name": "百度",
      "link": "https://www.baidu.com/s?wd=%s",
    },
    "google": {
      "name": "谷歌",
      "link": "https://www.google.com/search?q=%s"
    },
    "bing": {
      "name": "必应",
      "link": "https://www.bing.com/search?q=%s"
    }
  }
};

class App extends React.Component {
  state = {
    settings: defaultSettings,
    //背景聚焦状态
    isFocus: false,
  }

  initSettings() {
    if (localStorage.getItem("settings") === null) {
      this.setState({ settings: defaultSettings });
      localStorage.setItem("settings", JSON.stringify(defaultSettings));
    } else {
      const settings = JSON.parse(localStorage.getItem("settings"));
      this.setState({ settings: settings });
    }
  }

  changeSettings(name, value) {
    try {
      this.initSettings();
      let settings = this.state.settings;
      settings[name] = value;
      this.setState({ settings: settings });
      localStorage.setItem("settings", JSON.stringify(settings));
    } catch (error) {
      console.error(error);
    }
  }

  getEnginesNameList() {
    let settingsDict = this.state.settings["searchEngines"];
    let nameList = [];
    for (let key in settingsDict) {
      nameList.push(this.state.settings.searchEngines[key]["name"]);
    }
    return nameList;
  }

  componentDidMount() {
    this.initSettings();
  }
  

  render() {
    return (
      <div id="app" className='h-full relative'>
        <Background src={this.state.settings.wallpaper} enableBlur={this.state.settings.bgBlur}
          isFocus={this.state.isFocus} />

        <Dropdown items={this.getEnginesNameList()}
          current={this.state.settings.searchEngines[this.state.settings.currentSearchEngine]["name"]} //获取当前引擎的名字
          css="top-[17rem] left-1/2 translate-x-[-50%] "
          elementBackdrop={this.state.settings.elementBackdrop}/>
        
        <Search elementBackdrop={this.state.settings.elementBackdrop}
          engine={this.state.settings.searchEngines[this.state.settings.currentSearchEngine]["link"]} />
      </div>
    );
  }
}

export default App;