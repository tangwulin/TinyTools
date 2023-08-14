// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]
use tauri::WindowEvent;
mod tray;

fn main() {

    tauri::Builder::default()
        .on_window_event(|event| match event.event() {
            WindowEvent::CloseRequested { api, .. } => {
                println!("on CloseRequested");
                api.prevent_close();
                event.window().emit("close-requested", ()).unwrap();
            }
            _ => { }
        })
        .system_tray(tray::menu())  // ✅ 将 `tauri.conf.json` 上配置的图标添加到系统托盘
        .on_system_tray_event(tray::handler) // ✅ 注册系统托盘事件处理程序
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
