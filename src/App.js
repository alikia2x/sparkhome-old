import React from 'react';
import './index.css';
import Search from './components/search';
import Background from './components/background';

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
    settings: {},
    //背景聚焦状态
    isFocus: false,
    currentSearchEngine: "baidu",
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
      var settings = this.state.settings;
      settings[name] = value;
      this.setState({ settings: settings });
      localStorage.setItem("settings", JSON.stringify(settings));
    } catch (error) {
      console.error(error);
    }
  }

  componentDidMount() {
    this.initSettings();
  }

  render() {
    return (
      <div>
        <Background src={this.state.settings.wallpaper} enableBlur={this.state.settings.bgBlur} isFocus={this.state.isFocus} />
        <Search elementBackdrop={this.state.settings.elementBackdrop} engine={defaultSettings["searchEngines"][this.state.currentSearchEngine]["link"]} />
      </div>
    );
  }
}

export default App;