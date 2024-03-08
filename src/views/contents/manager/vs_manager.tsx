import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import { useContext, useEffect, useState } from "react";
import { Db_context } from "@/views/db_handle";
import { Project } from "@/hooks/use_db";
import { Add_projrct_btn } from "@/views/contents/manager/components/add_project";
import { Action_btn } from "@/views/contents/manager/components/action_btn";
import { useToast, type Toast } from "@/components/ui/use-toast";
import { format_time } from "@/utils/day";
import { useTranslation } from "react-i18next";
import { Rs_tooltip } from "@/components/tooltip";
import { isObject } from "@/utils/is_object";
export function Rs_vs_manager() {
    const Db = useContext(Db_context)
    const [projects, setProjects] = useState<Project[]>([])
    const { t } = useTranslation();
    const { toast } = useToast()
    async function query_project() {
        Db!.project.get_project().then(res => {
            setProjects(res);
            Db!.logger.add_log({
                msg: "query projects",
                level: 1,
                time: new Date().toLocaleString()
            })
        }).catch(_ => {
            Db!.logger.add_log({
                msg: "query projects error",
                level: 3,
                time: new Date().toLocaleString()
            })
        })
    }
    useEffect(() => {
        query_project()
    }, [])

    function handle_project_changed(info?: Toast) {
        if (isObject(info)) {
            toast({ ...info, duration: 2000 })
        }
        query_project()
    }
    return (
        <div className="rs_manager p-2 border rounded-sm">
            <Add_projrct_btn handle_db_added={handle_project_changed} />
            <Table className=" mt-2">
                <TableHeader>
                    <TableRow>
                        <TableHead className="text-center">{t("project_name")}</TableHead>
                        <TableHead className="text-center w-[300px]">{t("store_path")}</TableHead>
                        <TableHead className="text-center">{t("status")}</TableHead>
                        <TableHead className="text-center">{t("create_time")}</TableHead>
                        <TableHead className="text-center">{t("actions")}</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {
                        projects.length > 0 ? projects.map(p => {
                            return (
                                <TableRow key={p.created_at}>
                                    <TableCell className="text-center">
                                        <div className="flex flex-row justify-center items-center">
                                            {p.title}
                                            <Rs_tooltip>
                                                {p.description}
                                            </Rs_tooltip>
                                        </div>
                                    </TableCell>
                                    <TableCell className="text-center text-ellipsis overflow-hidden text-nowrap">{p.path}</TableCell>
                                    <TableCell className="text-center">{p.status}</TableCell>
                                    <TableCell className="text-center">{format_time(p.created_at!)}</TableCell>
                                    <TableCell className="text-center">
                                        <Action_btn actioned={handle_project_changed} project={p} />
                                    </TableCell>
                                </TableRow>
                            )
                        }) : <div className="p-4 text-gray-400">
                            {t("project_none")}
                        </div>
                    }
                </TableBody>
            </Table>

        </div>
    )
}