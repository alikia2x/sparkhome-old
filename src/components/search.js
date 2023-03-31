import React from 'react';
function Search(props) {
    const [blur, setBlur] = React.useState(false);
  
    const css =
      "relative z-1 w-[400px] h-10 rounded-3xl top-48 left-1/2 translate-x-[-50%] text-center outline-none border-solid border-0 duration-200 hover:w-[600px] focus:w-[600px] ";
    var var_css = get_settings("elementBackdrop")
      ? "bg-[rgba(255,255,255,0.7)] backdrop-blur"
      : "bg-[rgba(255,255,255,0.9)]";
    return (
      <input
        type="text"
        placeholder={t("搜索")}
        className={css + var_css}
      ></input>
    );
}

export default Search;