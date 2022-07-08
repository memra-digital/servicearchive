/*
=====================================
  © Memra Digital, 2019-2022
  Licensed under the GPLv3 license.
=====================================
*/

import { ipcRenderer } from 'electron';

export let currentLanguageCode: string = ``;
export let currentLanguage: any = {};

export const getString = (key: string, placeholders: string[] = [], count: number | null = null) => {
	let result: string;
	
	// Determine which version of the string should be used based on the count
	if (count === null) {
		result = currentLanguage.strings[key];
	} else {
		result = currentLanguage[key];
	}
	
	if (result === undefined) result = ``;
	return result;
}
export const getMetadata = (key: string) => {
	return currentLanguage.metadata[key] || ``;
}

export const changeLanguage = (code: string) => {
	currentLanguageCode = code;
	currentLanguage = ipcRenderer.sendSync(`get-language`, currentLanguageCode);
}

if (localStorage.getItem(`settings/language`) === null) {
    localStorage.setItem(`settings/language`, `lv-lv`);
}
changeLanguage(localStorage.getItem(`settings/language`));