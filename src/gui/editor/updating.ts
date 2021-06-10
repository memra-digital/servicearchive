/*
=====================================
  © Lekvado Media, 2019-2021
  Licensed under the GPLv3 license.
=====================================
*/

import * as sidebar from '../sidebar/main';
import * as language from '../../core/language';

let wordCountDisplay: HTMLSpanElement = <HTMLSpanElement>document.getElementById(`info-word-count`);
let characterCountDisplay: HTMLSpanElement = <HTMLSpanElement>document.getElementById(`info-character-count`);
let boldBtn: HTMLButtonElement = <HTMLButtonElement>document.getElementById(`editor-bold-btn`);
let italicBtn: HTMLButtonElement = <HTMLButtonElement>document.getElementById(`editor-italic-btn`);
let underlineBtn: HTMLButtonElement = <HTMLButtonElement>document.getElementById(`editor-underline-btn`);
let strikethroughBtn: HTMLButtonElement = <HTMLButtonElement>document.getElementById(`editor-strikethrough-btn`);

export const updateToolstripButtons = (formats: string[]) => {
	boldBtn.className = formats.includes(`b`) ? `editor-toolstrip-btn active` : `editor-toolstrip-btn`;
	italicBtn.className = formats.includes(`i`) ? `editor-toolstrip-btn active` : `editor-toolstrip-btn`;
	underlineBtn.className = formats.includes(`u`) ? `editor-toolstrip-btn active` : `editor-toolstrip-btn`;
	strikethroughBtn.className = formats.includes(`strike`) ? `editor-toolstrip-btn active` : `editor-toolstrip-btn`;
}
export const updateCountInfo = (text: string) => {
	let wordCount: number = text.split(` `).length;
	let charCount: number = text.split(``).length;
	
	wordCountDisplay.innerHTML = language.getString(`editor-words`, wordCount.toString());
	characterCountDisplay.innerHTML = language.getString(`editor-characters`, charCount.toString());
}
export const updateSidebarContent = (id: number, text: string) => {
	sidebar.updateContentInList(id, text);
}