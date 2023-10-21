import { useContext, useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import OneSearch from "./settings/onesearch";
import { SettingsContext } from "../contexts/settingsContext";
import { React } from "react";

function Search(props: { onFocus: () => void, searchBoxRef: React.RefObject<HTMLInputElement>, autoFocus: boolean}) {
    const settings = useContext(SettingsContext);
    const engine = settings.get("searchEngines").get(settings.get("currentSearchEngine"));
    
    const { t } = useTranslation();
    const css =
        "absolute z-1 w-2/3 sm:w-80 md:w-[400px] focus:w-11/12 focus:sm:w-[600px] hover:w-11/12 hover:sm:w-[600px] h-10 rounded-3xl left-1/2 " +
        "translate-x-[-50%] text-center outline-none border-solid border-0 duration-200 " +
        "pr-2 ";

    let varCSS = settings.get("elementBackdrop")
        ? "bg-[rgba(255,255,255,0.4)] dark:bg-[rgba(24,24,24,0.75)] backdrop-blur-xl placeholder:text-slate-500 dark:placeholder:text-slate-400 text-slate-900 dark:text-white"
        : "bg-[rgba(235,235,235,0.9)] dark:bg-[rgba(20,20,20,0.9)] placeholder:text-slate-500 text-slate-800 dark:text-slate-300 dark:text-white";

    const [query, setQuery] = useState("");
    const [isComposing, setComposingStatus] = useState(false);

    function handleKeyDown(event) {
        if (event.key === "Enter") {
            handleSearch();
        }
    }

    function handleInput(event) {
        const value = event.target.value;
        setQuery(value);
        if (!isComposing) {
            getSearchSuggestions(value);
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

    function handleSearch() {
        window.open(engine.replace("%s", query));
    }

    function getSearchSuggestions(value) {
        console.log("search suggestions:", value);
    }

    useEffect(() => {
        if (props.autoFocus) {
            props.searchBoxRef.current.focus();
        }
    }, [props.autoFocus, props.searchBoxRef]);

    return (
        <div className="absolute w-full top-56 short:top-24 z-1 left-1/2 translate-x-[-50%]">
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
                value={query}
            ></input>
            <OneSearch elementBackdrop={settings.get("elementBackdrop")}></OneSearch>
        </div>
    );
}

export default Search;