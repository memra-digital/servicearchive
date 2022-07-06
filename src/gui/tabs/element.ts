/*
=====================================
  © Memra Digital, 2019-2022
  Licensed under the GPLv3 license.
=====================================
*/

import { DocumentMetadata } from '../../schemas';

export const createTabElement = (sourceDocument: DocumentMetadata, active: boolean = false) => {
	let element: HTMLDivElement = document.createElement(`div`);
	element.className = `tab`;
	if (active) element.classList.add(`active`);
	element.setAttribute(`data-id`, sourceDocument.id.toString());

	let textElement: HTMLParagraphElement = document.createElement(`p`);
	textElement.innerText = sourceDocument.title;

	let closeBtnElement: HTMLButtonElement = document.createElement(`button`);
	closeBtnElement.className = `close`;
	closeBtnElement.innerHTML = `<i class="bi bi-x"></i>`;

	element.appendChild(textElement);
	element.appendChild(closeBtnElement);

	return element;
}