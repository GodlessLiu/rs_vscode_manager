import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
} from "@/components/ui/tabs";
import { LayoutOption, layoutConfig } from "./layout.config";
import { FC, useEffect, useState } from "react";
import { Icon } from "@/components/icon";
import { useTranslation } from "react-i18next";
interface CopyUi {
    tabslist: {
        value: string,
        title: string,
        icon: string,
    }[],
    tabscontent: {
        value: string,
        content: FC | string,
    }[]

}

function parseLayoutConfig(layoutConfig: LayoutOption[]): CopyUi {
    const copyUi: CopyUi = {
        tabslist: [],
        tabscontent: [],
    }
    layoutConfig.sort((a, b) => a.priority - b.priority);
    layoutConfig.forEach((item) => {
        copyUi.tabslist.push({
            value: item.title,
            title: item.title,
            icon: item.icon
        })
        copyUi.tabscontent.push({
            value: item.title,
            content: item.content,
        })
    })
    return copyUi
}

export default function Rs_Tabs() {
    const [layoutUi, setLayoutUi] = useState<CopyUi>()
    const { t } = useTranslation();
    const defaultTab = localStorage.getItem("tab") || layoutConfig[0].title
    useEffect(() => {
        const copyUi = parseLayoutConfig(layoutConfig)
        setLayoutUi(copyUi)
    }, [layoutConfig])
    const on_value_change = (value: string) => {
        localStorage.setItem("tab", value)
    }
    return (
        <div className="main">
            <Tabs defaultValue={defaultTab} onValueChange={on_value_change}>
                <TabsList className="grid w-full grid-cols-3">
                    {
                        layoutUi?.tabslist.map((item) => {
                            return (
                                <TabsTrigger key={item.value} value={item.value}><Icon name={item.icon} size={16} className=" mr-2" />{t(item.title)}</TabsTrigger>
                            )
                        })
                    }
                </TabsList>
                {
                    layoutUi?.tabscontent.map((item) => {
                        return (
                            <TabsContent key={item.value} value={item.value}>
                                {
                                    typeof item.content === 'string' ? item.content : <item.content />
                                }

                            </TabsContent>
                        )
                    })
                }
            </Tabs>
        </div>
    )
}