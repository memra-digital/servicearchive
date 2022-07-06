/*
=====================================
  © Memra Digital, 2019-2022
  Licensed under the GPLv3 license.
=====================================
*/

import '../../styles/sidebar.css';
import './resizability';
import './popup';
import * as language from '../../core/language';
import * as data from '../../core/data';
import * as tabs from '../tabs/main';
import { DocumentCategory, DocumentCategoryListItem, DocumentListItem } from '../../schemas';

let documentListElement: HTMLDivElement = <HTMLDivElement>document.getElementById(`sidebar-document-list`);
let searchInput: HTMLInputElement = <HTMLInputElement>document.getElementById(`search-input`);


let documentListData: any = [];


/*
	A recursive function that puts all of the documents & categories into the sidebar
*/
const loadDocuments = (parentElement: HTMLElement, documents: any[]) => {
	for (let i: number = 0; i < documents.length; i++) {
		if (documents[i].isDocument) {
			/*
				Create the document element
			*/
			let sidebarDocumentElement: HTMLElement = document.createElement(`div`);
			sidebarDocumentElement.className = `sidebar-document`;
			sidebarDocumentElement.setAttribute(`data-id`, documents[i].id);
			sidebarDocumentElement.innerHTML = `
				<b>${documents[i].title}</b>
				<p>${documents[i].contentPreview}</p>
			`;

			parentElement.appendChild(sidebarDocumentElement);

 			sidebarDocumentElement.onclick = (event: MouseEvent) => {
				tabs.addTab(data.getDocument(parseInt(sidebarDocumentElement.getAttribute(`data-id`))));
			}
		} else {
			/*
				Create the document category
			*/
			let sidebarCategoryElement: HTMLElement = document.createElement(`div`);
			sidebarCategoryElement.className = `sidebar-category`;

			let sidebarCategoryHeaderElement: HTMLElement = document.createElement(`div`);
			sidebarCategoryHeaderElement.className = `sidebar-category-header`;
			sidebarCategoryHeaderElement.setAttribute(`data-id`, documents[i].id);
			sidebarCategoryHeaderElement.innerHTML = `
				<i class="bi bi-chevron-right sidebar-category-header"></i>
				<b>${documents[i].title}</b>
				<div class="category-color ${documents[i].color}"></div>
			`;
			sidebarCategoryElement.appendChild(sidebarCategoryHeaderElement);

			let sidebarCategoryContentElement: HTMLElement = document.createElement(`div`);
			sidebarCategoryContentElement.className = `sidebar-category-content`;
			sidebarCategoryContentElement.innerHTML = `
				<div class="sidebar-category-line ${documents[i].color}"></div>
			`;
			sidebarCategoryElement.appendChild(sidebarCategoryContentElement);
			loadDocuments(sidebarCategoryContentElement, documents[i].content);

			parentElement.appendChild(sidebarCategoryElement);

			sidebarCategoryHeaderElement.onclick = () => {
				if (sidebarCategoryElement.classList.contains(`active`)) {
					sidebarCategoryElement.classList.remove(`active`);
					sidebarCategoryElement.style.height = `20px`;
				} else {
					sidebarCategoryElement.classList.add(`active`);
					sidebarCategoryElement.style.height = `${sidebarCategoryContentElement.clientHeight + 28}px`;
				}
			}
		}
	}
}


/*
	Loading all of the data
*/
const loadData = () => {
	documentListData = [];

	let rawData: DocumentCategory[] = data.getData();

	for (let i: number = 0; i < rawData.length; i++) {
		let categoryDocumentList: any[] = [];

		for (let o: number = 0; o < rawData[i].content.length; o++) {

			let documentData: DocumentListItem = {
				id: rawData[i].content[o].id,
				isDocument: true,
				title: rawData[i].content[o].title,
				contentPreview: `benžāns ir saujā`
			}

			if (rawData[i].title === undefined) {
				documentListData.push(documentData);
			} else {
				categoryDocumentList.push(documentData);
			}
		}

		if (rawData[i].title !== undefined) {
			documentListData.push({
				id: rawData[i].id,
				isDocument: false,
				title: rawData[i].title,
				color: rawData[i].color,
				content: categoryDocumentList
			});
		}
	}
}


/*
	Updating the sidebar
*/
export const updateSidebar = () => {
	documentListElement.innerHTML = ``;

	loadData();

	if (searchInput.value === ``) {
		// Display the regular document list
		loadDocuments(documentListElement, documentListData);
	} else {
		// Find the search results and display them
	}
}
const initializeSidebar = () => {	
	searchInput.placeholder = language.getString(`search`);
	searchInput.oninput = () => updateSidebar();
	updateSidebar();
}
initializeSidebar();


/* export const appendDocumentToList = (inputDocument: DocumentListItem) => {
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
} */