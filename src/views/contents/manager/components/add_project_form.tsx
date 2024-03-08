import { zodResolver } from "@hookform/resolvers/zod";
import { ControllerRenderProps, useForm } from "react-hook-form";
import { z } from "zod";
import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";
import {
    Form,
    FormControl, FormField,
    FormItem,
    FormLabel,
    FormMessage
} from "@/components/ui/form";
import { open } from '@tauri-apps/api/dialog';
import { Input } from "@/components/ui/input";
import { FC, useContext, useState } from "react";
import { Db_context } from "@/views/db_handle";
import { Textarea } from "@/components/ui/textarea";
const FormSchema = z.object({
    title: z.string({
        required_error: ""
    }),
    path: z.string({
        required_error: ""
    }),
    description: z.string({
        required_error: ""
    })
})

interface Props {
    handle_add?: () => void
}

export const Add_projrct_form: FC<Props> = ({ handle_add }) => {
    const { t } = useTranslation();
    const Db = useContext(Db_context)
    const [selected_path, set_selected_path] = useState<string>("")
    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
    })
    async function select_path(field: ControllerRenderProps<{
        title: string;
        path: string;
        description: string;
    }, "path">) {
        const selected = await open({
            directory: true,
            multiple: false,
            recursive: false
        })
        if (selected) {
            field.onChange(selected);
            set_selected_path(selected as string);
        }
    }
    function onSubmit(data: z.infer<typeof FormSchema>) {
        Db!.project.add_project({
            ...data,
            status: "stoped"
        }).then(_ => {
            if (handle_add) {
                handle_add()
            }
            Db!.logger.add_log({
                msg: `add project: ${data.title}`,
                level: 2,
                time: new Date().toLocaleString()
            })
        }).catch(_ => {
            Db!.logger.add_log({
                msg: `add project: ${data.title} error`,
                level: 3,
                time: new Date().toLocaleString()
            })
        })
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <FormField
                    control={form.control}
                    name="title"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>{t("project_name")}:</FormLabel>
                            <FormControl>
                                <Input placeholder={t("project_name_pplaceholder")} {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="path"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>{t("store_path")}:</FormLabel>
                            <FormControl>
                                {
                                    selected_path ? <h2 className="w-full overflow-hidden text-ellipsis text-nowrap ml-2">{`${t("has_selected")}:${selected_path}`}</h2> : <div className=" ml-2">
                                        {t("add_project_path_info_left")}<a className="underline cursor-pointer text-[#1269cf] mx-1" onClick={() => select_path(field)}>{t("add_project_path_info_middle")}</a>{t("add_project_path_info_right")}
                                    </div>
                                }

                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="description"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>{t("project_name_description")}:</FormLabel>
                            <FormControl>
                                <Textarea placeholder={t("project_name_description_pplaceholder")} {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <Button type="submit" className="w-full">{t("add_project_sure")}</Button>
            </form>
        </Form>
    )
}
