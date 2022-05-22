/*
=====================================
  © Memra Digital, 2019-2022
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
import { DocumentCategoryListItem, DocumentListItem, DocumentSearchResult, DocumentCategory } from '../../schemas';

let documentListElement: HTMLDivElement = <HTMLDivElement>document.getElementById(`document-list`);

let isDraggingDocument: boolean = false;
let draggingDocumentId: number = 0;
let draggingStartX: number = null;
let draggingStartY: number = null;
let draggingStartXOnDocumentElement: number = null;
let draggingStartYOnDocumentElement: number = null;
let categoryToDragDocumentTo: string = ``;

export const formatDocumentCategoryList = (documentCategoryList: DocumentCategoryListItem[]) => {
	for (let i: number = 0; i < documentCategoryList.length; i++) {
		formatDocumentCategoryListItem(documentCategoryList[i]);
	}
}

export const formatDocumentCategoryListItem = (inputDocumentCategory: DocumentCategoryListItem) => {
	if (inputDocumentCategory.title === undefined) {
		for (let i: number = 0; i < inputDocumentCategory.content.length; i++) {
			documentListElement.appendChild(formatDocumentListItem(inputDocumentCategory.content[i]));
		}
	} else {
		let categoryElement: HTMLElement = document.createElement(`div`);
		categoryElement.className = `sidebar-category closed`;
		categoryElement.setAttribute(`id`, `sidebar-document-category-${inputDocumentCategory.id}`);

		let categoryHeaderElement: HTMLElement = document.createElement(`div`);
		categoryHeaderElement.className = `sidebar-category-header`;
		categoryHeaderElement.innerHTML =
			`<i class="bi bi-chevron-right"></i>
				<p>${inputDocumentCategory.title}</p>
				<span class="category-color category-color-${inputDocumentCategory.color}"></span>`;


		let categoryContentElement: HTMLElement = document.createElement(`div`);
		categoryContentElement.className = `sidebar-category-content`;

		for (let i: number = 0; i < inputDocumentCategory.content.length; i++) {
			categoryContentElement.appendChild(formatDocumentListItem(inputDocumentCategory.content[i]))
		}

		categoryElement.appendChild(categoryHeaderElement);
		categoryElement.appendChild(categoryContentElement);

		documentListElement.appendChild(categoryElement);

		categoryHeaderElement.onclick = (event: MouseEvent) => {
			if (categoryElement.classList.contains(`closed`)) {
				categoryElement.classList.remove(`closed`);
				categoryElement.classList.add(`open`);

				categoryElement.style.height = `${categoryContentElement.clientHeight + categoryHeaderElement.clientHeight + 15}px`;
			} else {
				categoryElement.classList.remove(`open`);
				categoryElement.classList.add(`closed`);

				categoryElement.style.height = `20px`;
			}
		}
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

	buttonElement.appendChild(titleElement);
	buttonElement.appendChild(contentElement);

	buttonElement.onclick = (event: MouseEvent) => {
		tabs.addTab(data.getDocument(inputDocument.id));
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