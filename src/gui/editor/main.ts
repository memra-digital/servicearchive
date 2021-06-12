/*
=====================================
  © Lekvado Media, 2019-2021
  Licensed under the GPLv3 license.
=====================================
*/

import '../../styles/editor.css';
import * as updating from './updating';
import * as data from '../../core/data';
import { init } from './init';

let editor: HTMLElement = document.getElementById(`editor`);
let textarea: HTMLTextAreaElement = <HTMLTextAreaElement>document.getElementById(`editor-textarea`);
let boldBtn: HTMLButtonElement = <HTMLButtonElement>document.getElementById(`editor-bold-btn`);
let italicBtn: HTMLButtonElement = <HTMLButtonElement>document.getElementById(`editor-italic-btn`);
let underlineBtn: HTMLButtonElement = <HTMLButtonElement>document.getElementById(`editor-underline-btn`);
let strikethroughBtn: HTMLButtonElement = <HTMLButtonElement>document.getElementById(`editor-strikethrough-btn`);

export let currentDocumentId: number = -1;

export const openDocument = (id: number) => {
	if (currentDocumentId != -1) data.setDocumentContent(currentDocumentId, textarea.innerHTML);
	currentDocumentId = id;

	if (currentDocumentId == -1) {
		document.title = `servicearchive`;
		
		editor.style.opacity = `0`;
		setTimeout(() => editor.style.display = `none`, 200);
	} else {
		editor.style.display = `block`;
		setTimeout(() => editor.style.opacity = `1`, 1);
		
		textarea.innerHTML = data.getDocumentContent(id);

		boldBtn.className = `editor-toolstrip-btn`;
		italicBtn.className = `editor-toolstrip-btn`;
		underlineBtn.className = `editor-toolstrip-btn`;
		strikethroughBtn.className = `editor-toolstrip-btn`;

		document.getSelection().removeAllRanges();

		updating.updateCountInfo(textarea.innerText);

		document.title = `${data.getDocumentTitle(id)} - servicearchive`
	}
}

init();

document.body.onload = () => editor.style.transition = `.2s opacity`;