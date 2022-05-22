/*
=====================================
  © Memra Digital, 2019-2022
  Licensed under the GPLv3 license.
=====================================
*/

import '../../styles/settings.css';
import * as language from '../../core/language';
import * as loader from './loader';

let openSettingsModalBtn: HTMLButtonElement = <HTMLButtonElement>document.getElementById(`settings-btn`);
let settingsModal: HTMLElement = document.getElementById(`settings-modal`);
let settingsModalCloseBtn: HTMLButtonElement = <HTMLButtonElement>document.getElementById(`settings-modal-close-btn`);
let settingsModalBg: HTMLElement = document.getElementById(`settings-modal-bg`);

export let tabs: string[] = [
	`<i class="bi bi-toggles2"></i> ${language.getString(`settings-general`)}`,
	`<i class="bi bi-brush"></i> ${language.getString(`settings-theme`)}`,
	`<i class="bi bi-translate"></i> ${language.getString(`settings-language`)}`,
	`<i class="bi bi-info-circle"></i> ${language.getString(`settings-about`)}`
];

export let isSettingsModalOpen: boolean = false;
export const openSettingsModal = () => {
	loader.loadSidebar();

	settingsModalBg.style.display = `block`;
	settingsModal.style.display = `block`;

	setTimeout(() => {
		settingsModalBg.style.opacity = `0.5`;
		settingsModal.style.transform = `scale(1.0)`;
	}, 1);

	settingsModalCloseBtn.onclick = () => closeSettingsModal();
	settingsModalBg.onclick = () => closeSettingsModal();
}
export const closeSettingsModal = () => {
	settingsModalBg.style.opacity = `0`;
	settingsModal.style.transform = `scale(0)`;
	
	setTimeout(() => {
		settingsModalBg.style.display = `none`;
		settingsModal.style.display = `none`;
	}, 200);
}

openSettingsModalBtn.onclick = () => openSettingsModal();