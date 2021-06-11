/*
=====================================
  © Lekvado Media, 2019-2021
  Licensed under the GPLv3 license.
=====================================
*/

import { ipcMain, app } from 'electron';
import * as fs from 'fs';
import * as path from 'path';
import * as utils from '../core/utils';
import { loadDefaultResources } from './resourceLoader';
import type { ThemeListItem, LanguageListItem } from '../schemas';

// Reload the resources if the version number is outdated
if (!fs.existsSync(path.join(app.getPath(`userData`), `/version`))) {
	fs.writeFileSync(path.join(app.getPath(`userData`), `/version`), utils.version);
}
if (fs.readFileSync(path.join(app.getPath(`userData`), `/version`)).toString() != utils.version) {
	loadDefaultResources();
	fs.writeFileSync(path.join(app.getPath(`userData`), `/version`), utils.version);
}

ipcMain.on(`get-language`, (event, arg) => {
	if (!fs.existsSync(path.join(app.getPath(`userData`), `/languages/`))) {
		fs.mkdirSync(path.join(app.getPath(`userData`), `/languages/`));
		loadDefaultResources();
	}

	if (!fs.existsSync(path.join(app.getPath(`userData`), `/languages/${arg}.json`))) {
		loadDefaultResources();
	}

	event.returnValue = JSON.parse(fs.readFileSync(path.join(app.getPath(`userData`), `/languages/${arg}.json`)).toString());
});
ipcMain.on(`get-language-list`, (event, arg) => {
	let results: LanguageListItem[] = [];

	let files: string[] = fs.readdirSync(path.join(app.getPath(`userData`), `/languages/`));

	for (let i: number = 0; i < files.length; i++) {
		let language: any = JSON.parse(fs.readFileSync(path.join(app.getPath(`userData`), `/languages/`, files[i])).toString());

		results.push({
			name: language[`language-native`],
			file: files[i]
		});
	}

	event.returnValue = results;
});

ipcMain.on(`get-theme`, (event, arg) => {
	if (!fs.existsSync(path.join(app.getPath(`userData`), `/themes/`))) {
		fs.mkdirSync(path.join(app.getPath(`userData`), `/themes/`));
		loadDefaultResources();
	}

	if (!fs.existsSync(path.join(app.getPath(`userData`), `/themes/${arg}.json`))) {
		loadDefaultResources();
	}

	event.returnValue = JSON.parse(fs.readFileSync(path.join(app.getPath(`userData`), `/themes/${arg}.json`)).toString());
});
ipcMain.on(`get-theme-list`, (event, arg) => {
	let results: ThemeListItem[] = [];

	let files: string[] = fs.readdirSync(path.join(app.getPath(`userData`), `/themes/`));

	for (let i: number = 0; i < files.length; i++) {
		let theme: any = JSON.parse(fs.readFileSync(path.join(app.getPath(`userData`), `/themes/`, files[i])).toString());

		results.push({
			name: theme.name,
			description: theme.description,
			file: files[i]
		});
	}

	event.returnValue = results;
});

ipcMain.on(`get-data`, (event, arg) => {
	if (!fs.existsSync(path.join(app.getPath(`userData`), `/data/`))) {
		fs.mkdirSync(path.join(app.getPath(`userData`), `/data/`));
		loadDefaultResources();
	}

	if (!fs.existsSync(path.join(app.getPath(`userData`), `/data/data.json`))) {
		fs.writeFileSync(path.join(app.getPath(`userData`), `/data/data.json`), `[]`);
	}
	
	event.returnValue = JSON.parse(fs.readFileSync(path.join(app.getPath(`userData`), `/data/data.json`)).toString());
});
ipcMain.on(`set-data`, (event, arg) => {
	if (!fs.existsSync(path.join(app.getPath(`userData`), `/data/`))) {
		fs.mkdirSync(path.join(app.getPath(`userData`), `/data/`));
		loadDefaultResources();
	}

	fs.writeFileSync(path.join(app.getPath(`userData`), `/data/data.json`), JSON.stringify(arg));
	event.returnValue = arg;
});