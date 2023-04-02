import React from 'react';
const default_settings = {
  wallpaper:
    "https://sparkhome.cdn.bcebos.com/img/wallp/1.jpg?x-bce-process=image/resize%2Climit_0%2Cm_lfit%2Cw_1920",
  showWeather: true,
  showHitokoto: true,
  elementBackdrop: true,
  bgBlur: true,
  timeSync: true,
  connectionCheck: true,
  coverBlur: true,
  showShortcutOnFocus: false,
};

var settings = {};

function init_settings() {
  if (localStorage.getItem("settings") === null) {
    settings = default_settings;
    localStorage.setItem("settings", JSON.stringify(default_settings));
  } else {
    settings = JSON.parse(localStorage.getItem("settings"));
  }
}

function change_settings(name, value) {
  try {
    init_settings();
    settings[name] = value;
    localStorage.setItem("settings", JSON.stringify(settings));
  } catch (error) {
    console.error(error);
  }
}

function get_settings(name) {
  init_settings();
  return settings[name];
}

init_settings();