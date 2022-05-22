/*
=====================================
  © Memra Digital, 2019-2022
  Licensed under the GPLv3 license.
=====================================
*/

import '../../styles/popup.css';
import * as data from '../../core/data';
import * as language from '../../core/language';
import * as sidebar from './main';
import * as tabs from '../tabs/main';

let deletionPopup: HTMLElement = document.getElementById(`deletion-popup`);
let deletionPopupBg: HTMLElement = document.getElementById(`deletion-popup-bg`);
let deletionPopupText: HTMLElement = document.getElementById(`deletion-popup-text`);
let deletionPopupOkBtn: HTMLElement = document.getElementById(`deletion-popup-btn-ok`);
let deletionPopupCancelBtn: HTMLElement = document.getElementById(`deletion-popup-btn-cancel`);

export const open = (id: number, isDocument: boolean) => {
	deletionPopupBg.style.display = `block`;
	deletionPopup.style.display = `block`;

	if (isDocument) {
		deletionPopupText.innerText = language.getString(`delete-document`, data.getDocumentTitle(id));
	} else {
		deletionPopupText.innerText = language.getString(`delete-document-category`, data.getDocumentCategoryTitle(id));
	}

	deletionPopupOkBtn.onclick = () => {
		if (isDocument) {
			sidebar.removeDocumentFromList(id);
			data.removeDocument(id);
			tabs.closeTab(id);
			close();
		} else {
			let categoryDocuments = data.getDocumentCategoryContent(id);
			
			for (let i = 0; i < categoryDocuments.length; i++) {
				tabs.closeTab(categoryDocuments[i].id);
			}

			sidebar.removeDocumentCategoryFromList(id);
			data.removeDocumentCategory(id);
			close();
		}
	}
	deletionPopupCancelBtn.onclick = () => close();

	setTimeout(() => {
		deletionPopupBg.style.opacity = `0.5`;
		deletionPopup.style.transform = `scale(1.0)`;
	}, 1);

	deletionPopupBg.onclick = () => close();
}
export const close = () => {
	deletionPopupBg.style.opacity = `0`;
	deletionPopup.style.transform = `scale(0)`;
	
	setTimeout(() => {
		deletionPopupBg.style.display = `none`;
		deletionPopup.style.display = `none`;
	}, 200);
}