/*
=====================================
  © Memra Digital, 2019-2022
  Licensed under the GPLv3 license.
=====================================
*/

import { tabs } from './main';
import * as i18n from '../../core/i18n';
import * as tabSwitcher from './tabSwitcher';

let sidebar: HTMLElement = document.getElementById(`settings-modal-sidebar`);

export const loadSidebar = () => {
	sidebar.innerHTML = ``;

	let titleElement = document.createElement(`h1`);
	titleElement.innerText = i18n.getString(`settings-title`);
	sidebar.append(titleElement);

	for (let i = 0; i < tabs.length; i++) {
		let tabElement = document.createElement(`button`);
		tabElement.innerHTML = tabs[i];
		tabElement.onclick = () => tabSwitcher.switchTab(i);
		sidebar.append(tabElement);
	}

	tabSwitcher.switchTab(0);
}