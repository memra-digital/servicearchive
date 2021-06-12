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
import { Document } from '../../schemas';

let sidebarDocumentList: HTMLElement = document.getElementById(`document-list`);
let addDocumentBtn: HTMLElement = document.getElementById(`add-btn`);
let documentInputOpen: boolean = false;
let renamingDocumentId: number = 0;

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
		containerElement.setAttribute(`id`, `new-document`);

		let textElement: HTMLElement = document.createElement(`p`);
		textElement.innerText = language.getString(`add-document`);
		containerElement.appendChild(textElement);

		let inputElement: HTMLElement = document.createElement(`input`);
		inputElement.setAttribute(`id`, `new-document-input`);
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
	let input: HTMLInputElement = <HTMLInputElement>document.getElementById(`new-document-input`);

	if (input.value != ``) {
		let newDocument: Document | boolean = data.addDocument(input.value);

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
		containerElement.setAttribute(`id`, `new-document`);

		let textElement: HTMLElement = document.createElement(`p`);
		textElement.innerText = language.getString(`rename-document`);
		containerElement.appendChild(textElement);

		let inputElement: HTMLInputElement = document.createElement(`input`);
		inputElement.setAttribute(`id`, `new-document-input`);
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
	let input: HTMLInputElement = <HTMLInputElement>document.getElementById(`new-document-input`);

	if (input.value != ``) {
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

export const removeInput = () => {
	documentInputOpen = false;

	let containerElement: HTMLElement = document.getElementById(`new-document`);
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
	if (event.key == `Enter`) {
		applyAddDocumentInput();
	}
}
const keyboardEventDuringRenameInput = (event: KeyboardEvent) => {
	if (event.key == `Enter`) {
		applyRenameDocumentInput();
	}
}

addDocumentBtn.onclick = () => {
	showAddDocumentInput();
}