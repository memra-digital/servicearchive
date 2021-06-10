/*
=====================================
  © Lekvado Media, 2019-2021
  Licensed under the GPLv3 license.
=====================================
*/

import { currentArticleId } from './main';
import * as formatting from './formatting';
import * as updating from './updating';
import * as data from '../../core/data';

let textarea: HTMLTextAreaElement = <HTMLTextAreaElement>document.getElementById(`editor-textarea`);

export const init = () => {
	formatting.init();
	
	textarea.onclick = () => onTextareaUpdate();
	textarea.onkeydown = () => onTextareaUpdate();
	textarea.oninput = () => onTextareaUpdate();
	
	textarea.innerHTML = ``;

	let formats: string[] = formatting.getCurrentFormat();
	if (formats == undefined) formats = [];
	updating.updateToolstripButtons(formats); 
}

const onTextareaUpdate = () => {
	updating.updateToolstripButtons(formatting.getCurrentFormat());
	updating.updateCountInfo(textarea.innerText);
	updating.updateSidebarContent(currentArticleId, textarea.innerText);
}

const saveText = () => {
	data.setArticleContent(currentArticleId, textarea.innerHTML);
	setTimeout(saveText, 10000);
}
setTimeout(saveText, 10000);