import {React, useState} from "react";

function Search(props) {
    const css =
        "absolute z-1 w-2/3 sm:w-80 md:w-[400px] focus:w-11/12 focus:sm:w-[600px] hover:w-11/12 hover:sm:w-[600px] h-10 rounded-3xl top-56 short:top-24 left-1/2 " +
        "translate-x-[-50%] text-center outline-none border-solid border-0 duration-200 " +
        "pr-2 ";

    let varCSS = props.elementBackdrop
        ? "bg-[rgba(255,255,255,0.2)] dark:bg-[rgba(24,24,24,0.7)] backdrop-blur-xl placeholder:text-slate-200 text-white"
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
        window.open(props.engine.replace("%s", query));
    }

    function getSearchSuggestions(value) {
        console.log("search suggestions:", value);
    }

    function handleFocus() {
        props.onFocus();
    }

    return (
        <input
            id="searchbox"
            type="text"
            placeholder={"搜索"}
            className={css + varCSS}
            onChange={handleInput}
            onKeyDown={handleKeyDown}
            onCompositionStart={handleCompositionStart}
            onCompositionEnd={handleCompositionEnd}
            onFocus={handleFocus}
            ref={props.searchboxRef}
            value={query}
        ></input>
    );
}

export default Search;
