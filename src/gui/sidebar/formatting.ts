/*
=====================================
  © Lekvado Media, 2019-2021
  Licensed under the GPLv3 license.
=====================================
*/

import * as data from '../../core/data';
import * as utils from '../../core/utils';
import * as language from '../../core/language';
import * as input from './input';
import * as search from './search';
import * as tabs from '../tabs/main';
import * as popup from './popup';
import { DocumentListItem, DocumentSearchResult } from '../../schemas';

let documentListElement: HTMLDivElement = <HTMLDivElement>document.getElementById(`document-list`);

export const formatDocumentList = (documentList: DocumentListItem[]) => {
	for (let i: number = 0; i < documentList.length; i++) {
		documentListElement.appendChild(formatDocumentListItem(documentList[i]));
	}
}

export const formatDocumentListItem = (inputDocument: DocumentListItem) => {
	let buttonElement: HTMLButtonElement = document.createElement(`button`);
	buttonElement.setAttribute(`id`, `sidebar-document-btn-${inputDocument.id}`);
	buttonElement.setAttribute(`class`, `sidebar-document`);

	let titleElement: HTMLElement = document.createElement(`b`);
	titleElement.innerHTML = inputDocument.title;
	
	let contentElement: HTMLElement = document.createElement(`p`);
	if (inputDocument.contentPreview != ``) {
		contentElement.innerText = inputDocument.contentPreview;
		contentElement.style.opacity = ``;
	} else {
		contentElement.innerText = language.getString(`empty-document`);
		contentElement.style.opacity = `0.5`;
	}

	let renameButtonElement: HTMLButtonElement = document.createElement(`button`);
	renameButtonElement.innerHTML = `<i class="bi bi-input-cursor-text"></i>`;

	let deleteButtonElement: HTMLButtonElement = document.createElement(`button`);
	deleteButtonElement.innerHTML = `<i class="bi bi-trash"></i>`;

	buttonElement.appendChild(titleElement);
	buttonElement.appendChild(contentElement);
	buttonElement.appendChild(renameButtonElement);
	buttonElement.appendChild(deleteButtonElement);

	buttonElement.onclick = (event: MouseEvent) => {
		if (event.target != renameButtonElement &&
			event.target != deleteButtonElement &&
			event.target != renameButtonElement.children[0] &&
			event.target != deleteButtonElement.children[0]) {

			tabs.addTab(data.getDocument(inputDocument.id));
		}
	}

	renameButtonElement.onclick = () => {
		input.showRenameDocumentInput(inputDocument.id);
	}
	deleteButtonElement.onclick = () => {
		popup.open(inputDocument.id);
	}

	return buttonElement;
}

export const formatSearchResults = (element: HTMLElement, searchResults: DocumentSearchResult[]) => {
	let lastDocumentID: number = -1;
	let timesLastDocumentHasAppeared: number = 0;
	for (let i: number = 0; i < searchResults.length; i++) {
		if (lastDocumentID !== searchResults[i].id) {

			// Add the "n other results in this document" text
			if (timesLastDocumentHasAppeared === 1) {
				let textElement: HTMLElement = document.createElement(`p`);
				textElement.innerText = language.getString(`search-overflow-singular`, timesLastDocumentHasAppeared.toString());
				element.appendChild(textElement);
			} else if (timesLastDocumentHasAppeared > 1) {
				let textElement: HTMLElement = document.createElement(`p`);
				textElement.innerText = language.getString(`search-overflow-plural`, timesLastDocumentHasAppeared.toString());
				element.appendChild(textElement);
			}

			// Create the element
			let buttonElement: HTMLButtonElement = document.createElement(`button`);
			buttonElement.setAttribute(`id`, `sidebar-document-btn-${searchResults[i].id}`);
			buttonElement.setAttribute(`class`, `sidebar-document`);

			let titleElement: HTMLElement = document.createElement(`b`);
			titleElement.innerHTML = searchResults[i].title;
			
			let contentElement: HTMLElement = document.createElement(`p`);
			contentElement.innerHTML = searchResults[i].contentPreview; 
			if (searchResults[i].contentPreview == ``) {
				contentElement.innerHTML = language.getString(`empty-document`);
				contentElement.style.opacity = `0.5`;
			}

			buttonElement.appendChild(titleElement);
			buttonElement.appendChild(contentElement);

			buttonElement.onclick = () => tabs.addTab(data.getDocument(searchResults[i].id));

			// Remove the margin from first search result
			if (i == 0) {
				buttonElement.style.marginTop = `.5rem`;
			}

			element.appendChild(buttonElement);

			timesLastDocumentHasAppeared = 0;
		} else {
			timesLastDocumentHasAppeared++;
		}
		lastDocumentID = searchResults[i].id;
	}
	
	// Add the "n other results in this document" text
	if (timesLastDocumentHasAppeared === 1) {
		let textElement: HTMLElement = document.createElement(`p`);
		textElement.innerText = language.getString(`search-overflow-singular`, timesLastDocumentHasAppeared.toString());
		element.appendChild(textElement);
	} else if (timesLastDocumentHasAppeared > 1) {
		let textElement: HTMLElement = document.createElement(`p`);
		textElement.innerText = language.getString(`search-overflow-plural`, timesLastDocumentHasAppeared.toString());
		element.appendChild(textElement);
	}
}