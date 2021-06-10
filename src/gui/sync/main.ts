/*
=====================================
  © Lekvado Media, 2019-2021
  Licensed under the GPLv3 license.
=====================================
*/

import '../../styles/sync.css';
import * as language from '../../core/language';
import * as data from '../../core/data';
import * as sidebar from '../sidebar/main';
import QRCodeStyling from 'qr-code-styling';

const url: string = `https://servicearchive.herokuapp.com`;
let key: string = ``;

let openSyncModalBtn: HTMLButtonElement = <HTMLButtonElement>document.getElementById(`sync-btn`);
let syncModal: HTMLElement = document.getElementById(`sync-modal`);
let syncModalBg: HTMLElement = document.getElementById(`sync-modal-bg`);
let syncModalTitle: HTMLElement = document.getElementById(`sync-title`);
let syncModalInstructions: HTMLElement = document.getElementById(`sync-instructions`);
let qrCodeDisplay: HTMLImageElement = <HTMLImageElement>document.getElementById(`sync-qr-code`);
let qrCodeOptions: HTMLElement = document.getElementById(`sync-options`);
let qrCodeLoading: HTMLElement = document.getElementById(`sync-qr-code-loading`);

export let isSyncModalOpen: boolean = false;
export const openSyncModal = () => {
	qrCodeDisplay.style.display = `none`;
	qrCodeOptions.style.display = `none`;
	qrCodeLoading.style.display = `block`;

	choiceUploaded = false;
	selfChoice = ``;

	syncModalTitle.innerText = language.getString(`sync`);
	syncModalInstructions.innerText = language.getString(`sync-instructions`);
	(<HTMLParagraphElement>qrCodeLoading.children[1]).innerText = language.getString(`loading`);

	syncModalBg.style.display = `block`;
	syncModal.style.display = `block`;

	setTimeout(() => {
		syncModalBg.style.opacity = `0.5`;
		syncModal.style.transform = `scale(1.0)`;
	}, 1);

	syncModalBg.onclick = () => closeSyncModal();

	fetch(`${url}/sync/init?data=[]`).then(async (result) => {
		let res: any = await result.json();

		if (res.error != ``) {
			return;
		}

		key = res.key;

		const qrCode = new QRCodeStyling({
			width: 300,
			height: 300,
			type: `canvas`,
			data: `sa-${key}`,
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

		qrCodeDisplay.style.display = `block`;
		qrCodeLoading.style.display = `none`;

		fetchConnectionUpdate();
	});
}
export const closeSyncModal = () => {
	syncModalBg.style.opacity = `0`;
	syncModal.style.transform = `scale(0)`;
	
	setTimeout(() => {
		syncModalBg.style.display = `none`;
		syncModal.style.display = `none`;
	}, 200);
}

openSyncModalBtn.onclick = () => openSyncModal();

let choiceUploaded: boolean = false;
let selfChoice: string = ``;
const fetchConnectionUpdate = () => {
	fetch(`${url}/sync/update?key=${key}${(!choiceUploaded && selfChoice != ``) ? `&choice=${selfChoice}` : ``}`).then(async (result) => {
		let res: any = await result.json();

		if (res.connectorData != ``) {
			qrCodeOptions.style.display = `block`;
			qrCodeDisplay.style.display = `none`;
		}

		if (res.choice != ``) choiceUploaded = true;

		if (!choiceUploaded) {
			setTimeout(() => fetchConnectionUpdate(), 1000);
		} else {
			if (res.choice == `mobileToDesktop`) {
				data.setData(JSON.parse(res.connectorData));
				sidebar.updateSidebar();
			}

			closeSyncModal();
		}
	});
}

(<HTMLElement>qrCodeOptions.children[0]).onclick = () => selfChoice = `desktopToMobile`;
(<HTMLElement>qrCodeOptions.children[1]).onclick = () => selfChoice = `mobileToDesktop`;