import { React, useState } from 'react';

function Search(props) {
  const css =
    "relative z-1 w-[400px] h-10 rounded-3xl top-48 left-1/2 translate-x-[-50%] text-center outline-none border-solid border-0 duration-200 hover:w-[600px] focus:w-[600px] ";
  var varCSS = props.elementBackdrop
    ? "bg-[rgba(255,255,255,0.7)] backdrop-blur"
    : "bg-[rgba(255,255,255,0.9)]";

  const [query, setQuery] = useState('');
  const [isComposing, setComposingStatus] = useState(false);

  function handleKeyDown(event) {
    if (event.key === 'Enter') {
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
    console.log('search:', query);
  }

  function getSearchSuggestions(value) {
    console.log('search suggestions:', value);
  }

  return (
    <input
      id="searchBox"
      type="text"
      placeholder={"搜索"}
      className={css + varCSS}
      onChange={handleInput}
      onKeyDown={handleKeyDown}
      onCompositionStart={handleCompositionStart}
      onCompositionEnd={handleCompositionEnd}
      value={query}
    ></input>
  );
}

export default Search;
