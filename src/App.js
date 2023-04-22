import React from 'react';
import './index.css';
import Search from './components/search';
import Background from './components/background';

const default_settings = {
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
  search_engines: {
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

  init_settings() {
    if (localStorage.getItem("settings") === null) {
      this.setState({ settings: default_settings });
      localStorage.setItem("settings", JSON.stringify(default_settings));
    } else {
      const settings = JSON.parse(localStorage.getItem("settings"));
      this.setState({ settings: settings });
    }
  }

  change_settings(name, value) {
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
    this.init_settings();
  }

  render() {
    return (
      <div>
        <Background src={this.state.settings.wallpaper} enableBlur={this.state.settings.bgBlur} isFocus={this.state.isFocus} />
        <Search elementBackdrop={this.state.settings.elementBackdrop} engine={default_settings["search_engines"][this.state.currentSearchEngine]["link"]} />
      </div>
    );
  }
}

export default App;