import { app, BrowserWindow, ipcMain } from 'electron';
import * as path from 'path';
import * as url from 'url';
import { download } from './command';
import { getInfo } from 'ytdl-core';

console.log("__dirname: ", __dirname)


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

  // win.webContents.openDevTools();
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
	download(arg)
	// ANCHOR wait for stdout
	console.log("Downloads Done!")
});

ipcMain.on('getVideoTitle', (event, arg: string) => {
	console.log('main.ts: getiVideoTitle invoked', arg)
	getInfo(arg, (err, info) => {
		win.webContents.send('videoTitle', info.title)
		console.log('main.ts:getInfo: ', info.title)
	})
})
