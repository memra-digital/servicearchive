/*
=====================================
  © Memra Digital, 2019-2022
  Licensed under the GPLv3 license.
=====================================
*/

import { tabs } from './main';
import { loadGeneralTab } from './tabs/generalTab';
import { loadThemeTab } from './tabs/themeTab';
import { loadLanguageTab } from './tabs/languageTab';
import { loadAboutTab } from './tabs/aboutTab';

let modalMain: HTMLElement = document.getElementById(`settings-modal-main`);
let modalSidebar: HTMLElement = document.getElementById(`settings-modal-sidebar`);

export const switchTab = (index: number) => {
	modalMain.innerHTML = ``;

	let titleElement: HTMLElement = document.createElement(`h1`);
	titleElement.innerHTML = tabs[index];
	modalMain.appendChild(titleElement);

	let elements: HTMLElement[] = tabHandlers[index]();
	for (let i: number = 0; i < elements.length; i++) {
		modalMain.appendChild(elements[i]);
	}

	// Display the tab as active
	for (let i: number = 0; i < modalSidebar.children.length; i++) {
		if (i == index + 1) {
			modalSidebar.children[i].className = `active`;
		} else {
			modalSidebar.children[i].className = ``;
		}
	}
}

let tabHandlers: (() => HTMLElement[])[] = [
	loadGeneralTab,
	loadThemeTab,
	loadLanguageTab,
	loadAboutTab
];