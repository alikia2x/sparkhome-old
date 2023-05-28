import React from 'react';

function Background(props) {
    let blur = props.enableBlur && props.isFocus
    const css =
      "w-full h-full fixed object-cover inset-0 duration-300 z-0 ";
    let varCSS = blur ? "blur-sm scale-125" : "";
    return (
      <img src={props.src} className={css + varCSS} alt="background"></img>
    );
}

export default Background;