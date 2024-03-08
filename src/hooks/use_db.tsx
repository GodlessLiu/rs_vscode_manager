import { invoke } from "@tauri-apps/api";
import Database, { QueryResult } from "tauri-plugin-sql-api";

export interface DbContext {
    project: {
        add_project: (p: Project) => Promise<QueryResult>;
        delete_project: (id: number, title: string) => Promise<QueryResult>;
        update_project: (id: number, p: Project) => Promise<QueryResult>;
        get_project: () => Promise<Project[]>;
    },
    logger: {
        add_log: (log_info: Log) => void;
        get_log: () => Promise<string>;
    }

}
export interface Project {
    id?: number;
    title: string;
    status: string;
    path: string;
    description?: string;
    created_at?: string;
}


async function init_db(db: Database) {
    try {
        await db.execute("CREATE TABLE IF NOT EXISTS projects (id INTEGER PRIMARY KEY, title TEXT, status TEXT, path TEXT, description TEXT, created_at TEXT)");
        return db;
    } catch (e) {
        console.error(e);
    }
}

interface Log {
    id?: number;
    msg: string;
    level: number;
    time: string;
}
async function use_db(): Promise<DbContext> {
    console.log('load db...');

    const db = await Database.load("sqlite:data.db");
    await init_db(db);
    async function add_project(p: Project) {
        return await db.execute("INSERT INTO projects (title, status, path, description, created_at) VALUES (?, ?, ?, ?, ?)", [p.title, p.status, p.path, p.description, Date.now()]);
    }

    async function delete_project(id: number, title: string) {
        return await db.execute("DELETE FROM projects WHERE id = ? and title = ?", [id, title]);
    }

    async function update_project(id: number, p: Project) {
        return await db.execute("UPDATE projects SET title = ?, status = ?, path = ?, description = ? WHERE id = ?", [p.title, p.status, p.path, p.description, id]);
    }

    async function get_project() {
        return await db.select("SELECT * FROM projects") as Project[];

    }
    async function add_log(log_info: Log) {
        await invoke("write_a_log", { msg: log_info.msg, level: log_info.level, time: log_info.time });
    }
    async function get_log(): Promise<string> {
        return await invoke("get_log");
    }
    return {
        project: {
            add_project,
            delete_project,
            update_project,
            get_project
        },
        logger: {
            add_log,
            get_log
        }
    }
}

export default await use_db();
