import { useTranslation } from "react-i18next";
import React from "react";

function Welcome(props) {
    const { t } = useTranslation();
    const introText = t('introText.introText').split('\n');

    return (
        <div className="pt-4">
            <h1 className="text-2xl mb-[-1rem]">
                <b>{t("introText.title")}</b>
            </h1>
            <br />
            {introText.slice(1).map((paragraph, index) => (
                <React.Fragment key={index}>
                    {paragraph}
                    <br />
                </React.Fragment>
            ))}
            <button
                className="mt-6 w-auto h-auto bg-red-500 px-4 py-2 text-white rounded-md hover:bg-[rgb(248,48,48)] 
                transition-all duration-200 
                shadow-[4px_5px_15px_3px_rgba(246,68,68,0.25)] hover:shadow-[0px_8px_20px_5px_rgba(255,88,88,0.34)]"
                onClick={props.handleContinue}
            >
                {t("introText.continueBtn")}
            </button>
        </div>
    );
}

export default Welcome;
