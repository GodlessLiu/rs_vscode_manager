import { Icon } from "@/components/icon"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem, DropdownMenuSeparator,
    DropdownMenuTrigger
} from "@/components/ui/dropdown-menu"
import { Toast } from "@/components/ui/use-toast"
import { AkarIconsVscodeFill } from "@/components/vscode"
import { Project } from "@/hooks/use_db"
import { Db_context } from "@/views/db_handle"
import { invoke } from "@tauri-apps/api"
import { FC, useContext } from "react"
import { useTranslation } from "react-i18next"
interface Props {
    actioned?: (info?: Toast) => void
    project: Project
}
export const Action_btn: FC<Props> = ({ actioned, project }) => {
    const Db = useContext(Db_context);
    const { t } = useTranslation();
    async function start_vs(path: string) {
        invoke('open_vscode', { path }).then(_ => {
            Db!.logger.add_log({
                msg: `open vscode: ${path}`,
                level: 1,
                time: new Date().toLocaleString()
            })
        }).catch(_ => {
            Db!.logger.add_log({
                msg: `open vscode: ${path} error`,
                level: 3,
                time: new Date().toLocaleString()
            })
        })

    }
    async function delete_project(id: number, title: string = "") {
        Db!.project.delete_project(id, title).then(_ => {
            if (actioned) {
                actioned({
                    title: "Rs_vscode_manager",
                    description: "the project has been deleted!"
                });
                Db!.logger.add_log({
                    msg: `delete project: ${title}`,
                    level: 2,
                    time: new Date().toLocaleString()
                })
            }
        }).catch(_ => {
            Db!.logger.add_log({
                msg: `delete project:${title} error`,
                level: 3,
                time: new Date().toLocaleString()
            })
        })

    }
    async function open_cmd(path: string) {
        invoke("open_cmd", { path }).then(_ => {
            Db!.logger.add_log({
                msg: `open cmd: ${path}`,
                level: 1,
                time: new Date().toLocaleString()
            })
        }).catch(_ => {
            Db!.logger.add_log({
                msg: `open cmd: ${path} error`,
                level: 3,
                time: new Date().toLocaleString()
            })
        })

    }
    return (
        <DropdownMenu>
            <DropdownMenuTrigger className="focus:outline-none text-2xl">
                {t("operation")}
            </DropdownMenuTrigger>
            <DropdownMenuContent>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => start_vs(project.path)}>
                    <h2 className=" hover:text-[#1269cf] gap-2 flex flex-row">
                        <AkarIconsVscodeFill fontSize={16} /> VSCode
                    </h2>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => open_cmd(project.path)}>
                    <h2 className=" hover:text-[#1269cf] gap-2 flex flex-row">
                        <Icon name="Command" size={16}></Icon> CMD
                    </h2>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => delete_project(project.id!, project.title)}>
                    <h2 className=" hover:text-[#1269cf] gap-2 flex flex-row">
                        <Icon name="Trash2" size={16}></Icon> Delete
                    </h2>
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>

    )
}