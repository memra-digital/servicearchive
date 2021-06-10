/*
=====================================
  © Lekvado Media, 2019-2021
  Licensed under the GPLv3 license.
=====================================
*/

import { app } from 'electron';
import * as fs from 'fs';
import * as path from 'path';

import { en_us } from './resources/languages/en-us';
import { lv_lv } from './resources/languages/lv-lv';

import { default_light } from './resources/themes/default-light';

let defaultLanguages: any = {
	"en-us": en_us,
	"lv-lv": lv_lv
};
let defaultThemes: any = {
	"default-light": default_light
};
export const loadDefaultResources = () => {
	// Create the resource directories if they are non existant
	if (!fs.existsSync(path.join(app.getPath(`userData`), `/languages/`))) {
		fs.mkdirSync(path.join(app.getPath(`userData`), `/languages/`));
	}
	if (!fs.existsSync(path.join(app.getPath(`userData`), `/themes/`))) {
		fs.mkdirSync(path.join(app.getPath(`userData`), `/themes/`));
	}
	if (!fs.existsSync(path.join(app.getPath(`userData`), `/data/`))) {
		fs.mkdirSync(path.join(app.getPath(`userData`), `/data/`));
	}

	// Load all of the missing default languages
	let loadedLanguages: string[] = fs.readdirSync(path.join(app.getPath(`userData`), `/languages/`));
	for (let i in defaultLanguages) {
		if (!loadedLanguages.includes(i)) {
			fs.writeFileSync(path.join(app.getPath(`userData`), `/languages/${i}.json`), JSON.stringify(defaultLanguages[i]));
		}
	}

	// Load all of the missing default themes
	let loadedThemes: string[] = fs.readdirSync(path.join(app.getPath(`userData`), `/themes/`));
	for (let i in defaultThemes) {
		if (!loadedThemes.includes(i)) {
			fs.writeFileSync(path.join(app.getPath(`userData`), `/themes/${i}.json`), JSON.stringify(defaultThemes[i]));
		}
	}
}