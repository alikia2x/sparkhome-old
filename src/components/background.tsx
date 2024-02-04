import {  useContext } from 'react';
import { SettingsContext } from '../contexts/settingsContext';

function Background(props: { isFocus: boolean; src: string; onClick: () => void; }) {
    const settings = useContext(SettingsContext);
    const css = "w-full h-full fixed object-cover inset-0 duration-200 z-0";
    let focusCSS = settings.get("bgBlur") ? "blur-lg scale-110" : "brightness-50 scale-105";
    let varCSS = props.isFocus ? focusCSS : "";
    return (
        <img src={props.src} className={css + ' ' + varCSS} alt="background" onClick={props.onClick}></img>
    );
}

export default Background;
