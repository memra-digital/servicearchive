/*
=====================================
  © Lekvado Media, 2019-2021
  Licensed under the GPLv3 license.
=====================================
*/

import { ipcMain, app } from 'electron';
import * as fs from 'fs';
import * as path from 'path';
import { loadDefaultResources } from './resourceLoader';

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
loadDefaultResources();