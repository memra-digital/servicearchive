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
	if (document.getElementById(`tab-${sourceDocument.id}`) !== null) {
		openTab(sourceDocument.id);
		return;
	}
	// Limit the tab amount to the largest amount that still looks somewhat fine
	if (Math.floor(tabbar.clientWidth / tabbar.children.length) < 120) {
		return;
	}

	openTabs.push(sourceDocument);

	recalculateLayout();

	setTimeout(() => {
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
			let tabToRemove: HTMLElement = document.getElementById(`tab-${id}`);
			tabToRemove.style.width = `0`;

			if (openTabs.length > 1) {
				document.getElementById(`tab-${openTabs[openTabIndex].id}`).className = `tab tab-active`;

				editor.openDocument(openTabs[openTabIndex].id);
			} else {
				setTimeout(() => editor.openDocument(-1), 200);
			}

			// Show the document as inactive in the sidebar
			document.querySelector(`#sidebar-document-btn-${id}`).classList.remove(`open`);
			document.querySelector(`#sidebar-document-btn-${id}`).classList.remove(`active`);

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

			document.getElementById(`tab-${openTabs[i].id}`).classList.add(`tab-active`);

			editor.openDocument(openTabs[i].id);

			// Show the document as active in the sidebar
			document.querySelector(`#sidebar-document-btn-${openTabs[i].id}`).classList.remove(`open`);
			document.querySelector(`#sidebar-document-btn-${openTabs[i].id}`).classList.add(`active`);
		} else {
			document.getElementById(`tab-${openTabs[i].id}`).className = `tab`;

			// Show the document as open in the sidebar
			document.querySelector(`#sidebar-document-btn-${openTabs[i].id}`).classList.add(`open`);
			document.querySelector(`#sidebar-document-btn-${openTabs[i].id}`).classList.remove(`active`);
		}
	}
}
export const renameTab = (id: number, title: string) => {
	if (document.getElementById(`tab-${id}`) != undefined) {
		document.getElementById(`tab-${id}`).getElementsByTagName(`p`)[0].innerText = title;
	}
}
export const openTabAtIndex = (index: number) => {
	openTabIndex = index;
}

export const recalculateLayout = () => {
	for (let i: number = 0; i < openTabs.length; i++) {
		if (document.getElementById(`tab-${openTabs[i].id}`) != undefined) {
			document.getElementById(`tab-${openTabs[i].id}`).onmousedown = (e) => reordering.handleTabMouseDown(e, openTabs[i].id);

			document.getElementById(`tab-${openTabs[i].id}-close`).onclick = () => closeTab(openTabs[i].id);

			document.getElementById(`tab-${openTabs[i].id}`).style.width = `max(calc(100% / ${openTabs.length} - 1.5rem, 20%)`;
		}
	}
}