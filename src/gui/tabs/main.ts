/*
=====================================
  © Lekvado Media, 2019-2021
  Licensed under the GPLv3 license.
=====================================
*/

import '../../styles/tabs.css';
import * as reordering from './reordering';
import { createTabElement } from './element';
import * as editor from '../editor/main';
import type { Service } from '../../schemas';

let tabbar: HTMLDivElement = <HTMLDivElement>document.getElementById(`tabbar`);

export let openTabs: Array<Service> = [];
export let openTabIndex: number = -1;

export const addTab = (article: Service) => {
	// If the tab has been already added, just open it
	if (document.getElementById(`tab-${article.id}`) !== null) {
		openTab(article.id);
		return;
	}
	// Limit the tab amount to the largest amount that still looks somewhat fine
	if (Math.floor(tabbar.clientWidth / tabbar.children.length) < 120) {
		return;
	}

	openTabs.push(article);

	recalculateLayout();

	setTimeout(() => {
		tabbar.appendChild(createTabElement(article));

		setTimeout(() => {
			recalculateLayout();
		}, 20);

		openTab(article.id);
	}, 200);
}
export const closeTab = (id: number) => {
	for (let i = 0; i < openTabs.length; i++) {
		if (openTabs[i].id == id) {
			// If the active tab was deleted, pick a new position
			if (openTabIndex == i) {
				if (openTabIndex >= openTabs.length - 1) {
					openTabIndex = 0;
				}
			}

			openTabs.splice(i, 1);

			document.getElementById(`tab-${id}`).style.width = `0`;
			if (openTabs.length != 0) {
				document.getElementById(`tab-${openTabs[openTabIndex].id}`).className = `tab tab-active`;

				editor.openArticle(openTabs[openTabIndex].id);
			} else {
				setTimeout(() => editor.openArticle(-1), 200);
			}

			setTimeout(() => {
				tabbar.removeChild(document.getElementById(`tab-${id}`));
			}, 200);

			continue;
		}
	}
	
	setTimeout(() => recalculateLayout(), 200);
}
export const openTab = (id: number) => {
	if (openTabs[openTabIndex] != undefined) document.getElementById(`tab-${openTabs[openTabIndex].id}`).className = `tab`;

	for (let i = 0; i < openTabs.length; i++) {
		if (openTabs[i].id == id) {
			openTabIndex = i;

			document.getElementById(`tab-${id}`).className += ` tab-active`;

			editor.openArticle(openTabs[i].id);

			continue;
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