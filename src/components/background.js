import React from 'react';

function Background(props) {
    var blur = props.enableBlur && props.isFocus
    const css =
      "w-full h-full fixed object-cover inset-0 duration-300 z-0 ";
    var var_css = blur ? "blur-sm scale-125" : "";
    return (
      <img src={props.src} className={css + var_css} alt="background"></img>
    );
}

export default Background;