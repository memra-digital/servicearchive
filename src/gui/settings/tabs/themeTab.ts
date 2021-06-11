/*
=====================================
  © Lekvado Media, 2019-2021
  Licensed under the GPLv3 license.
=====================================
*/

import { ipcRenderer } from 'electron';
import { ThemeListItem } from '../../../schemas';

export const loadThemeTab = () => {
	let elements: HTMLElement[] = [];

	let themes: ThemeListItem[] = ipcRenderer.sendSync(`get-theme-list`);
	let activeTheme: string = localStorage.getItem(`settings/theme`)
	
	for (let i: number = 0; i < themes.length; i++) {

		let buttonElement: HTMLButtonElement = document.createElement(`button`);
		buttonElement.setAttribute(`class`, `settings-wide-button`);
		buttonElement.innerText = themes[i].name;

		if (themes[i].file.split(`.`)[0] == activeTheme) {
			buttonElement.className += ` active`;
		}

		elements.push(buttonElement);
	}

	return elements;
}