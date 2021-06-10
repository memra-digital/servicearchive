/*
=====================================
  © Lekvado Media, 2019-2021
  Licensed under the GPLv3 license.
=====================================
*/

import { tabs } from './main';
import * as language from '../../core/language';
import * as tabSwitcher from './tabSwitcher';

let sidebar: HTMLElement = document.getElementById(`settings-modal-sidebar`);

export const loadSidebar = () => {
	sidebar.innerHTML = ``;

	let titleElement = document.createElement(`h1`);
	titleElement.innerText = language.getString(`settings`);
	sidebar.append(titleElement);

	for (let i = 0; i < tabs.length; i++) {
		let tabElement = document.createElement(`button`);
		tabElement.innerHTML = tabs[i];
		tabElement.onclick = () => tabSwitcher.switchTab(i);
		sidebar.append(tabElement);
	}

	tabSwitcher.switchTab(0);
}