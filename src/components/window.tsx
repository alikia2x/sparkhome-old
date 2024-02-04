import React, { useContext, useEffect } from 'react';
import { XMarkIcon } from '@heroicons/react/24/outline';
import '../style/window.css';
import '../style/scrollbar.css';
import { SettingsContext } from '../contexts/settingsContext';

const Window = (props: { isShow: boolean, onClose: (target?: boolean) => void, content: React.ReactNode, title: string }) => {
    const windowCoverRef = React.useRef(null);
    const windowRef = React.useRef(null);
    const settings = useContext(SettingsContext);
    const elementBackdrop = settings.get("elementBackdrop");

    const handleClose = () => {
        windowCoverRef.current.style.transitionDuration = '300ms';
        windowRef.current.style.transitionDuration = '300ms';
        windowRef.current.style.scale = "0.75";
        windowRef.current.style.opacity = "0"
        windowCoverRef.current.style.opacity = '0';
        setTimeout(() => { props.onClose(false); }, 310); // Wait for the fade-out animation to complete before closing
    };

    const handleKeyPress = (event) => {
        if (event.altKey && event.keyCode === 87  && props.isShow) {
            handleClose();
        }
    };

    useEffect(() => {
        document.addEventListener("keydown", handleKeyPress);
        if (props.isShow) {
            setTimeout(() => {
                windowCoverRef.current.style.transitionDuration = '150ms';
                windowRef.current.style.transitionDuration = '150ms';
                windowCoverRef.current.style.opacity = '1';
                windowRef.current.style.opacity = "1";
                windowRef.current.style.scale = "1";
            }, 10)
        }
        return () => {
            document.removeEventListener("keydown", handleKeyPress);
        };
    })

    let windowCSS = "inset-0 flex items-center justify-center z-20 fixed transition-all duration-150 opacity-0";
    let windowShow = props.isShow ? "inline" : "hidden";
    let windowCover = elementBackdrop ? "backdrop-blur-md backdrop-brightness-75" : "backdrop-brightness-50";
    windowCSS = windowCSS + ' ' + windowShow + ' ' + windowCover;

    let titleBarCSS = "relative h-14 border-b-[1px] border-solid border-neutral-300 dark:border-neutral-700 w-full rounded-t-lg z-30";
    let titleBarBackdrop = elementBackdrop
            ? "bg-[rgba(255,255,255,0.7)] backdrop-blur-lg dark:bg-[rgba(24,24,24,0.7)] text-slate-700 dark:text-slate-200"
            : "bg-[rgba(255,255,255,1)] dark:bg-[rgba(24,24,24,1)] text-slate-700 dark:text-slate-200";
    titleBarCSS = titleBarCSS + ' ' + titleBarBackdrop;

    return (
        <div ref={windowCoverRef} className={windowCSS} >
            {/*窗口框体*/}
            <div ref={windowRef} className="w-full sm:w-128 lg:w-144 xl:w-168
                            h-full lg:h-160 mh:h-128 st:h-96 2xst:h-80
                            bg-neutral-100 sm:rounded-lg dark:bg-black dark:text-slate-200 transition-all duration-150" style={{ "scale": "0.75" }}>
                {/*标题栏*/}
                <div className={titleBarCSS}>
                    <div className="absolute w-full h-14 text-center text-xl leading-5 pt-[18px] text:black dark:text-white">
                        <b>{props.title}</b> 
                    </div>
                    <button
                        className="absolute rounded-md
                        w-12 lg:w-16 h-10 mr-1 mt-2 lg:mr-2 pl-3.5 lg:pl-5 right-0
                        hover:bg-gray-200 focus:bg-gray-200
                        dark:hover:bg-neutral-700 dark:focus:bg-neutral-700"
                        onClick={handleClose}
                    >
                        <XMarkIcon className="w-5 lg:w-6 h-6"/>
                    </button>
                </div>
                {/*内容*/}
                <div className="overflow-y-scroll overflow-x-hidden pl-4 pr-4 pt-12 lg:pt-16 mt-[-40px] lg:mt-[-56px]
                                h-144 lg:h-160 mh:h-128 st:h-96 2xst:h-80
                                w-full noScrollbar">
                    {props.content}
                </div>
            </div>
        </div>
    );
};

export default Window;