
import { Button } from "@/components/ui/button"
import {
    Drawer,
    DrawerClose,
    DrawerContent, DrawerFooter,
    DrawerHeader,
    DrawerTitle,
    DrawerTrigger
} from "@/components/ui/drawer"
import { Toast } from "@/components/ui/use-toast"
import { Add_projrct_form } from "@/views/contents/manager/components/add_project_form"
import { FC, useState } from "react"
import { useTranslation } from "react-i18next"

interface Props {
    handle_db_added?: (info?: Toast) => void
}

export const Add_projrct_btn: FC<Props> = ({ handle_db_added }) => {
    const { t } = useTranslation();
    const [open, setOpen] = useState<boolean>(false)
    const handle_add = () => {
        if (handle_db_added) {
            handle_db_added({
                title: "Rs_vscode_manager",
                description: "the project has been added!"
            })
        }
        setOpen(false);
    }
    return (
        <Drawer open={open} onOpenChange={setOpen}>
            <DrawerTrigger asChild>
                <Button className="float-right rounded-full">+</Button>
            </DrawerTrigger>
            <DrawerContent>
                <div className="mx-auto w-full max-w-sm">
                    <DrawerHeader>
                        <DrawerTitle>{t("add_project")}</DrawerTitle>
                    </DrawerHeader>
                    <div className="p-4 pb-0">
                        <Add_projrct_form handle_add={handle_add} />
                    </div>
                    <DrawerFooter>
                        <DrawerClose asChild>
                            <Button variant="outline">{t("add_project_cancel")}</Button>
                        </DrawerClose>
                    </DrawerFooter>
                </div>
            </DrawerContent>
        </Drawer>
    )
}
