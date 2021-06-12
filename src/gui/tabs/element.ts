/*
=====================================
  © Lekvado Media, 2019-2021
  Licensed under the GPLv3 license.
=====================================
*/

import { Document } from '../../schemas';

export const createTabElement = (sourceDocument: Document, active: boolean = false) => {
	let element: HTMLDivElement = document.createElement(`div`);
	element.className = `tab`;
	if (active) element.className += ` tab-active`;
	element.setAttribute(`id`, `tab-${sourceDocument.id}`);

	let textElement: HTMLParagraphElement = document.createElement(`p`);
	textElement.innerText = sourceDocument.title;

	let closeBtnElement: HTMLButtonElement = document.createElement(`button`);
	closeBtnElement.setAttribute(`id`, `tab-${sourceDocument.id}-close`);
	closeBtnElement.innerHTML = `<i class="bi bi-x"></i>`;

	element.appendChild(textElement);
	element.appendChild(closeBtnElement);

	return element;
}