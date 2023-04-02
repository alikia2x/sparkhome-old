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
};

class App extends React.Component {
  state = {
    settings: {
      wallpaper: "",
      showWeather: true,
      showHitokoto: true,
      elementBackdrop: true,
      bgBlur: true,
      timeSync: true,
      connectionCheck: true,
      coverBlur: true,
      showShortcutOnFocus: false,
    },
    bgBlur: false,
  }

  init_settings() {
    if (localStorage.getItem("settings") === null) {
      this.setState({ settings: default_settings });
      localStorage.setItem("settings", JSON.stringify(default_settings));
    } else {
      const settings = JSON.parse(localStorage.getItem("settings"));
      this.setState({ settings });
    }
  }

  change_settings(name, value) {
    try {
      const settings = { ...this.state.settings };
      settings[name] = value;
      this.setState({ settings });
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
        <Background src={this.state.settings.wallpaper} enableBlur={this.state.settings.bgBlur} blur={this.state.bgBlur} />
        <Search elementBackdrop={this.state.settings.elementBackdrop} />
      </div>
    );
  }
}

export default App;