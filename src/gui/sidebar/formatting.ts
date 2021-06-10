/*
=====================================
  © Lekvado Media, 2019-2021
  Licensed under the GPLv3 license.
=====================================
*/

import * as data from '../../core/data';
import * as language from '../../core/language';
import * as tabs from '../tabs/main';
import { ServiceListResult, ServiceSearchResult } from '../../schemas';

let articleList: HTMLDivElement = <HTMLDivElement>document.getElementById(`article-list`);

export const formatServiceList = (serviceList: ServiceListResult[]) => {
	for (let i: number = 0; i < serviceList.length; i++) {
		articleList.appendChild(formatServiceListItem(serviceList[i]));
	}
}
export const formatServiceListItem = (service: ServiceListResult) => {
	let buttonElement: HTMLButtonElement = document.createElement(`button`);
	buttonElement.setAttribute(`id`, `sidebar-article-btn-${service.id}`);
	buttonElement.setAttribute(`class`, `sidebar-article`);

	let titleElement: HTMLElement = document.createElement(`b`);
	titleElement.innerHTML = service.title;
	
	let contentElement: HTMLElement = document.createElement(`p`);
	contentElement.innerHTML = service.contentPreview;

	buttonElement.appendChild(titleElement);
	buttonElement.appendChild(contentElement);

	buttonElement.onclick = () => tabs.addTab(data.getArticle(service.id));

	return buttonElement;
}
export const formatSearchResults = (element: HTMLElement, searchResults: ServiceSearchResult[]) => {
	let lastArticleID: number = -1;
	let timesLastArticleHasAppeared: number = 0;
	for (let i: number = 0; i < searchResults.length; i++) {
		if (lastArticleID !== searchResults[i].id) {

			// Add the "n other results in this article" text
			if (timesLastArticleHasAppeared === 1) {
				let textElement: HTMLElement = document.createElement(`p`);
				textElement.innerText = language.getString(`search-overflow-singular`, timesLastArticleHasAppeared.toString());
				element.appendChild(textElement);
			} else if (timesLastArticleHasAppeared > 1) {
				let textElement: HTMLElement = document.createElement(`p`);
				textElement.innerText = language.getString(`search-overflow-plural`, timesLastArticleHasAppeared.toString());
				element.appendChild(textElement);
			}

			// Create the element
			let buttonElement: HTMLButtonElement = document.createElement(`button`);
			buttonElement.setAttribute(`id`, `sidebar-article-btn-${searchResults[i].id}`);
			buttonElement.setAttribute(`class`, `sidebar-article`);

			let titleElement: HTMLElement = document.createElement(`b`);
			titleElement.innerHTML = searchResults[i].title;
			
			let contentElement: HTMLElement = document.createElement(`p`);
			contentElement.innerHTML = `...${searchResults[i].contentPreview}...`;

			buttonElement.appendChild(titleElement);
			buttonElement.appendChild(contentElement);

			buttonElement.onclick = () => tabs.addTab(data.getArticle(searchResults[i].id));

			element.appendChild(buttonElement);

			timesLastArticleHasAppeared = 0;
		} else {
			timesLastArticleHasAppeared++;
		}
		lastArticleID = searchResults[i].id;
	}
	
	// Add the "n other results in this article" text
	if (timesLastArticleHasAppeared === 1) {
		let textElement: HTMLElement = document.createElement(`p`);
		textElement.innerText = language.getString(`search-overflow-singular`, timesLastArticleHasAppeared.toString());
		element.appendChild(textElement);
	} else if (timesLastArticleHasAppeared > 1) {
		let textElement: HTMLElement = document.createElement(`p`);
		textElement.innerText = language.getString(`search-overflow-plural`, timesLastArticleHasAppeared.toString());
		element.appendChild(textElement);
	}
}