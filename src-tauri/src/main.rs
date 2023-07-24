// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]
use tauri::WindowEvent;

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
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
