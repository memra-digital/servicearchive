/*
=====================================
  © Lekvado Media, 2019-2021
  Licensed under the GPLv3 license.
=====================================
*/

import { ipcRenderer } from 'electron';
import * as utils from './utils';
import type { Document, DocumentListItem } from '../schemas';

let data: Document[] = ipcRenderer.sendSync(`get-data`);

export const save = () => {
	ipcRenderer.sendSync(`set-data`, data);
}

export const documentExists = (title: string) => {
	let result: boolean = false;

	for (let i = 0; i < data.length; i++) {
		if (data[i].title == title) {
			result = true;
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

export const addDocument = (title: string) => {
	if (documentExists(title)) {
		return false;
	}

	let newId: number;
	if (data.length == 0) {
		newId = 0;
	} else {
		newId = data[data.length - 1].id + 1
	}

	let document: Document = {
		id: newId,
		title,
		content: ``,
		created: Date.now(),
		modified: Date.now()
	};

	data.push(document);

	return document;
}
export const removeDocument = (id: number) => {
	for (let i = 0; i < data.length; i++) {
		if (data[i].id == id) {
			data.splice(i, 1);
			return true;
		}
	}
	
	return false;
}

export const getDocumentList = () => {
	let results: DocumentListItem[] = [];

	for (let i = 0; i < data.length; i++) {
		results.push({
			id: data[i].id,
			title: data[i].title,
			contentPreview: utils.createContentPreviewString(data[i].content)
		});
	}

	return results;
}
export const getDocument = (id: number) => {
	for (let i = 0; i < data.length; i++) {
		if (data[i].id == id) {
			return data[i];
		}
	}

	return {
		id: 0,
		title: ``,
		content: ``,
		created: 0,
		modified: 0
	};
}
export const getDocumentTitle = (id: number) => {
	for (let i = 0; i < data.length; i++) {
		if (data[i].id == id) {
			return data[i].title;
		}
	}

	return ``;
}
export const getDocumentContent = (id: number) => {
	for (let i = 0; i < data.length; i++) {
		if (data[i].id == id) {
			return data[i].content;
		}
	}

	return ``;
}
export const getDocumentCreatedTime = (id: number) => {
	for (let i = 0; i < data.length; i++) {
		if (data[i].id == id) {
			return data[i].created;
		}
	}

	return -1;
}
export const getDocumentModifiedTime = (id: number) => {
	for (let i = 0; i < data.length; i++) {
		if (data[i].id == id) {
			return data[i].modified;
		}
	}

	return -1;
}

export const setDocumentTitle = (id: number, title: string) => {
	if (documentExists(title)) {
		return false;
	}

	for (let i = 0; i < data.length; i++) {
		if (data[i].id == id) {
			data[i].title = title;
			data[i].modified = Date.now();

			return true;
		}
	}
}
export const setDocumentContent = (id: number, content: string) => {
	for (let i = 0; i < data.length; i++) {
		if (data[i].id == id) {
			data[i].content = content;
			data[i].modified = Date.now();

			return true;
		}
	}
}

const autosave = () => {
	save();
	setTimeout(() => autosave(), 60000);
}
setTimeout(() => autosave(), 60000);

window.onbeforeunload = () => {
	save();
}