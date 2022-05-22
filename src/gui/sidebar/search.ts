/*
=====================================
  © Memra Digital, 2019-2022
  Licensed under the GPLv3 license.
=====================================
*/

import * as utils from '../../core/utils';
import type { DocumentMetadata, DocumentCategory, DocumentSearchResults } from '../../schemas';

export const contentPreviewPadding: number = 10;

export const search = (data: DocumentCategory[], phrase: string) => {
	let results: DocumentSearchResults = {
		title: [],
		content: []
	};

	for (let i: number = 0; i < data.length; i++) {
		for (let o: number = 0; o < data[i].content.length; o++) {
			// Find in title
			/* let start: number = data[i].content[o].title.indexOf(phrase);
			let end: number = data[i].content[o].title.indexOf(phrase) + phrase.length;
		
			let title: string = data[i].content[o].title;
			let highlightedTitle: string = title.slice(0, start);
			highlightedTitle += `<span class="sidebar-document-highlight">`;
			highlightedTitle += title.slice(start, end);
			highlightedTitle += `</span>`;
			highlightedTitle += title.slice(end, title.length);

			let contentPreview: string = utils.removeHTMLTags(data[i].content[o].content).substr(0, 50);
			if (data[i].content[o].content.length > 50) contentPreview += `...`;
			if (data[i].content[o].content == ``) contentPreview = ``;

			if (data[i].content[o].title.toLowerCase().includes(phrase.toLowerCase())) {
				results.title.push({
					id: data[i].content[o].id,
					title: highlightedTitle,
					contentPreview,
					highlightStart: start,
					highlightEnd: end
				});
			} */

			// Find in contents
			/* utils.indexOfAll(utils.removeHTMLTags(data[i].content[o].content), phrase).forEach((index: number) => {
				let start: number = Math.max(index, 0);
				let end: number = Math.min(index + phrase.length, data[i].content[o].content.length);
				
				let content: string = utils.removeHTMLTags(data[i].content[o].content);
				let contentPreview: string = (start - contentPreviewPadding <= 0) ? `` : `...`;
				contentPreview += content.slice(Math.max(start - contentPreviewPadding, 0), start);
				contentPreview += `<span class="sidebar-document-highlight">`;
				contentPreview += content.slice(start, end);
				contentPreview += `</span>`;
				contentPreview += content.slice(end, Math.min(end + contentPreviewPadding, data[i].content[o].content.length));
				contentPreview += (end + contentPreviewPadding >= data[i].content[o].content.length - 1) ? `` : `...`;

				results.content.push({
					id: data[i].content[o].id,
					title: data[i].content[o].title,
					contentPreview,
					highlightStart: start,
					highlightEnd: end
				});
			}); */
		}
	}

	return results;
}