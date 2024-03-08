import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip"
import { FC, PropsWithChildren } from "react"

export const Rs_tooltip: FC<PropsWithChildren> = ({ children }) => {
    return (
        <TooltipProvider>
            <Tooltip>
                <TooltipTrigger asChild>
                    <span className="inline-block h-5 w-5 rounded-full shadow-3xl border cursor-pointer ml-1 ">
                        ?
                    </span>
                </TooltipTrigger>
                <TooltipContent side="right">
                    <p>{children}</p>
                </TooltipContent>
            </Tooltip>
        </TooltipProvider>
    )
}
