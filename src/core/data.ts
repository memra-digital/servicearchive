/*
=====================================
  © Memra Digital, 2019-2022
  Licensed under the GPLv3 license.
=====================================
*/

import { ipcRenderer } from 'electron';
import type { DocumentCategory, DocumentMetadata, DocumentCategoryListItem, DocumentListItem } from '../schemas';

let data: DocumentCategory[] = ipcRenderer.sendSync(`get-data`);

export const save = () => {
	// Don't save the data if the data is just an error message to avoid corrupting data
	if ((<any>data).error !== undefined) {
		return;
	}

	ipcRenderer.sendSync(`set-data`, data);
}

export const documentCategoryExists = (title: string) => {
	let result: boolean = false;

	for (let i = 0; i < data.length; i++) {
		if (data[i].title == title) {
			result = true;
		}
	}

	return result;
}
export const documentExists = (title: string) => {
	let result: boolean = false;

	for (let i = 0; i < data.length; i++) {
		for (let o = 0; o < data[i].content.length; o++) {
			if (data[i].content[o].title == title) {
				result = true;
			}
		}
	}

	return result;
}

export const getData = () => {
	return data;
}
export const setData = (input: any) => {
	data = input;

	save();
}

export const addDocumentCategory = (title: string) => {
	if (documentCategoryExists(title)) {
		return false;
	}

	let newId: number = parseInt(`0${Date.now()}`);

	let documentCategory: DocumentCategory = {
		id: newId,
		title,
		color: `red`,
		content: []
	};

	data.push(documentCategory);
	
	return documentCategory;
}
export const removeDocumentCategory = (id: number) => {
	for (let i = 0; i < data.length; i++) {
		if (data[i].id == id) {
			data.splice(i, 1);
			return true;
		}
	}

	return false;
}

export const getDocumentCategory = (id: number) => {
	for (let i = 0; i < data.length; i++) {
		if (data[i].id == id) {
			return data[i];
		}
	}

	return {
		id: 0,
		title: undefined,
		color: undefined,
		content: []
	};
}
export const getDocumentCategoryTitle = (id: number) => {
	for (let i = 0; i < data.length; i++) {
		if (data[i].id == id) {
			return data[i].title;
		}
	}

	return undefined;
}
export const getDocumentCategoryColor = (id: number) => {
	for (let i = 0; i < data.length; i++) {
		if (data[i].id == id) {
			return data[i].color;
		}
	}

	return undefined;
}
export const getDocumentCategoryContent = (id: number) => {
	for (let i = 0; i < data.length; i++) {
		if (data[i].id == id) {
			return data[i].content;
		}
	}

	return [];
}

export const moveDocument = (documentId: number, categoryId: number) => {
	let documentData: DocumentMetadata = null;

	for (let i = 0; i < data.length; i++) {
		for (let o = 0; o < data[i].content.length; o++) {
			if (data[i].content[o].id === documentId) {
				documentData = data[i].content[o];
				data[i].content.splice(o, 1);

				break;
			}
		}
	}

	if (documentData === null) {
		return false;
	}

	for (let i = 0; i < data.length; i++) {
		if (data[i].id === categoryId) {
			data[i].content.push(documentData);
		}
	}

	return true;
}

export const setDocumentCategoryTitle = (id: number, title: string) => {
	if (documentCategoryExists(title)) {
		return false;
	}

	for (let i = 0; i < data.length; i++) {
		if (data[i].id == id) {
			data[i].title = title;

			return true;
		}
	}
}

export const addDocument = (title: string, category: number = 0) => {
	if (documentExists(title)) {
		return false;
	}

	let doesCategoryExist: boolean = false;
	for (let i = 0; i < data.length; i++) {
		if (data[i].id === category) {
			doesCategoryExist = true;
			break;
		}
	}
	if (!doesCategoryExist) {
		return false;
	}

	let newId: number = Date.now();

	let document: DocumentMetadata = {
		id: newId,
		title,
		created: Date.now(),
		lastModified: Date.now(),
		metadata: {
			pastor: ``,
			date: 0,
			location: ``,
			extra: ``
		}
	};

	for (let i = 0; i < data.length; i++) {
		if (data[i].id === category) {
			data[i].content.push(document);
			
			return document;
		}
	}

	return false;
}
export const removeDocument = (id: number) => {
	for (let i = 0; i < data.length; i++) {
		for (let o = 0; o < data[i].content.length; o++) {
			if (data[i].content[o].id === id) {
				data[i].content.splice(o, 1);
				return true;
			}
		}
	}
	
	return false;
}

export const getDocument = (id: number) => {
	for (let i = 0; i < data.length; i++) {
		for (let o = 0; o < data[i].content.length; o++) {
			if (data[i].content[o].id === id) {
				return data[i].content[o];
			}
		}
	}

	return {
		id: 0,
		title: ``,
		created: 0,
		lastModified: 0,
		metadata: {
			pastor: ``,
			date: 0,
			location: ``,
			extra: ``
		}
	};
}
export const getDocumentTitle = (id: number) => {
	for (let i = 0; i < data.length; i++) {
		for (let o = 0; o < data[i].content.length; o++) {
			if (data[i].content[o].id === id) {
				return data[i].content[o].title;
			}
		}
	}

	return ``;
}
export const getDocumentContent = (id: number) => {
	let content: any = ipcRenderer.sendSync(`get-document`, id);

	return content;
}
export const getDocumentCreatedTime = (id: number) => {
	for (let i = 0; i < data.length; i++) {
		for (let o = 0; o < data[i].content.length; o++) {
			if (data[i].content[o].id === id) {
				return data[i].content[o].created;
			}
		}
	}

	return -1;
}
export const getDocumentModifiedTime = (id: number) => {
	for (let i = 0; i < data.length; i++) {
		for (let o = 0; o < data[i].content.length; o++) {
			if (data[i].content[o].id === id) {
				return data[i].content[o].lastModified;
			}
		}
	}

	return -1;
}

export const setDocumentTitle = (id: number, title: string) => {
	if (documentExists(title)) {
		return false;
	}

	for (let i = 0; i < data.length; i++) {
		for (let o = 0; o < data[i].content.length; o++) {
			if (data[i].content[o].id === id) {
				data[i].content[o].title = title;
				data[i].content[o].lastModified = Date.now();

				return true;
			}
		}
	}
}
export const setDocumentContent = (id: number, content: any) => {
	console.trace(`Data set`);

	ipcRenderer.sendSync(`set-document`, { id, data: content });
}

const autosave = () => {
	save();
	setTimeout(() => autosave(), 1000);
}
setTimeout(() => autosave(), 1000);

window.onbeforeunload = () => {
	save();
}