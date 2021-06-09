/*
=====================================
  © Lekvado Media, 2019-2021
  Licensed under the GPLv3 license.
=====================================
*/

import '../../styles/tabs.css';
import * as editor from '../editor';
import { Service } from '../../schemas';
import { createTabElement } from './element';

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

let tabMouseDownStartPosition: number = 0;
let currentMovingTabIndex: number = -1;
let clickedTab: boolean = false;
let newTabPosition: number = 0;

const handleTabMouseDown = (event: MouseEvent, id: number) => {
	tabMouseDownStartPosition = event.clientX;
	clickedTab = true;

	for (let i: number = 0; i < openTabs.length; i++) {
		if (openTabs[i].id == id) {
			currentMovingTabIndex = i;
			break;
		}
	}

	openTab(openTabs[currentMovingTabIndex].id);
}
document.onmousemove = (event: MouseEvent) => {
	if (!clickedTab) {
		return;
	}
	if (Math.abs(event.clientX - tabMouseDownStartPosition) > 10) {
		let tabbarX: number = tabbar.getBoundingClientRect().x;
		let tabWidth: number = tabbar.children[0].clientWidth;
		newTabPosition = Math.floor((event.clientX - tabbarX) / tabWidth);

		if (newTabPosition < 0) {
			newTabPosition = 0;
		} else if (newTabPosition > openTabs.length) {
			newTabPosition = openTabs.length;
		}

		const tabItemToMove = openTabs.splice(openTabs.indexOf(openTabs[currentMovingTabIndex]), 1)[0];
    	openTabs.splice(newTabPosition, 0, tabItemToMove);

		// If the tabs get reordered, remove their elements and add everything back in the new order
		if (currentMovingTabIndex != newTabPosition) {
			tabbar.innerHTML = ``;

			for (let i = 0; i < openTabs.length; i++) {
				tabbar.appendChild(createTabElement(openTabs[i], i == newTabPosition));
			}

			recalculateLayout();
		}	

		currentMovingTabIndex = newTabPosition;
		openTabIndex = newTabPosition;
	}
}
document.onmouseup = (event: MouseEvent) => {
	if (!clickedTab) {
		return;
	}

	clickedTab = false;

	recalculateLayout();
}

const recalculateLayout = () => {
	for (let i: number = 0; i < openTabs.length; i++) {
		if (document.getElementById(`tab-${openTabs[i].id}`) != undefined) {
			document.getElementById(`tab-${openTabs[i].id}`).onmousedown = (e) => handleTabMouseDown(e, openTabs[i].id);

			document.getElementById(`tab-${openTabs[i].id}-close`).onclick = () => closeTab(openTabs[i].id);

			document.getElementById(`tab-${openTabs[i].id}`).style.width = `max(calc(100% / ${openTabs.length} - 1.5rem, 20%)`;
		}
	}
}