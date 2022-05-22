/*
=====================================
  © Memra Digital, 2019-2022
  Licensed under the GPLv3 license.
=====================================
*/

import '../../styles/editor.css';
import * as data from '../../core/data';
import * as textarea from './textarea';

let editor: HTMLElement = document.getElementById(`editor`);

export let currentDocumentId: number = -1;

export const openDocument = (id: number) => {
	currentDocumentId = id;

	if (currentDocumentId === -1) {
		document.title = `servicearchive`;
		
		editor.style.opacity = `0`;
		setTimeout(() => editor.style.display = `none`, 200);
	} else {
		editor.style.display = `block`;
		setTimeout(() => editor.style.opacity = `1`, 1);

		textarea.setContent(data.getDocumentContent(id));

		document.title = `${data.getDocumentTitle(id)} - servicearchive`
	}
}

document.body.onload = () => {
	editor.style.transition = `.2s opacity`;
	textarea.init();
}