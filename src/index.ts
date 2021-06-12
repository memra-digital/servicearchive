/*
=====================================
  © Lekvado Media, 2019-2021
  Licensed under the GPLv3 license.
=====================================
*/

import { app, BrowserWindow, Menu } from 'electron';
import 'v8-compile-cache';
import * as performance from './main/performance';
import './main/filesystem';

const isDev = require('electron-is-dev');

performance.startMeasuringStartupTime();

declare const MAIN_WINDOW_WEBPACK_ENTRY: any;

if (require('electron-squirrel-startup')) {
	app.quit();
}

app.on(`ready`, () => {
	const mainWindow: BrowserWindow = new BrowserWindow({
		title: `servicearchive`,
		show: false,
		webPreferences: {
			nodeIntegration: true,
			contextIsolation: false
		}
	});

	mainWindow.loadURL(MAIN_WINDOW_WEBPACK_ENTRY);

	mainWindow.maximize();
	Menu.setApplicationMenu(null)

	if (isDev) {
		mainWindow.webContents.openDevTools();
	}

	mainWindow.once(`ready-to-show`, () => {
		mainWindow.show();
		
		performance.stopMeasuringStartupTime();
		console.log(`Startup time: ${performance.startupTime}`);
	});
});

app.on(`window-all-closed`, () => {
	if (process.platform !== `darwin`) {
		app.quit();
	}
});