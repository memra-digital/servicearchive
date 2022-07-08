/*
=====================================
  © Memra Digital, 2019-2022
  Licensed under the GPLv3 license.
=====================================
*/

import type { ContextMenuItem } from '../../schemas';
import '../../styles/contextMenu.css';

export default class ContextMenu {
	contextElement: HTMLElement | null;
	contextMenuElement: HTMLDivElement;
	menuItems: ContextMenuItem[];
	isOpen: boolean = false;
	contextMenuElementHeight: number = 16;

	constructor(element: HTMLElement | null, menuItems: ContextMenuItem[]) {
		this.contextElement = element;
		this.menuItems = menuItems;

		this.contextMenuElement = document.createElement(`div`);
		this.contextMenuElement.className = `context-menu`;
		document.body.appendChild(this.contextMenuElement);
		
		// Populate the context menu with items
		for (let i: number = 0; i < menuItems.length; i++) {
			if (menuItems[i].type === `option`) {
				// Regular button
				let optionElement: HTMLDivElement = document.createElement(`div`);
				optionElement.className = `option`;
				optionElement.innerHTML = `
					${menuItems[i].color === undefined ? `` : `<div class="color ${menuItems[i].color}"></div>`}
					<p>${menuItems[i].text}</p>
				`;
				this.contextMenuElement.appendChild(optionElement);
				this.contextMenuElementHeight += 35;

				if (menuItems[i].onClick !== undefined) {
					optionElement.addEventListener(`mousedown`, (event: MouseEvent) => {
						if (event.button === 0) {
							menuItems[i].onClick();
						}
					});
				}

			} else if (menuItems[i].type === `divider`) {
				// Divider
				let dividerElement: HTMLDivElement = document.createElement(`div`);
				dividerElement.className = `divider`;
				this.contextMenuElement.appendChild(dividerElement);
				this.contextMenuElementHeight += 19;

			} else if (menuItems[i].type === `selection`) {
				// Dropdown
				let selectionElement: HTMLDivElement = document.createElement(`div`);
				selectionElement.className = `selection`;
				selectionElement.innerHTML = `
					<p>${menuItems[i].text}</p>
					<i class="bi bi-chevron-right"></i>`;
				this.contextMenuElement.appendChild(selectionElement);
				this.contextMenuElementHeight += 35;

				if (menuItems[i].onClick !== undefined) {
					selectionElement.addEventListener(`click`, () => {
						menuItems[i].onClick();
					});
				}

				// Add the actual dropdown which is itself another context menu
				let dropdownMenu = new ContextMenu(null, menuItems[i].options);

				let isMouseOverSelectionElement: boolean = false,
					isMouseOverDropdownElement: boolean = false;
				
				selectionElement.addEventListener(`mouseenter`, () => {
					let rect: DOMRect = selectionElement.getBoundingClientRect();
					dropdownMenu.open(rect.right, rect.top - 8);

					isMouseOverSelectionElement = true;
				});
				selectionElement.addEventListener(`mouseleave`, () => {
					isMouseOverSelectionElement = false;

					setTimeout(() => {
						if (!isMouseOverSelectionElement && !isMouseOverDropdownElement) {
							dropdownMenu.close();
						}
					}, 20);
				});

				dropdownMenu.contextMenuElement.addEventListener(`mouseenter`, () => {
					isMouseOverDropdownElement = true;
				});
				dropdownMenu.contextMenuElement.addEventListener(`mouseleave`, () => {
					isMouseOverDropdownElement = false;

					setTimeout(() => {
						if (!isMouseOverSelectionElement && !isMouseOverDropdownElement) {
							dropdownMenu.close();
						}
					}, 20);
				});
			}
		}

		// Show the menu
		if (this.contextElement !== null) {
			this.contextElement.addEventListener(`contextmenu`, (event: MouseEvent) => {
				this.open(event.clientX, event.clientY);
			});
		}

		// Hide the menu
		document.body.addEventListener(`mousedown`, () => {
			this.close();
		});
	}

	open(x: number, y: number) {
		if (this.isOpen) {
			return;
		}
		this.isOpen = true;

		this.contextMenuElement.style.left = `${x}px`;
		this.contextMenuElement.style.top = `${y}px`;

		this.contextMenuElement.style.display = `block`;

		setTimeout(() => {
			this.contextMenuElement.style.opacity = `1`;
			this.contextMenuElement.style.height = `${this.contextMenuElementHeight}px`;
		}, 20);
	}

	close() {
		if (!this.isOpen) {
			return;
		}

		this.contextMenuElement.style.opacity = `0`;
		this.contextMenuElement.style.height = `0`;

		setTimeout(() => {
			this.contextMenuElement.style.display = `none`;

			if (this.isOpen) {
				this.isOpen = false;
			}
		}, 200);
	}
}