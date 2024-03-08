import { FC } from "react";
import { useTranslation } from "react-i18next";
interface Props {
    lng: string
}
export const Language_btn: FC<Props> = ({ lng }) => {
    const { i18n } = useTranslation();
    function changeLanguage(lng: string) {
        localStorage.setItem("lng", lng);
        i18n.changeLanguage(lng);
    }
    return (
        <button className={`${i18n.language === lng ? 'text-[#1269cf]' : ''}`} onClick={() => changeLanguage(lng)}>{lng}</button>
    )
}