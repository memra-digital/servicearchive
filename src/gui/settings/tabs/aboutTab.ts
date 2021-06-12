/*
=====================================
  © Lekvado Media, 2019-2021
  Licensed under the GPLv3 license.
=====================================
*/

import * as os from 'os';
import * as utils from '../../../core/utils';

export const loadAboutTab = () => {
	let elements: HTMLElement[] = [];

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

	let textElement: HTMLElement = document.createElement(`p`);
	textElement.innerText =
		`© Lekvado Media, 2019-2021
		License: GPLv3 ("GPL-3.0-only")
		
		servicearchive ${utils.version}
		${osInfo} (${os.release()})`;

	elements.push(textElement);

	return elements;
}