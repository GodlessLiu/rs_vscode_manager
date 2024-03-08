// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]
use std::{fs::File, process::Command};
use tauri::{Manager, SystemTray, SystemTrayEvent};
mod logger;
mod tray;
fn init_log_file() {
    // create log file if not exists
    let binding = logger::get_log_file_path();
    let log_file_path = binding.to_str().unwrap();
    if let Err(_) = File::open(log_file_path) {
        File::create(log_file_path).expect("failed to create log file");
    }
}

fn main() {
    // tray
    tauri::Builder::default()
        .setup(|app| {
            init_log_file();
            let window = app.get_window("main").unwrap();
            let _ = window.set_decorations(false);
            Ok(())
        })
        .plugin(tauri_plugin_sql::Builder::default().build())
        .plugin(tauri_plugin_window_state::Builder::default().build())
        .invoke_handler(tauri::generate_handler![
            open_vscode,
            open_cmd,
            get_log,
            write_a_log
        ])
        .system_tray(SystemTray::new().with_menu(tray::create_tray()))
        .on_system_tray_event(|app, event| match event {
            SystemTrayEvent::LeftClick {
                position: _,
                size: _,
                ..
            } => {
                let window = app.get_window("main").unwrap();
                window.show().unwrap();
            }
            SystemTrayEvent::RightClick {
                position: _,
                size: _,
                ..
            } => {
                println!("system tray received a right click");
            }
            SystemTrayEvent::DoubleClick {
                position: _,
                size: _,
                ..
            } => {
                println!("system tray received a double click");
            }
            SystemTrayEvent::MenuItemClick { id, .. } => match id.as_str() {
                "quit" => {
                    std::process::exit(0);
                }
                "hide" => {
                    let window = app.get_window("main").unwrap();
                    window.hide().unwrap();
                }
                _ => {}
            },
            _ => {}
        })
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}

fn cmd() -> Command {
    #[cfg(target_os = "windows")]
    Command::new("cmd.exe")
}

#[tauri::command]
fn open_vscode(path: &str) -> String {
    #[cfg(target_os = "windows")]
    cmd()
        .args(vec!["/c".to_string(), format!("code {}", path)])
        .spawn()
        .expect("failed to open vscode");
    format!("opened vscode with path: {}", path)
}

#[tauri::command]
fn open_cmd(path: &str) -> String {
    #[cfg(target_os = "windows")]
    cmd()
        .args(["/c", "start", "cmd", "/K", "cd /d", path])
        .spawn()
        .unwrap()
        .wait()
        .expect("failed to open cmd");
    format!("open cmd {}", path).to_string()
}

#[tauri::command]
fn get_log() -> String {
    logger::get_log()
}

#[tauri::command]
fn write_a_log(msg: String, level: i32, time: String) {
    logger::write_log(logger::LogInfo {
        level,
        message: msg,
        time,
    });
}
