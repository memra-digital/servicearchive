/*
=====================================
  © Lekvado Media, 2019-2021
  Licensed under the GPLv3 license.
=====================================
*/

import { ipcRenderer } from 'electron';

export let currentLanguageCode: string = ``;
export let currentLanguage: any = {};

export const getString = (key: string, attribute: string | null = null) => {
	let result: string = currentLanguage[key];
	if (result == undefined) result = ``;

	if (result.includes(`$`) && attribute != null) {
		result = result.replace(`$`, attribute);
	}

	return result;
}
export const changeLanguage = (code: string) => {
	currentLanguageCode = code;
	currentLanguage = ipcRenderer.sendSync(`get-language`, currentLanguageCode);
}

if (localStorage.getItem(`settings/language`) == null) {
    localStorage.setItem(`settings/language`, `lv-lv`);
}
changeLanguage(localStorage.getItem(`settings/language`));