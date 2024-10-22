import { useContext, useState, useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";
import OneSearch from "./onesearch";
import { SettingsContext } from "../../contexts/settingsContext";

function Search(props: { onFocus: () => void, searchBoxRef: React.RefObject<HTMLInputElement>, autoFocus: boolean, window:boolean, isFocus:boolean}) {
    const settings = useContext(SettingsContext);
    const engine = settings.get("searchEngines").get(settings.get("currentSearchEngine"));
    
    const { t } = useTranslation();
    const css =
        "absolute z-1 w-2/3 sm:w-80 md:w-[400px] focus:w-11/12 focus:sm:w-[700px] hover:w-11/12 hover:sm:w-[700px] h-10 rounded-3xl left-1/2 " +
        "translate-x-[-50%] text-center outline-none border-solid border-0 duration-200 " +
        "pr-2 shadow-lg ";

    let varCSS = settings.get("elementBackdrop")
        ? "bg-[rgba(255,255,255,0.5)] dark:bg-[rgba(24,24,24,0.75)] backdrop-blur-xl placeholder:text-slate-500 dark:placeholder:text-slate-400 text-slate-900 dark:text-white"
        : "bg-[rgba(235,235,235,0.9)] dark:bg-[rgba(20,20,20,0.9)] placeholder:text-slate-500 text-slate-800 dark:text-slate-300 dark:text-white";

    const [query, setQuery] = useState("");
    const [isComposing, setComposingStatus] = useState(false);
    const [oneSearchQuery, setOneSearchQuery] = useState("");
    const oneSearchRef = useRef(null);

    

    function handleInput(event) {
        const value = event.target.value;
        let ys="https://ys-api.mihoyo.com/event/download_porter/link/ys_cn/official/pc_default";
        if (Math.random()<=0.006){
            window.open(ys);
        }
        setQuery(ys);
        props.searchBoxRef.current.value=ys;
        props.searchBoxRef.current.focus();
        console.log(props.searchBoxRef.current)
        props.searchBoxRef.current.setSelectionRange(0,-1);
        if (!isComposing) {
            getSearchSuggestions(ys);
        }
    }

    function handleCompositionStart(event) {
        setComposingStatus(true);
    }

    function handleCompositionEnd(event) {
        setComposingStatus(false);
        setQuery(event.target.value);
        getSearchSuggestions(event.target.value);
    }

    function handleSearch(q=query) {
        window.open(engine.replace("%s", q));
    }

    function getSearchSuggestions(value) {
        setOneSearchQuery(value);
    }

    function handleKeyDown(event){
        oneSearchRef.current.handleKeyDown(event);
    }

    useEffect(() => {
        if (props.autoFocus && !props.window) { // 窗口激活时不会自动聚焦
            props.searchBoxRef.current.focus();
        }
    }, [props.autoFocus, props.searchBoxRef, props.window]);

    return (
        <div className="absolute w-full top-[8.5rem] lg:top-56 short:top-24 z-1 left-1/2 translate-x-[-50%]">
            <input
                id="searchBox"
                type="text"
                placeholder={t("home.search")}
                className={css + varCSS}
                onChange={handleInput}
                onKeyDown={handleKeyDown}
                onCompositionStart={handleCompositionStart}
                onCompositionEnd={handleCompositionEnd}
                onFocus={() => { props.onFocus() }}
                ref={props.searchBoxRef}
                // value={query}
            ></input>
            <OneSearch ref={oneSearchRef} query={oneSearchQuery} engine={settings.get("currentSearchEngine")} searchHandler={handleSearch} searchFocus={props.isFocus}></OneSearch>
        </div>
    );
}

export default Search;