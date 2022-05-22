/*
=====================================
  © Memra Digital, 2019-2022
  Licensed under the GPLv3 license.
=====================================
*/

import { openTabs, openTabIndex, openTab, openTabAtIndex, recalculateLayout } from './main';
import { createTabElement } from './element';

let tabbar: HTMLDivElement = <HTMLDivElement>document.getElementById(`tabbar`);

let tabMouseDownStartPosition: number = 0;
let currentMovingTabIndex: number = -1;
let clickedTab: boolean = false;
let newTabPosition: number = 0;

export const handleTabMouseDown = (event: MouseEvent, id: number) => {
	// Don't do anything if clicked the tabs X button
	if ((<HTMLElement>event.target).id == `tab-${id}-close` ||
		(<HTMLElement>event.target).className == `bi bi-x`) {
		
		return;
	}

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
		openTabAtIndex(openTabIndex);

		recalculateLayout();
	}
}
document.onmouseup = (event: MouseEvent) => {
	if (!clickedTab) {
		return;
	}

	clickedTab = false;

	recalculateLayout();
}