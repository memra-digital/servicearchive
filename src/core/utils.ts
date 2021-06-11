/*
=====================================
  © Lekvado Media, 2019-2021
  Licensed under the GPLv3 license.
=====================================
*/

export const version: string = `v0.6.0-BETA (unstable)`;
export const removeHTMLTags = (input: string) => { // Function taken from https://www.tutorialspoint.com/how-to-remove-html-tags-from-a-string-in-javascript
	return input.replace( /(<([^>]+)>)/ig, '');
}
export const createContentPreviewString = (input: string) => {
	return `${removeHTMLTags(input.replace(`</div>`, `&nbsp;`)).substr(0, 50)}${input.length > 50 ? `...` : ``}`;
}