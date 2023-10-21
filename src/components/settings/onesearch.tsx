import React from "react";

const OneSearch = ({ elementBackdrop }: { elementBackdrop: boolean }) => {
    let boxCSS = "absolute top-24 h-auto w-11/12 sm:w-[600px] left-1/2 translate-x-[-50%] bg-white px-2 rounded-xl hidden";
    let boxVarCSS = elementBackdrop
        ? "bg-[rgba(255,255,255,0.4)] dark:bg-[rgba(24,24,24,0.75)] backdrop-blur-xl text-slate-900 dark:text-white"
        : "bg-[rgba(235,235,235,0.9)] dark:bg-[rgba(20,20,20,0.9)] text-slate-800 dark:text-slate-300";
    return (
        <div className={`${boxCSS} ${boxVarCSS}`}>
            <div className="h-10">
                <span className="absolute mt-2">Suggestion #1</span>
            </div>
        </div>
    );
};

export default OneSearch;
