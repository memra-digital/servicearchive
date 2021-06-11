/*
=====================================
  © Lekvado Media, 2019-2021
  Licensed under the GPLv3 license.
=====================================
*/

import { ipcRenderer } from 'electron';

let allowedThemeProperties: Array<string> = [
    `sidebar-bg`,
    `sidebar-fg`,
    `sidebar-corner-radius`,
    `sidebar-scrollbar-width`,
    `sidebar-scrollbar-corner-radius`,
    `sidebar-scrollbar-bg`,
    `sidebar-scrollbar-fg`,
    `sidebar-input-fg`,
    `sidebar-input-bg`,
    `sidebar-input-corner-radius`,
    `sidebar-gradient-col1`,
    `sidebar-gradient-col2`,
    `sidebar-article-fg`,
    `sidebar-article-bg`,
    `sidebar-btn-bg`,
    `sidebar-btn-fg`,
    `tabbar-bg`,
    `tab-bg`,
    `tab-fg`,
    `tab-corner-radius`,
    `tab-active-bg`,
    `tab-active-fg`,
    `floating-tab-shadow`,
    `editor-bg`,
    `editor-fg`,
    `editor-selection-bg`,
    `editor-selection-fg`,
    `editor-toolstrip-bg`,
    `editor-toolstrip-shadow`,
    `editor-toolstrip-btn-bg`,
    `editor-toolstrip-btn-fg`,
    `editor-toolstrip-btn-active-bg`,
    `editor-toolstrip-btn-active-fg`,
    `editor-scrollbar-width`,
	`editor-scrollbar-corner-radius`,
	`editor-scrollbar-bg`,
	`editor-scrollbar-fg`,
    `modal-bg`,
    `modal-fg`,
    `modal-corner-radius`,
    `modal-btn-bg`,
    `modal-btn-fg`,
    `modal-btn-shadow`,
    `modal-sidebar-bg`,
    `modal-sidebar-fg`,
    `modal-scrollbar-width`,
	`modal-scrollbar-bg`,
	`modal-scrollbar-fg`,
];

export const applyTheme = (theme: any) => {
    for (let value in theme.colors) {
        if (allowedThemeProperties.includes(value)) {
            (<HTMLElement>document.querySelector(`:root`)).style.setProperty(`--${value}`, theme.colors[value]);
        } else {
            console.warn(`Unknown value "${value}" in theme "${theme.name}"`);
        }
    }
}

if (localStorage.getItem(`settings/theme`) == undefined) {
    localStorage.setItem(`settings/theme`, `default-light`);
}
applyTheme(ipcRenderer.sendSync(`get-theme`, localStorage.getItem(`settings/theme`)));