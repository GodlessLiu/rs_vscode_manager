import i18n from "i18next";
import { FC, PropsWithChildren } from "react";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import { useTranslation } from "react-i18next";
import zh_lng from "@/i18n/zh";
import en_lng from "@/i18n/en";
import { Language_btn } from "@/components/language_btn";

const default_lng = localStorage.getItem("lng") || "zh";

export const I18n_handle: FC<PropsWithChildren> = ({ children }) => {
    i18n
        .use(LanguageDetector)
        .use(initReactI18next) // passes i18n down to react-i18next
        .init({
            // the translations
            // (tip move them in a JSON file and import them,
            // or even better, manage them via a UI: https://react.i18next.com/guides/multiple-translation-files#manage-your-translations-with-a-management-gui)
            resources: {
                zh: zh_lng,
                en: en_lng
            },
            defaultNS: "translation",
            fallbackLng: "zh",
            lng: default_lng,
            interpolation: {
                escapeValue: false // react already safes from xss => https://www.i18next.com/translation-function/interpolation#unescape
            }
        });
    return (
        <div>
            {children}
        </div>
    )
}

export const LanguageToggle = () => {
    const { t } = useTranslation();
    return (
        <>
            <h2 className="text-md mt-2">{t("language")}:</h2>
            <Language_btn lng="en" />
            <span className="mx-2">|</span>
            <Language_btn lng="zh" />
        </>
    )
}