/*
=====================================
  © Lekvado Media, 2019-2021
  Licensed under the GPLv3 license.
=====================================
*/

import '../../styles/sidebar.css';
import './resizability';
import './input';
import * as formatting from './formatting'
import * as utils from '../../core/utils';
import * as language from '../../core/language';
import { search } from './search';
import * as data from '../../core/data';
import type { ServiceSearchResults, ServiceListResult } from '../../schemas';

let articleList: HTMLDivElement = <HTMLDivElement>document.getElementById(`article-list`);
let searchInput: HTMLInputElement = <HTMLInputElement>document.getElementById(`search-input`);
let searchResults: HTMLDivElement = <HTMLDivElement>document.getElementById(`search-results`);
let searchResultCount: HTMLSpanElement = document.getElementById(`search-result-count`);
let searchTitleList: HTMLDivElement = <HTMLDivElement>document.getElementById(`search-title-list`);
let searchContentList: HTMLDivElement = <HTMLDivElement>document.getElementById(`search-content-list`);

export const updateSidebar = () => {
	if (searchInput.value === ``) {
		searchResults.style.display = `none`;
		articleList.style.display = `block`;
		articleList.innerHTML = ``;

		let serviceList: ServiceListResult[] = data.getArticleList();
		formatting.formatServiceList(serviceList);

	} else {
		let results: ServiceSearchResults = search(data.getData(), searchInput.value);

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
		articleList.style.display = `none`;
	}
}
searchInput.placeholder = language.getString(`search`);
searchInput.oninput = () => updateSidebar();
updateSidebar();

export const appendArticleToList = (service: ServiceListResult) => {
	articleList.appendChild(formatting.formatServiceListItem({
		id: service.id,
		title: service.title,
		contentPreview: service.contentPreview
	}));
}
export const updateContentInList = (id: number, newContent: string) => {
	let element: HTMLElement = document.getElementById(`sidebar-article-btn-${id}`).getElementsByTagName(`p`)[0];

	if (newContent != ``) {
		element.innerHTML = utils.createContentPreviewString(newContent);
		element.style.opacity = ``;
	} else {
		element.innerHTML = language.getString(`empty-document`);
		element.style.opacity = `0.5`;
	}
}
export const updateTitleInList = (id: number, newTitle: string) => {
	let element: HTMLElement = document.getElementById(`sidebar-article-btn-${id}`).getElementsByTagName(`b`)[0];

	if (newTitle != ``) {
		element.innerHTML = utils.createContentPreviewString(newTitle);
		element.style.opacity = ``;
	} else {
		element.innerHTML = language.getString(`empty-document`);
		element.style.opacity = `0.5`;
	}
}
export const removeArticleInList = (id: number) => {
	let element: HTMLElement = document.getElementById(`sidebar-article-btn-${id}`);

	element.style.height = `0`;

	setTimeout(() => {
		element.parentElement.removeChild(element);
	}, 200);
}