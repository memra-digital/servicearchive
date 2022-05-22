/*
=====================================
	© Memra Digital, 2019-2022
	Licensed under the GPLv3 license.
=====================================
*/

import * as data from '../../core/data';
import * as language from '../../core/language';
import * as sidebar from './main';
import * as tabs from '../tabs/main';
import { DocumentMetadata, DocumentCategory } from '../../schemas';

let sidebarDocumentList: HTMLElement = document.getElementById(`document-list`);
let addDocumentBtn: HTMLElement = document.getElementById(`add-btn`);
let addDocumentCategoryBtn: HTMLElement = document.getElementById(`add-category-btn`);
let documentInputOpen: boolean = false;
let renamingDocumentId: number = 0;
let renamingDocumentCategoryId: number = 0;

export const showAddDocumentInput = () => {
	if (!documentInputOpen) {
		documentInputOpen = true;

		// CSS :nth-child(1) selector stops targetting the first document when this input is added
		// so enforce these rules via JS
		if (sidebarDocumentList.children.length > 0) {
			(<HTMLElement>sidebarDocumentList.children[0]).style.marginTop = `.5rem`;
		}

		// Create the elements
		let containerElement: HTMLElement = document.createElement(`div`);
		containerElement.setAttribute(`class`, `sidebar-document-input`)
		containerElement.setAttribute(`id`, `add-document`);

		let textElement: HTMLElement = document.createElement(`p`);
		textElement.innerText = language.getString(`add-document`);
		containerElement.appendChild(textElement);

		let inputElement: HTMLElement = document.createElement(`input`);
		inputElement.setAttribute(`id`, `add-document-input`);
		containerElement.appendChild(inputElement);

		let buttonElement: HTMLElement = document.createElement(`button`);
		buttonElement.innerHTML = `<i class="bi bi-check2"></i>`;
		containerElement.appendChild(buttonElement);


		buttonElement.onclick = () => applyAddDocumentInput();
		document.body.addEventListener(`keypress`, keyboardEventDuringAddInput);

		sidebarDocumentList.insertBefore(containerElement, sidebarDocumentList.children[0]);

		addDocumentBtn.style.transform = `rotate(45deg)`;

		sidebarDocumentList.scrollTop = 0;

		setTimeout(() => {
			containerElement.style.height = `4rem`
			inputElement.focus();
		}, 1);
	} else {
		removeInput();
	}
}
export const applyAddDocumentInput = () => {
	let input: HTMLInputElement = <HTMLInputElement>document.getElementById(`add-document-input`);

	if (input.value != ``) {
		let newDocument: DocumentMetadata | boolean = data.addDocument(input.value);

		if (newDocument != false) {
			sidebar.appendDocumentToList({
				id: newDocument.id,
				title: newDocument.title,
				contentPreview: ``
			});
		}
	}

	removeInput();
}

export const showRenameDocumentInput = (id: number) => {
	if (!documentInputOpen) {
		documentInputOpen = true;

		renamingDocumentId = id;

		// CSS :nth-child(1) selector stops targetting the first document when this input is added
		// so enforce these rules via JS
		if (sidebarDocumentList.children.length > 0) {
			(<HTMLElement>sidebarDocumentList.children[0]).style.marginTop = `.5rem`;
		}

		// Create the elements
		let containerElement: HTMLElement = document.createElement(`div`);
		containerElement.setAttribute(`class`, `sidebar-document-input`)
		containerElement.setAttribute(`id`, `rename-document`);

		let textElement: HTMLElement = document.createElement(`p`);
		textElement.innerText = language.getString(`rename-document`);
		containerElement.appendChild(textElement);

		let inputElement: HTMLInputElement = document.createElement(`input`);
		inputElement.setAttribute(`id`, `rename-document-input`);
		inputElement.value = data.getDocumentTitle(id);
		containerElement.appendChild(inputElement);

		let buttonElement: HTMLElement = document.createElement(`button`);
		buttonElement.innerHTML = `<i class="bi bi-check2"></i>`;
		containerElement.appendChild(buttonElement);


		buttonElement.onclick = () => applyRenameDocumentInput();
		document.body.addEventListener(`keypress`, keyboardEventDuringRenameInput);

		sidebarDocumentList.insertBefore(containerElement, sidebarDocumentList.children[0]);

		addDocumentBtn.style.transform = `rotate(45deg)`;

		sidebarDocumentList.scrollTop = 0;

		setTimeout(() => {
			containerElement.style.height = `4rem`
			inputElement.focus();
		}, 1);
	} else {
		removeInput();
	}
}
export const applyRenameDocumentInput = () => {
	let input: HTMLInputElement = <HTMLInputElement>document.getElementById(`rename-document-input`);

	if (input.value !== ``) {
		if (data.setDocumentTitle(renamingDocumentId, input.value) != false) {
			sidebar.updateTitleInList(
				renamingDocumentId,
				input.value
			);

			tabs.renameTab(renamingDocumentId, input.value);
		}
	}

	removeInput();
}

export const showAddDocumentCategoryInput = () => {
	if (!documentInputOpen) {
		documentInputOpen = true;

		// CSS :nth-child(1) selector stops targetting the first document when this input is added
		// so enforce these rules via JS
		if (sidebarDocumentList.children.length > 0) {
			(<HTMLElement>sidebarDocumentList.children[0]).style.marginTop = `.5rem`;
		}

		// Create the elements
		let containerElement: HTMLElement = document.createElement(`div`);
		containerElement.setAttribute(`class`, `sidebar-document-input`)
		containerElement.setAttribute(`id`, `add-document-category`);

		let textElement: HTMLElement = document.createElement(`p`);
		textElement.innerText = language.getString(`add-document-category`);
		containerElement.appendChild(textElement);

		let inputElement: HTMLInputElement = document.createElement(`input`);
		inputElement.setAttribute(`id`, `add-document-category-input`);
		containerElement.appendChild(inputElement);

		let buttonElement: HTMLElement = document.createElement(`button`);
		buttonElement.innerHTML = `<i class="bi bi-check2"></i>`;
		containerElement.appendChild(buttonElement);


		buttonElement.onclick = () => applyAddDocumentCategoryInput();
		document.body.addEventListener(`keypress`, keyboardEventDuringAddCategoryInput);

		sidebarDocumentList.insertBefore(containerElement, sidebarDocumentList.children[0]);

		addDocumentBtn.style.transform = `rotate(45deg)`;

		sidebarDocumentList.scrollTop = 0;

		setTimeout(() => {
			containerElement.style.height = `4rem`
			inputElement.focus();
		}, 1);
	} else {
		removeInput();
	}
}
export const applyAddDocumentCategoryInput = () => {
	let input: HTMLInputElement = <HTMLInputElement>document.getElementById(`add-document-category-input`);

	if (input.value !== ``) {
		let category: DocumentCategory | boolean = data.addDocumentCategory(input.value);

		if (category !== false) {
			sidebar.appendDocumentCategoryToList({
				id: category.id,
				title: category.title,
				color: category.color,
				content: []
			});
		}
	}

	removeInput();
}

export const showRenameDocumentCategoryInput = (id: number) => {
	if (!documentInputOpen) {
		documentInputOpen = true;

		renamingDocumentCategoryId = id;

		// CSS :nth-child(1) selector stops targetting the first document when this input is added
		// so enforce these rules via JS
		if (sidebarDocumentList.children.length > 0) {
			(<HTMLElement>sidebarDocumentList.children[0]).style.marginTop = `.5rem`;
		}

		// Create the elements
		let containerElement: HTMLElement = document.createElement(`div`);
		containerElement.setAttribute(`class`, `sidebar-document-input`)
		containerElement.setAttribute(`id`, `rename-document-category`);

		let textElement: HTMLElement = document.createElement(`p`);
		textElement.innerText = language.getString(`rename-document-category`);
		containerElement.appendChild(textElement);

		let inputElement: HTMLInputElement = document.createElement(`input`);
		inputElement.setAttribute(`id`, `rename-document-category-input`);
		inputElement.value = data.getDocumentCategoryTitle(id);
		containerElement.appendChild(inputElement);

		let buttonElement: HTMLElement = document.createElement(`button`);
		buttonElement.innerHTML = `<i class="bi bi-check2"></i>`;
		containerElement.appendChild(buttonElement);


		buttonElement.onclick = () => applyRenameDocumentCategoryInput();
		document.body.addEventListener(`keypress`, keyboardEventDuringRenameCategoryInput);

		sidebarDocumentList.insertBefore(containerElement, sidebarDocumentList.children[0]);

		addDocumentBtn.style.transform = `rotate(45deg)`;

		sidebarDocumentList.scrollTop = 0;

		setTimeout(() => {
			containerElement.style.height = `4rem`
			inputElement.focus();
		}, 1);
	} else {
		removeInput();
	}
}
export const applyRenameDocumentCategoryInput = () => {
	let input: HTMLInputElement = <HTMLInputElement>document.getElementById(`rename-document-category-input`);

	if (input.value !== ``) {
		if (data.setDocumentCategoryTitle(renamingDocumentCategoryId, input.value) !== false) {
			sidebar.updateCategoryTitleInList(
				renamingDocumentCategoryId,
				input.value
			);
		}
	}

	removeInput();
}

export const removeInput = () => {
	documentInputOpen = false;

	let containerElement: HTMLElement = document.querySelector(`#add-document, #rename-document, #add-document-category, #rename-document-category`);
	containerElement.style.height = `0`;

	addDocumentBtn.style.transform = `rotate(0deg)`;

	document.body.removeEventListener(`keypress`, keyboardEventDuringAddInput);
	document.body.removeEventListener(`keypress`, keyboardEventDuringRenameInput);

	setTimeout(() => {
		sidebarDocumentList.removeChild(containerElement);

		(<HTMLElement>sidebarDocumentList.children[0]).style.marginTop = ``;
	}, 200);
}

const keyboardEventDuringAddInput = (event: KeyboardEvent) => {
	if (event.key === `Enter`) {
		applyAddDocumentInput();
	}
}
const keyboardEventDuringRenameInput = (event: KeyboardEvent) => {
	if (event.key === `Enter`) {
		applyRenameDocumentInput();
	}
}
const keyboardEventDuringAddCategoryInput = (event: KeyboardEvent) => {
	if (event.key === `Enter`) {
		applyAddDocumentCategoryInput();
	}
}
const keyboardEventDuringRenameCategoryInput = (event: KeyboardEvent) => {
	if (event.key === `Enter`) {
		applyRenameDocumentCategoryInput();
	}
}

addDocumentBtn.onclick = () => {
	showAddDocumentInput();
}
addDocumentCategoryBtn.onclick = () => {
	showAddDocumentCategoryInput();
}