/*
=====================================
  © Memra Digital, 2019-2022
  Licensed under the GPLv3 license.
=====================================
*/

import * as language from './language';

export const version: string = `v2.0 (UNRELEASED)`;

export const removeHTMLTags = (input: string) => { // Function taken from https://www.tutorialspoint.com/how-to-remove-html-tags-from-a-string-in-javascript
	return input.replace( /(<([^>]+)>)/ig, '');
}

export const createContentPreviewString = (input: string) => {
	return `${removeHTMLTags(input.replace(`</div>`, `&nbsp;`)).substr(0, 50)}${input.length > 50 ? `...` : ``}`;
}

export const indexOfAll = (str: string, searchStr: string) => { // Function taken from https://stackoverflow.com/questions/3410464/how-to-find-indices-of-all-occurrences-of-one-string-in-another-in-javascript
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

export const timestampToString = (timestamp: number) => {
	let time = new Date(timestamp);

	let date = time.getDate();
	let month = time.getMonth() + 1;
	let year = time.getFullYear();
	
	return `${date < 10 ? `0` : ``}${date}.${month < 10 ? `0` : ``}${month}.${year}`;
}