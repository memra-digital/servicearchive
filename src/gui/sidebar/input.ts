/*
=====================================
	© Lekvado Media, 2019-2021
	Licensed under the GPLv3 license.
=====================================
*/

import * as data from '../../core/data';
import * as language from '../../core/language';
import * as sidebar from './main';
import * as tabs from '../tabs/main';
import { Service } from '../../schemas';

let sidebarArticleList: HTMLElement = document.getElementById(`article-list`);
let addArticleBtn: HTMLElement = document.getElementById(`add-btn`);
let articleInputOpen: boolean = false;
let renamingDocumentId: number = 0;

export const addArticleInput = () => {
	if (!articleInputOpen) {
		articleInputOpen = true;

		// CSS :nth-child(1) selector stops targetting the first article when this input is added
		// so enforce these rules via JS
		if (sidebarArticleList.children.length > 0) {
			(<HTMLElement>sidebarArticleList.children[0]).style.marginTop = `.5rem`;
		}

		// Create the elements
		let inputElement = createSidebarInput(language.getString(`add-document`));

		inputElement.getElementsByTagName(`button`)[0].onclick = () => solidifyArticleInput();
		document.body.addEventListener(`keypress`, inputAddKeyboardEvent);

		sidebarArticleList.insertBefore(inputElement, sidebarArticleList.children[0]);

		addArticleBtn.style.transform = `rotate(45deg)`;

		sidebarArticleList.scrollTop = 0;

		setTimeout(() => {
			inputElement.style.height = `4rem`
			inputElement.getElementsByTagName(`input`)[0].focus();
		}, 1);
	} else {
		removeArticleInput();
	}
}
export const addRenameInput = (id: number) => {
	if (!articleInputOpen) {
		articleInputOpen = true;

		renamingDocumentId = id;

		// CSS :nth-child(1) selector stops targetting the first article when this input is added
		// so enforce these rules via JS
		if (sidebarArticleList.children.length > 0) {
			(<HTMLElement>sidebarArticleList.children[0]).style.marginTop = `.5rem`;
		}

		// Create the elements
		let inputElement = createSidebarInput(language.getString(`rename-document`));

		inputElement.getElementsByTagName(`button`)[0].onclick = () => renameArticleInput();
		document.body.addEventListener(`keypress`, inputRenameKeyboardEvent);

		sidebarArticleList.insertBefore(inputElement, sidebarArticleList.children[0]);

		addArticleBtn.style.transform = `rotate(45deg)`;

		sidebarArticleList.scrollTop = 0;

		setTimeout(() => {
			inputElement.style.height = `4rem`
			inputElement.getElementsByTagName(`input`)[0].focus();
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

	document.body.removeEventListener(`keypress`, inputAddKeyboardEvent);
	document.body.removeEventListener(`keypress`, inputRenameKeyboardEvent);

	setTimeout(() => {
		sidebarArticleList.removeChild(containerElement);

		(<HTMLElement>sidebarArticleList.children[0]).style.marginTop = ``;
	}, 200);
}
export const renameArticleInput = () => {
	let input: HTMLInputElement = <HTMLInputElement>document.getElementById(`new-article-input`);

	if (input.value != ``) {
		data.setArticleName(renamingDocumentId, input.value);

		sidebar.updateTitleInList(
			renamingDocumentId,
			input.value
		);

		tabs.renameTab(renamingDocumentId, input.value);
	}

	removeArticleInput();
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

const createSidebarInput = (text: string) => {
	let containerElement: HTMLElement = document.createElement(`div`);
	containerElement.setAttribute(`class`, `sidebar-document-input`)
	containerElement.setAttribute(`id`, `new-article`);

	let textElement: HTMLElement = document.createElement(`p`);
	textElement.innerText = text;
	containerElement.appendChild(textElement);

	let inputElement: HTMLElement = document.createElement(`input`);
	inputElement.setAttribute(`id`, `new-article-input`);
	containerElement.appendChild(inputElement);

	let buttonElement: HTMLElement = document.createElement(`button`);
	buttonElement.innerHTML = `<i class="bi bi-check2"></i>`;
	containerElement.appendChild(buttonElement);

	return containerElement;
}
const inputAddKeyboardEvent = (event: KeyboardEvent) => {
	if (event.key == `Enter`) {
		solidifyArticleInput();
	}
}
const inputRenameKeyboardEvent = (event: KeyboardEvent) => {
	if (event.key == `Enter`) {
		renameArticleInput();
	}
}