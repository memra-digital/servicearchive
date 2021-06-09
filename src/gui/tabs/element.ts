/*
=====================================
  © Lekvado Media, 2019-2021
  Licensed under the GPLv3 license.
=====================================
*/

import { Service } from '../../schemas';

export const createTabElement = (article: Service, active: boolean = false) => {
	let element: HTMLDivElement = document.createElement(`div`);
	element.className = `tab`;
	if (active) element.className += ` tab-active`;
	element.setAttribute(`id`, `tab-${article.id}`);

	let textElement: HTMLParagraphElement = document.createElement(`p`);
	textElement.innerText = article.title;

	let closeBtnElement: HTMLButtonElement = document.createElement(`button`);
	closeBtnElement.setAttribute(`id`, `tab-${article.id}-close`);
	closeBtnElement.innerHTML = `<i class="bi bi-x"></i>`;

	element.appendChild(textElement);
	element.appendChild(closeBtnElement);

	return element;
}