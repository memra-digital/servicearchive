/*
=====================================
  © Lekvado Media, 2019-2021
  Licensed under the GPLv3 license.
=====================================
*/

import * as sidebar from '../sidebar/main';
import * as language from '../../core/language';

let wordCountDisplay: HTMLSpanElement = <HTMLSpanElement>document.getElementById(`editor-toolstrip-info-words`);
let characterCountDisplay: HTMLSpanElement = <HTMLSpanElement>document.getElementById(`editor-toolstrip-info-characters`);
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

export const updateCountInfo = async (text: string) => {
	calculateWordCount(text).then((result: number) => {
		wordCountDisplay.innerHTML = language.getString(`editor-words`, result.toString());
	});

	let charCount: number = text.split(``).length;
	characterCountDisplay.innerHTML = language.getString(`editor-characters`, charCount.toString());
}
const calculateWordCount = async (text: string) => {
	return new Promise((resolve, reject) => {
		let textWithoutSpaces: string[] = text.split(` `);
		let splitText: string[] = [];
		for (let i: number = 0; i < textWithoutSpaces.length; i++) {
			let textWithoutNL: string[] = textWithoutSpaces[i].split(`\n`);
			for (let o: number = 0; o < textWithoutNL.length; o++) {
				if (textWithoutNL[o] != ``) {
					splitText.push(textWithoutNL[o]);
				}
			}
		}

		resolve(splitText.length);
	});
}

export const updateSidebarContent = (id: number, text: string) => {
	sidebar.updateContentInList(id, text);
}