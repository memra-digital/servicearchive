/*
=====================================
	© Memra Digital, 2019-2022
	Licensed under the GPLv3 license.
=====================================
*/

import Quill, { StringMap } from 'quill';
import * as main from './main';
import * as sidebar from '../sidebar/main';
import * as data from '../../core/data';

export let value: any = [];

let editor: Quill;

let boldBtn: HTMLButtonElement = <HTMLButtonElement>document.getElementById(`editor-bold-btn`);
let italicBtn: HTMLButtonElement = <HTMLButtonElement>document.getElementById(`editor-italic-btn`);
let underlineBtn: HTMLButtonElement = <HTMLButtonElement>document.getElementById(`editor-underline-btn`);
let strikethroughBtn: HTMLButtonElement = <HTMLButtonElement>document.getElementById(`editor-strikethrough-btn`);
let listBtn: HTMLButtonElement = <HTMLButtonElement>document.getElementById(`editor-list-btn`);

let isBoldBtnActive: boolean = false;
let isItalicBtnActive: boolean = false;
let isUnderlineBtnActive: boolean = false;
let isStrikethroughBtnActive: boolean = false;
let isListBtnActive: boolean = false;

export const init = () => {
	editor = new Quill(`#editor-textarea`, {
		readOnly: false
	});

	editor.on(`text-change`, () => {
		data.setDocumentContent(main.currentDocumentId, editor.getContents());
		//sidebar.updateContentInList(main.currentDocumentId, editor.getText());
	});

	// Disable spell checking as the default one just doesn't really look that good and isn't very useful
	editor.root.setAttribute(`spellcheck`, `false`);

	// Update the formatting buttons
	editor.on(`editor-change`, () => {
		let format: StringMap = editor.getFormat();

		if (format.bold) {
			boldBtn.classList.add(`active`);
			isBoldBtnActive = true;
		} else {
			boldBtn.classList.remove(`active`);
			isBoldBtnActive = false;
		}

		if (format.italic) {
			italicBtn.classList.add(`active`);
			isItalicBtnActive = true;
		} else {
			italicBtn.classList.remove(`active`);
			isItalicBtnActive = false;
		}

		if (format.underline) {
			underlineBtn.classList.add(`active`);
			isUnderlineBtnActive = true;
		} else {
			underlineBtn.classList.remove(`active`);
			isUnderlineBtnActive = false;
		}

		if (format.strike) {
			strikethroughBtn.classList.add(`active`);
			isStrikethroughBtnActive = true;
		} else {
			strikethroughBtn.classList.remove(`active`);
			isStrikethroughBtnActive = false;
		}

		if (format.list) {
			listBtn.classList.add(`active`);
			isListBtnActive = true;
		} else {
			listBtn.classList.remove(`active`);
			isListBtnActive = false;
		}
	});

	// Make the toolstrip buttons format text
	boldBtn.onclick = () => {
		editor.format(`bold`, !isBoldBtnActive);
	}
	italicBtn.onclick = () => {
		editor.format(`italic`, !isItalicBtnActive);
	}
	underlineBtn.onclick = () => {
		editor.format(`underline`, !isUnderlineBtnActive);
	}
	strikethroughBtn.onclick = () => {
		editor.format(`strike`, !isStrikethroughBtnActive);
	}
	listBtn.onclick = () => {
		editor.format(`list`, !isListBtnActive);
	}
}

export const setContent = (value: any) => {
	editor.setContents(value);
}