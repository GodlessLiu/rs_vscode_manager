use std::{
    fs::OpenOptions,
    io::{Read, Write},
    path::PathBuf,
};
use tauri::{
    api::path::{resolve_path, BaseDirectory},
    Env,
};
pub struct LogInfo {
    pub level: i32,
    pub message: String,
    pub time: String,
}

pub fn get_log_file_path() -> PathBuf {
    let context = tauri::generate_context!("tauri.conf.json");
    let log_file_path = resolve_path(
        context.config(),
        context.package_info(),
        &Env::default(),
        "logs.txt",
        Some(BaseDirectory::AppData),
    )
    .expect("failed to resolve path");
    log_file_path
}

pub fn write_log(info: LogInfo) {
    let log_file_path = get_log_file_path();
    let options = OpenOptions::new()
        .write(true)
        .append(true)
        .open(log_file_path.to_str().unwrap());
    match options {
        Ok(mut file) => {
            file.write_all(
                format!(
                    "level:{},message:{},time:{}\n",
                    info.level, info.message, info.time
                )
                .as_bytes(),
            )
            .unwrap();
        }
        Err(e) => {
            println!("Error: {}", e);
        }
    }
}

pub fn get_log() -> String {
    let options = OpenOptions::new()
        .read(true)
        .open(get_log_file_path().to_str().unwrap());
    match options {
        Ok(mut file) => {
            let mut contents = String::new();
            file.read_to_string(&mut contents).unwrap();
            contents
        }
        Err(e) => {
            println!("Error: {}", e);
            String::from("Error")
        }
    }
}
