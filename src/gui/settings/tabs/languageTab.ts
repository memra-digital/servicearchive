/*
=====================================
  © Memra Digital, 2019-2022
  Licensed under the GPLv3 license.
=====================================
*/

import { ipcRenderer } from 'electron';
import { openSettingsModal } from '../main';
import { switchTab } from '../tabSwitcher';
import type { LanguageListItem } from '../../../schemas';

let languages: LanguageListItem[] = [];
export const loadLanguageTab = () => {
	let elements: HTMLElement[] = [];

	languages = ipcRenderer.sendSync(`get-language-list`);
	let activeLanguage: string = localStorage.getItem(`settings/language`);
	
	for (let i: number = 0; i < languages.length; i++) {

		let buttonElement: HTMLButtonElement = document.createElement(`button`);
		buttonElement.setAttribute(`class`, `settings-wide-button settings-language-button`);
		buttonElement.innerText = languages[i].name;

		if (languages[i].file.split(`.`)[0] == activeLanguage) {
			buttonElement.className += ` active`;
		}

		buttonElement.onclick = () => switchLanguage(i);

		elements.push(buttonElement);
	}

	return elements;
}
const switchLanguage = (index: number) => {
	localStorage.setItem(`settings/language`, languages[index].file.split(`.`)[0]);

	location.reload();
}