/*
=====================================
  © Lekvado Media, 2019-2021
  Licensed under the GPLv3 license.
=====================================
*/

import * as utils from '../../core/utils';
import type { Document, DocumentSearchResults } from '../../schemas';

export const contentPreviewPadding: number = 10;

export const search = (data: Document[], phrase: string) => {
	let results: DocumentSearchResults = {
		title: [],
		content: []
	};

	for (let i: number = 0; i < data.length; i++) {
		// Find in title
		let start: number = data[i].title.indexOf(phrase);
		let end: number = data[i].title.indexOf(phrase) + phrase.length;
	
		let title: string = data[i].title;
		let highlightedTitle: string = title.slice(0, start);
		highlightedTitle += `<span class="sidebar-document-highlight">`;
		highlightedTitle += title.slice(start, end);
		highlightedTitle += `</span>`;
		highlightedTitle += title.slice(end, title.length);

		let contentPreview: string = utils.removeHTMLTags(data[i].content).substr(0, 50);
		if (data[i].content.length > 50) contentPreview += `...`;
		if (data[i].content == ``) contentPreview = ``;

		if (data[i].title.toLowerCase().includes(phrase.toLowerCase())) {
			results.title.push({
				id: data[i].id,
				title: highlightedTitle,
				contentPreview,
				highlightStart: start,
				highlightEnd: end
			});
		}

		// Find in contents
		utils.indexOfAll(utils.removeHTMLTags(data[i].content), phrase).forEach((index: number) => {
			let start: number = Math.max(index, 0);
			let end: number = Math.min(index + phrase.length, data[i].content.length);
			
			let content: string = utils.removeHTMLTags(data[i].content);
			let contentPreview: string = (start - contentPreviewPadding <= 0) ? `` : `...`;
			contentPreview += content.slice(Math.max(start - contentPreviewPadding, 0), start);
			contentPreview += `<span class="sidebar-document-highlight">`;
			contentPreview += content.slice(start, end);
			contentPreview += `</span>`;
			contentPreview += content.slice(end, Math.min(end + contentPreviewPadding, data[i].content.length));
			contentPreview += (end + contentPreviewPadding >= data[i].content.length - 1) ? `` : `...`;

			results.content.push({
				id: data[i].id,
				title: data[i].title,
				contentPreview,
				highlightStart: start,
				highlightEnd: end
			});
		});
	}

	return results;
}