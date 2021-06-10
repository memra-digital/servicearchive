/*
=====================================
  © Lekvado Media, 2019-2021
  Licensed under the GPLv3 license.
=====================================
*/

import { ipcMain } from 'electron';
import * as fs from 'fs';
import * as path from 'path';

ipcMain.on(`get-language`, (event, arg) => {
	event.returnValue = JSON.parse(fs.readFileSync(path.join(__dirname, `../../languages/${arg}.json`)).toString());
});
ipcMain.on(`get-theme`, (event, arg) => {
	event.returnValue = JSON.parse(fs.readFileSync(path.join(__dirname, `../../themes/${arg}.json`)).toString());
});

ipcMain.on(`get-data`, (event, arg) => {
	if (!fs.existsSync(path.join(__dirname, `../../data/data.json`))) {
		fs.writeFileSync(path.join(__dirname, `../../data/data.json`), JSON.stringify([]));
	}
	
	event.returnValue = JSON.parse(fs.readFileSync(path.join(__dirname, `../../data/data.json`)).toString());
});
ipcMain.on(`set-data`, (event, arg) => {
	fs.writeFileSync(path.join(__dirname, `../../data/data.json`), JSON.stringify(arg));
	event.returnValue = arg;
});