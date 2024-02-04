import { useState, useEffect, useRef, useContext } from "react";
import "../style/scrollbar.css";
import { SettingsContext } from "../contexts/settingsContext";
import { createPortal } from "react-dom";

const Selector = (props) => {
    const { items, current, classes, align, listStyle, btnStyle } = props;
    const settings = useContext(SettingsContext);
    const [selectorIsVisible, setSelectorIsVisible] = useState(false);
    const selectorRef = useRef(null);
    const listRef = useRef(null);
    const elementBackdrop: boolean = settings.get("elementBackdrop");

    const handleClickOutside = (event) => {
        if (selectorRef.current && !selectorRef.current.contains(event.target)) {
            setSelectorIsVisible(false);
        }
    };

    const toggleSelectorVisibility = () => {
        setSelectorIsVisible((prevState) => !prevState);
        let topOffset = selectorRef.current.getBoundingClientRect().top;
        let leftOffset = selectorRef.current.getBoundingClientRect().left;
        //console.log(listRef.current.getBoundingClientRect());
        console.log(leftOffset, topOffset, selectorRef.current);
        listRef.current.style.top = (topOffset + listRef.current.getBoundingClientRect().height/2 + selectorRef.current.getBoundingClientRect().height + 4) + "px";
        listRef.current.style.left = (leftOffset) + "px";
    };

    const changeSelected = (target) => {
        props.selectedOnChange(target);
        setSelectorIsVisible(false);
    };

    useEffect(() => {
        document.addEventListener("click", handleClickOutside);

        return () => {
            document.removeEventListener("click", handleClickOutside);
        };
    }, []);

    let boxCSS = "relate text-center cursor-pointer select-none";

    let btnCSS = "rounded-xl h-full truncate shadow-md ";
    btnCSS += elementBackdrop
        ? "bg-[rgba(255,255,255,0.6)] dark:bg-[rgba(28,28,29,0.7)] text-slate-800 dark:text-slate-100 backdrop-blur-lg"
        : "bg-[rgba(235,235,235,0.9)] dark:bg-[rgba(20,20,20,0.95)] text-slate-800 dark:text-slate-100";

    let listCSS =
        "fixed r-0 w-auto h-auto text-center leading-8 rounded-lg cursor-pointer p-1 " +
        "select-none overflow-y-auto overflow-x-hidden noScrollbar shadow-2xl min-w-[7rem] z-20 translate-y-[-50%] ";
    listCSS += selectorIsVisible ? "" : "pointer-events-none opacity-0 ";
    listCSS += elementBackdrop
        ? "bg-[rgba(255,255,255,0.6)] backdrop-blur-lg dark:bg-[rgba(24,24,24,0.7)] text-slate-700 dark:text-slate-200 "
        : "bg-[rgba(235,235,235,0.95)] dark:bg-[rgba(20,20,20,0.95)] text-slate-800 dark:text-slate-100 ";
    listCSS += selectorIsVisible ? "transition-none" : "transition-all";

    let itemCSS =
        " px-2 rounded-md h-8 md:h-7 text-base leading-4 pt-[0.375rem] hover:bg-[rgba(66,127,231)] " +
        "hover:text-slate-100";

    if (classes !== undefined) boxCSS = `${classes} ${boxCSS}`;
    if (listStyle !== undefined) listCSS = `${listCSS} ${listStyle}`;
    if (btnStyle !== undefined) btnCSS = `${btnCSS} ${btnStyle}`;

    return (
        <div>
            <div className={boxCSS}>
                <div className={`${btnCSS}`} ref={selectorRef} onClick={toggleSelectorVisibility}>
                    <div className="translate-y-[-50%] top-[50%] relative mx-[1ch]">{current}</div>
                </div>
            </div>
            {createPortal(
                <div
                    className={listCSS}
                    ref={listRef}
                    style={{
                        maxHeight: 2 * props.max_show + 0.6 + "rem",
                    }}
                >
                    {Object.keys(items).map((index) => (
                        <div key={index} className={itemCSS} onMouseUp={() => changeSelected(items[index])}>
                            {props.displayHandler(items[index])}
                        </div>
                    ))}
                </div>,
                document.body
            )}
        </div>
    );
};

export default Selector;
