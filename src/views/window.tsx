import { Icon } from '@/components/icon';
import { appWindow } from '@tauri-apps/api/window';
export default function Rs_window() {
    return (
        <div data-tauri-drag-region className=" dark:text-white gap-2 flex flex-row shadow-md justify-end p-2 fixed top-0 w-full dark:bg-black bg-white text-black">
            <div id="titlebar-minimize" onClick={() => appWindow.minimize()}>
                <Icon name='Minimize' size={18} />
            </div>
            <div id="titlebar-maximize" onClick={() => appWindow.maximize()}>
                <Icon name='Maximize' size={18} />
            </div>
            <div id="titlebar-close" onClick={() => appWindow.hide()}>
                <Icon name='X' size={18} />
            </div>
        </div>
    );
}