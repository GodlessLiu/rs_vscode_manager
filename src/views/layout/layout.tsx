import MainContent from "@/views/layout/tabs";
import { FC } from "react";
import { Toaster } from "@/components/ui/toaster";


export const Rs_layout: FC = () => {
    return (
        <div id="app" className="px-2 py-1 mt-10">
            <div>
                <MainContent />
            </div>
            <Toaster />
        </div>

    )
}