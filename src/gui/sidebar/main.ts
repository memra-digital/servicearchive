/*
=====================================
  © Memra Digital, 2019-2022
  Licensed under the GPLv3 license.
=====================================
*/

import '../../styles/sidebar.css';
import './resizability';
import './input';
import Sortable from 'sortablejs';
import * as formatting from './formatting'
import * as utils from '../../core/utils';
import * as language from '../../core/language';
import { search } from './search';
import * as data from '../../core/data';
import type { DocumentCategoryListItem, DocumentSearchResults, DocumentListItem } from '../../schemas';

let documentListElement: HTMLDivElement = <HTMLDivElement>document.getElementById(`document-list`);
let searchInput: HTMLInputElement = <HTMLInputElement>document.getElementById(`search-input`);
let searchResults: HTMLDivElement = <HTMLDivElement>document.getElementById(`search-results`);
let searchResultCount: HTMLSpanElement = document.getElementById(`search-result-count`);
let searchTitleList: HTMLDivElement = <HTMLDivElement>document.getElementById(`search-title-list`);
let searchContentList: HTMLDivElement = <HTMLDivElement>document.getElementById(`search-content-list`);

/*
	Updates the entire sidebar
	This gets called upon start, when the search bar value is changed, etc.
*/
export const updateSidebar = () => {
	if (searchInput.value === ``) {
		// Display the regular document list
		
		searchResults.style.display = `none`;
		documentListElement.style.display = `block`;
		documentListElement.innerHTML = ``;

		let documentCategoryList: DocumentCategoryListItem[] = data.getDocumentCategoryList();
		formatting.formatDocumentCategoryList(documentCategoryList);
	} else {
		// Find the search results and display them

		let results: DocumentSearchResults = search(data.getData(), searchInput.value);

		let resultCount: number = results.title.length + results.content.length;
		searchResultCount.innerHTML = language.getString(`search-results`, resultCount.toString());

		searchTitleList.innerHTML = ``;
		searchContentList.innerHTML = ``;

		if (results.title.length !== 0) {
			let titleElement: HTMLElement = document.createElement(`b`);
			titleElement.innerText = language.getString(`search-titles-section`);
			searchTitleList.appendChild(titleElement);

			formatting.formatSearchResults(searchTitleList, results.title);
		}

		if (results.content.length !== 0) {
			let titleElement: HTMLElement = document.createElement(`b`);
			titleElement.innerText = language.getString(`search-content-section`);
			searchContentList.appendChild(titleElement);

			formatting.formatSearchResults(searchContentList, results.content);
		}

		searchResults.style.display = `block`;
		documentListElement.style.display = `none`;
	}
}
searchInput.placeholder = language.getString(`search`);
searchInput.oninput = () => updateSidebar();
updateSidebar();

export const appendDocumentToList = (inputDocument: DocumentListItem) => {
	let firstSidebarCategoryElement: HTMLElement;
	for (let element of document.querySelectorAll(`div.sidebar-category`)) {
		firstSidebarCategoryElement = <HTMLElement>element;
		break;
	}

	documentListElement.insertBefore(formatting.formatDocumentListItem({
		id: inputDocument.id,
		title: inputDocument.title,
		contentPreview: inputDocument.contentPreview
	}), firstSidebarCategoryElement);
}
export const updateContentInList = (id: number, newContent: string) => {
	let element: HTMLElement = document.getElementById(`sidebar-document-btn-${id}`).getElementsByTagName(`p`)[0];

	if (newContent != ``) {
		element.innerHTML = utils.createContentPreviewString(newContent);
		element.style.opacity = ``;
	} else {
		element.innerHTML = language.getString(`empty-document`);
		element.style.opacity = `0.5`;
	}
}
export const updateTitleInList = (id: number, newTitle: string) => {
	let element: HTMLElement = document.getElementById(`sidebar-document-btn-${id}`).getElementsByTagName(`b`)[0];

	if (newTitle != ``) {
		element.innerHTML = utils.createContentPreviewString(newTitle);
		element.style.opacity = ``;
	} else {
		element.innerHTML = language.getString(`empty-document`);
		element.style.opacity = `0.5`;
	}
}
export const removeDocumentFromList = (id: number) => {
	let element: HTMLElement = document.getElementById(`sidebar-document-btn-${id}`);

	element.style.height = `0`;

	setTimeout(() => {
		element.parentElement.removeChild(element);
	}, 200);
}

export const appendDocumentCategoryToList = (inputDocumentCategory: DocumentCategoryListItem) => {
	formatting.formatDocumentCategoryListItem({
		id: inputDocumentCategory.id,
		title: inputDocumentCategory.title,
		color: inputDocumentCategory.color,
		content: inputDocumentCategory.content
	});
}
export const updateCategoryTitleInList = (id: number, newTitle: string) => {
	let element: HTMLElement = document.getElementById(`sidebar-document-category-${id}`).querySelector(`p`);
	element.innerText = newTitle;
}
export const removeDocumentCategoryFromList = (id: number) => {
	let element: HTMLElement = document.getElementById(`sidebar-document-category-${id}`);

	element.style.height = `0`;

	setTimeout(() => {
		element.parentElement.removeChild(element);
	}, 200);
}