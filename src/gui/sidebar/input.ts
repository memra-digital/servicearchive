/*
=====================================
	© Lekvado Media, 2019-2021
	Licensed under the GPLv3 license.
=====================================
*/

import * as data from '../../core/data';
import * as sidebar from './main';
import { Service } from '../../schemas';

let sidebarArticleList: HTMLElement = document.getElementById(`article-list`);
let addArticleBtn: HTMLElement = document.getElementById(`add-btn`);
let articleInputOpen: boolean = false;

export const addArticleInput = () => {
	if (!articleInputOpen) {
		articleInputOpen = true;

		let containerElement: HTMLElement = document.createElement(`div`);
		containerElement.setAttribute(`class`, `new-article`)
		containerElement.setAttribute(`id`, `new-article`);

		let inputElement: HTMLElement = document.createElement(`input`);
		inputElement.setAttribute(`class`, `new-article-input`);
		inputElement.setAttribute(`id`, `new-article-input`);
		containerElement.appendChild(inputElement);

		let buttonElement: HTMLElement = document.createElement(`button`);
		buttonElement.setAttribute(`class`, `new-article-btn`);
		buttonElement.innerHTML = `<i class="bi bi-check2"></i>`;
		containerElement.appendChild(buttonElement);

		buttonElement.onclick = () => solidifyArticleInput();

		sidebarArticleList.insertBefore(containerElement, sidebarArticleList.children[0]);

		addArticleBtn.style.transform = `rotate(45deg)`;

		sidebarArticleList.scrollTop = 0;

		setTimeout(() => {
			containerElement.style.height = `2.5rem`
			inputElement.focus();
		}, 1);
	} else {
		removeArticleInput();
	}
}
export const removeArticleInput = () => {
	articleInputOpen = false;

	let containerElement: HTMLElement = document.getElementById(`new-article`);
	containerElement.style.height = `0`;

	addArticleBtn.style.transform = `rotate(0deg)`;

	setTimeout(() => {
		sidebarArticleList.removeChild(containerElement);
	}, 200);
}
export const solidifyArticleInput = () => {
	let input: HTMLInputElement = <HTMLInputElement>document.getElementById(`new-article-input`);

	if (input.value != ``) {
		let newArticle: Service = data.addArticle(input.value);

		sidebar.appendArticleToList({
			id: newArticle.id,
			title: newArticle.title,
			contentPreview: ``
		});
	}

	removeArticleInput();
}

addArticleBtn.onclick = () => {
	addArticleInput();
}