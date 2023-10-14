import { useState, useEffect, useRef, useContext } from "react";
import '../style/scrollbar.css';
import { SettingsContext } from "../contexts/settingsContext";

const Selector = (props) => {
    const { items, current, classes, align } = props;
    const settings = useContext(SettingsContext);
    const [selectorIsVisible, setSelectorIsVisible] = useState(false);
    const selectorRef = useRef(null);
    const elementBackdrop: boolean = settings.get("elementBackdrop");

    const handleClickOutside = (event) => {
        if (selectorRef.current && !selectorRef.current.contains(event.target)) {
            setSelectorIsVisible(false);
        }
    };

    const toggleSelectorVisibility = () => {
        setSelectorIsVisible((prevState) => !prevState);
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

    let boxCSS =
        "relate text-center cursor-pointer select-none";
    if (classes !== undefined) boxCSS = `${classes} ${boxCSS}`;

    let btnVarCSS = elementBackdrop
        ? "bg-[rgba(255,255,255,0.2)] dark:bg-[rgba(24,24,24,0.7)] text-slate-100 dark:text-slate-100 backdrop-blur-lg"
        : "bg-[rgba(235,235,235,0.9)] dark:bg-[rgba(20,20,20,0.95)] text-slate-800 dark:text-slate-100";
    let btnCSS = "rounded-2xl h-8 pt-1 truncate px-1";

    let listCSS =
        "absolute r-0 w-[calc(100%_+_0.5rem)] h-auto mt-1 text-center leading-8 rounded-xl cursor-pointer select-none transition-all overflow-y-auto overflow-x-hidden noScrollbar";
    let listVisibleCSS = selectorIsVisible
        ? ""
        : "pointer-events-none opacity-0";
    let listVarCSS = elementBackdrop
        ? "bg-[rgba(255,255,255,0.6)] backdrop-blur-lg dark:bg-[rgba(24,24,24,0.7)] text-slate-700 dark:text-slate-200"
        : "bg-[rgba(235,235,235,0.95)] dark:bg-[rgba(20,20,20,0.95)] text-slate-800 dark:text-slate-100"
    listVarCSS += " ";
    listVarCSS += align.toLowerCase() === "left" ? "left-0" : (align.toLowerCase() === "right" ? "right-0" : "left-1/2 translate-x-[-50%]");
    listCSS = `${listCSS} ${listVarCSS} ${listVisibleCSS}`;

    let itemCSS = elementBackdrop
        ? "hover:bg-[rgba(220,223,230,0.9)] dark:hover:bg-slate-700"
        : "hover:bg-white dark:hover:bg-neutral-700";

    return (
        <div className={boxCSS} onClick={props.onClick}>
            <div
                className={btnCSS + " " + btnVarCSS}
                ref={selectorRef}
                onClick={toggleSelectorVisibility}
            >
                {current}
            </div>
            <div
                className={listCSS}
                style={{
                    maxHeight: (2 * props.max_show + 0.8) + "rem",
                }}
            >
                {Object.keys(items).map((index) => (
                    <div
                        key={index}
                        className={itemCSS}
                        onClick={() => changeSelected(items[index])}
                    >
                        {props.displayHandler(items[index])}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Selector;