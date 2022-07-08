/*
=====================================
  © Memra Digital, 2019-2022
  Licensed under the GPLv3 license.
=====================================
*/

import * as data from '../../core/data';
import { DocumentMetadata } from '../../schemas';

export const createTabElement = (sourceDocument: DocumentMetadata, active: boolean = false) => {
	let element: HTMLDivElement = document.createElement(`div`);
	element.className = `tab`;
	if (active) element.classList.add(`active`);
	element.setAttribute(`data-id`, sourceDocument.id.toString());

	let color: string = data.getCategoryByDocumentId(sourceDocument.id).color;
	let colorElement: HTMLDivElement = document.createElement(`div`);
	colorElement.className = `color`;
	if (color !== undefined) {
		colorElement.classList.add(color);
	}
	element.appendChild(colorElement);

	let textElement: HTMLParagraphElement = document.createElement(`p`);
	textElement.innerText = sourceDocument.title;
	element.appendChild(textElement);

	let closeBtnElement: HTMLButtonElement = document.createElement(`button`);
	closeBtnElement.className = `close`;
	closeBtnElement.innerHTML = `<i class="bi bi-x"></i>`;
	element.appendChild(closeBtnElement);

	return element;
}