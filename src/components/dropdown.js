import React from 'react';

function Dropdown(props) {
    var items = props.items;
    var current = props.current;
    var css = 'relative w-20 h-8 text-white z-10 text-center leading-8 rounded-2xl';
    var varCSS = props.elementBackdrop
    ? "bg-[rgba(255,255,255,0.7)] backdrop-blur-xl dark:bg-[rgba(24,24,24,0.7)] text-slate-700 dark:text-slate-200"
    : "bg-[rgba(255,255,255,0.9)]";
    if (props.css !== undefined)
        css = props.css + ' ' + css + ' ' + varCSS;
    return (
        <div className={css}>
            <div name="dropdown-text">
                {current}
            </div>
            <div name="dropdown-menu" className=''>
                {Object.keys(items).map((item, index) => {
                    console.log(items[index]);
                    return (
                        <h2 key={index}>
                            {item}
                        </h2>
                    );
                })}
            </div>
        </div>
    );
}

export default Dropdown