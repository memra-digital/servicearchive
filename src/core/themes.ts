/*
=====================================
  © Memra Digital, 2019-2022
  Licensed under the GPLv3 license.
=====================================
*/

import { ipcRenderer } from 'electron';

export const applyTheme = (theme: any) => {
	for (let value in theme.colors) {
		(<HTMLElement>document.querySelector(`:root`)).style.setProperty(`--${value}`, theme.colors[value]);
	}
}

if (localStorage.getItem(`settings/theme`) == undefined) {
	localStorage.setItem(`settings/theme`, `default-light`);
}
applyTheme(ipcRenderer.sendSync(`get-theme`, localStorage.getItem(`settings/theme`)));