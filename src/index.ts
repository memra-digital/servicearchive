import { app, BrowserWindow, ipcMain } from 'electron';
import { existsSync, readFileSync, writeFileSync } from 'fs';
import { join } from 'path';
import * as electronIsDev from 'electron-is-dev';
declare const MAIN_WINDOW_WEBPACK_ENTRY: any;

if (require('electron-squirrel-startup')) {
  app.quit();
}

app.on(`ready`, () => {
  const mainWindow: BrowserWindow = new BrowserWindow({
    height: 600,
    width: 800,
    title: `servicearchive`,
    show: false
  });

  mainWindow.loadURL(MAIN_WINDOW_WEBPACK_ENTRY);

  mainWindow.maximize();

  if (electronIsDev) {
    mainWindow.webContents.openDevTools();
  }

  mainWindow.once(`ready-to-show`, () => {
    mainWindow.show()
  })
});

app.on(`window-all-closed`, () => {
  if (process.platform !== `darwin`) {
    app.quit();
  }
});


ipcMain.on(`save-data`, (event, arg) => {
  writeFileSync(join(__dirname, `/data/data.json`), JSON.stringify(arg));

  event.returnValue = true;
})
ipcMain.on(`load-data`, (event, arg) => {
  if (!existsSync(join(__dirname, `/data/data.json`))) {
    writeFileSync(join(__dirname, `/data/data.json`), `[]`);
  }

  event.returnValue = readFileSync(join(__dirname, `/data/data.json`));
});