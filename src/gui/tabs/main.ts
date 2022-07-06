/*
=====================================
  © Memra Digital, 2019-2022
  Licensed under the GPLv3 license.
=====================================
*/

import '../../styles/tabs.css';
import * as reordering from './reordering';
import { createTabElement } from './element';
import * as editor from '../editor/main';
import type { DocumentMetadata } from '../../schemas';

let tabbar: HTMLDivElement = <HTMLDivElement>document.getElementById(`tabbar`);

export let openTabs: DocumentMetadata[] = [];
export let openTabIndex: number = -1;

export const addTab = (sourceDocument: DocumentMetadata) => {
	// If the tab has been already added, just open it
	if (document.querySelector(`.tab[data-id="${sourceDocument.id}"]`) !== null) {
		openTab(sourceDocument.id);
		return;
	}
	// Limit the tab amount to the largest amount that still looks somewhat fine
	if (Math.floor(tabbar.clientWidth / tabbar.children.length) < 120) {
		return;
	}

	recalculateLayout();

	setTimeout(() => {
		openTabs.push(sourceDocument);
		tabbar.appendChild(createTabElement(sourceDocument));

		setTimeout(() => {
			recalculateLayout();
		}, 20);

		openTab(sourceDocument.id);
	}, 200);
}
export const closeTab = (id: number) => {
	for (let i = 0; i < openTabs.length; i++) {
		if (openTabs[i].id == id) {
			let tabToRemove: HTMLElement = document.querySelector(`.tab[data-id="${id}"]`);
			tabToRemove.style.width = `0`;
			tabToRemove.style.opacity = `0`;

			if (openTabs.length > 1) {
				document.querySelector(`.tab[data-id="${openTabs[openTabIndex].id}"]`).classList.add(`active`);

				editor.openDocument(openTabs[openTabIndex].id);
			} else {
				editor.openDocument(-1);
			}

			// Show the document as inactive in the sidebar
			document.querySelector(`.sidebar-document[data-id="${id}"]`).classList.remove(`open`);
			document.querySelector(`.sidebar-document[data-id="${id}"]`).classList.remove(`active`);

			openTabs.splice(i, 1);

			if (openTabs.length > 0) {
				if (openTabIndex >= openTabs.length) {
					openTabIndex = openTabs.length - 1;
				}
				openTab(openTabs[openTabIndex].id);
			}

			setTimeout(() => {
				tabbar.removeChild(tabToRemove);
			}, 150);

			continue;
		}
	}
	
	setTimeout(() => recalculateLayout(), 200);
}
export const openTab = (id: number) => {
	for (let i: number = 0; i < openTabs.length; i++) {
		if (openTabs[i].id == id) {
			openTabIndex = i;

			document.querySelector(`.tab[data-id="${openTabs[i].id}"]`).classList.add(`active`);

			editor.openDocument(openTabs[i].id);

			// Show the document as active in the sidebar
			document.querySelector(`.sidebar-document[data-id="${openTabs[i].id}"]`).classList.remove(`open`);
			document.querySelector(`.sidebar-document[data-id="${openTabs[i].id}"]`).classList.add(`active`);
		} else {
			document.querySelector(`.tab[data-id="${openTabs[i].id}"]`).className = `tab`;

			// Show the document as open in the sidebar
			document.querySelector(`.sidebar-document[data-id="${openTabs[i].id}"]`).classList.add(`open`);
			document.querySelector(`.sidebar-document[data-id="${openTabs[i].id}"]`).classList.remove(`active`);
		}
	}
}
export const renameTab = (id: number, title: string) => {
	if (document.querySelector(`.tab[data-id="${id}"]`) !== undefined) {
		document.querySelector(`.tab[data-id="${id}"]`).getElementsByTagName(`p`)[0].innerText = title;
	}
}
export const openTabAtIndex = (index: number) => {
	openTabIndex = index;
}

export const recalculateLayout = () => {
	for (let i: number = 0; i < openTabs.length; i++) {
		if (document.querySelector(`.tab[data-id="${openTabs[i].id}"]`) !== undefined) {
			(<HTMLElement>document.querySelector(`.tab[data-id="${openTabs[i].id}"]`)).onmousedown = (e) => reordering.handleTabMouseDown(e, openTabs[i].id);

			(<HTMLElement>document.querySelector(`.tab[data-id="${openTabs[i].id}"] .close`)).onclick = () => closeTab(openTabs[i].id);

			(<HTMLElement>document.querySelector(`.tab[data-id="${openTabs[i].id}"]`)).style.width = `min(calc(100% / ${openTabs.length}), 250px)`;
		}
	}
}