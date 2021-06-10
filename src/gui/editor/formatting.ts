/*
=====================================
  © Lekvado Media, 2019-2021
  Licensed under the GPLv3 license.
=====================================
*/

import * as formatting from './formatting';
import * as updating from './updating';

let textarea: HTMLTextAreaElement = <HTMLTextAreaElement>document.getElementById(`editor-textarea`);
let boldBtn: HTMLButtonElement = <HTMLButtonElement>document.getElementById(`editor-bold-btn`);
let italicBtn: HTMLButtonElement = <HTMLButtonElement>document.getElementById(`editor-italic-btn`);
let underlineBtn: HTMLButtonElement = <HTMLButtonElement>document.getElementById(`editor-underline-btn`);
let strikethroughBtn: HTMLButtonElement = <HTMLButtonElement>document.getElementById(`editor-strikethrough-btn`);
let undoBtn: HTMLButtonElement = <HTMLButtonElement>document.getElementById(`editor-undo-btn`);
let redoBtn: HTMLButtonElement = <HTMLButtonElement>document.getElementById(`editor-redo-btn`);

export const init = () => {
	boldBtn.onclick = () => {
		document.execCommand(`bold`);
		updating.updateToolstripButtons(formatting.getCurrentFormat());
	}
	italicBtn.onclick = () => {
		document.execCommand(`italic`);
		updating.updateToolstripButtons(formatting.getCurrentFormat());
	}
	underlineBtn.onclick = () => {
		document.execCommand(`underline`);
		updating.updateToolstripButtons(formatting.getCurrentFormat());
	}
	strikethroughBtn.onclick = () => {
		document.execCommand(`strikethrough`);
		updating.updateToolstripButtons(formatting.getCurrentFormat());
	}
	undoBtn.onclick = () => {
		document.execCommand(`undo`);
	}
	redoBtn.onclick = () => {
		document.execCommand(`redo`);
	}
}
export const getCurrentFormat = () => {

	let formats: Array<string> = [];
	let selection: Selection = document.getSelection();

	if (selection.rangeCount == 0) {
		boldBtn.className = `editor-toolstrip-btn`;
		italicBtn.className = `editor-toolstrip-btn`;
		underlineBtn.className = `editor-toolstrip-btn`;
		strikethroughBtn.className = `editor-toolstrip-btn`;

		return;
	}

	if (window.getSelection().isCollapsed) {
		let foundTextAreaAsParent: boolean = false;
		let currentParentNode: HTMLElement = <HTMLElement>selection.getRangeAt(0).startContainer;

		while (!foundTextAreaAsParent) {
			if (currentParentNode.parentElement != textarea) {
				currentParentNode = currentParentNode.parentElement;
				
				if (currentParentNode.tagName != null) formats.push(currentParentNode.tagName.toLowerCase());
			} else {
				foundTextAreaAsParent = true;
			}
		}

	}

	return formats;
}