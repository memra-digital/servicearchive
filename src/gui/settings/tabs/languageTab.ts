/*
=====================================
  © Lekvado Media, 2019-2021
  Licensed under the GPLv3 license.
=====================================
*/

import { ipcRenderer } from 'electron';
import * as language from '../../../core/language';
import type { LanguageListItem } from '../../../schemas';

let languages: LanguageListItem[] = [];
export const loadLanguageTab = () => {
	let elements: HTMLElement[] = [];

	let noticeTextElement = document.createElement(`p`);
	noticeTextElement.innerText = language.getString(`settings-language-notice`);
	elements.push(noticeTextElement);

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

	let buttons: HTMLCollectionOf<HTMLButtonElement> = <HTMLCollectionOf<HTMLButtonElement>>document.getElementsByClassName(`settings-language-button`);
	for (let i: number = 0; i < buttons.length; i++) {
		if (i == index) {
			buttons[i].className = `settings-wide-button settings-language-button active`;
		} else {
			buttons[i].className = `settings-wide-button settings-language-button`;
		}
	}
}