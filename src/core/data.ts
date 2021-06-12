/*
=====================================
  © Lekvado Media, 2019-2021
  Licensed under the GPLv3 license.
=====================================
*/

import { ipcRenderer } from 'electron';
import * as utils from './utils';
import type { Document, DocumentListItem } from '../schemas';

let data: Document[] = [];

export let documentExists = (title: string) => {
	let result: boolean = false;

	for (let i = 0; i < data.length; i++) {
		if (data[i].title == title) {
			result = true;
		}
	}

	return result;
}

export let getDocumentList = () => {
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
export let getDocument = (id: number) => {
	for (let i = 0; i < data.length; i++) {
		if (data[i].id == id) {
			return data[i];
		}
	}
}
export let getDocumentTitle = (id: number) => {
	for (let i = 0; i < data.length; i++) {
		if (data[i].id == id) {
			return data[i].title;
		}
	}
}
export let getDocumentContent = (id: number) => {
	for (let i = 0; i < data.length; i++) {
		if (data[i].id == id) {
			return data[i].content;
		}
	}
}
export let setDocumentContent = (id: number, content: string) => {
	for (let i = 0; i < data.length; i++) {
		if (data[i].id == id) {
			data[i].content = content;
		}
	}
	save();
}
export let setDocumentTitle = (id: number, title: string) => {
	if (documentExists(title)) {
		return false;
	}

	for (let i = 0; i < data.length; i++) {
		if (data[i].id == id) {
			data[i].title = title;
		}
	}
	save();

	return true;
}

export let addDocument = (title: string) => {
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
		created: 0,
		modified: 0
	};

	data.push(document);

	return document;
}
export let removeDocument = (id: number) => {
	for (let i = 0; i < data.length; i++) {
		if (data[i].id == id) {
			data.splice(i, 1);
		}
	}
}
export let getData = () => {
	return data;
}
export let setData = (input: any) => {
	data = input;

	save();
}
export let save = () => {
	ipcRenderer.sendSync(`set-data`, data);
}

data = ipcRenderer.sendSync(`get-data`);