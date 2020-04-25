import { app, BrowserWindow, ipcMain } from 'electron';
import * as path from 'path';
import * as url from 'url';
import { download } from './command';


function createWindow() {
  win = new BrowserWindow({
    webPreferences: {
      nodeIntegration: true,
    },
    width: 1200,
    height: 1200,
  });

  win.loadURL(
    url.format({
      pathname: path.join(
        __dirname,
        '../../../dist/ng-elec-downloader/index.html'
      ),
      // pathname: "C:/Users/filip/Desktop/PROGRAMMING/ng-elec-downloader/dist/ng-elec-downloader/index.html",
      protocol: 'file:',
      slashes: true,
    })
  );

  win.webContents.openDevTools();

  win.on('closed', () => {
    win = null;
  });
}

let win: BrowserWindow;
app.on('ready', createWindow);
app.on('activate', () => {
  if (win === null) {
    createWindow();
  }
});

ipcMain.on('sendLinks', (event, arg) => {
  console.log(`Links arrived: ${event}, ${arg}`);
});
