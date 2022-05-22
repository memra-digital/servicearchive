/*
=====================================
	© Memra Digital, 2019-2022
	Licensed under the GPLv3 license.
=====================================
*/

import Quill from 'quill';
import * as main from './main';
import * as sidebar from '../sidebar/main';
import * as data from '../../core/data';

export let value: any = [];

let editor: Quill;
let boldBtn: HTMLButtonElement = <HTMLButtonElement>document.getElementById(`editor-bold-btn`);
let italicBtn: HTMLButtonElement = <HTMLButtonElement>document.getElementById(`editor-italic-btn`);
let underlineBtn: HTMLButtonElement = <HTMLButtonElement>document.getElementById(`editor-underline-btn`);
let strikethroughBtn: HTMLButtonElement = <HTMLButtonElement>document.getElementById(`editor-strikethrough-btn`);

export const init = () => {
	editor = new Quill(`#editor-textarea`, {
		placeholder: `Compose an epic...`,
		readOnly: false
	});

	editor.on(`text-change`, () => {
		data.setDocumentContent(main.currentDocumentId, editor.getContents());
		sidebar.updateContentInList(main.currentDocumentId, editor.getText());
	});

	boldBtn.className = `editor-toolstrip-btn icon`;
	italicBtn.className = `editor-toolstrip-btn icon`;
	underlineBtn.className = `editor-toolstrip-btn icon`;
	strikethroughBtn.className = `editor-toolstrip-btn icon`;
}

export const setContent = (value: any) => {
	editor.setContents(value);
}