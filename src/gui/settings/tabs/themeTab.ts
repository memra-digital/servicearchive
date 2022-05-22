/*
=====================================
  © Memra Digital, 2019-2022
  Licensed under the GPLv3 license.
=====================================
*/

import { ipcRenderer } from 'electron';
import * as themeLoader from '../../../core/themes';
import { ThemeListItem } from '../../../schemas';

let themes: ThemeListItem[] = [];
export const loadThemeTab = () => {
	let elements: HTMLElement[] = [];

	themes = ipcRenderer.sendSync(`get-theme-list`);
	let activeTheme: string = localStorage.getItem(`settings/theme`)
	
	for (let i: number = 0; i < themes.length; i++) {

		let buttonElement: HTMLButtonElement = document.createElement(`button`);
		buttonElement.setAttribute(`class`, `settings-wide-button`);
		buttonElement.innerText = themes[i].name;

		if (themes[i].file.split(`.`)[0] == activeTheme) {
			buttonElement.classList.add(`active`);
		}

		buttonElement.onclick = () => {
			switchTheme(i);

			for (let element of document.querySelectorAll(`.settings-wide-button`)) {
				element.classList.remove(`active`);
			}

			buttonElement.classList.add(`active`);
		}

		elements.push(buttonElement);
	}

	return elements;
}
const switchTheme = (index: number) => {
	localStorage.setItem(`settings/theme`, themes[index].file.split(`.`)[0]);

	themeLoader.applyTheme(ipcRenderer.sendSync(`get-theme`, localStorage.getItem(`settings/theme`)));
}