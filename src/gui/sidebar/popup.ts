/*
=====================================
  © Memra Digital, 2019-2022
  Licensed under the GPLv3 license.
=====================================
*/

import '../../styles/popup.css';
import * as language from '../../core/language';
import * as data from '../../core/data';
import { DocumentMetadata } from '../../schemas';

let popup: HTMLElement = document.getElementById(`popup`);
let popupBg: HTMLElement = document.getElementById(`popup-bg`);
let popupText: HTMLElement = document.getElementById(`popup-text`);
let popupInput: HTMLInputElement = <HTMLInputElement>document.getElementById(`popup-input`);
let popupOkBtn: HTMLElement = document.getElementById(`popup-btn-ok`);
let popupCancelBtn: HTMLElement = document.getElementById(`popup-btn-cancel`);

let addDocumentBtn: HTMLElement = document.getElementById(`add-btn`);

const open = (text: string, isInputShown: boolean, onClick: Function) => {
	popupBg.style.display = `block`;
	popup.style.display = `block`;

	popupText.innerText = text;

	if (isInputShown) {
		popupInput.style.display = `block`;
	} else {
		popupInput.style.display = `none`;
	}

	let popupContentHeight: number = 47 + popupText.clientHeight;
	if (isInputShown) popupContentHeight += 43;
	popup.style.height = `${popupContentHeight}px`;
	popup.style.top = `calc(50% - ${popupContentHeight / 2}px)`;

	popupOkBtn.onclick = () => onClick(popupInput.value);
	popupCancelBtn.onclick = () => close();

	setTimeout(() => {
		popupBg.style.opacity = `0.5`;
		popup.style.transform = `scale(1.0)`;
	}, 1);

	popupBg.onclick = () => close();
}
const close = () => {
	popupBg.style.opacity = `0`;
	popup.style.transform = `scale(0)`;
	
	setTimeout(() => {
		popupBg.style.display = `none`;
		popup.style.display = `none`;
	}, 200);
}

addDocumentBtn.onclick = () => {
	open(language.getString(`add-document`), true, (name: string) => {
		if (name !== ``) {
			let document: DocumentMetadata | boolean = data.addDocument(name);

			if (document !== false) {
				
			}
		}

		close();
	});
}