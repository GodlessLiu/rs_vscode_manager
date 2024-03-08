import { Db_context } from "@/views/db_handle";
import { useContext, useEffect, useState } from "react";

export const Log = () => {
    const [log, set_log] = useState<string>("");
    const Db = useContext(Db_context);
    useEffect(() => {
        Db!.logger.get_log().then((logs) => {
            set_log(logs);
            Db!.logger.add_log({
                msg: `get logs`,
                level: 1,
                time: new Date().toLocaleString()
            })
        }).catch(_ => {
            Db!.logger.add_log({
                msg: `get logs error`,
                level: 3,
                time: new Date().toLocaleString()
            })
        })
    }, [])
    return (
        <div>
            {log === "" ? "none" : log.split("\n").map((line, i) => <p key={i}>{line}</p>)}
        </div>
    )
}