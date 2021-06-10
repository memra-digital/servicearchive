/*
=====================================
  © Lekvado Media, 2019-2021
  Licensed under the GPLv3 license.
=====================================
*/

import { ipcRenderer } from 'electron';
import * as utils from './utils';
import type { Service, ServiceListResult } from '../schemas';

let data: Array<Service> = [];

export let getArticleList = () => {
	let results: Array<ServiceListResult> = [];

	for (let i = 0; i < data.length; i++) {
		console.log(data[i]);
		results.push({
			id: data[i].id,
			title: data[i].title,
			contentPreview: utils.createContentPreviewString(data[i].content)
		});
	}

	return results;
}
export let getArticle = (id: number) => {
	for (let i = 0; i < data.length; i++) {
		if (data[i].id == id) {
			return data[i];
		}
	}
}
export let getArticleContent = (id: number) => {
	for (let i = 0; i < data.length; i++) {
		if (data[i].id == id) {
			return data[i].content;
		}
	}
}
export let setArticleContent = (id: number, content: string) => {
	for (let i = 0; i < data.length; i++) {
		if (data[i].id == id) {
			data[i].content = content;
		}
	}
	save();
}
export let setArticleName = (id: number, title: string) => {
	save();
}
export let addArticle = (title: string) => {
	let newId: number;
	if (data.length == 0) {
		newId = 0;
	} else {
		newId = data[data.length - 1].id + 1
	}

	let article: Service = {
		id: newId,
		title,
		content: ``,
		created: 0,
		modified: 0
	};

	data.push(article);

	return article;
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