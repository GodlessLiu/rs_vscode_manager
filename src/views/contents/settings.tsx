import { ModeToggle } from "@/components/mode-toggle";
import { LanguageToggle } from "@/views/i18n_handle";
export function Settings() {
    return (
        <div>
            <ModeToggle />
            <LanguageToggle />
        </div>
    )
}