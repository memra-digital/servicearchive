/*
=====================================
  © Memra Digital, 2019-2022
  Licensed under the GPLv3 license.
=====================================
*/

import * as os from 'os';
import * as utils from '../../../core/utils';
import * as i18n from '../../../core/i18n';

export const loadAboutTab = () => {
	let elements: HTMLElement[] = [];

	let logoElement: HTMLImageElement = document.createElement(`img`);
	logoElement.src = ``;
	elements.push(logoElement);

	let mainInfoTextElement: HTMLElement = document.createElement(`p`);
	mainInfoTextElement.innerText =
		`© Memra Digital, 2019-2022
		${i18n.getString(`settings-license-text`)}
		
		servicearchive ${utils.version}`;
	elements.push(mainInfoTextElement);

	let technicalInfoHeaderTextElement: HTMLElement = document.createElement(`b`);
	technicalInfoHeaderTextElement.innerText = `${i18n.getString(`settings-technical-title`)}`;
	elements.push(technicalInfoHeaderTextElement);


	let osInfo: string;

	switch (os.platform()) {
		case `win32`:
			osInfo = `Windows`;
			break;
		case `darwin`:
			osInfo = `MacOS`;
			break;
		case `linux`:
			osInfo = `Linux`;
			break;
		case `freebsd`:
			osInfo = `FreeBSD`;
			break;
		default:
			osInfo = `Unknown`;
			break;
	}
	switch (os.arch()) {
		case `x64`:
			osInfo += ` 64-bit`;
			break;
		case `x32`:
			osInfo += ` 32-bit`;
			break;
	}

	let technicalInfoTextElement: HTMLElement = document.createElement(`p`);
	technicalInfoTextElement.innerText =
		`OS: ${osInfo} (${os.release()})
		ST: ${null}
		T: none`;
	elements.push(technicalInfoTextElement);

	return elements;
}