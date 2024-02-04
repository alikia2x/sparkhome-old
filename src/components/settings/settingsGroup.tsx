import React from "react";
import { useTranslation } from "react-i18next";

function SettingsGroup(props) {
    // 解决当props.children只有一个元素时只是一个单独的React节点，无法调用map方法的问题
    const children = React.Children.toArray(props.children); 
    const lastChild = children[children.length - 1];
    const { t } = useTranslation();

    return (
        <div className="mb-8">
            <h3 className="text-xl font-bold ml-4 mb-2">{t("settings." + props.title)}</h3>
            <div className="bg-white dark:bg-[rgb(28,28,29)] rounded-md mx-4">
                {children.map((child, index) => {
                    const isLastChild = child === lastChild;
                    return (
                        <React.Fragment key={index}>
                            {child}
                            {!isLastChild && <div className="h-[1px] ml-5 bg-neutral-200 dark:bg-neutral-700"></div>}
                            {/* 当前元素不是最后一个元素的时候，就显示一个分割线 */}
                        </React.Fragment>
                    );
                })}
            </div>
        </div>
    );
}

export default SettingsGroup;
