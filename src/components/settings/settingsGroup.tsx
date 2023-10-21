import React from "react";

function SettingsGroup(props) {
    const { children } = props;
    const lastChild = children[children.length - 1];

    return (
        <div className="bg-white dark:bg-zinc-800 rounded-md mx-4">
            {children.map((child, index) => {
                const isLastChild = child === lastChild;
                return (
                    <React.Fragment key={index}>
                        {child}
                        {!isLastChild && <div className="h-[1px] ml-5 bg-neutral-200 dark:bg-neutral-700"></div>}
                    </React.Fragment>
                );
            })}
        </div>
    );
}

export default SettingsGroup;