/*
=====================================
  © Lekvado Media, 2019-2021
  Licensed under the GPLv3 license.
=====================================
*/

import { app, BrowserWindow, Menu } from 'electron';
import 'v8-compile-cache';
import * as electronIsDev from 'electron-is-dev';
import * as performance from './main/performance';

performance.startMeasuringStartupTime();

declare const MAIN_WINDOW_WEBPACK_ENTRY: any;

if (require('electron-squirrel-startup')) {
	app.quit();
}

app.on(`ready`, () => {
	const mainWindow: BrowserWindow = new BrowserWindow({
		title: `servicearchive`,
		show: false
	});

	mainWindow.loadURL(MAIN_WINDOW_WEBPACK_ENTRY);

	mainWindow.maximize();
	Menu.setApplicationMenu(null)

	if (electronIsDev) {
		mainWindow.webContents.openDevTools();
	}

	mainWindow.once(`ready-to-show`, () => {
		mainWindow.show();
		
		console.log(`Started servicearchive in ${performance.stopMeasuringStartupTime()}ms!`);
	});
});

app.on(`window-all-closed`, () => {
	if (process.platform !== `darwin`) {
		app.quit();
	}
});