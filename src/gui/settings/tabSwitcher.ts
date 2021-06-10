/*
=====================================
  © Lekvado Media, 2019-2021
  Licensed under the GPLv3 license.
=====================================
*/

import { tabs } from './main';
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

const loadGeneralTab = () => {
	let elements: HTMLElement[] = [];

	let textElement: HTMLElement = document.createElement(`p`);
	textElement.innerText = `Uhh idk man`;
	elements.push(textElement);

	return elements;
}
const loadThemeTab = () => {
	let elements: HTMLElement[] = [];

	return elements;
}
const loadLanguageTab = () => {
	let elements: HTMLElement[] = [];

	return elements;
}

let tabHandlers: (() => HTMLElement[])[] = [
	loadGeneralTab,
	loadThemeTab,
	loadLanguageTab
];