/*
=====================================
  © Lekvado Media, 2019-2021
  Licensed under the GPLv3 license.
=====================================
*/

export const version: string = `v1.0.0`;
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