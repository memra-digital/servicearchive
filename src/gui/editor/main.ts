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

export let currentArticleId: number = -1;

export const openArticle = (id: number) => {
	if (currentArticleId != -1) data.setArticleContent(currentArticleId, textarea.innerHTML);
	currentArticleId = id;

	if (currentArticleId == -1) {
		editor.style.opacity = `0`;
		setTimeout(() => editor.style.display = `none`, 200);
	} else {
		editor.style.display = `block`;
		setTimeout(() => editor.style.opacity = `1`, 1);
		
		textarea.innerHTML = data.getArticleContent(id);

		boldBtn.className = `editor-toolstrip-btn`;
		italicBtn.className = `editor-toolstrip-btn`;
		underlineBtn.className = `editor-toolstrip-btn`;
		strikethroughBtn.className = `editor-toolstrip-btn`;

		document.getSelection().removeAllRanges();

		updating.updateCountInfo(textarea.innerText);
	}
}

init();

document.body.onload = () => editor.style.transition = `.2s opacity`;