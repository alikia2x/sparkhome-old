import React from "react";

function Background(props) {
    const css = "w-full h-full fixed object-cover inset-0 duration-200 z-0";
    let focusCSS = props.enableBlur ? "blur-lg scale-110" : "brightness-50 scale-105";
    let varCSS = props.isFocus ? focusCSS : "";
    return (
        <img src={props.src} className={css + ' ' + varCSS} alt="background" onClick={props.onClick}></img>
    );
}

export default Background;
