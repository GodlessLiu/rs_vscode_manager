
import { useTheme } from "@/components/theme-provider";
import { useTranslation } from "react-i18next";

export function ModeToggle() {
    const { setTheme, theme } = useTheme()
    const { t } = useTranslation();

    return (
        <div>
            <h2 className="text-md mb-2">{t("theme")}:</h2>
            <div className=" flex flex-row gap-2">
                <span className={`inline-block w-10 h-10 bg-white ${theme === 'light' ? 'border-2' : ''} border-[#1269cf]`} onClick={() => setTheme("light")}>

                </span>
                <span className={`inline-block w-10 h-10 bg-black ${theme === 'dark' ? 'border-2' : ''} border-[#1269cf]`} onClick={() => setTheme("dark")}>

                </span>
                <span className={`inline-block w-10 h-10 bg-gray-400 ${theme === 'system' ? 'border-2' : ''} border-[#1269cf]`} onClick={() => setTheme("system")}>

                </span>

            </div>
        </div>

    )
}
