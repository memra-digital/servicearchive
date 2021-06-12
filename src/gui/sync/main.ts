/*
=====================================
  © Lekvado Media, 2019-2021
  Licensed under the GPLv3 license.
=====================================
*/

import '../../styles/sync.css';
import * as language from '../../core/language';
import * as data from '../../core/data';
import * as connection from './connection';
import QRCodeStyling from 'qr-code-styling';

let openSyncModalBtn: HTMLButtonElement = <HTMLButtonElement>document.getElementById(`sync-btn`);
let syncModal: HTMLElement = document.getElementById(`sync-modal`);
let syncModalCloseBtn: HTMLButtonElement = <HTMLButtonElement>document.getElementById(`sync-modal-close-btn`);
let syncModalBg: HTMLElement = document.getElementById(`sync-modal-bg`);
let syncModalTitle: HTMLElement = document.getElementById(`sync-title`);
let syncModalInstructions: HTMLElement = document.getElementById(`sync-instructions`);
let qrCodeDisplay: HTMLImageElement = <HTMLImageElement>document.getElementById(`sync-qr-code`);
let qrCodeOptions: HTMLElement = document.getElementById(`sync-options`);
let qrCodeLoading: HTMLElement = document.getElementById(`sync-qr-code-loading`);

export let isSyncModalOpen: boolean = false;

export const openSyncModal = async () => {
	qrCodeLoading.style.display = `block`;
	qrCodeDisplay.style.display = `none`;
	qrCodeOptions.style.display = `none`;

	syncModalTitle.innerText = language.getString(`sync`);
	syncModalInstructions.innerText = language.getString(`sync-instructions`);
	(<HTMLParagraphElement>qrCodeLoading.children[1]).innerText = language.getString(`loading`);

	syncModalBg.style.display = `block`;
	syncModal.style.display = `block`;

	setTimeout(() => {
		syncModalBg.style.opacity = `0.5`;
		syncModal.style.transform = `scale(1.0)`;
	}, 1);

	syncModalCloseBtn.onclick = () => closeSyncModal();
	syncModalBg.onclick = () => closeSyncModal();


	connection.init(data.getData()).then((key: string) => {
		qrCodeLoading.style.display = `none`;
		qrCodeDisplay.style.display = `block`;
		qrCodeOptions.style.display = `none`;

		setTimeout(() => update(), 500);

		displayQRCode(`sa-${key}`);
	});
}
const update = () => {
	if (connection.connectorConnected) {
		qrCodeLoading.style.display = `none`;
		qrCodeDisplay.style.display = `none`;
		qrCodeOptions.style.display = `block`;
	}

	if (connection.uploadedChoice != ``) {
		if (connection.uploadedChoice == `mobileToDesktop`) {
			data.setData(connection.connectorData);

			location.reload();
		}

		closeSyncModal();
	}

	setTimeout(() => update(), 500);
}

export const closeSyncModal = () => {
	syncModalBg.style.opacity = `0`;
	syncModal.style.transform = `scale(0)`;
	
	connection.cancel();
	
	setTimeout(() => {
		syncModalBg.style.display = `none`;
		syncModal.style.display = `none`;
	}, 200);
}

openSyncModalBtn.onclick = () => openSyncModal();

(<HTMLButtonElement>qrCodeOptions.children[0]).onclick = () => connection.choose(`desktopToMobile`);
(<HTMLButtonElement>qrCodeOptions.children[1]).onclick = () => connection.choose(`mobileToDesktop`);

const displayQRCode = async (value: string) => {
	const qrCode = new QRCodeStyling({
		width: 300,
		height: 300,
		type: `canvas`,
		data: value,
		dotsOptions: {
			color: `#000000`,
			type: `rounded`
		},
		backgroundOptions: {
			color: `#ffffff`,
		}
	});
	
	let fileReader: FileReader = new FileReader();
	fileReader.readAsDataURL(await qrCode.getRawData());

	fileReader.onload = () => {
		qrCodeDisplay.src = <string>fileReader.result;
	}
}