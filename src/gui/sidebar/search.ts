/*
=====================================
  © Lekvado Media, 2019-2021
  Licensed under the GPLv3 license.
=====================================
*/

import type { Service, ServiceSearchResults } from '../../schemas';

const contentPreviewPadding: number = 5;

export const search = (data: Array<Service>, phrase: string) => {
	let results: ServiceSearchResults = {
		title: [],
		content: []
	};

	for (let i: number = 0; i < data.length; i++) {
		// Find in titles
		if (data[i].title.toLowerCase().includes(phrase.toLowerCase())) {
			results.title.push({
				id: data[i].id,
				title: data[i].title,
				content: `${data[i].content.substr(0, 20)}`,
				highlightStart: data[i].title.indexOf(phrase),
				highlightEnd: data[i].title.indexOf(phrase) + phrase.length 
			});
		}

		// Find in contents
		indexOfAll(removeHTMLTags(data[i].content), phrase).forEach((index: number) => {
			results.content.push({
				id: data[i].id,
				title: data[i].title,
				content: removeHTMLTags(data[i].content).substr(index - contentPreviewPadding, phrase.length + contentPreviewPadding * 2),
				highlightStart: contentPreviewPadding,
				highlightEnd: contentPreviewPadding + phrase.length
			});
		});
	}

	return results;
}
const indexOfAll = (str: string, searchStr: string) => { // Function taken from https://stackoverflow.com/questions/3410464/how-to-find-indices-of-all-occurrences-of-one-string-in-another-in-javascript
	var searchStrLen = searchStr.length;
    if (searchStrLen == 0) {
        return [];
    }
    var startIndex = 0, index, indices = [];

	str = str.toLowerCase();
	searchStr = searchStr.toLowerCase();

    while ((index = str.indexOf(searchStr, startIndex)) > -1) {
        indices.push(index);
        startIndex = index + searchStrLen;
    }
    return indices;
}
const removeHTMLTags = (input: string) => { // Function taken from https://www.tutorialspoint.com/how-to-remove-html-tags-from-a-string-in-javascript
	return input.replace( /(<([^>]+)>)/ig, '');
}