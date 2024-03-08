import { FC } from "react"
import { Rs_vs_manager } from "../contents/manager/vs_manager"
import { Settings } from "@/views/contents/settings"
import { Log } from "@/views/contents/log"

export interface LayoutOption {
    title: string,
    icon: string,
    content: FC | string,
    priority: number,
}

export const layoutConfig: LayoutOption[] = [
    {
        title: 'manager',
        icon: 'FolderKanban',
        content: Rs_vs_manager,
        priority: 10,
    },
    {
        title: 'settings',
        icon: 'Settings',
        content: Settings,
        priority: 20,
    },
    {
        title: 'logs',
        icon: 'Notebook',
        content: Log,
        priority: 30,
    }

]






